import { compressImage } from './imageCompression';

export interface SolverOptions {
  apiKey?: string;
  studentName?: string;
  gradeLevel?: string; // e.g. 'Lớp 1 (Tony)', 'Lớp 3 (Ruby)', 'Lớp 6 (Lisa)', 'Lớp 10 (Chip)', 'Tự động'
  program?: string;    // e.g. 'Olympic ASMO / ITMC', 'SGK Cánh Diều / Kết Nối Tri Thức', 'Nâng cao'
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
  rawOcrText: string;
  questions: SolvedQuestionItem[];
}

export interface SolverChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STORAGE_KEY = 'MATHMIND_SOLVER_SESSIONS';

// Local storage session management
export function getSolverSessions(): SolverSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: SolverSession[] = JSON.parse(raw);
    return Array.isArray(list) ? list.sort((a, b) => b.timestamp - a.timestamp) : [];
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

const FAST_MODELS = ['gemini-3-flash-preview', 'gemini-3.5-flash-lite'];

export async function solveMathProblemWithAI(
  input: { imageFile?: File; textPrompt?: string },
  options: SolverOptions = {},
  onProgress?: (progress: number, message: string) => void
): Promise<SolverSession> {
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const effectiveKey = (options.apiKey && options.apiKey.trim().length > 10) ? options.apiKey.trim() : (envKey || '');

  const grade = options.gradeLevel || 'Lớp 3 (Ruby Đoàn Minh Châu)';
  const program = options.program || 'Toán học Việt Nam & Kỳ thi Olympic Quốc Tế (ASMO, ITMC, GMATH, Kangaroo)';

  if (!effectiveKey) {
    throw new Error('Chưa cấu hình API Key Gemini. Vui lòng bấm Cài đặt ở góc trên để nhập API Key.');
  }

  if (onProgress) onProgress(15, 'Đang chuẩn bị đề bài toán...');

  let imageBase64: string | undefined;
  let imageThumbnail: string | undefined;

  if (input.imageFile) {
    if (onProgress) onProgress(30, 'Đang tối ưu & nén ảnh để nhận diện OCR tốc độ cao...');
    const compressed = await compressImage(input.imageFile, {
      maxWidth: 1600,
      maxHeight: 1600,
      quality: 0.85
    });
    imageBase64 = compressed.base64;
    imageThumbnail = `data:image/jpeg;base64,${compressed.base64.substring(0, 5000)}`; // brief preview
  }

  if (onProgress) onProgress(50, 'Gemini AI đang OCR chuyển toàn bộ đề bài ra Text và tính toán lời giải...');

  const systemPrompt = `Bạn là Chuyên gia Bồi dưỡng Học sinh Giỏi Toán học hàng đầu Việt Nam và Huấn luyện viên các kỳ thi Olympic Toán quốc tế (ASMO, ITMC, SASMO, Kangaroo, GMATH).
Nhiệm vụ: Phân tích ảnh chụp đề thi hoặc văn bản được cung cấp cho học sinh cấp độ: ${grade}.
Chương trình mục tiêu: ${program}.

QUY TẮC BẮT BUỘC:
1. NHẬN DIỆN VÀ CHUYỂN TOÀN BỘ ẢNH THÀNH TEXT (OCR):
   - Nhận diện đầy đủ toàn bộ chữ tiếng Anh và chú thích tiếng Việt trong ảnh không bỏ sót bất kỳ câu nào.
   - Tập hợp toàn bộ nội dung đề bài thuần vào trường "rawOcrText" để người dùng có thể đọc, sao chép hoặc in ấn.
2. PHÂN LOẠI VÀ GIẢI TỪNG CÂU HỎI TRONG ĐỀ:
   - Nếu ảnh có nhiều câu hỏi (ví dụ Câu 23, 24, 25, 26...), hãy trích xuất và giải ĐẦY ĐỦ TẤT CẢ các câu hỏi có trong ảnh.
   - Với mỗi câu hỏi:
     + Trích xuất đề bài gốc (tiếng Anh) vào "textEn" (nếu có).
     + Bản dịch chuẩn mực tiếng Việt vào "textVi".
     + Phân loại dạng toán (Số học / Hình học / Đếm / Logic / Tổ hợp / Lập số / Tiền tệ...).
     + "finalAnswer": Đáp số cuối cùng ngắn gọn, rõ ràng (ví dụ: "8 đồ chơi", "14 cách", "38 thẻ", "120 số").
     + "solutionSteps": Các bước giải chi tiết từng bước chuẩn sư phạm Việt Nam phù hợp lứa tuổi học sinh (${grade}).
     + "tips": Bí kíp / mẹo tư duy nhanh Olympic (Short-cut, bẫy trắc nghiệm cần tránh).
     + "coreFormulas": Mảng các công thức hoặc quy tắc cốt lõi áp dụng trong bài.

TRẢ VỀ DUY NHẤT MỘT JSON HỢP LỆ THEO ĐỊNH DẠNG:
{
  "examTitle": "Tiêu đề bài thi nhận diện được từ ảnh (ví dụ: Đề Luyện Thi Olympic Toán - Câu 23 đến 26)",
  "rawOcrText": "Toàn bộ văn bản thô trích xuất từ ảnh...",
  "gradeLevel": "${grade}",
  "questions": [
    {
      "questionNumber": 23,
      "title": "Câu 23: Bài toán...",
      "textEn": "English text...",
      "textVi": "Nội dung tiếng Việt...",
      "category": "Số học",
      "difficulty": "Olympic / Học sinh giỏi",
      "finalAnswer": "8",
      "solutionSteps": [
        "Bước 1: ...",
        "Bước 2: ..."
      ],
      "tips": "Mẹo giải nhanh...",
      "coreFormulas": ["Công thức..."],
      "alternateMethod": "Cách 2 nếu có..."
    }
  ]
}`;

  const parts: any[] = [{ text: systemPrompt }];

  if (input.textPrompt && input.textPrompt.trim()) {
    parts.push({
      text: `NỘI DUNG ĐỀ BÀI HOẶC YÊU CẦU CỦA NGƯỜI DÙNG:\n${input.textPrompt.trim()}`
    });
  }

  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64
      }
    });
  }

  let resultData: any = null;
  let lastError: any = null;

  for (const model of FAST_MODELS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout to avoid premature cancel

    try {
      if (onProgress) onProgress(75, `Đang kết nối Gemini AI (${model}) để phân tích đề bài...`);

      const requestBody: any = {
        contents: [{ parts }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      };

      // Disable extended thinking budget so gemini-3-flash-preview returns immediately in 7-10s
      if (model.includes('gemini-3')) {
        requestBody.generationConfig.thinkingConfig = { thinkingBudget: 0 };
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        resultData = await response.json();
        break;
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.warn(`Model ${model} returned status ${response.status}:`, errJson);
        lastError = errJson?.error?.message || `Lỗi HTTP ${response.status}`;
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn(`Solver model ${model} request failed:`, err);
      lastError = err?.message || 'Kết nối mạng bị gián đoạn';
    }
  }

  if (onProgress) onProgress(95, 'Đang hoàn tất định dạng lời giải và lưu phiên...');

  const rawText = resultData?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (rawText) {
    try {
      const cleanJson = rawText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      const questionsList: SolvedQuestionItem[] = Array.isArray(parsed.questions) && parsed.questions.length > 0
        ? parsed.questions.map((q: any, idx: number) => ({
            questionNumber: q.questionNumber || idx + 1,
            title: q.title || `Câu ${q.questionNumber || idx + 1}`,
            textEn: q.textEn || '',
            textVi: q.textVi || q.question || '',
            category: q.category || 'Toán học',
            difficulty: q.difficulty || 'Olympic / Học sinh giỏi',
            finalAnswer: q.finalAnswer || '',
            solutionSteps: Array.isArray(q.solutionSteps) ? q.solutionSteps : [q.explanation || ''],
            tips: q.tips || '',
            coreFormulas: q.coreFormulas || [],
            alternateMethod: q.alternateMethod || undefined
          }))
        : [];

      if (questionsList.length === 0) {
        throw new Error('AI không nhận diện được câu hỏi nào từ ảnh. Vui lòng chụp rõ nét hơn!');
      }

      const session: SolverSession = {
        id: `solver_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toLocaleString('vi-VN'),
        timestamp: Date.now(),
        examTitle: parsed.examTitle || `Bài toán nhận diện từ ảnh (${questionsList.length} câu)`,
        gradeLevel: parsed.gradeLevel || grade,
        totalQuestions: questionsList.length,
        imageThumbnail,
        rawOcrText: parsed.rawOcrText || questionsList.map(q => `Câu ${q.questionNumber}:\n${q.textEn}\n${q.textVi}`).join('\n\n'),
        questions: questionsList
      };

      // Save session to local storage history
      saveSolverSession(session);

      if (onProgress) onProgress(100, `Đã nhận diện và giải thành công ${questionsList.length} câu hỏi!`);
      return session;
    } catch (parseErr: any) {
      console.error('Failed to parse solver JSON:', parseErr);
      throw new Error(`Không thể phân tích dữ liệu trả về từ AI: ${parseErr.message}`);
    }
  }

  throw new Error(`Không thể giải bài toán bằng AI: ${lastError || 'Lỗi không xác định. Vui lòng kiểm tra lại kết nối mạng hoặc API Key.'}`);
}

export async function askFollowUpQuestionToAI(
  question: string,
  solvedQuestion: SolvedQuestionItem,
  chatHistory: SolverChatMessage[],
  apiKey?: string
): Promise<string> {
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const effectiveKey = (apiKey && apiKey.trim().length > 10) ? apiKey.trim() : (envKey || '');

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

  for (const model of FAST_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3
            }
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

  return 'Thầy/cô đã nắm được câu hỏi của con! Ở bước này, con chú ý kiểm tra lại điều kiện ràng buộc của đề bài nhé.';
}
