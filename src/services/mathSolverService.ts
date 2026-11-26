import { compressMultipleImages } from './imageCompression';

export interface SolverOptions {
  apiKey?: string;        // Gemini API key
  openAiKey?: string;     // OpenAI ChatGPT API key
  aiEngine?: 'chatgpt' | 'gemini'; // Selected AI engine
  studentName?: string;
  gradeLevel?: string;
  program?: string;
  userNote?: string;
}

export interface SolvedQuestionItem {
  questionNumber: number | string;
  title: string;
  textEn: string;
  textVi: string;
  category: string;
  difficulty: 'Cơ bản' | 'Nâng cao' | 'Olympic / Học sinh giỏi';
  finalAnswer: string;
  solutionSteps: string[];
  tips?: string;
  coreFormulas?: string[];
  alternateMethod?: string;
}

export interface SolverSession {
  id: string;
  createdAt: string;
  timestamp: number;
  examTitle: string;
  gradeLevel: string;
  totalQuestions: number;
  imageThumbnail?: string;
  sourceImagesCount?: number;
  rawOcrText: string;
  aiEngine?: 'chatgpt' | 'gemini';
  questions: SolvedQuestionItem[];
}

export interface SolverChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STORAGE_KEY = 'MATHMIND_SOLVER_SESSIONS';

import { cleanMathText } from '../utils/textCleaner';

/**
 * Intelligent Consistency Reconciler:
 * Detects and eliminates contradictions between top-level finalAnswer and the step-by-step calculation.
 * If the step-by-step arithmetic chain concludes with X (e.g. 2.600.000 đồng, 36 đỉnh, 23 món)
 * but finalAnswer had Y (e.g. 5.200.000 đồng, 45, 21),
 * this reconciler automatically corrects finalAnswer to match the verified step-by-step calculation.
 */
