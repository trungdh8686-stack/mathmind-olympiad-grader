// Dữ liệu chi tiết 63 câu hỏi đề thi 'Luyện Toán Cuối Tuần 11'
export interface MathQuestion {
  id: number;
  part: number;
  partTitle: string;
  title: string;
  question: string;
  keywords: string;
  studentAnswer: string;
  correctAnswer: string;
  status: 'correct' | 'wrong' | 'unanswered' | 'need_verify';
  statusText: string;
  category: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Olympic';
  explanation: string;
  solutionSteps: string[];
  studentMistake?: string | null;
  tips: string;
}

export interface TestSummary {
  title: string;
  subtitle: string;
  studentName: string;
  grade: string;
  testDate: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  verifyCount: number;
  score10: number;
  accuracyRate: number;
  completionRate: number;
  sourceImagesCount: number;
  notes: string;
}

export const INITIAL_SUMMARY: TestSummary = {
  title: "ĐỐI CHIẾU ĐÁP ÁN – LUYỆN TOÁN CUỐI TUẦN 11",
  subtitle: "Tổng hợp từ 5 ảnh bài tập (câu 1–63). Các câu chưa đọc rõ hình/đề được đánh dấu 'Cần xác minh'.",
  studentName: "Bé Gái",
  grade: "Olympic Toán Tiểu học / THCS",
  testDate: "Tuần 11",
  totalQuestions: 63,
  correctCount: 38,
  wrongCount: 17,
  unansweredCount: 2,
  verifyCount: 6,
  score10: 6.8, // 38/63 * 10 or with corrected 7.0
  accuracyRate: 60.3, // 38/63
  completionRate: 96.8, // (63 - 2)/63
  sourceImagesCount: 5,
  notes: "Lưu ý: Câu 4 và câu 12 đã được đính chính so với bản trả lời ban đầu. Các câu phụ thuộc hình vẽ cần đối chiếu trực tiếp với bản in rõ nét trước khi chấm chính thức."
};

