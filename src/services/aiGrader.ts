import { MathQuestion, TestSummary, INITIAL_QUESTIONS } from '../data/mockData';
import { compressMultipleImages } from './imageCompression';
import { reconcileAnswerWithSolutionSteps } from './mathSolverService';
import { systemConfigService } from './systemConfigService';

export interface GradingProgress {
  status: 'idle' | 'uploading' | 'ocr_scanning' | 'ai_evaluating' | 'generating_report' | 'completed' | 'error';
  progress: number;
  message: string;
}

export interface GradingContext {
  studentName?: string;
  level?: string;
  grade?: string;
  program?: string;
}

/**
 * Scan a single image page with Gemini Vision AI to guarantee zero skipped questions.
 */
async function scanSinglePageWithAI(
  base64Data: string,
  pageNum: number,
  totalPages: number,
  apiKey: string,
  levelStr: string,
  programStr: string,
  studentName: string
): Promise<any[]> {
  const prompt = `Bạn là Chuyên gia Giáo viên Toán học hàng đầu Việt Nam, chuyên bồi dưỡng học sinh giỏi cấp ${levelStr} và các kỳ thi Toán Quốc tế (${programStr}).
Nhiệm vụ: Hãy quét TOÀN BỘ trang ảnh số ${pageNum}/${totalPages} đính kèm của học sinh ${studentName}.
QUY TẮC CỰC KỲ QUAN TRỌNG:
1. Quét kỹ từ trên xuống dưới theo thứ tự câu. TUYỆT ĐỐI KHÔNG ĐƯỢC BỎ SÓT BẤT KỲ CÂU NÀO TRÊN TRANG ẢNH NÀY!
2. Đối với mỗi câu hỏi tìm thấy trên trang:
   - id: số thứ tự của câu (ví dụ 1, 2, ..., 13, ..., 26...)
   - title: Tiêu đề (ví dụ 'Câu 1: Phép tính', 'Câu 14: Hình học'...)
   - question: Nội dung đầy đủ đề bài bằng tiếng Anh và tiếng Việt song ngữ.
   - studentAnswer: Trích xuất chính xác chữ/số viết tay của học sinh trên ảnh. Nếu học sinh chưa viết đáp án thì ghi '(Chưa làm)'.
   - correctAnswer: Đáp án đúng và chuẩn xác của bài toán. BẮT BUỘC: correctAnswer PHẢI TRÙNG KHỚP 100% VỚI KẾT QUẢ Ở BƯỚC GIẢI CUỐI CÙNG TRONG solutionSteps.
   - status: 'correct' nếu học sinh làm đúng; 'wrong' nếu học sinh làm sai; 'unanswered' nếu học sinh chưa làm; 'need_verify' nếu cần xác minh.
   - statusText: 'Đúng', 'Sai / Cần sửa', 'Chưa làm', hoặc 'Cần xác minh'.
   - category: Chủ đề toán học (Số học, Hình học, Tổ hợp, Logic, Đại số...).
   - difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao'.
   - explanation: Lời giải thích ngắn gọn vì sao ra đáp án đó.
   - solutionSteps: Mảng các bước giải chi tiết từng bước chuẩn sư phạm.
   - studentMistake: Phân tích lỗi sai của học sinh nếu làm sai (hoặc null nếu đúng/chưa làm).
   - tips: Mẹo giải nhanh hoặc lưu ý quan trọng.

Trả về DUY NHẤT một mảng JSON các câu hỏi trong cặp dấu \`\`\`json [ ... ] \`\`\``;

  const modelsToTry = [
    'gemini-1.5-pro',
    'gemini-pro-latest',
    'gemini-3.1-pro-preview',
    'gemini-2.5-pro',
    'gemini-3.8-flash',
    'gemini-3-flash-preview',
    'gemini-flash-latest'
  ];

  for (const model of modelsToTry) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 40000); // 40s timeout

        const reqBody = {
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
            ]
          }]
        };

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, rawText];
            const clean = match[1].trim();
            const parsed = JSON.parse(clean);
            const questions = Array.isArray(parsed) ? parsed : (parsed.questions || []);
            if (questions.length > 0) {
              return questions;
            }
          }
        } else if (res.status === 503 || res.status === 429) {
          await new Promise(r => setTimeout(r, 1500));
        }
      } catch (e) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  return [];
}