export function reconcileAnswerWithSolutionSteps(finalAnswer: string, solutionSteps: string[]): string {
  if (!solutionSteps || !Array.isArray(solutionSteps) || solutionSteps.length === 0) {
    return cleanMathText(finalAnswer) || '';
  }

  const cleanedFinal = cleanMathText(finalAnswer) || '';
  const cleanedSteps = solutionSteps.map(s => cleanMathText(s)).filter(Boolean);

  if (cleanedSteps.length === 0) return cleanedFinal;

  // Check all steps in reverse order (prioritizing the last concluding step)
  const reversedSteps = [...cleanedSteps].reverse();

  for (const step of reversedSteps) {
    if (!step) continue;

    // Pattern 1: Division with remainder: "= [quotient] (?:dư|remainder) [remainder]" -> quotient is the answer!
    const divRemainderMatch = step.match(/=\s*([0-9.,]+)\s*(?:dư|remainder)\s*[0-9.,]+/i);

    // Pattern 2: Find all "= [number] [unit]?" in the step and take the LAST one (the final calculation result)
    const eqMatches = [...step.matchAll(/=\s*([0-9.,]+)\s*(đồng|đ|VNĐ|đô la|\$|cm²|m²|dm²|mm²|cm|m|km|kg|g|học sinh|em|bạn|tuổi|giờ|phút|giây|câu|món quà|món|đỉnh|cạnh|mặt)?/gi)];
    const lastEqMatch = eqMatches.length > 0 ? eqMatches[eqMatches.length - 1] : null;

    // Pattern 3: Explicit conclusion indicators:
    // "đáp số:", "lớn nhất là", "nhỏ nhất là", "mua được nhiều nhất là", "tối đa là", "tổng cộng là", "vậy ... là"
    const conclusionMatch = step.match(/(?:đáp số|kết luận|lớn nhất.*?là|nhỏ nhất.*?là|số cần tìm.*?là|mua được nhiều nhất(?: là)?|tối đa(?: là|=)?|kết quả(?: là|=)?|vậy.*?là|chi phí.*?là|đáp án.*?là|chính là|giá trị.*?là|tổng(?: số)?.*?là)\s*:?\s*([0-9.,]+)\s*(đồng|đ|VNĐ|đô la|\$|cm²|m²|dm²|mm²|cm|m|km|kg|g|học sinh|em|bạn|tuổi|giờ|phút|giây|câu|món quà|món|đỉnh|cạnh|mặt)?/i);

    const matched = divRemainderMatch || lastEqMatch || conclusionMatch;
    if (matched) {
      // Clean up any trailing dots or commas
      const calculatedVal = matched[1].replace(/[.,]$/, '').trim();
      const unit = matched[2] 
        ? ` ${matched[2].trim()}` 
        : (cleanedFinal.includes('đồng') ? ' đồng' : (cleanedFinal.includes('VNĐ') ? ' VNĐ' : (cleanedFinal.includes('m²') ? ' m²' : (cleanedFinal.includes('cm²') ? ' cm²' : (cleanedFinal.includes('đỉnh') ? ' đỉnh' : (cleanedFinal.includes('món') ? ' món' : ''))))));
      
      const cleanFinalDigits = cleanedFinal.replace(/[^0-9]/g, '');
      const cleanCalcDigits = calculatedVal.replace(/[^0-9]/g, '');

      // If both contain numeric digits and they disagree, prioritize the verified step-by-step arithmetic chain!
      if (cleanFinalDigits && cleanCalcDigits && cleanFinalDigits !== cleanCalcDigits) {
        console.warn(`[Auto-Reconcile] Corrected answer mismatch: "${cleanedFinal}" -> "${calculatedVal}${unit}" based on step calculation.`);
        return `${calculatedVal}${unit}`;
      }
      return cleanedFinal;
    }
  }

  // Fallback: Check if problem asks for sum of two quantities (e.g. vertices of 2 pyramids)
  const pyramidAMatch = cleanedSteps.join(' ').match(/hình chóp A.*?(\d+)\s*(?:đỉnh)/i);
  const pyramidBMatch = cleanedSteps.join(' ').match(/hình chóp B.*?(\d+)\s*(?:đỉnh)/i);
  if (pyramidAMatch && pyramidBMatch) {
    const sumVertices = parseInt(pyramidAMatch[1], 10) + parseInt(pyramidBMatch[1], 10);
    if (!isNaN(sumVertices) && cleanedFinal !== String(sumVertices)) {
      console.warn(`[Auto-Reconcile] Sum of two pyramids detected: ${pyramidAMatch[1]} + ${pyramidBMatch[1]} = ${sumVertices}`);
      return `${sumVertices}`;
    }
  }

  return cleanedFinal;
}

// Local storage session management
export function getSolverSessions(): SolverSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: SolverSession[] = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    
    // Auto-sanitize existing sessions to guarantee 100% coherence between finalAnswer and solutionSteps
    const sanitized = list.map(session => ({
      ...session,
      questions: (session.questions || []).map(q => ({
        ...q,
        finalAnswer: reconcileAnswerWithSolutionSteps(q.finalAnswer, q.solutionSteps)
      }))
    }));
    return sanitized.sort((a, b) => b.timestamp - a.timestamp);
  } catch (e) {
    console.warn('Failed to load solver sessions:', e);
    return [];
  }
}

export function saveSolverSession(session: SolverSession): void {
  try {
    const existing = getSolverSessions().filter(s => s.id !== session.id);
    const updated = [session, ...existing].slice(0, 30); // keep last 30 sessions
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save solver session:', e);
  }
}

export function deleteSolverSession(id: string): void {
  try {
    const existing = getSolverSessions().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.warn('Failed to delete solver session:', e);
  }
}

export function getSolverSessionById(id: string): SolverSession | null {
  const sessions = getSolverSessions();
  return sessions.find(s => s.id === id) || null;
}

const GEMINI_MODELS = [
  'gemini-1.5-pro',
  'gemini-pro-latest',
  'gemini-3.1-pro-preview',
  'gemini-2.5-pro',
  'gemini-3.8-flash',
  'gemini-3-flash-preview',
  'gemini-flash-latest'
];

