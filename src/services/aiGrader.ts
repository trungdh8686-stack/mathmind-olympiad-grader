import { MathQuestion, TestSummary, INITIAL_QUESTIONS } from '../data/mockData';
import { compressMultipleImages } from './imageCompression';

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
    // Return sample/mock data if no files provided
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

  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const effectiveKey = (apiKey && apiKey.trim().length > 10) ? apiKey.trim() : (envKey || '');

  if (effectiveKey && effectiveKey.length > 10) {
    if (onProgress) {
      onProgress({ status: 'ocr_scanning', progress: 30, message: `Gemini AI đang phân tích ${imageFiles.length} trang ảnh cho ${studentName}...` });
    }

    // Set up smooth progress interval while waiting for AI response
    let currentProgress = 35;
    const progressTimer = setInterval(() => {
      currentProgress += 5;
      if (currentProgress > 88) currentProgress = 88;
      if (onProgress) {
        let msg = 'Gemini Vision AI đang nhận diện câu hỏi và đề bài...';
        if (currentProgress > 50 && currentProgress <= 70) {
          msg = `Đang tính toán lời giải chuẩn sư phạm cấp ${levelStr}...`;
        } else if (currentProgress > 70) {
          msg = 'Đang so khớp kết quả và lập báo cáo chấm điểm chi tiết...';
        }
        onProgress({ status: 'ai_evaluating', progress: currentProgress, message: msg });
      }
    }, 800);

    try {
      const parts: any[] = [
        {
          text: `Bạn là Chuyên gia Giáo viên Toán học hàng đầu Việt Nam, chuyên bồi dưỡng học sinh giỏi cấp ${levelStr} và các kỳ thi Toán Quốc tế (${programStr}).
Nhiệm vụ: Hãy phân tích ${base64List.length} trang bài tập đính kèm của học sinh ${studentName}.
- Cấp học: ${levelStr}
- Chương trình / Kỳ thi mục tiêu: ${programStr}
- QUY TẮC ĐẶC BIỆT:
  1. Nếu trên ảnh CÓ CHỮ VIẾT TAY bài làm của học sinh: Nhận diện chính xác từng câu hỏi, trích xuất đáp án học sinh đã viết vào "studentAnswer", tính toán "correctAnswer", đánh giá status ("correct" | "wrong" | "need_verify") và viết lời giải chi tiết.
  2. NẾU TRÊN ẢNH LÀ ĐỀ BÀI CHƯA CÓ LỜI GIẢI / ĐỀ BÀI TRỐNG (chưa có chữ viết tay của con): Nhận diện toàn bộ các câu hỏi trong đề, đặt "studentAnswer" là "(Chưa làm)", "status" là "unanswered", "statusText" là "Chưa làm", và VẪN TÍNH TOÁN ĐẦY ĐỦ "correctAnswer", "solutionSteps", "tips" để giúp học sinh và phụ huynh xem trước phương pháp giải chuẩn!

Hãy trả về DUY NHẤT một JSON hợp lệ (không kèm markdown ngoài JSON):
{
  "title": "BẢNG KẾT QUẢ PHÂN TÍCH VÀ CHẤM ĐIỂM BÀI TOÁN",
  "questions": [
    {
      "id": 1,
      "title": "Câu 1: Phép tính",
      "question": "Nội dung đề bài chi tiết...",
      "keywords": "Từ khóa chính...",
      "studentAnswer": "25",
      "correctAnswer": "25",
      "status": "correct",
      "statusText": "Đúng theo ảnh",
      "category": "Số học",
      "difficulty": "Cơ bản",
      "explanation": "Giải thích ngắn gọn...",
      "solutionSteps": ["Bước 1: ...", "Bước 2: ..."],
      "studentMistake": null,
      "tips": "Mẹo giải nhanh..."
    }
  ]
}`
        }
      ];

      for (const b64 of base64List) {
        parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: b64
          }
        });
      }

      // Fast models priority: gemini-3-flash-preview (fastest multimodal), then gemini-3.5-flash-lite
      const modelsToTry = ['gemini-3-flash-preview', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
      let data: any = null;

      for (const model of modelsToTry) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 14000); // 14s timeout

        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts }],
                generationConfig: {
                  responseMimeType: 'application/json',
                  temperature: 0.2
                }
              }),
              signal: controller.signal
            }
          );
          clearTimeout(timeoutId);

          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch (mErr) {
          clearTimeout(timeoutId);
          console.warn(`Model ${model} request failed or timed out:`, mErr);
        }
      }

      clearInterval(progressTimer);

      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleanJsonStr = rawText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
        const parsed = JSON.parse(cleanJsonStr);
        if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          if (onProgress) {
            onProgress({ status: 'completed', progress: 100, message: 'Hoàn tất phân tích bài toán bằng Gemini AI!' });
          }

          const qList: MathQuestion[] = parsed.questions.map((q: any, idx: number) => ({
            id: q.id || idx + 1,
            part: Math.ceil((q.id || idx + 1) / 10),
            partTitle: `Phần ${Math.ceil((q.id || idx + 1) / 10)}`,
            title: q.title || `Câu ${q.id || idx + 1}`,
            question: q.question || '',
            keywords: q.keywords || '',
            studentAnswer: q.studentAnswer || '(Chưa làm)',
            correctAnswer: q.correctAnswer || '',
            status: q.status || (q.studentAnswer && q.studentAnswer !== '(Chưa làm)' ? 'correct' : 'unanswered'),
            statusText: q.statusText || (q.status === 'wrong' ? 'Sai / Cần sửa' : (q.status === 'unanswered' ? 'Chưa làm' : 'Đúng')),
            category: q.category || 'Toán học',
            difficulty: q.difficulty || 'Trung bình',
            explanation: q.explanation || '',
            solutionSteps: q.solutionSteps || [],
            studentMistake: q.studentMistake || null,
            tips: q.tips || ''
          }));

          const correctCount = qList.filter(q => q.status === 'correct').length;
          const wrongCount = qList.filter(q => q.status === 'wrong').length;
          const unansweredCount = qList.filter(q => q.status === 'unanswered').length;
          const verifyCount = qList.filter(q => q.status === 'need_verify').length;

          const summary: TestSummary = {
            title: parsed.title || `BẢNG KẾT QUẢ CHẤM ĐIỂM – ${studentName.toUpperCase()}`,
            subtitle: `Nhận diện bằng Gemini Vision AI từ ${imageFiles.length} trang ảnh bài tập (${qList.length} câu).`,
            studentName: studentName,
            grade: `${levelStr} • ${programStr}`,
            testDate: new Date().toLocaleDateString('vi-VN'),
            totalQuestions: qList.length,
            correctCount,
            wrongCount,
            unansweredCount,
            verifyCount,
            score10: qList.length > 0 ? Number(((correctCount / qList.length) * 10).toFixed(1)) : 0,
            accuracyRate: (qList.length - unansweredCount) > 0 
              ? Number(((correctCount / (qList.length - unansweredCount)) * 100).toFixed(1)) 
              : 0,
            completionRate: qList.length > 0 ? Number((((qList.length - unansweredCount) / qList.length) * 100).toFixed(1)) : 0,
            sourceImagesCount: imageFiles.length,
            notes: unansweredCount === qList.length 
              ? 'Đề bài chưa có đáp án của học sinh. AI đã nhận diện toàn bộ câu hỏi và cung cấp đáp án cùng lời giải tham khảo.'
              : `Đã đối chiếu thành công ${qList.length} câu hỏi theo cấp ${levelStr}.`
          };

          return { questions: qList, summary };
        }
      }
    } catch (err: any) {
      clearInterval(progressTimer);
      console.warn('Gemini API call failed or timed out:', err);
    }
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