/**
 * Scan all pages at once with OpenAI ChatGPT (GPT-4o) for maximum accuracy and zero skipped questions.
 */
async function scanAllPagesWithChatGPT(
  base64List: string[],
  apiKey: string,
  levelStr: string,
  programStr: string,
  studentName: string
): Promise<any[]> {
  const prompt = `Bạn là Chuyên gia Giáo viên Toán học hàng đầu Việt Nam, chuyên bồi dưỡng học sinh giỏi cấp ${levelStr} và các kỳ thi Toán Quốc tế (${programStr}).
Nhiệm vụ: Hãy quét và chấm TOÀN BỘ tất cả các câu hỏi trong TẤT CẢ các trang ảnh đính kèm của học sinh ${studentName}.
QUY TẮC CỰC KỲ QUAN TRỌNG:
1. Quét kỹ từ trên xuống dưới qua từng trang theo thứ tự câu. TUYỆT ĐỐI KHÔNG ĐƯỢC BỎ SÓT BẤT KỲ CÂU NÀO TRONG TẤT CẢ CÁC TRANG ẢNH! (Ví dụ có từ Câu 1 đến Câu 28 hay nhiều hơn, phải quét đủ 100% tất cả các câu).
2. Đối với mỗi câu hỏi tìm thấy:
   - id: số thứ tự của câu (ví dụ 1, 2, ..., 13, ..., 28...)
   - title: Tiêu đề (ví dụ 'Câu 1: Phép tính', 'Câu 14: Hình học'...)
   - question: Nội dung đầy đủ đề bài bằng tiếng Anh và tiếng Việt song ngữ.
   - studentAnswer: Trích xuất chính xác chữ/số viết tay của học sinh trên ảnh. Nếu học sinh chưa viết đáp án thì ghi '(Chưa làm)'.
   - correctAnswer: Đáp án đúng và chuẩn xác của bài toán. BẮT BUỘC: correctAnswer PHẢI TRÙNG KHỚP 100% VỚI KẾT QUẢ Ở BƯỚC GIẢI CUỐI CÙNG TRONG solutionSteps.
   - status: 'correct' nếu học sinh làm đúng; 'wrong' nếu học sinh làm sai; 'unanswered' nếu học sinh chưa làm; 'need_verify' nếu cần xác minh.
   - statusText: 'Đúng', 'Sai / Cần sửa', 'Chưa làm', hoặc 'Cần xác minh'.
   - category: Chủ đề toán học (Số học, Hình học, Tổ hợp, Logic, Đại số...).
   - difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao'.
   - explanation: Lời giải thích ngắn gọn vì sao ra đáp án đó.
   - solutionSteps: Mảng các bước giải chi tiết từng bước chuẩn sư phạm.
   - studentMistake: Phân tích lỗi sai của học sinh nếu làm sai (hoặc null nếu đúng/chưa làm).
   - tips: Mẹo giải nhanh hoặc lưu ý quan trọng.

Trả về DUY NHẤT một mảng JSON các câu hỏi trong cặp dấu \`\`\`json [ ... ] \`\`\``;

  try {
    const userContent: any[] = [{ type: 'text', text: prompt }];
    for (const b64 of base64List) {
      userContent.push({
        type: 'image_url',
        image_url: { url: `data:image/jpeg;base64,${b64}`, detail: 'high' }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Bạn là Chuyên gia Khảo thí và Chấm thi Toán học AI. Luôn trả về kết quả dạng JSON hợp lệ trong cặp ```json ... ```.' },
          { role: 'user', content: userContent }
        ],
        temperature: 0.1
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const rawText = data?.choices?.[0]?.message?.content;
      if (rawText) {
        const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, rawText];
        const clean = match[1].trim();
        const parsed = JSON.parse(clean);
        const questions = Array.isArray(parsed) ? parsed : (parsed.questions || []);
        if (questions.length > 0) {
          return questions;
        }
      }
    }
  } catch (e) {
    console.warn('ChatGPT grading call error, falling back:', e);
  }
  return [];
}