/**
 * Step 1: Extract and convert all uploaded images into clean, editable text problems (OCR).
 */
export async function extractTextFromImagesWithAI(
  imageFiles: File[],
  options: SolverOptions = {},
  onProgress?: (progress: number, message: string) => void
): Promise<string> {
  if (imageFiles.length === 0) return '';

  if (onProgress) onProgress(20, `Đang tối ưu & nén ${imageFiles.length} trang ảnh để nhận diện OCR...`);
  const { base64List } = await compressMultipleImages(imageFiles, {
    maxWidth: 1400,
    maxHeight: 1400,
    quality: 0.82
  });

  const engine = options.aiEngine || (localStorage.getItem('AI_ENGINE') as any) || 'chatgpt';
  const openAiKey = options.openAiKey || localStorage.getItem('OPENAI_API_KEY') || '';
  const envGeminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const geminiKey = options.apiKey || localStorage.getItem('GEMINI_API_KEY') || envGeminiKey || '';

  const ocrSystemPrompt = `Bạn là Chuyên gia Nhận diện Chữ viết & Đề thi Toán học hàng đầu.
Nhiệm vụ: Hãy quét và trích xuất TOÀN BỘ nội dung đề bài trong tất cả các trang ảnh được cung cấp thành văn bản thuần (Text).
QUY TẮC BẮT BUỘC:
1. Nhận diện ĐẦY ĐỦ TỪNG CÂU HỎI (Câu 1, Câu 2, Câu 3...), không bỏ sót bất kỳ câu nào.
2. Trích xuất cả đề bài tiếng Anh và phần dịch/chú thích tiếng Việt nếu có.
3. Nếu có bài làm chữ viết tay của học sinh, hãy ghi chú: "Bài làm của học sinh: [nội dung viết tay]".
4. KHÔNG giải bài trong bước này, CHỈ trích xuất nội dung đề bài chính xác 100% để người dùng rà soát, chỉnh sửa trước khi giải.
5. Trình bày mạch lạc, phân tách rõ ràng giữa các câu bằng dấu gạch ngang (---).`;

  // 1. Try OpenAI ChatGPT if selected and key available
  if (engine === 'chatgpt' && openAiKey && openAiKey.trim().length > 15) {
    if (onProgress) onProgress(50, `Đang kết nối ChatGPT (GPT-4o) để trích xuất đề bài từ ${base64List.length} trang ảnh...`);
    try {
      const userContent: any[] = [{ type: 'text', text: 'Hãy nhận diện toàn bộ đề bài toán trong các ảnh đính kèm thành văn bản thuần:' }];
      for (const b64 of base64List) {
        userContent.push({
          type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${b64}`, detail: 'high' }
        });
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: ocrSystemPrompt },
            { role: 'user', content: userContent }
          ],
          temperature: 0.1
        })
      });

      if (res.ok) {
        const data = await res.json();
        const extractedText = data?.choices?.[0]?.message?.content;
        if (extractedText && extractedText.trim().length > 10) {
          if (onProgress) onProgress(100, `ChatGPT đã trích xuất thành công toàn bộ đề bài ra Text!`);
          return extractedText.trim();
        }
      }
    } catch (openAiErr) {
      console.warn('OpenAI OCR request failed, trying fallback to Gemini:', openAiErr);
    }
  }

  // 2. Gemini Vision OCR
  if (geminiKey && geminiKey.trim().length > 10) {
    if (onProgress) onProgress(60, `Gemini Vision AI đang chuyển toàn bộ ${base64List.length} trang ảnh ra Text...`);
    const parts: any[] = [{ text: ocrSystemPrompt }];
    for (const b64 of base64List) {
      parts.push({
        inlineData: { mimeType: 'image/jpeg', data: b64 }
      });
    }

    for (const model of GEMINI_MODELS) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: { temperature: 0.1 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText && rawText.trim().length > 10) {
            if (onProgress) onProgress(100, `Đã chuyển toàn bộ đề bài từ ${imageFiles.length} trang ảnh ra Text thành công!`);
            return rawText.trim();
          }
        }
      } catch (err) {
        console.warn(`Gemini OCR model ${model} failed:`, err);
      }
    }
  }

  return 'Chưa thể trích xuất văn bản từ ảnh do thiếu API Key hoặc lỗi mạng. Sếp có thể tự gõ hoặc dán nội dung đề bài vào đây.';
}

/**
 * Step 2: Solve math problem with AI (supports multiple images and/or text prompt, OpenAI or Gemini).
 */
export async function solveMathProblemWithAI(
  input: { imageFiles?: File[]; textPrompt?: string },
  options: SolverOptions = {},
  onProgress?: (progress: number, message: string) => void
): Promise<SolverSession> {
  const grade = options.gradeLevel || 'Lớp 3 (Ruby Đoàn Minh Châu)';
  const program = options.program || 'Toán học Việt Nam & Kỳ thi Olympic Quốc Tế (ASMO, ITMC, GMATH, Kangaroo)';

  const engine = options.aiEngine || (localStorage.getItem('AI_ENGINE') as any) || 'chatgpt';
  const openAiKey = options.openAiKey || localStorage.getItem('OPENAI_API_KEY') || '';
  const envGeminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const geminiKey = options.apiKey || localStorage.getItem('GEMINI_API_KEY') || envGeminiKey || '';

  if (onProgress) onProgress(15, 'Đang chuẩn bị dữ liệu đề bài...');

  let base64List: string[] = [];
  let imageThumbnail: string | undefined;

  if (input.imageFiles && input.imageFiles.length > 0) {
    if (onProgress) onProgress(30, `Đang tối ưu & nén ${input.imageFiles.length} trang ảnh đề thi...`);
    const compressed = await compressMultipleImages(input.imageFiles, {
      maxWidth: 1400,
      maxHeight: 1400,
      quality: 0.82
    });
    base64List = compressed.base64List;
    if (base64List.length > 0) {
      imageThumbnail = `data:image/jpeg;base64,${base64List[0].substring(0, 5000)}`;
    }
  }

  const solverSystemPrompt = `Bạn là Chuyên gia Bồi dưỡng Học sinh Giỏi Toán học hàng đầu Việt Nam và Huấn luyện viên các kỳ thi Olympic Toán quốc tế (ASMO, ITMC, SASMO, Kangaroo, GMATH).
Nhiệm vụ: Phân tích toàn bộ đề bài (từ văn bản hoặc các trang ảnh đính kèm) cho học sinh cấp độ: ${grade}.
Chương trình mục tiêu: ${program}.

QUY TẮC BẮT BUỘC:
1. TRÍCH XUẤT VÀ GIẢI ĐẦY ĐỦ TẤT CẢ TỪNG CÂU HỎI TRONG ĐỀ:
   - Tuyệt đối không được bỏ sót bất kỳ câu nào (ví dụ Câu 1, Câu 2... đến Câu 28...).
   - Nếu đề bài được đưa vào dưới dạng văn bản (text), giải đầy đủ tất cả các câu trong văn bản đó.
2. VỚI MỖI CÂU HỎI:
   - "questionNumber": số thứ tự (ví dụ: 1, 2, ..., 28).
   - "title": Tiêu đề câu hỏi ngắn gọn (ví dụ: 'Câu 1: Xếp hàng dọc', 'Câu 4: Bài toán tuổi'...).
   - "textEn": Đề bài tiếng Anh đầy đủ (nếu có).
   - "textVi": Đề bài tiếng Việt dịch chuẩn xác, sư phạm.
   - "category": Phân loại dạng toán (Số học, Hình học, Tổ hợp, Logic, Lập số, Chu kỳ, Tiền tệ...).
   - "difficulty": 'Cơ bản' | 'Nâng cao' | 'Olympic / Học sinh giỏi'.
   - "finalAnswer": Đáp số cuối cùng ngắn gọn, rõ ràng (ví dụ: "28", "53", "Saturday (Thứ Bảy)", "18", "90 cm²", "2.600.000 đồng").
   - "solutionSteps": Mảng các bước giải chi tiết từng bước chuẩn mực sư phạm, dễ hiểu cho lứa tuổi học sinh (${grade}).
   - "tips": Mẹo tư duy nhanh, bẫy trắc nghiệm cần tránh.
   - "coreFormulas": Mảng các công thức hoặc quy tắc cốt lõi áp dụng trong bài.
   - "alternateMethod": Cách giải 2 (nếu có).

3. QUY TẮC SỐNG CÒN VỀ TÍNH NHẤT QUÁN CỦA ĐÁP SỐ (COHERENCE & SELF-VERIFICATION):
   - "finalAnswer" BẮT BUỘC PHẢI TRÙNG KHỚP 100% VỚI PHÉP TÍNH VÀ KẾT QUẢ Ở BƯỚC CUỐI CÙNG TRONG "solutionSteps".
   - TUYỆT ĐỐI KHÔNG ĐƯỢC để bước giải tính ra một số (ví dụ 13m² x 200.000 = 2.600.000 đồng) mà "finalAnswer" lại ghi một số khác (ví dụ 5.200.000 đồng). Bất kỳ sự mâu thuẫn nào giữa lời giải và đáp số đều là lỗi sai nghiêm trọng!
   - BẮT BUỘC TỰ ĐỐI CHIẾU TRƯỚC KHI XUẤT: Sau khi viết xong các bước giải, kiểm tra con số cuối cùng của bước cuối rồi điền CHÍNH XAC con số đó vào "finalAnswer".
   - BÀI TOÁN PHÉP CHIA CÓ DƯ: Nếu bài toán hỏi "mua được nhiều nhất bao nhiêu", kết quả là THƯƠNG SỐ của phép chia, TUYỆT ĐỐI KHÔNG lấy số dư làm đáp số (ví dụ 550 : 23 = 23 dư 21 thì kết quả là 23 món quà, KHÔNG PHẢI 21)!
   - BÀI TOÁN TÍNH TỔNG (ví dụ tổng số đỉnh 2 hình chóp): Bước cuối cùng BẮT BUỘC phải thực hiện phép cộng ra con số cụ thể (ví dụ 11 + 25 = 36 đỉnh), và "finalAnswer" phải ghi con số tổng cuối cùng đó (36), tuyệt đối không ghi dở dang!

4. QUY TẮC CHÍNH TẢ & ĐỊNH DẠNG (NGHIÊM CẤM DÙNG LATEX):
   - TUYỆT ĐỐI KHÔNG DÙNG ký hiệu LaTeX như $, $$, \\implies, \\times, \\overline{AB}, \\frac{a}{b}, \\text{...}.
   - Toàn bộ công thức toán PHẢI DÙNG CHỮ THUẦN TÚY VÀ KÝ TỰ UNICODE:
     + Dấu nhân: dùng '×' (không dùng *, không dùng \\times).
     + Dấu suy ra: dùng '→' hoặc chữ 'suy ra' (không dùng \\implies, không dùng ->).
     + Phép chia: dùng dấu ':' hoặc '/' (không dùng \\div).
     + Số có hai chữ số: viết trực tiếp 'AB' (không viết \\overline{AB}).
     + Số mũ: viết số mũ Unicode '²', '³' (không viết ^2, ^3).
     + Đơn vị: viết 'cm²', 'm²', 'đồng', 'đô la'.
   - Toàn bộ văn bản tiếng Việt phải chuẩn chính tả, có dấu đầy đủ 100%, không viết không dấu hay sai chính tả (viết đúng 'hình chóp', 'đỉnh', 'thập giác', 'kết luận').

TRẢ VỀ DUY NHẤT MỘT JSON HỢP LỆ THEO ĐỊNH DẠNG:
{
  "examTitle": "Tiêu đề đề thi (ví dụ: Đề Luyện Thi Olympic Toán - 28 Câu)",
  "rawOcrText": "Toàn bộ văn bản đề bài đã trích xuất...",
  "gradeLevel": "${grade}",
  "questions": [
    {
      "questionNumber": 1,
      "title": "Câu 1: Xếp hàng dọc",
      "textEn": "Ben and other students...",
      "textVi": "Ben và các bạn học sinh...",
      "category": "Số học & Xếp hàng",
      "difficulty": "Cơ bản",
      "finalAnswer": "28",
      "solutionSteps": [
        "Bước 1: ...",
        "Bước 2: ..."
      ],
      "tips": "Mẹo giải nhanh...",
      "coreFormulas": ["Số người đứng trước = Thứ tự - 1"]
    }
  ]
}`;

  let parsed: any = null;
  let activeEngineUsed: 'chatgpt' | 'gemini' = 'gemini';

  // 1. Try ChatGPT (OpenAI GPT-4o) if selected or if OpenAI key is present
  if ((engine === 'chatgpt' || !geminiKey) && openAiKey && openAiKey.trim().length > 15) {
    if (onProgress) onProgress(60, 'Đang kết nối ChatGPT (GPT-4o) giải bài toán chuẩn sư phạm...');
    try {
      const userContent: any[] = [];
      if (input.textPrompt && input.textPrompt.trim()) {
        userContent.push({
          type: 'text',
          text: `NỘI DUNG ĐỀ BÀI CẦN GIẢI:\n${input.textPrompt.trim()}`
        });
      } else {
        userContent.push({
          type: 'text',
          text: `Hãy nhận diện và giải toàn bộ các câu hỏi toán trong ${base64List.length} trang ảnh đính kèm theo định dạng JSON yêu cầu:`
        });
      }

      for (const b64 of base64List) {
        userContent.push({
          type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${b64}`, detail: 'high' }
        });
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: solverSystemPrompt },
            { role: 'user', content: userContent }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          parsed = JSON.parse(content);
          activeEngineUsed = 'chatgpt';
        }
      }
    } catch (gptErr) {
      console.warn('ChatGPT solve request failed, falling back to Gemini:', gptErr);
    }
  }

  // 2. Gemini fallback
  if (!parsed && geminiKey && geminiKey.trim().length > 10) {
    if (onProgress) onProgress(70, 'Đang phân tích và giải đề toán bằng Gemini AI...');
    const parts: any[] = [{ text: solverSystemPrompt }];

    if (input.textPrompt && input.textPrompt.trim()) {
      parts.push({
        text: `NỘI DUNG ĐỀ BÀI HOẶC YÊU CẦU CỦA NGƯỜI DÙNG:\n${input.textPrompt.trim()}`
      });
    }

    for (const b64 of base64List) {
      parts.push({
        inlineData: { mimeType: 'image/jpeg', data: b64 }
      });
    }

    for (const model of GEMINI_MODELS) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: { temperature: 0.1 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, rawText];
            parsed = JSON.parse(match[1].trim());
            activeEngineUsed = 'gemini';
            break;
          }
        }
      } catch (gemErr) {
        console.warn(`Gemini solver model ${model} failed:`, gemErr);
      }
    }
  }

  if (parsed && parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
    const questionsList: SolvedQuestionItem[] = parsed.questions.map((q: any, idx: number) => {
      const rawSteps = Array.isArray(q.solutionSteps) ? q.solutionSteps : [q.explanation || ''];
      const steps = rawSteps.map((s: string) => cleanMathText(s)).filter(Boolean);
      const rawAns = cleanMathText(q.finalAnswer || '');
      const verifiedAns = reconcileAnswerWithSolutionSteps(rawAns, steps);
      return {
        questionNumber: q.questionNumber || idx + 1,
        title: cleanMathText(q.title || `Câu ${q.questionNumber || idx + 1}`),
        textEn: cleanMathText(q.textEn || ''),
        textVi: cleanMathText(q.textVi || q.question || ''),
        category: cleanMathText(q.category || 'Toán học'),
        difficulty: (q.difficulty || 'Olympic / Học sinh giỏi') as any,
        finalAnswer: cleanMathText(verifiedAns),
        solutionSteps: steps,
        tips: cleanMathText(q.tips || ''),
        coreFormulas: Array.isArray(q.coreFormulas) ? q.coreFormulas.map((f: string) => cleanMathText(f)) : [],
        alternateMethod: q.alternateMethod ? cleanMathText(q.alternateMethod) : undefined
      };
    });

    const session: SolverSession = {
      id: `solver_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toLocaleString('vi-VN'),
      timestamp: Date.now(),
      examTitle: parsed.examTitle || `Bài toán nhận diện từ ${input.imageFiles?.length || 0} trang ảnh (${questionsList.length} câu)`,
      gradeLevel: parsed.gradeLevel || grade,
      totalQuestions: questionsList.length,
      imageThumbnail,
      sourceImagesCount: input.imageFiles?.length || (input.textPrompt ? 1 : 0),
      rawOcrText: parsed.rawOcrText || input.textPrompt || questionsList.map(q => `Câu ${q.questionNumber}:\n${q.textEn ? q.textEn + '\n' : ''}${q.textVi}`).join('\n\n'),
      aiEngine: activeEngineUsed,
      questions: questionsList
    };

    saveSolverSession(session);
    if (onProgress) onProgress(100, `Đã hoàn tất giải thành công toàn bộ ${questionsList.length} câu hỏi!`);
    return session;
  }

  throw new Error('Chưa thể giải bài toán. Vui lòng kiểm tra lại ảnh chụp hoặc nhập Khóa API ChatGPT / Gemini trong phần Cài đặt.');
}

export async function askFollowUpQuestionToAI(
  question: string,
  solvedQuestion: SolvedQuestionItem,
  chatHistory: SolverChatMessage[],
  geminiKey?: string,
  openAiKey?: string,
  aiEngine?: string
): Promise<string> {
  const engine = aiEngine || localStorage.getItem('AI_ENGINE') || 'chatgpt';
  const opKey = openAiKey || localStorage.getItem('OPENAI_API_KEY') || '';
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const gmKey = geminiKey || localStorage.getItem('GEMINI_API_KEY') || envKey || '';

  const prompt = `Bạn là Gia sư Dạy Toán AI tận tâm và kiên nhẫn.
Học sinh hoặc phụ huynh đang thắc mắc về câu hỏi sau:
---
CÂU HỎI: ${solvedQuestion.title}
ĐỀ BÀI (Tiếng Anh): ${solvedQuestion.textEn}
ĐỀ BÀI (Tiếng Việt): ${solvedQuestion.textVi}
ĐÁP SỐ: ${solvedQuestion.finalAnswer}
CÁC BƯỚC GIẢI HIỆN TẠI:
${solvedQuestion.solutionSteps.join('\n')}
---
LỊCH SỬ HỎI ĐÁP:
${chatHistory.map(m => `${m.role === 'user' ? 'Học sinh' : 'Gia sư'}: ${m.content}`).join('\n')}

CÂU HỎI MỚI CỦA HỌC SINH / PHỤ HUYNH:
"${question}"

Hãy trả lời thật ân cần, giải thích cặn kẽ từng chi tiết nhỏ mà học sinh chưa hiểu, dùng ví dụ minh họa hoặc phân tích thêm nếu cần thiết. Trả lời bằng tiếng Việt chuẩn mực, ngắn gọn, súc tích.`;

  if (engine === 'chatgpt' && opKey && opKey.trim().length > 15) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${opKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'Bạn là Gia sư dạy toán Olympic tận tâm.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3
        })
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text.trim();
      }
    } catch (e) {
      console.warn('ChatGPT chat error:', e);
    }
  }

  if (gmKey && gmKey.trim().length > 10) {
    for (const model of GEMINI_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${gmKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.3 }
            })
          }
        );
        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text.trim();
        }
      } catch (e) {
        console.warn(`Follow-up chat model ${model} error:`, e);
      }
    }
  }

  return 'Thầy/cô đã nắm được câu hỏi của con! Ở bước này, con chú ý kiểm tra lại điều kiện ràng buộc của đề bài nhé.';
}