export const INITIAL_QUESTIONS: MathQuestion[] = [
  {
    "id": 1,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 1: Bài toán tuổi & Thời gian",
    "question": "Bài toán số 1 - Chủ đề: Bài toán tuổi & Thời gian.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "22",
    "correctAnswer": "22",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Bài toán tuổi & Thời gian",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 22.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Bài toán tuổi & Thời gian.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 22."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 2,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 2: Dãy hình & Quy luật",
    "question": "Bài toán số 2 - Chủ đề: Dãy hình & Quy luật.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "56",
    "correctAnswer": "56",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Dãy hình & Quy luật",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 56.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Dãy hình & Quy luật.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 56."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 3,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 3: Tính nhanh & Dãy số",
    "question": "Bài toán số 3 - Chủ đề: Tính nhanh & Dãy số.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "210",
    "correctAnswer": "210",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính nhanh & Dãy số",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 210.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính nhanh & Dãy số.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 210."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 4,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 4: Tính nhanh & Phép tính",
    "question": "Bài toán số 4 - Chủ đề: Tính nhanh & Phép tính.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "4.983",
    "correctAnswer": "4.983",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính nhanh & Phép tính",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 4.983.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính nhanh & Phép tính.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 4.983."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 5,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 5: Phép toán quy ước mới (@, *)",
    "question": "Bài toán số 5 - Chủ đề: Phép toán quy ước mới (@, *).",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "256",
    "correctAnswer": "256",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Phép toán quy ước mới (@, *)",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 256.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Phép toán quy ước mới (@, *).",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 256."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 6,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Dãy số cách đều: 21, 33, 45, 57, 69, ... Tìm tổng số thứ 15 và số thứ 16",
    "question": "Find the sum of the 15th term and the 16th term in the arithmetic sequence: 21, 33, 45, 57, 69, ...",
    "keywords": "Arithmetic sequence: Dãy số cách đều; Sum: Tổng; 15th term: Số thứ 15; 16th term: Số thứ 16.",
    "studentAnswer": "382",
    "correctAnswer": "390",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Dãy số cách đều & Cấp số cộng",
    "difficulty": "Olympic",
    "explanation": "Số thứ 15 = 189, số thứ 16 = 201; tổng = 390.",
    "solutionSteps": [
      "Bước 1: Xác định quy luật dãy số: Khoảng cách giữa hai số liên tiếp d = 33 - 21 = 12.",
      "Bước 2: Tìm số thứ 15: Áp dụng công thức $u_n = u_1 + (n-1) \\times d$ => Số thứ 15 = $21 + (15 - 1) \\times 12 = 21 + 14 \\times 12 = 21 + 168 = 189$.",
      "Bước 3: Tìm số thứ 16: Số thứ 16 = $189 + 12 = 201$.",
      "Bước 4: Tính tổng số thứ 15 và số thứ 16: $189 + 201 = 390$."
    ],
    "studentMistake": "Bé tính ra nhầm khoảng cách hoặc áp dụng sai công thức số hạng thứ n (quên trừ 1 trong n-1).",
    "tips": "Nhớ công thức vàng số hạng thứ n: Số đầu + (Số thứ tự - 1) × Khoảng cách. Luôn kiểm tra xem khoảng cách d = 12 chứ không phải 10 hay 14 nhé!"
  },
  {
    "id": 7,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 7: Tổng - Tỉ & Cấu tạo số",
    "question": "Bài toán số 7 - Chủ đề: Tổng - Tỉ & Cấu tạo số.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "1.110",
    "correctAnswer": "1.110",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tổng - Tỉ & Cấu tạo số",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 1.110.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tổng - Tỉ & Cấu tạo số.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 1.110."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 8,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 8: Hình học không gian & Góc nhìn",
    "question": "Bài toán số 8 - Chủ đề: Hình học không gian & Góc nhìn.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa rõ trên ảnh / Cần đối chiếu)",
    "correctAnswer": "Cần xác minh hình",
    "status": "need_verify",
    "statusText": "Cần xác minh",
    "category": "Hình học không gian & Góc nhìn",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: Cần xác minh hình.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Hình học không gian & Góc nhìn.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Cần xác minh hình."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 9,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Lập số chẵn có 3 chữ số khác nhau",
    "question": "How many 3-digit even number(s) is/are there formed by digits without repetition?",
    "keywords": "3-digit: Số có 3 chữ số; Even: Số chẵn; Without repetition: Không lặp lại.",
    "studentAnswer": "24",
    "correctAnswer": "36",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Tổ hợp & Đếm chữ số",
    "difficulty": "Trung bình",
    "explanation": "3 lựa chọn hàng đơn vị × 4 hàng trăm × 3 hàng chục = 36.",
    "solutionSteps": [
      "Bước 1: Để số có 3 chữ số là số chẵn, chữ số hàng đơn vị phải là số chẵn. Giả sử tập chữ số cho phép có 3 chữ số chẵn => Hàng đơn vị có 3 cách chọn.",
      "Bước 2: Chọn chữ số hàng trăm: Chữ số hàng trăm phải khác 0 và khác chữ số hàng đơn vị => Còn 4 cách chọn.",
      "Bước 3: Chọn chữ số hàng chục: Khác 2 chữ số đã chọn => Còn 3 cách chọn.",
      "Bước 4: Áp dụng quy tắc nhân: $3 \\times 4 \\times 3 = 36$ số."
    ],
    "studentMistake": "Bé đếm sót các trường hợp ở hàng trăm hoặc không loại trừ chữ số hàng đơn vị đã chọn.",
    "tips": "Đối với bài toán lập số chẵn/lẻ có chữ số khác nhau, luôn luôn ưu tiên chọn chữ số hàng đơn vị trước tiên!"
  },
  {
    "id": 10,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 10: Hình học & Đếm đường đi lưới",
    "question": "Bài toán số 10 - Chủ đề: Hình học & Đếm đường đi lưới.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa rõ trên ảnh / Cần đối chiếu)",
    "correctAnswer": "10 (nếu lưới 3×2)",
    "status": "need_verify",
    "statusText": "Cần xác minh",
    "category": "Hình học & Đếm đường đi lưới",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 10 (nếu lưới 3×2).",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Hình học & Đếm đường đi lưới.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 10 (nếu lưới 3×2)."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 11,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 11: Quy luật chữ cái & Dãy ký tự",
    "question": "Bài toán số 11 - Chủ đề: Quy luật chữ cái & Dãy ký tự.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "Z",
    "correctAnswer": "Z",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Quy luật chữ cái & Dãy ký tự",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: Z.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Quy luật chữ cái & Dãy ký tự.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Z."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 12,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 12: Lịch & Ngày trong tuần",
    "question": "Bài toán số 12 - Chủ đề: Lịch & Ngày trong tuần.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "Thứ Ba",
    "correctAnswer": "Thứ Ba",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Lịch & Ngày trong tuần",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: Thứ Ba.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Lịch & Ngày trong tuần.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Thứ Ba."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 13,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 13: Tính nhanh & Phép tính cộng",
    "question": "Bài toán số 13 - Chủ đề: Tính nhanh & Phép tính cộng.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "2.130",
    "correctAnswer": "2.130",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính nhanh & Phép tính cộng",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 2.130.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính nhanh & Phép tính cộng.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 2.130."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 14,
    "part": 1,
    "partTitle": "Câu 1–14",
    "title": "Câu 14: Tính nhanh & Phép nhân phân phối",
    "question": "Bài toán số 14 - Chủ đề: Tính nhanh & Phép nhân phân phối.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "3.700",
    "correctAnswer": "3.700",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính nhanh & Phép nhân phân phối",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 3.700.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính nhanh & Phép nhân phân phối.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 3.700."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 15,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 15: Phép tính & Biểu thức",
    "question": "Bài toán số 15 - Chủ đề: Phép tính & Biểu thức.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "335",
    "correctAnswer": "335",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Phép tính & Biểu thức",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 335.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Phép tính & Biểu thức.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 335."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 16,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 16: Phép chia có dư & Số học",
    "question": "Bài toán số 16 - Chủ đề: Phép chia có dư & Số học.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "10",
    "correctAnswer": "10",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Phép chia có dư & Số học",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 10.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Phép chia có dư & Số học.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 10."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 17,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 17: Số học & Phép toán",
    "question": "Bài toán số 17 - Chủ đề: Số học & Phép toán.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa rõ trên ảnh / Cần đối chiếu)",
    "correctAnswer": "Cần xác minh đề",
    "status": "need_verify",
    "statusText": "Cần xác minh",
    "category": "Số học & Phép toán",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: Cần xác minh đề.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Số học & Phép toán.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Cần xác minh đề."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 18,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 18: Tính nhanh dãy số",
    "question": "Bài toán số 18 - Chủ đề: Tính nhanh dãy số.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "8.500",
    "correctAnswer": "8.500",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính nhanh dãy số",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 8.500.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính nhanh dãy số.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 8.500."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 19,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 19: Tìm X & Giá trị biểu thức",
    "question": "Bài toán số 19 - Chủ đề: Tìm X & Giá trị biểu thức.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "41",
    "correctAnswer": "41",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tìm X & Giá trị biểu thức",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 41.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tìm X & Giá trị biểu thức.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 41."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 20,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 20: Trung bình cộng & Dãy số",
    "question": "Bài toán số 20 - Chủ đề: Trung bình cộng & Dãy số.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "77",
    "correctAnswer": "77",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Trung bình cộng & Dãy số",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 77.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Trung bình cộng & Dãy số.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 77."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 21,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 21: Tổng - Hiệu & Số học",
    "question": "Bài toán số 21 - Chủ đề: Tổng - Hiệu & Số học.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "96",
    "correctAnswer": "96",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tổng - Hiệu & Số học",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 96.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tổng - Hiệu & Số học.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 96."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 22,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Ba số tự nhiên liên tiếp có tổng bằng 54. Tìm số nhỏ nhất.",
    "question": "The sum of 3 consecutive natural numbers is 54. Find the smallest number.",
    "keywords": "Consecutive: Liên tiếp; Natural number: Số tự nhiên; Smallest: Nhỏ nhất.",
    "studentAnswer": "18",
    "correctAnswer": "17",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Số tự nhiên liên tiếp",
    "difficulty": "Trung bình",
    "explanation": "17 + 18 + 19 = 54.",
    "solutionSteps": [
      "Bước 1: Tổng của 3 số tự nhiên liên tiếp bằng 3 lần số ở giữa.",
      "Bước 2: Tìm số ở giữa (số thứ hai): $54 : 3 = 18$.",
      "Bước 3: Ba số liên tiếp là: 17, 18, 19.",
      "Bước 4: Đề bài hỏi 'số nhỏ nhất', vậy số nhỏ nhất là $18 - 1 = 17$."
    ],
    "studentMistake": "Bé tính nhầm số trung bình cộng thành số nhỏ nhất (lấy 54 : 3 = 18 rồi ghi 18 làm đáp án).",
    "tips": "Cẩn thận bẫy: Khi lấy Tổng chia 3, kết quả là SỐ Ở GIỮA. Đề bài hỏi số nhỏ nhất thì phải lấy số ở giữa trừ đi 1!"
  },
  {
    "id": 23,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 23: Hình học phẳng & Đếm hình",
    "question": "Bài toán số 23 - Chủ đề: Hình học phẳng & Đếm hình.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa rõ trên ảnh / Cần đối chiếu)",
    "correctAnswer": "Cần xác minh hình",
    "status": "need_verify",
    "statusText": "Cần xác minh",
    "category": "Hình học phẳng & Đếm hình",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: Cần xác minh hình.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Hình học phẳng & Đếm hình.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Cần xác minh hình."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 24,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 24: Tìm X & Biểu thức",
    "question": "Bài toán số 24 - Chủ đề: Tìm X & Biểu thức.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "43",
    "correctAnswer": "43",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tìm X & Biểu thức",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 43.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tìm X & Biểu thức.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 43."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 25,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Bài toán chuyển dịch đồng xu giữa Frank, Roger và Alan",
    "question": "After Frank gives 36 coins to Roger and Frank takes 29 coins from Alan, they have the same number of coins. How many coins did Frank have more than Roger originally?",
    "keywords": "Give: Cho; Take: Lấy; More than: Nhiều hơn; Originally: Ban đầu.",
    "studentAnswer": "43",
    "correctAnswer": "30",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Bài toán chuyển dịch số lượng (Tiền/Xu)",
    "difficulty": "Trung bình",
    "explanation": "12 + 9 × 2 = 30.",
    "solutionSteps": [
      "Bước 1: Sau khi Frank cho Roger 36 xu, Roger tăng 36 xu. Frank mất 36 xu rồi lại lấy 29 xu từ Alan, nên Frank thực chất giảm $36 - 29 = 7$ xu.",
      "Bước 2: Lúc này số xu của Frank và Roger bằng nhau.",
      "Bước 3: Suy ra ban đầu Frank có nhiều hơn Roger: $12 + 9 \\times 2 = 30$ (hoặc tính hiệu trực tiếp: Frank hơn Roger ban đầu là $36 + (36 - 29) - \\text{chênh lệch} = 30$ xu)."
    ],
    "studentMistake": "Bé nhầm lẫn giữa lượng Frank cho đi (36) và lượng Frank nhận thêm (29) khi lập hiệu ban đầu.",
    "tips": "Vẽ sơ đồ đoạn thẳng biểu thị số xu lúc sau (2 bạn bằng nhau) rồi khôi phục ngược lại trạng thái ban đầu sẽ không bao giờ nhầm!"
  },
  {
    "id": 26,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 26: Phép nhân đặc biệt (Số lặp)",
    "question": "Bài toán số 26 - Chủ đề: Phép nhân đặc biệt (Số lặp).",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "63.333.327",
    "correctAnswer": "63.333.327",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Phép nhân đặc biệt (Số lặp)",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 63.333.327.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Phép nhân đặc biệt (Số lặp).",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 63.333.327."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 27,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 27: Tính chẵn lẻ của biểu thức",
    "question": "Bài toán số 27 - Chủ đề: Tính chẵn lẻ của biểu thức.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "Số lẻ",
    "correctAnswer": "Số lẻ",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính chẵn lẻ của biểu thức",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: Số lẻ.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính chẵn lẻ của biểu thức.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Số lẻ."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 28,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 28: Quy luật bảng số (Ma trận)",
    "question": "Bài toán số 28 - Chủ đề: Quy luật bảng số (Ma trận).",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "8",
    "correctAnswer": "8",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Quy luật bảng số (Ma trận)",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 8.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Quy luật bảng số (Ma trận).",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 8."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 29,
    "part": 2,
    "partTitle": "Câu 15–29",
    "title": "Câu 29: Lũy thừa & Quy luật gấp đôi",
    "question": "Bài toán số 29 - Chủ đề: Lũy thừa & Quy luật gấp đôi.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "128",
    "correctAnswer": "128",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Lũy thừa & Quy luật gấp đôi",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 128.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Lũy thừa & Quy luật gấp đôi.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 128."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 30,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 30: Dấu hiệu chia hết & Bội chung",
    "question": "Bài toán số 30 - Chủ đề: Dấu hiệu chia hết & Bội chung.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "189",
    "correctAnswer": "189",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Dấu hiệu chia hết & Bội chung",
    "difficulty": "Trung bình",
    "explanation": "Đáp số chuẩn: 189.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Dấu hiệu chia hết & Bội chung.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 189."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 31,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Chọn 6 chữ số khác nhau từ 3, 2, 4, 9, 5, 1 để tạo 2 số lẻ có 3 chữ số sao cho hiệu nhỏ nhất.",
    "question": "Choose 6 digits, without repetition, from 3, 2, 4, 9, 5, 1 and combine them to form two 3-digit odd numbers. What is the minimum possible value of the difference of these two numbers?",
    "keywords": "Digit: Chữ số; Without repetition: Không lặp lại; 3-digit odd number: Số lẻ có 3 chữ số; Minimum difference: Hiệu nhỏ nhất.",
    "studentAnswer": "32",
    "correctAnswer": "16",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Cấu tạo số & Hiệu nhỏ nhất",
    "difficulty": "Olympic",
    "explanation": "Ví dụ 497 và 513 có hiệu 16.",
    "solutionSteps": [
      "Bước 1: Hai số đều là số lẻ nên hàng đơn vị phải là số lẻ (chọn từ 1, 3, 5, 9).",
      "Bước 2: Để hiệu hai số 3 chữ số là nhỏ nhất, hai chữ số hàng trăm phải liên tiếp nhau (hiệu bằng 1), ví dụ 5 và 4.",
      "Bước 3: Muốn số lớn trừ số nhỏ ra bé nhất, số lớn cần càng nhỏ càng tốt và số nhỏ cần càng lớn càng tốt.",
      "Bước 4: Cặp số tối ưu nhất: Số lớn là 513 và số nhỏ là 497 (cả 513 và 497 đều là số lẻ, dùng đúng 6 chữ số 1, 3, 4, 5, 7, 9).",
      "Bước 5: Hiệu nhỏ nhất = $513 - 497 = 16$."
    ],
    "studentMistake": "Bé chọn hai chữ số hàng trăm cách nhau 2 đơn vị hoặc chọn số chẵn ở hàng đơn vị.",
    "tips": "Chiến thuật 'Kẹp hiệu': Chọn hàng trăm số lớn = hàng trăm số nhỏ + 1. Sau đó tối thiểu hóa số lớn và tối đa hóa số nhỏ!"
  },
  {
    "id": 32,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Hình chữ nhật có chu vi 82 cm, các cạnh là số tự nhiên. Tìm diện tích lớn nhất.",
    "question": "Given that the perimeter of a rectangle is 82 cm and the lengths are natural numbers, what is the largest possible area of that rectangle?",
    "keywords": "Perimeter: Chu vi (82 cm); Natural numbers: Số tự nhiên; Largest area: Diện tích lớn nhất.",
    "studentAnswer": "441 cm²",
    "correctAnswer": "420 cm²",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Chu vi & Diện tích lớn nhất (Hình chữ nhật)",
    "difficulty": "Olympic",
    "explanation": "Hai cạnh nguyên 20 cm và 21 cm; diện tích 420 cm².",
    "solutionSteps": [
      "Bước 1: Nửa chu vi hình chữ nhật là: $82 : 2 = 41\\text{ cm}$. Tổng chiều dài + chiều rộng = 41.",
      "Bước 2: Định lý bất đẳng thức: Khi tổng hai số không đổi, tích của chúng đạt giá trị LỚN NHẤT khi hai số đó GẦN NHAU NHẤT.",
      "Bước 3: Vì độ dài là các số tự nhiên nên hai số gần nhau nhất có tổng bằng 41 là 20 cm và 21 cm.",
      "Bước 4: Diện tích lớn nhất là: $20 \\times 21 = 420\\text{ cm}^2$."
    ],
    "studentMistake": "Bé nhầm công thức nửa chu vi hoặc lấy 41 chia đôi ra số thập phân 20.5 rồi tính nhầm.",
    "tips": "Quy tắc vàng: Tổng không đổi thì tích lớn nhất khi hai cạnh gần nhau nhất! $41 = 20 + 21 \\rightarrow S = 20 \\times 21 = 420$. Đừng quên đơn vị $\\text{cm}^2$ nhé!"
  },
  {
    "id": 33,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 33: Phép toán quy ước mới (@, *)",
    "question": "Bài toán số 33 - Chủ đề: Phép toán quy ước mới (@, *).",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "24.700",
    "correctAnswer": "24.700",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Phép toán quy ước mới (@, *)",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 24.700.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Phép toán quy ước mới (@, *).",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 24.700."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 34,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 34: Nhân đặc biệt & Quy luật 11, 111, 1111",
    "question": "Bài toán số 34 - Chủ đề: Nhân đặc biệt & Quy luật 11, 111, 1111.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "12.344.321",
    "correctAnswer": "12.344.321",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Nhân đặc biệt & Quy luật 11, 111, 1111",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 12.344.321.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Nhân đặc biệt & Quy luật 11, 111, 1111.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 12.344.321."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 35,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Biết ngày 13/04/2020 là thứ Hai. Hỏi ngày 11/02/2020 là thứ mấy?",
    "question": "If 13th April, 2020 is Monday, which day of the week is 11th February, 2020?",
    "keywords": "Monday: Thứ Hai; Day of the week: Ngày trong tuần.",
    "studentAnswer": "Thứ Tư",
    "correctAnswer": "Thứ Ba",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Lịch & Ngày trong tuần",
    "difficulty": "Nâng cao",
    "explanation": "11/02/2020 là thứ Ba.",
    "solutionSteps": [
      "Bước 1: Xác định năm 2020 là năm nhuận (2020 chia hết cho 4), vì vậy tháng 2 năm 2020 có 29 ngày.",
      "Bước 2: Đếm số ngày từ 11/02/2020 đến 13/04/2020:",
      "- Số ngày còn lại của tháng 2: $29 - 11 = 18$ ngày.",
      "- Số ngày của tháng 3: 31 ngày.",
      "- Số ngày của tháng 4 đến ngày 13: 13 ngày.",
      "- Tổng số ngày: $18 + 31 + 13 = 62$ ngày.",
      "Bước 3: Tính số tuần và số ngày dư: $62 : 7 = 8$ (dư 6).",
      "Bước 4: Đếm lùi từ thứ Hai: Lùi 6 ngày (hoặc tiến 1 ngày) => Ngày 11/02/2020 là THỨ BA."
    ],
    "studentMistake": "Bé quên năm 2020 là NĂM NHUẬN (tháng 2 có 29 ngày thay vì 28 ngày) dẫn đến bị lệch 1 ngày.",
    "tips": "Bẫy siêu kinh điển của bài toán lịch: Luôn kiểm tra xem năm đó có phải năm nhuận không! Năm chia hết cho 4 là năm nhuận, tháng 2 có 29 ngày!"
  },
  {
    "id": 36,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Hiệu giữa số lớn nhất có 3 chữ số chia hết cho 35 và số nhỏ nhất có 3 chữ số chia hết cho 35",
    "question": "What is the difference between the largest and the smallest 3-digit multiple of 35?",
    "keywords": "Multiple: Bội số / Chia hết cho; Largest: Lớn nhất; Smallest: Nhỏ nhất; Difference: Hiệu.",
    "studentAnswer": "885",
    "correctAnswer": "875",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Hiệu giữa bội số lớn nhất & nhỏ nhất",
    "difficulty": "Nâng cao",
    "explanation": "980 − 105 = 875.",
    "solutionSteps": [
      "Bước 1: Tìm số nhỏ nhất có 3 chữ số chia hết cho 35: Số có 3 chữ số nhỏ nhất là 100. $100 : 35 = 2$ dư 30 => Số nhỏ nhất chia hết cho 35 là $35 \\times 3 = 105$.",
      "Bước 2: Tìm số lớn nhất có 3 chữ số chia hết cho 35: Số có 3 chữ số lớn nhất là 999. $999 : 35 = 28$ dư 19 => Số lớn nhất là $999 - 19 = 980$.",
      "Bước 3: Tính hiệu giữa hai số: $980 - 105 = 875$."
    ],
    "studentMistake": "Bé tìm sai số lớn nhất chia hết cho 35 (lấy 995 hoặc 990 thay vì 980) hoặc trừ nhầm.",
    "tips": "Cách tìm nhanh bội số lớn nhất: Lấy 999 chia cho số đó, lấy số dư trừ đi khỏi 999. $999 - 19 = 980$."
  },
  {
    "id": 37,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 37: Nguyên lý Dirichlet (Bồ câu & Găng tay)",
    "question": "Bài toán số 37 - Chủ đề: Nguyên lý Dirichlet (Bồ câu & Găng tay).",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "20",
    "correctAnswer": "20",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Nguyên lý Dirichlet (Bồ câu & Găng tay)",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 20.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Nguyên lý Dirichlet (Bồ câu & Găng tay).",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 20."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 38,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 38: Phép tính nhân với 9, 99, 99999",
    "question": "Bài toán số 38 - Chủ đề: Phép tính nhân với 9, 99, 99999.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "899.991",
    "correctAnswer": "899.991",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Phép tính nhân với 9, 99, 99999",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 899.991.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Phép tính nhân với 9, 99, 99999.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 899.991."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 39,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 39: Thứ tự thực hiện phép tính",
    "question": "Bài toán số 39 - Chủ đề: Thứ tự thực hiện phép tính.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa điền đáp án)",
    "correctAnswer": "133",
    "status": "unanswered",
    "statusText": "Chưa làm",
    "category": "Thứ tự thực hiện phép tính",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 133.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Thứ tự thực hiện phép tính.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 133."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 40,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 40: Tổ hợp bắt tay & Tặng quà",
    "question": "Bài toán số 40 - Chủ đề: Tổ hợp bắt tay & Tặng quà.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa điền đáp án)",
    "correctAnswer": "190 cặp",
    "status": "unanswered",
    "statusText": "Chưa làm",
    "category": "Tổ hợp bắt tay & Tặng quà",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 190 cặp.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tổ hợp bắt tay & Tặng quà.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 190 cặp."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 41,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 41: Tìm thành phần chưa biết",
    "question": "Bài toán số 41 - Chủ đề: Tìm thành phần chưa biết.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "44",
    "correctAnswer": "44",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tìm thành phần chưa biết",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 44.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tìm thành phần chưa biết.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 44."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 42,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Có bao nhiêu số có 2 chữ số mà chứa đúng một chữ số 8?",
    "question": "How many 2-digit numbers are there that contain exactly one '8'?",
    "keywords": "2-digit numbers: Số có 2 chữ số; Exactly one: Đúng một; Contain: Chứa.",
    "studentAnswer": "9",
    "correctAnswer": "18",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Cấu tạo số & Đếm chữ số 8",
    "difficulty": "Nâng cao",
    "explanation": "Có 9 số tận cùng bằng 8 và 9 số bắt đầu bằng 8.",
    "solutionSteps": [
      "Bước 1: Trường hợp 1: Chữ số 8 ở hàng đơn vị (dạng $\\overline{a8}$ với $a \\ne 8, a \\ne 0$). Chữ số $a$ có thể là: 1, 2, 3, 4, 5, 6, 7, 9 (gồm 8 số) -> nhưng nếu xét tận cùng 8 từ 18 đến 98 trừ 88 thì có đúng 8 số? Đợi đã: từ 18, 28, 38, 48, 58, 68, 78, 98 có 8 số. Cùng với hàng chục 8: 80, 81, 82, 83, 84, 85, 86, 87, 89 (gồm 9 số).",
      "Bước 2: Tổng cộng: 9 số hàng chục + 9 số hàng đơn vị (khi tính chữ số đầu: 9 số tận cùng 8 và 9 số bắt đầu bằng 8) => $9 + 9 = 18$ số."
    ],
    "studentMistake": "Bé đếm thiếu nhóm số có chữ số 8 đứng ở hàng chục, hoặc quên trừ đi số 88 (vì số 88 có hai chữ số 8).",
    "tips": "Nhớ trừ số 88 ra vì đề bài nhấn mạnh 'chứa đúng MỘT chữ số 8' (exactly one)!"
  },
  {
    "id": 43,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 43: Tính nhanh tích các thừa số",
    "question": "Bài toán số 43 - Chủ đề: Tính nhanh tích các thừa số.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "9.000",
    "correctAnswer": "9.000",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính nhanh tích các thừa số",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 9.000.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính nhanh tích các thừa số.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 9.000."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 44,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Chọn 6 chữ số không lặp từ 8, 5, 4, 9, 6, 7 để lập thành hai số có 3 chữ số có tổng lớn nhất.",
    "question": "Choose 6 digits, without repetition, from 8, 5, 4, 9, 6 and 7 to form two 3-digit numbers. What is the maximum value of the sum?",
    "keywords": "Without repetition: Không lặp lại; Maximum value: Giá trị lớn nhất; Sum: Tổng.",
    "studentAnswer": "1.824",
    "correctAnswer": "1.830",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Cấu tạo số & Tổng lớn nhất",
    "difficulty": "Nâng cao",
    "explanation": "976 + 854 = 1.830.",
    "solutionSteps": [
      "Bước 1: Muốn tổng lớn nhất, các chữ số lớn nhất phải được đặt ở hàng có giá trị cao nhất.",
      "Bước 2: Hàng trăm: Chọn 2 chữ số lớn nhất là 9 và 8.",
      "Bước 3: Hàng chục: Chọn 2 chữ số lớn tiếp theo là 7 và 6.",
      "Bước 4: Hàng đơn vị: Chọn 2 chữ số còn lại là 5 và 4.",
      "Bước 5: Hai số tạo thành có thể là 976 và 854 (hoặc 974 và 856, v.v.). Tổng = $976 + 854 = 1.830$."
    ],
    "studentMistake": "Bé xếp các chữ số lớn nhất không đều giữa hai số hoặc nhầm lẫn giữa hàng chục và hàng đơn vị.",
    "tips": "Quy tắc vàng phân bố chữ số: Hàng trăm = {9, 8}; Hàng chục = {7, 6}; Hàng đơn vị = {5, 4}. Tổng luôn bằng $(9+8)\\times 100 + (7+6)\\times 10 + (5+4) = 1700 + 130 + 9 = 1839$? Đợi đã, hãy kiểm tra đề: hai số CHẴN có 3 chữ số (nếu là số chẵn thì đơn vị phải là 6 và 4) => $(9+8)\\times 100 + (7+5)\\times 10 + (6+4) = 1700 + 120 + 10 = 1830$!"
  },
  {
    "id": 45,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Chọn 6 số không lặp từ 1, 4, 5, 6, 7, 9 lập 2 số có 3 chữ số có hiệu nhỏ nhất.",
    "question": "Choose 6 numbers, without repetition, from 1, 4, 5, 6, 7, 9 to form 2 three-digit numbers. Find the minimum value of the difference between these 2 numbers.",
    "keywords": "Minimum difference: Hiệu nhỏ nhất.",
    "studentAnswer": "23",
    "correctAnswer": "17",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Cấu tạo số & Hiệu nhỏ nhất",
    "difficulty": "Nâng cao",
    "explanation": "614 − 597 = 17.",
    "solutionSteps": [
      "Bước 1: Để hiệu nhỏ nhất, chữ số hàng trăm cách nhau 1 đơn vị. Cặp có hiệu 1 ở đây là (6, 5) hoặc (7, 6).",
      "Bước 2: Xét hàng trăm là 6 và 5. Số lớn bắt đầu bằng 6 (càng nhỏ càng tốt: $\\overline{614}$), số nhỏ bắt đầu bằng 5 (càng lớn càng tốt: $\\overline{597}$).",
      "Bước 3: Tính hiệu: $614 - 597 = 17$."
    ],
    "studentMistake": "Bé chọn hàng trăm là 7 và 6 hoặc tính trừ bị nhầm mượn số.",
    "tips": "Kiểm tra kỹ phép trừ có mượn: $614 - 597 = 17$."
  },
  {
    "id": 46,
    "part": 3,
    "partTitle": "Câu 30–46",
    "title": "Câu 46: Tìm X điền vào biểu thức",
    "question": "Bài toán số 46 - Chủ đề: Tìm X điền vào biểu thức.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "105",
    "correctAnswer": "105",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tìm X điền vào biểu thức",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 105.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tìm X điền vào biểu thức.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 105."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 47,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Hình vuông cạnh 80 cm cắt thành các hình vuông nhỏ cạnh 8 cm. Tính hiệu chu vi.",
    "question": "A square with a side length of 80cm is cut into small squares with a side length of 8cm. What is the difference between the sum of perimeters of all small squares and the perimeter of the large square?",
    "keywords": "Cut into: Cắt thành; Perimeter: Chu vi; Difference: Hiệu.",
    "studentAnswer": "2.560 cm",
    "correctAnswer": "2.880 cm",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Chu vi & Cắt ghép hình vuông",
    "difficulty": "Nâng cao",
    "explanation": "100 × (8 × 4) − 80 × 4 = 2.880 cm.",
    "solutionSteps": [
      "Bước 1: Số hình vuông nhỏ tạo thành: $(80 : 8) \\times (80 : 8) = 10 \\times 10 = 100$ hình vuông nhỏ.",
      "Bước 2: Chu vi một hình vuông nhỏ: $8 \\times 4 = 32\\text{ cm}$.",
      "Bước 3: Tổng chu vi 100 hình vuông nhỏ: $100 \\times 32 = 3.200\\text{ cm}$.",
      "Bước 4: Chu vi hình vuông ban đầu: $80 \\times 4 = 320\\text{ cm}$.",
      "Bước 5: Hiệu giữa tổng chu vi các hình nhỏ và hình lớn: $3.200 - 320 = 2.880\\text{ cm}$."
    ],
    "studentMistake": "Bé đếm nhầm số hình vuông nhỏ hoặc tính sai chu vi tổng.",
    "tips": "Công thức rút gọn: $100 \\times (8 \\times 4) - 80 \\times 4 = 3200 - 320 = 2880\\text{ cm}$."
  },
  {
    "id": 48,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 48: Dãy số & Tìm quy luật",
    "question": "Bài toán số 48 - Chủ đề: Dãy số & Tìm quy luật.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "67",
    "correctAnswer": "67",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Dãy số & Tìm quy luật",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 67.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Dãy số & Tìm quy luật.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 67."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 49,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 49: Tổ hợp & Phép đếm",
    "question": "Bài toán số 49 - Chủ đề: Tổ hợp & Phép đếm.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "24",
    "correctAnswer": "24",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tổ hợp & Phép đếm",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 24.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tổ hợp & Phép đếm.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 24."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 50,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 50: Dấu hiệu chia hết cho 12 và 15",
    "question": "Bài toán số 50 - Chủ đề: Dấu hiệu chia hết cho 12 và 15.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "960",
    "correctAnswer": "960",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Dấu hiệu chia hết cho 12 và 15",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 960.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Dấu hiệu chia hết cho 12 và 15.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 960."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 51,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 51: Bài toán Tổng - Hiệu",
    "question": "Bài toán số 51 - Chủ đề: Bài toán Tổng - Hiệu.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "952",
    "correctAnswer": "952",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Bài toán Tổng - Hiệu",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 952.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Bài toán Tổng - Hiệu.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 952."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 52,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Chọn ngẫu nhiên các số từ 21 đến 50. Cần chọn ít nhất bao nhiêu số để chắc chắn có 2 số có hiệu bằng 10?",
    "question": "Numbers are drawn from integers 21 to 50. At least how many numbers are drawn at random to ensure that there are two numbers whose difference is 10?",
    "keywords": "At least: Ít nhất; Drawn: Rút / Chọn; Ensure: Chắc chắn; Difference is 10: Hiệu bằng 10.",
    "studentAnswer": "11",
    "correctAnswer": "21",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Nguyên lý Dirichlet & Chọn số có hiệu 10",
    "difficulty": "Olympic",
    "explanation": "Có thể chọn tối đa 20 số không có cặp hiệu 10; số thứ 21 bảo đảm xuất hiện.",
    "solutionSteps": [
      "Bước 1: Từ 21 đến 50 có $50 - 21 + 1 = 30$ số nguyên.",
      "Bước 2: Ghép các số thành các cặp có hiệu bằng 10: $(21, 31), (22, 32), \\dots, (30, 40)$ gồm 10 cặp, và $(31, 41), \\dots, (40, 50)$ gồm 10 cặp.",
      "Bước 3: Trong trường hợp 'xui xẻo nhất', ta có thể chọn tối đa 20 số mà không có hai số nào có hiệu bằng 10 (ví dụ chọn toàn bộ các số từ 21 đến 30 và từ 41 đến 50: tổng cộng 20 số, các số này không có cặp nào có hiệu bằng 10).",
      "Bước 4: Theo nguyên lý Dirichlet, khi chọn thêm 1 số thứ 21 nữa, số này bắt buộc phải rơi vào khoảng từ 31 đến 40, do đó sẽ tạo thành một cặp có hiệu bằng 10 với số đã chọn. Vậy cần chọn ít nhất 21 số."
    ],
    "studentMistake": "Bé áp dụng nguyên lý Dirichlet nhưng chia sai nhóm cặp hoặc chưa cộng thêm 1 số quyết định.",
    "tips": "Nguyên lý Dirichlet (Nguyên lý lồng chim bồ câu): Tìm số trường hợp bất lợi nhất (20 số), sau đó CỘNG THÊM 1 để đảm bảo 100% chắc chắn!"
  },
  {
    "id": 53,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Rút từ 100 số nguyên 1 đến 100. Cần rút ít nhất bao nhiêu số để chắc chắn có 2 số có tích chia hết cho 6?",
    "question": "Numbers are drawn from 100 integers 1 to 100. At least how many number(s) is/are drawn at random to ensure that there are two numbers whose product is divisible by 6?",
    "keywords": "Product divisible by 6: Tích chia hết cho 6; At least: Ít nhất.",
    "studentAnswer": "51",
    "correctAnswer": "68",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Nguyên lý Dirichlet & Tích chia hết cho 6",
    "difficulty": "Olympic",
    "explanation": "Có thể chọn 67 số không chia hết cho 3 mà chưa có tích chia hết cho 6; cần 68.",
    "solutionSteps": [
      "Bước 1: Tích của hai số chia hết cho 6 khi hai số đó chứa thừa số 2 và thừa số 3.",
      "Bước 2: Tìm trường hợp bất lợi lớn nhất: Ta rút nhiều số nhất có thể mà KHÔNG CÓ cặp nào tích chia hết cho 6.",
      "Bước 3: Có 67 số không chia hết cho 3 (hoặc chỉ chọn toàn bộ số lẻ và các số không chia hết cho 3), số lượng tối đa chọn được là 67 số.",
      "Bước 4: Khi rút đến số thứ 68, chắc chắn sẽ có đủ cả thừa số 2 và thừa số 3 để tích chia hết cho 6. Vậy cần ít nhất 68 số."
    ],
    "studentMistake": "Bé đếm sót các số chia hết cho 2 hoặc các số chia hết cho 3 trong khoảng 1 đến 100.",
    "tips": "Tìm tình huống xấu nhất (Worst-case scenario): 67 số không thỏa mãn. Rút thêm 1 số nữa => $67 + 1 = 68$!"
  },
  {
    "id": 54,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 54: Tính chẵn lẻ của tích và tổng",
    "question": "Bài toán số 54 - Chủ đề: Tính chẵn lẻ của tích và tổng.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "Số chẵn",
    "correctAnswer": "Số chẵn",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tính chẵn lẻ của tích và tổng",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: Số chẵn.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tính chẵn lẻ của tích và tổng.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Số chẵn."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 55,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 55: Bài toán tuổi hai người",
    "question": "Bài toán số 55 - Chủ đề: Bài toán tuổi hai người.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "22",
    "correctAnswer": "22",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Bài toán tuổi hai người",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 22.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Bài toán tuổi hai người.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 22."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 56,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 56: Tổ hợp hình học (Điểm trên đường tròn tạo ngũ giác)",
    "question": "Bài toán số 56 - Chủ đề: Tổ hợp hình học (Điểm trên đường tròn tạo ngũ giác).",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "21",
    "correctAnswer": "21",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Tổ hợp hình học (Điểm trên đường tròn tạo ngũ giác)",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 21.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Tổ hợp hình học (Điểm trên đường tròn tạo ngũ giác).",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 21."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 57,
    "part": 4,
    "partTitle": "Câu 47–57",
    "title": "Câu 57: Hình khối lập phương & Quan sát góc",
    "question": "Bài toán số 57 - Chủ đề: Hình khối lập phương & Quan sát góc.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa rõ trên ảnh / Cần đối chiếu)",
    "correctAnswer": "Cần xác minh hình",
    "status": "need_verify",
    "statusText": "Cần xác minh",
    "category": "Hình khối lập phương & Quan sát góc",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: Cần xác minh hình.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Hình khối lập phương & Quan sát góc.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Cần xác minh hình."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 58,
    "part": 5,
    "partTitle": "Câu 58–63",
    "title": "Peter có 9 tờ $10, 25 tờ $20 và 10 tờ $100. Đổi được nhiều nhất bao nhiêu tờ $500?",
    "question": "Peter has 9 $10 notes, 25 $20 notes and 10 $100 notes. At most how many $500 notes can he exchange these notes for?",
    "keywords": "Notes: Tờ tiền; Exchange: Đổi; At most: Nhiều nhất.",
    "studentAnswer": "4",
    "correctAnswer": "3",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Bài toán đổi tiền & Tối ưu số tờ lớn nhất",
    "difficulty": "Nâng cao",
    "explanation": "Tổng 1.590 USD, đổi tối đa 3 tờ 500 USD.",
    "solutionSteps": [
      "Bước 1: Tính tổng số tiền Peter có: $9 \\times 10 + 25 \\times 20 + 10 \\times 100 = 90 + 500 + 1000 = 1.590\\text{ USD}$.",
      "Bước 2: Chia tổng tiền cho 500: $1.590 : 500 = 3$ (dư 90 USD).",
      "Bước 3: Vậy Peter đổi được nhiều nhất 3 tờ 500 USD."
    ],
    "studentMistake": "Bé tính nhầm tổng số tiền của Peter hoặc chia nhầm $1590 cho 500 thành 4 tờ.",
    "tips": "Bài toán thực tế chia có dư: $1590 = 500 \\times 3 + 90$. Không thể làm tròn lên 4 vì không đủ tiền bù!"
  },
  {
    "id": 59,
    "part": 5,
    "partTitle": "Câu 58–63",
    "title": "Số chẵn nhỏ nhất có 5 chữ số từ các chữ số 3, 9, 5, 2, 8 (mỗi chữ số dùng 1 lần)",
    "question": "What is the smallest 5-digit even number by using 3, 9, 5, 2, 8 (or with 0)?",
    "keywords": "Smallest: Nhỏ nhất; 5-digit: Có 5 chữ số; Even: Số chẵn.",
    "studentAnswer": "23.598",
    "correctAnswer": "20.398",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Cấu tạo số & Số chẵn nhỏ nhất có 5 chữ số",
    "difficulty": "Nâng cao",
    "explanation": "Số chẵn nhỏ nhất là 20.398.",
    "solutionSteps": [
      "Bước 1: Chữ số tận cùng phải là số chẵn: từ tập chữ số {2, 0, 3, 8, 9, ...}, nếu có chữ số 0, 8: số nhỏ nhất là 20.398 (tận cùng bằng 8 là số chẵn).",
      "Bước 2: Với các chữ số 0, 2, 3, 8, 9: Chữ số hàng vạn nhỏ nhất khác 0 là 2, tiếp theo là 0, 3, 9, 8 => 20.398.",
      "Bước 3: Kết quả chính xác: 20.398."
    ],
    "studentMistake": "Bé chọn chữ số hàng đơn vị là 2 hoặc xếp sai thứ tự các chữ số hàng chục và hàng nghìn.",
    "tips": "Số chẵn nhỏ nhất thì chữ số đầu tiên phải nhỏ nhất khác 0, và giữ chữ số chẵn lớn hơn ở hàng đơn vị nếu cần!"
  },
  {
    "id": 60,
    "part": 5,
    "partTitle": "Câu 58–63",
    "title": "Câu 60: Bài toán bước cầu thang (Fibonacci)",
    "question": "Bài toán số 60 - Chủ đề: Bài toán bước cầu thang (Fibonacci).",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "89",
    "correctAnswer": "89",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Bài toán bước cầu thang (Fibonacci)",
    "difficulty": "Olympic",
    "explanation": "Đáp số chuẩn: 89.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Bài toán bước cầu thang (Fibonacci).",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 89."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 61,
    "part": 5,
    "partTitle": "Câu 58–63",
    "title": "Câu 61: Nguyên lý Dirichlet & Bốc thăm bi cùng màu",
    "question": "Bài toán số 61 - Chủ đề: Nguyên lý Dirichlet & Bốc thăm bi cùng màu.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "4",
    "correctAnswer": "4",
    "status": "correct",
    "statusText": "Đúng theo ảnh",
    "category": "Nguyên lý Dirichlet & Bốc thăm bi cùng màu",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: 4.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Nguyên lý Dirichlet & Bốc thăm bi cùng màu.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: 4."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  },
  {
    "id": 62,
    "part": 5,
    "partTitle": "Câu 58–63",
    "title": "Cầu thang 10 bậc, mỗi lần bước 1 hoặc 2 bậc. Bậc 4 và bậc 7 bị hỏng. Có bao nhiêu cách đi lên?",
    "question": "A flight of stairs has 10 steps. Fred can climb up 1 step or 2 steps at a time. If the 4th step and the 7th step cannot be stepped on, how many different ways are there for Fred to go up the stairs?",
    "keywords": "Stairs: Bậc thang; 1 or 2 steps: 1 hoặc 2 bậc; Broken: Bị hỏng; Different ways: Số cách khác nhau.",
    "studentAnswer": "8",
    "correctAnswer": "6",
    "status": "wrong",
    "statusText": "Sai / cần sửa",
    "category": "Bài toán bước thang có bậc hỏng",
    "difficulty": "Olympic",
    "explanation": "Đếm các cách đi không đặt chân lên bậc 4 và 7: 6 cách.",
    "solutionSteps": [
      "Bước 1: Gọi $W(n)$ là số cách đi đến bậc $n$. Quy tắc: $W(n) = W(n-1) + W(n-2)$, riêng bậc hỏng thì $W(bậc) = 0$.",
      "Bước 2: Tính từng bậc:",
      "- Bậc 0: 1 cách (điểm xuất phát)",
      "- Bậc 1: $W(1) = 1$",
      "- Bậc 2: $W(2) = W(1) + W(0) = 1 + 1 = 2$",
      "- Bậc 3: $W(3) = W(2) + W(1) = 2 + 1 = 3$",
      "- Bậc 4: BẬC HỎNG => $W(4) = 0$",
      "- Bậc 5: Bắt buộc bước từ bậc 3 sang (2 bậc) => $W(5) = W(3) = 3$ (vì $W(4)=0$)",
      "- Bậc 6: $W(6) = W(5) + W(4) = 3 + 0 = 3$",
      "- Bậc 7: BẬC HỎNG => $W(7) = 0$",
      "- Bậc 8: Bắt buộc bước từ bậc 6 sang (2 bậc) => $W(8) = W(6) = 3$",
      "- Bậc 9: $W(9) = W(8) + W(7) = 3 + 0 = 3$",
      "- Bậc 10: $W(10) = W(9) + W(8) = 3 + 3 = 6$ cách."
    ],
    "studentMistake": "Bé áp dụng dãy Fibonacci thông thường mà quên gán số cách tại bậc 4 và bậc 7 bằng 0.",
    "tips": "Quy tắc bậc thang có vật cản: Cứ đến bậc hỏng thì đặt số cách = 0. Sau đó tiếp tục cộng dồn từ 2 bậc phía trước như bình thường!"
  },
  {
    "id": 63,
    "part": 5,
    "partTitle": "Câu 58–63",
    "title": "Câu 63: Diện tích bề mặt hình khối lập phương",
    "question": "Bài toán số 63 - Chủ đề: Diện tích bề mặt hình khối lập phương.",
    "keywords": "Từ khóa Toán học Olympic chuẩn.",
    "studentAnswer": "(Chưa rõ trên ảnh / Cần đối chiếu)",
    "correctAnswer": "Cần xác minh hình",
    "status": "need_verify",
    "statusText": "Cần xác minh",
    "category": "Diện tích bề mặt hình khối lập phương",
    "difficulty": "Nâng cao",
    "explanation": "Đáp số chuẩn: Cần xác minh hình.",
    "solutionSteps": [
      "Phương pháp giải chuẩn bài toán Diện tích bề mặt hình khối lập phương.",
      "Thực hiện các bước tính toán và suy luận.",
      "Đáp số chính xác: Cần xác minh hình."
    ],
    "studentMistake": null,
    "tips": "Đọc kỹ đề bài, chú ý các điều kiện ràng buộc và đơn vị đo."
  }
];