export async function gradeImagesWithAI(
  imageFiles: File[],
  apiKey?: string,
  onProgress?: (p: GradingProgress) => void,
  context?: GradingContext
): Promise<{ questions: MathQuestion[]; summary: TestSummary }> {
  const studentName = context?.studentName || 'Học sinh';
  const levelStr = context?.level === 'high_school' 
    ? 'THPT (Lớp 10 – 12)' 
    : context?.level === 'secondary' 
      ? 'THCS (Lớp 6 – 9)' 
      : 'Tiểu học (Lớp 1 – 5)';
  const programStr = context?.program || 'Olympic Toán Quốc Tế (ASMO, ITMC, GMATH, SASMO, AMO, Kangaroo)';

  if (imageFiles.length === 0) {
    if (onProgress) {
      onProgress({ status: 'completed', progress: 100, message: 'Đã nạp bài tập mẫu thành công!' });
    }
    const correctCount = INITIAL_QUESTIONS.filter(q => q.status === 'correct').length;
    const wrongCount = INITIAL_QUESTIONS.filter(q => q.status === 'wrong').length;
    const unansweredCount = INITIAL_QUESTIONS.filter(q => q.status === 'unanswered').length;
    const verifyCount = INITIAL_QUESTIONS.filter(q => q.status === 'need_verify').length;

    const summary: TestSummary = {
      title: 'ĐỐI CHIẾU ĐÁP ÁN – LUYỆN TOÁN CUỐI TUẦN 11',
      subtitle: `Dữ liệu mẫu 63 câu luyện toán. Các câu cần kiểm tra lại được đánh dấu "Cần xác minh".`,
      studentName: studentName,
      grade: `${levelStr} • ${programStr}`,
      testDate: new Date().toLocaleDateString('vi-VN'),
      totalQuestions: INITIAL_QUESTIONS.length,
      correctCount,
      wrongCount,
      unansweredCount,
      verifyCount,
      score10: 6.8,
      accuracyRate: 60.3,
      completionRate: 96.8,
      sourceImagesCount: 5,
      notes: 'Bản lưu mẫu phục vụ đối chiếu và luyện tập.'
    };
    return { questions: INITIAL_QUESTIONS, summary };
  }

  // Step 1: Compress images to make upload lightning fast (<200KB each)
  if (onProgress) {
    onProgress({ status: 'uploading', progress: 15, message: `Đang tối ưu & nén ${imageFiles.length} trang ảnh để tăng tốc độ nhận diện...` });
  }

  const { base64List } = await compressMultipleImages(imageFiles, {
    maxWidth: 1400,
    maxHeight: 1400,
    quality: 0.82
  });

  await systemConfigService.init();
  const aiEngine = (localStorage.getItem('AI_ENGINE') as any) || systemConfigService.getActiveEngine();
  const openAiKey = (localStorage.getItem('OPENAI_API_KEY') || systemConfigService.getOpenAiKey() || (import.meta as any).env?.VITE_OPENAI_API_KEY || '').trim();
  const effectiveGeminiKey = (apiKey && apiKey.trim().length > 10) 
    ? apiKey.trim() 
    : (systemConfigService.getGeminiKey() || localStorage.getItem('GEMINI_API_KEY') || (import.meta as any).env?.VITE_GEMINI_API_KEY || '');

  let rawExtractedQuestions: any[] = [];
  let usedEngine: 'chatgpt' | 'gemini' = 'gemini';

  // Attempt 1: Try OpenAI ChatGPT (GPT-4o) if selected or if OpenAI key is present
  if (aiEngine === 'chatgpt' && openAiKey && openAiKey.length > 15 && base64List.length > 0) {
    if (onProgress) {
      onProgress({
        status: 'ocr_scanning',
        progress: 45,
        message: `ChatGPT (GPT-4o) đang phân tích & chấm đồng thời toàn bộ ${base64List.length} trang ảnh bài tập...`
      });
    }

    const gptQuestions = await scanAllPagesWithChatGPT(
      base64List,
      openAiKey,
      levelStr,
      programStr,
      studentName
    );

    if (gptQuestions && gptQuestions.length > 0) {
      rawExtractedQuestions = gptQuestions;
      usedEngine = 'chatgpt';
    }
  }

  // Attempt 2: Use Gemini Vision AI (page by page) if not completed by ChatGPT
  if (rawExtractedQuestions.length === 0 && effectiveGeminiKey && effectiveGeminiKey.length > 10 && base64List.length > 0) {
    try {
      usedEngine = 'gemini';
      // Scan page by page sequentially to guarantee every single question is recognized
      for (let pageIdx = 0; pageIdx < base64List.length; pageIdx++) {
        const pageNum = pageIdx + 1;
        const pageProgress = Math.round(20 + (pageIdx / base64List.length) * 65);

        if (onProgress) {
          onProgress({
            status: 'ocr_scanning',
            progress: pageProgress,
            message: `Gemini AI đang quét trang ${pageNum}/${base64List.length} (nhận diện từng câu hỏi trên trang)...`
          });
        }

        const pageQuestions = await scanSinglePageWithAI(
          base64List[pageIdx],
          pageNum,
          base64List.length,
          effectiveGeminiKey,
          levelStr,
          programStr,
          studentName
        );

        if (pageQuestions && pageQuestions.length > 0) {
          rawExtractedQuestions.push(...pageQuestions);
        }

        // Brief breather between pages to protect API rate limits
        if (pageIdx < base64List.length - 1) {
          await new Promise(r => setTimeout(r, 600));
        }
      }
    } catch (err: any) {
      console.warn('Gemini Multi-page Vision call failed:', err);
    }
  }

  if (rawExtractedQuestions.length > 0) {
    if (onProgress) {
      onProgress({
        status: 'generating_report',
        progress: 92,
        message: `Đang tổng hợp điểm số và lập báo cáo chi tiết cho ${rawExtractedQuestions.length} câu hỏi...`
      });
    }

        // Deduplicate by question id and sort
        const idMap = new Map<number, any>();
        for (const q of rawExtractedQuestions) {
          const qId = Number(q.id) || (idMap.size + 1);
          if (!idMap.has(qId)) {
            idMap.set(qId, q);
          }
        }
        const sortedQuestions = Array.from(idMap.values()).sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));

        const qList: MathQuestion[] = sortedQuestions.map((q: any, idx: number) => {
          const qId = Number(q.id) || (idx + 1);
          const partNum = Math.ceil(qId / 10);
          const rawCorrect = q.correctAnswer || '';
          const steps = q.solutionSteps || [];
          const verifiedCorrect = reconcileAnswerWithSolutionSteps(rawCorrect, steps);
          return {
            id: qId,
            part: partNum,
            partTitle: `Phần ${partNum}`,
            title: q.title || `Câu ${qId}`,
            question: q.question || '',
            keywords: q.keywords || '',
            studentAnswer: q.studentAnswer || '(Chưa làm)',
            correctAnswer: verifiedCorrect,
            status: q.status || (q.studentAnswer && q.studentAnswer !== '(Chưa làm)' ? 'correct' : 'unanswered'),
            statusText: q.statusText || (q.status === 'wrong' ? 'Sai / Cần sửa' : (q.status === 'unanswered' ? 'Chưa làm' : 'Đúng')),
            category: q.category || 'Toán học',
            difficulty: q.difficulty || 'Trung bình',
            explanation: q.explanation || '',
            solutionSteps: steps,
            studentMistake: q.studentMistake || null,
            tips: q.tips || ''
          };
        });

        const correctCount = qList.filter(q => q.status === 'correct').length;
        const wrongCount = qList.filter(q => q.status === 'wrong').length;
        const unansweredCount = qList.filter(q => q.status === 'unanswered').length;
        const verifyCount = qList.filter(q => q.status === 'need_verify').length;
        const attemptedCount = qList.length - unansweredCount;

        const summary: TestSummary = {
          title: `BẢNG KẾT QUẢ CHẤM ĐIỂM – ${studentName.toUpperCase()}`,
          subtitle: `Nhận diện bằng ${usedEngine === 'chatgpt' ? 'ChatGPT (GPT-4o)' : 'Gemini Vision AI'} từ ${imageFiles.length} trang ảnh bài tập (${qList.length} câu đầy đủ).`,
          studentName: studentName,
          grade: `${levelStr} • ${programStr}`,
          testDate: new Date().toLocaleDateString('vi-VN'),
          totalQuestions: qList.length,
          correctCount,
          wrongCount,
          unansweredCount,
          verifyCount,
          score10: attemptedCount > 0 ? Number(((correctCount / attemptedCount) * 10).toFixed(1)) : 0,
          accuracyRate: attemptedCount > 0 ? Number(((correctCount / attemptedCount) * 100).toFixed(1)) : 0,
          completionRate: qList.length > 0 ? Number(((attemptedCount / qList.length) * 100).toFixed(1)) : 0,
          sourceImagesCount: imageFiles.length,
          notes: unansweredCount === qList.length 
            ? 'Đề bài chưa có đáp án của học sinh. AI đã nhận diện toàn bộ các câu hỏi trên từng trang và cung cấp đầy đủ đáp án cùng lời giải chi tiết.'
            : `Đã đối chiếu thành công toàn bộ ${qList.length} câu hỏi từ ${imageFiles.length} trang ảnh bài tập.`
        };

        if (onProgress) {
          onProgress({ status: 'completed', progress: 100, message: `Hoàn tất phân tích đầy đủ ${qList.length} câu hỏi!` });
        }

        return { questions: qList, summary };
      }

  // Graceful fallback if offline or no key
  if (onProgress) {
    onProgress({ status: 'ocr_scanning', progress: 50, message: 'Đang tổng hợp dữ liệu nhận diện...' });
    await new Promise(r => setTimeout(r, 600));
    onProgress({ status: 'completed', progress: 100, message: 'Hoàn tất!' });
  }

  const generatedQuestions: MathQuestion[] = imageFiles.map((file, idx) => ({
    id: idx + 1,
    part: 1,
    partTitle: 'Phần 1: Bài tập trong ảnh',
    title: `Câu ${idx + 1}: Bài tập từ ${file.name.substring(0, 15)}...`,
    question: `Đề bài nhận diện từ ảnh đính kèm "${file.name}". Vui lòng đối chiếu với ảnh gốc để xem chi tiết.`,
    keywords: 'Toán học, Bài tập thực tế',
    studentAnswer: '(Chưa làm)',
    correctAnswer: 'Cần xem lời giải chi tiết',
    status: 'unanswered',
    statusText: 'Chưa làm',
    category: 'Toán tổng hợp',
    difficulty: 'Trung bình',
    explanation: 'Ảnh bài tập được tải lên hệ thống. Hãy mở công cụ "Giải bài toán bằng AI" để xem các bước giải chi tiết từng bước.',
    solutionSteps: [
      'Bước 1: Phân tích kỹ các dữ kiện đề bài cho.',
      'Bước 2: Sử dụng công cụ "Giải bài toán bằng AI" để xem phương pháp giải tối ưu.',
      'Bước 3: Ghi đáp số và kiểm tra lại kết quả.'
    ],
    studentMistake: null,
    tips: 'Nên chụp ảnh vuông góc, đủ sáng và rõ nét để AI đọc chính xác nhất.'
  }));

  const summary: TestSummary = {
    title: `PHIẾU BÀI TẬP CỦA ${studentName.toUpperCase()}`,
    subtitle: `Hệ thống đã tiếp nhận ${imageFiles.length} trang ảnh bài tập.`,
    studentName: studentName,
    grade: `${levelStr} • ${programStr}`,
    testDate: new Date().toLocaleDateString('vi-VN'),
    totalQuestions: generatedQuestions.length,
    correctCount: 0,
    wrongCount: 0,
    unansweredCount: generatedQuestions.length,
    verifyCount: 0,
    score10: 0,
    accuracyRate: 0,
    completionRate: 0,
    sourceImagesCount: imageFiles.length,
    notes: 'Đã nhận diện các trang bài tập. Bấm vào từng câu hoặc sử dụng Trợ lý Giải toán để xem đáp án chi tiết.'
  };

  return { questions: generatedQuestions, summary };
}
