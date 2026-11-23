import { EducationLevel } from '../types/auth';
import { MathQuestion } from './mockData';

export interface ExamPaper {
  id: string;
  title: string;
  program: string;
  programName: string;
  level: EducationLevel;
  grade: string;
  year: number;
  round: string;
  durationMinutes: number;
  questionCount: number;
  difficulty: 'Cơ bản' | 'Nâng cao' | 'Olympic' | 'Olympic Quốc tế';
  description: string;
  questions: MathQuestion[];
}

export const EXAM_BANK: ExamPaper[] = [
  // =========================================================================
  // 1. ASMO 2025 – VÒNG QUỐC GIA (KHỐI 3 - DÀNH CHO RUBY ĐOÀN MINH CHÂU)
  // Thể lệ chuẩn ASMO Quốc tế: 25 câu hỏi (Phần A: 20 câu, Phần B: 5 câu), 90 phút, 100% Song ngữ Anh - Việt.
  // =========================================================================
  {
    id: 'exam_asmo_2025_l3',
    title: 'Đề Thi Toán Quốc Tế ASMO 2025 – Vòng Quốc Gia (Lớp 3)',
    program: 'ASMO',
    programName: 'Asian Science & Math Olympiad',
    level: 'primary',
    grade: 'Lớp 3',
    year: 2025,
    round: 'Vòng Quốc Gia (National Round)',
    durationMinutes: 90,
    questionCount: 25,
    difficulty: 'Olympic Quốc tế',
    description: 'Đề thi chính thức chuẩn 25 câu ASMO Quốc tế: Dãy số, logic thời gian, hình học chu vi, Dirichlet và bài toán tuổi (Song ngữ Anh - Việt).',
    questions: [
      {
            "id": 1,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 1: Arithmetic Sequence / Câu 1: Dãy số cách đều ASMO",
            "question": "Find the next number in the sequence: 3, 7, 11, 15, 19, ...\n(Tìm số tiếp theo trong dãy số sau: 3, 7, 11, 15, 19, ...)",
            "keywords": "Arithmetic sequence: Dãy số cách đều; Next term: Số tiếp theo.",
            "studentAnswer": "",
            "correctAnswer": "23",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Dãy số",
            "difficulty": "Cơ bản",
            "explanation": "Quy luật dãy số: Mỗi số hạng sau bằng số liền trước cộng 4. Số cần tìm: 19 + 4 = 23.",
            "solutionSteps": [
                  "Bước 1: Tính khoảng cách giữa 2 số liền nhau: 7 - 3 = 4, 11 - 7 = 4, 15 - 11 = 4.",
                  "Bước 2: Quy luật là cộng thêm 4 đơn vị.",
                  "Bước 3: Số tiếp theo = 19 + 4 = 23."
            ],
            "tips": "Lấy hiệu của hai số liền kề để tìm khoảng cách quy luật."
      },
      {
            "id": 2,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 2: Perimeter of Rectangle / Câu 2: Chu vi hình chữ nhật",
            "question": "A rectangular garden has a length of 18m, and its width is half of its length. What is the perimeter of the garden in meters?\n(Một mảnh vườn hình chữ nhật có chiều dài 18m, chiều rộng bằng một nửa chiều dài. Chu vi mảnh vườn đó là bao nhiêu mét?)",
            "keywords": "Perimeter: Chu vi; Length: Chiều dài; Width: Chiều rộng.",
            "studentAnswer": "",
            "correctAnswer": "54",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học & Đo lường",
            "difficulty": "Cơ bản",
            "explanation": "Chiều rộng: 18 : 2 = 9m. Chu vi: (18 + 9) × 2 = 54m.",
            "solutionSteps": [
                  "Bước 1: Chiều rộng mảnh vườn là: 18 : 2 = 9 (m).",
                  "Bước 2: Chu vi mảnh vườn hình chữ nhật: (Chiều dài + Chiều rộng) × 2 = (18 + 9) × 2 = 54 (m)."
            ],
            "tips": "Công thức chu vi hình chữ nhật: (dài + rộng) × 2 (cùng đơn vị đo)."
      },
      {
            "id": 3,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 3: Tree Planting Along Road / Câu 3: Bài toán trồng cây hai đầu đường",
            "question": "Along a straight road 40m long, trees are planted 5m apart from each other. How many trees are planted if there is a tree at both ends of the road?\n(Trên một đoạn đường thẳng dài 40m, người ta trồng các cây cách đều nhau 5m. Hỏi trồng được tất cả bao nhiêu cây nếu cả hai đầu đường đều có cây?)",
            "keywords": "Interval: Khoảng cách; Trees: Số cây; Both ends: Cả hai đầu.",
            "studentAnswer": "",
            "correctAnswer": "9",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán trồng cây",
            "difficulty": "Trung bình",
            "explanation": "Số khoảng cách là: 40 : 5 = 8 khoảng. Vì trồng ở cả hai đầu đường nên số cây = số khoảng + 1 = 8 + 1 = 9 cây.",
            "solutionSteps": [
                  "Bước 1: Tính số khoảng cách giữa các cây: 40 : 5 = 8 (khoảng).",
                  "Bước 2: Vì trồng cả hai đầu đường nên: Số cây = Số khoảng cách + 1 = 8 + 1 = 9 (cây)."
            ],
            "tips": "Trồng cả 2 đầu: Số cây = Khoảng cách + 1. Không trồng 2 đầu: Số cây = Khoảng cách - 1."
      },
      {
            "id": 4,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 4: Sisters Age Difference / Câu 4: Bài toán tuổi tác hai chị em",
            "question": "Lisa is 4 years older than Ruby. In 3 years, the sum of their ages will be 22. How old is Ruby now?\n(Chị Lisa hơn em Ruby 4 tuổi. Sau 3 năm nữa, tổng số tuổi của hai chị em là 22 tuổi. Hỏi hiện nay Ruby bao nhiêu tuổi?)",
            "keywords": "Age difference: Hiệu số tuổi (không đổi theo thời gian); Current age: Tuổi hiện tại.",
            "studentAnswer": "",
            "correctAnswer": "6",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán tính tuổi",
            "difficulty": "Trung bình",
            "explanation": "Sau 3 năm, mỗi người tăng 3 tuổi => hiện nay tổng tuổi là 22 - 3 × 2 = 16. Tuổi Ruby: (16 - 4) : 2 = 6 tuổi.",
            "solutionSteps": [
                  "Bước 1: Sau 3 năm, tổng tuổi tăng thêm: 3 × 2 = 6 (tuổi).",
                  "Bước 2: Tổng số tuổi hiện nay của hai chị em: 22 - 6 = 16 (tuổi).",
                  "Bước 3: Hiệu số tuổi không đổi là 4 tuổi. Tuổi của em Ruby hiện nay: (16 - 4) : 2 = 6 (tuổi)."
            ],
            "tips": "Hiệu số tuổi của hai người không bao giờ thay đổi theo thời gian."
      },
      {
            "id": 5,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 5: Facing Book Pages / Câu 5: Số trang sách đối diện",
            "question": "Ruby opens a book and sees that the sum of the page numbers of two facing pages is 73. What is the smaller page number?\n(Ruby mở một cuốn sách và thấy tổng hai số trang của hai trang đối diện mở ra là 73. Hỏi số trang nhỏ hơn là bao nhiêu?)",
            "keywords": "Facing pages: Hai trang đối diện (hai số tự nhiên liên tiếp).",
            "studentAnswer": "",
            "correctAnswer": "36",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Cấu tạo số",
            "difficulty": "Cơ bản",
            "explanation": "Hai trang sách đối diện là 2 số tự nhiên liên tiếp hơn kém nhau 1 đơn vị. Trang nhỏ = (73 - 1) : 2 = 36.",
            "solutionSteps": [
                  "Bước 1: Hai trang sách đối diện luôn là hai số tự nhiên liên tiếp: n và n + 1.",
                  "Bước 2: Ta có: n + (n + 1) = 73 => 2n + 1 = 73 => 2n = 72 => n = 36.",
                  "Bước 3: Số trang nhỏ hơn là 36 (trang lớn là 37)."
            ],
            "tips": "Hai trang sách đối diện nhau luôn là hai số tự nhiên liên tiếp."
      },
      {
            "id": 6,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 6: Multiplicative Sequence / Câu 6: Dãy số quy luật nhân",
            "question": "Find the next number in the sequence: 1, 2, 4, 8, 16, ...\n(Tìm số tiếp theo trong dãy số: 1, 2, 4, 8, 16, ...)",
            "keywords": "Powers of 2: Lũy thừa của 2; Double: Gấp đôi.",
            "studentAnswer": "",
            "correctAnswer": "32",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Dãy số",
            "difficulty": "Cơ bản",
            "explanation": "Mỗi số hạng sau bằng số hạng trước nhân với 2. Số tiếp theo: 16 × 2 = 32.",
            "solutionSteps": [
                  "Bước 1: 1 × 2 = 2; 2 × 2 = 4; 4 × 2 = 8; 8 × 2 = 16.",
                  "Bước 2: Quy luật: Số sau = Số trước × 2.",
                  "Bước 3: Số tiếp theo = 16 × 2 = 32."
            ],
            "tips": "Nếu khoảng cách tăng theo cấp số nhân, hãy nghĩ đến phép nhân hoặc lũy thừa."
      },
      {
            "id": 7,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 7: 25th Term of Sequence / Câu 7: Tìm số hạng thứ 25 trong dãy",
            "question": "Find the 25th term of the arithmetic sequence: 2, 5, 8, 11, 14, ...\n(Tìm số hạng thứ 25 của dãy số cách đều sau: 2, 5, 8, 11, 14, ...)",
            "keywords": "General term: Số hạng tổng quát = Số đầu + (n - 1) × d.",
            "studentAnswer": "",
            "correctAnswer": "74",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Dãy số",
            "difficulty": "Trung bình",
            "explanation": "Khoảng cách d = 3. Số hạng thứ 25 = 2 + (25 - 1) × 3 = 2 + 72 = 74.",
            "solutionSteps": [
                  "Bước 1: Xác định số đầu a1 = 2, khoảng cách d = 5 - 2 = 3.",
                  "Bước 2: Áp dụng công thức: Số thứ n = Số đầu + (n - 1) × Khoảng cách.",
                  "Bước 3: Số thứ 25 = 2 + (25 - 1) × 3 = 2 + 24 × 3 = 2 + 72 = 74."
            ],
            "tips": "Công thức vạn năng: Số thứ n = Số đầu + (n - 1) × khoảng cách."
      },
      {
            "id": 8,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 8: Clock Chiming / Câu 8: Tiếng chuông đồng hồ reo",
            "question": "A wall clock takes 6 seconds to strike 4 o'clock (4 chimes). How many seconds will it take to strike 8 o'clock (8 chimes)?\n(Một chiếc đồng hồ quả lắc mất 6 giây để điểm 4 tiếng chuông. Hỏi chiếc đồng hồ đó mất bao nhiêu giây để điểm 8 tiếng chuông?)",
            "keywords": "Interval between chimes: Khoảng thời gian giữa 2 tiếng chuông = Thời gian / (Số tiếng - 1).",
            "studentAnswer": "",
            "correctAnswer": "14",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán khoảng cách thời gian",
            "difficulty": "Nâng cao",
            "explanation": "4 tiếng chuông có 4 - 1 = 3 khoảng nghỉ. Mỗi khoảng nghỉ: 6 : 3 = 2 giây. 8 tiếng chuông có 7 khoảng nghỉ: 7 × 2 = 14 giây.",
            "solutionSteps": [
                  "Bước 1: 4 tiếng chuông có: 4 - 1 = 3 khoảng cách thời gian giữa các tiếng.",
                  "Bước 2: Thời gian của 1 khoảng cách: 6 : 3 = 2 (giây).",
                  "Bước 3: 8 tiếng chuông có: 8 - 1 = 7 khoảng cách thời gian.",
                  "Bước 4: Tổng thời gian để điểm 8 tiếng: 7 × 2 = 14 (giây)."
            ],
            "tips": "Cẩn thận bẫy: Tính theo số khoảng thời gian giữa các tiếng chuông, không phải số tiếng chuông!"
      },
      {
            "id": 9,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 9: Counting Digit 8 / Câu 9: Đếm số lượng chữ số 8",
            "question": "How many times does the digit 8 appear when writing all natural numbers from 1 to 100?\n(Chữ số 8 xuất hiện bao nhiêu lần khi viết tất cả các số tự nhiên từ 1 đến 100?)",
            "keywords": "Digit frequency: Tần suất xuất hiện chữ số; Units and Tens: Hàng đơn vị và hàng chục.",
            "studentAnswer": "",
            "correctAnswer": "20",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Đếm chữ số",
            "difficulty": "Trung bình",
            "explanation": "Hàng đơn vị xuất hiện 10 lần (8, 18, 28, ..., 98). Hàng chục xuất hiện 10 lần (80, 81, ..., 89). Riêng số 88 có 2 chữ số 8 đã tính ở cả hai hàng. Tổng = 10 + 10 = 20 lần.",
            "solutionSteps": [
                  "Bước 1: Chữ số 8 ở hàng đơn vị: 8, 18, 28, 38, 48, 58, 68, 78, 88, 98 -> Có 10 chữ số 8.",
                  "Bước 2: Chữ số 8 ở hàng chục: 80, 81, 82, 83, 84, 85, 86, 87, 88, 89 -> Có 10 chữ số 8.",
                  "Bước 3: Tổng số lần xuất hiện: 10 + 10 = 20 (lần)."
            ],
            "tips": "Từ 1 đến 100, mỗi chữ số từ 1 đến 9 xuất hiện đúng 20 lần."
      },
      {
            "id": 10,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 10: Pigeonhole Principle Marbles / Câu 10: Nguyên lý Dirichlet bốc bi trong túi",
            "question": "A bag contains 6 red marbles, 8 blue marbles, and 10 yellow marbles. Without looking into the bag, what is the least number of marbles Ruby must draw to be absolutely sure of having at least 2 marbles of the same color?\n(Trong một chiếc túi có 6 viên bi đỏ, 8 viên bi xanh và 10 viên bi vàng. Không nhìn vào túi, hỏi Ruby phải lấy ra ít nhất bao nhiêu viên bi để chắc chắn có ít nhất 2 viên bi cùng màu?)",
            "keywords": "Pigeonhole principle: Nguyên lý Dirichlet; Worst-case scenario: Trường hợp xấu nhất.",
            "studentAnswer": "",
            "correctAnswer": "4",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán logic Dirichlet",
            "difficulty": "Trung bình",
            "explanation": "Có 3 màu khác nhau. Trường hợp xấu nhất lấy 3 viên đầu tiên thuộc 3 màu khác nhau (1 đỏ, 1 xanh, 1 vàng). Viên thứ 4 chắc chắn sẽ cùng màu với 1 trong 3 viên trước. Vậy cần bốc: 3 + 1 = 4 viên.",
            "solutionSteps": [
                  "Bước 1: Xác định số loại màu bi có trong túi: 3 màu (Đỏ, Xanh, Vàng).",
                  "Bước 2: Xét trường hợp xấu nhất: Bốc 3 viên đều ra 3 màu khác nhau (1 đỏ, 1 xanh, 1 vàng).",
                  "Bước 3: Lấy thêm 1 viên nữa (viên thứ 4), viên này bắt buộc phải trùng màu với một trong 3 viên đã lấy.",
                  "Bước 4: Số viên ít nhất cần lấy: 3 + 1 = 4 (viên bi)."
            ],
            "tips": "Nguyên lý Dirichlet: Muốn có k vật cùng loại, số lần bốc tối thiểu = (Số loại màu) × (k - 1) + 1."
      },
      {
            "id": 11,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 11: Sum of Consecutive Odds / Câu 11: Tổng các số lẻ liên tiếp",
            "question": "Calculate the sum: S = 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19.\n(Tính tổng của 10 số lẻ liên tiếp: S = 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19.)",
            "keywords": "Sum of odd numbers: Tổng n số lẻ liên tiếp = n².",
            "studentAnswer": "",
            "correctAnswer": "100",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Tính nhanh",
            "difficulty": "Cơ bản",
            "explanation": "Tổng của 10 số lẻ liên tiếp từ 1 bằng 10² = 100. Hoặc ghép cặp: (1+19) + (3+17) + ... = 20 × 5 = 100.",
            "solutionSteps": [
                  "Bước 1: Nhận xét đây là dãy số cách đều có khoảng cách bằng 2.",
                  "Bước 2: Ghép cặp đối xứng: (1 + 19) + (3 + 17) + (5 + 15) + (7 + 13) + (9 + 11) = 20 × 5 = 100.",
                  "Bước 3: Hoặc dùng công thức tổng n số lẻ đầu tiên: n² = 10² = 100."
            ],
            "tips": "Tổng của n số lẻ liên tiếp đầu tiên bắt đầu từ 1 luôn bằng n × n."
      },
      {
            "id": 12,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 12: Area of Square from Perimeter / Câu 12: Diện tích hình vuông từ chu vi",
            "question": "A square has a perimeter of 32 cm. What is the area of the square in cm²?\n(Một hình vuông có chu vi là 32 cm. Diện tích của hình vuông đó là bao nhiêu cm²?)",
            "keywords": "Square: Hình vuông; Side: Cạnh = Chu vi / 4; Area: Diện tích = Cạnh × Cạnh.",
            "studentAnswer": "",
            "correctAnswer": "64",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học & Đo lường",
            "difficulty": "Cơ bản",
            "explanation": "Cạnh hình vuông: 32 : 4 = 8 cm. Diện tích hình vuông: 8 × 8 = 64 cm².",
            "solutionSteps": [
                  "Bước 1: Tìm độ dài cạnh hình vuông: Cạnh = Chu vi : 4 = 32 : 4 = 8 (cm).",
                  "Bước 2: Tính diện tích hình vuông: Diện tích = Cạnh × Cạnh = 8 × 8 = 64 (cm²)."
            ],
            "tips": "Cạnh = Chu vi : 4; Diện tích = Cạnh × Cạnh."
      },
      {
            "id": 13,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 13: Chickens and Rabbits / Câu 13: Bài toán gà và thỏ (Giả thiết tạm)",
            "question": "In a yard there are 10 animals consisting of chickens and rabbits. Together they have 28 legs. How many rabbits are there? (A chicken has 2 legs, a rabbit has 4 legs).\n(Trong sân có 10 con vật gồm cả gà và thỏ. Đếm được tất cả 28 cái chân. Hỏi có bao nhiêu con thỏ? (Biết gà có 2 chân, thỏ có 4 chân).)",
            "keywords": "Chickens and Rabbits: Giả thiết tạm; Legs: Số chân.",
            "studentAnswer": "",
            "correctAnswer": "4",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán tư duy thực tế",
            "difficulty": "Trung bình",
            "explanation": "Giả sử cả 10 con đều là gà: số chân là 10 × 2 = 20 chân. Số chân bị thiếu: 28 - 20 = 8 chân. Mỗi con thỏ hơn gà: 4 - 2 = 2 chân. Số thỏ = 8 : 2 = 4 con.",
            "solutionSteps": [
                  "Bước 1: Giả thiết tạm tất cả 10 con đều là gà. Tổng số chân khi đó là: 10 × 2 = 20 (chân).",
                  "Bước 2: Số chân thực tế nhiều hơn giả thiết là: 28 - 20 = 8 (chân).",
                  "Bước 3: Thay 1 con gà bằng 1 con thỏ thì số chân tăng thêm: 4 - 2 = 2 (chân).",
                  "Bước 4: Số con thỏ là: 8 : 2 = 4 (con)."
            ],
            "tips": "Phương pháp giả thiết tạm: Giả sử tất cả thuộc về một loại có số chân ít hơn."
      },
      {
            "id": 14,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 14: Handshakes in Group / Câu 14: Bắt tay trong phòng",
            "question": "At a party, there are 6 friends. Every person shakes hands with every other person exactly once. How many handshakes take place in total?\n(Tại một buổi tiệc có 6 người bạn. Mỗi người đều bắt tay với tất cả những người còn lại đúng một lần. Hỏi có tất cả bao nhiêu cái bắt tay?)",
            "keywords": "Handshakes: Bắt tay = n × (n - 1) / 2.",
            "studentAnswer": "",
            "correctAnswer": "15",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Tổ hợp & Logic",
            "difficulty": "Trung bình",
            "explanation": "Người thứ nhất bắt với 5 người, người thứ hai với 4 người,... Tổng số bắt tay: 5 + 4 + 3 + 2 + 1 = 15 cái bắt tay. Hoặc 6 × 5 : 2 = 15.",
            "solutionSteps": [
                  "Bước 1: Có 6 người, mỗi người bắt tay với 5 người còn lại.",
                  "Bước 2: Tích số lần bắt tay: 6 × 5 = 30.",
                  "Bước 3: Vì hai người A và B bắt tay nhau chỉ tính là 1 cái bắt tay (bị lặp 2 lần), nên số bắt tay thực tế là: 30 : 2 = 15 (cái bắt tay)."
            ],
            "tips": "Công thức bắt tay của n người: n × (n - 1) : 2."
      },
      {
            "id": 15,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 15: Sawing Wooden Log / Câu 15: Cưa khúc gỗ",
            "question": "It takes 4 minutes to make one cut through a wooden log. How many minutes will it take to cut the log into 5 equal pieces?\n(Để cưa một khúc gỗ thành 2 đoạn mất 4 phút (1 mạch cưa). Hỏi muốn cưa khúc gỗ đó thành 5 đoạn bằng nhau thì mất bao nhiêu phút?)",
            "keywords": "Saw cuts: Số mạch cưa = Số đoạn - 1.",
            "studentAnswer": "",
            "correctAnswer": "16",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Mạch cưa",
            "difficulty": "Cơ bản",
            "explanation": "Muốn cưa thành 5 đoạn cần thực hiện 5 - 1 = 4 mạch cưa. Thời gian cưa: 4 × 4 = 16 phút.",
            "solutionSteps": [
                  "Bước 1: Để có 5 đoạn gỗ, cần cưa: 5 - 1 = 4 (mạch cưa).",
                  "Bước 2: Mỗi mạch cưa mất 4 phút. Tổng thời gian cần: 4 × 4 = 16 (phút)."
            ],
            "tips": "Số lần cưa luôn ít hơn số đoạn gỗ 1 lần: Số nhát cưa = Số đoạn - 1."
      },
      {
            "id": 16,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 16: Fraction of Day / Câu 16: Phân số thời gian trong ngày",
            "question": "A student sleeps 8 hours every day. What fraction of the entire day does the student spend sleeping?\n(Mỗi ngày một bạn học sinh ngủ 8 giờ. Hỏi thời gian ngủ chiếm mấy phần của cả ngày?)",
            "keywords": "Hours in day: 24 giờ một ngày; Fraction: Phân số tối giản.",
            "studentAnswer": "",
            "correctAnswer": "1/3",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Phân số & Đo lường",
            "difficulty": "Cơ bản",
            "explanation": "Một ngày có 24 giờ. Phân số thời gian ngủ: 8/24 = 1/3 ngày.",
            "solutionSteps": [
                  "Bước 1: Một ngày có 24 giờ.",
                  "Bước 2: Thời gian ngủ là 8 giờ. Lập phân số: 8 / 24.",
                  "Bước 3: Rút gọn phân số chia cả tử và mẫu cho 8: 8/24 = 1/3 (ngày)."
            ],
            "tips": "Rút gọn phân số về dạng tối giản nhất bằng cách chia cho ƯCLN."
      },
      {
            "id": 17,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 17: Digit Mystery Sum / Câu 17: Phép cộng chữ số bí ẩn",
            "question": "In the addition: 4A + 27 = B5, find the value of A + B.\n(Trong phép cộng: 4A + 27 = B5, tìm giá trị của A + B.)",
            "keywords": "Column addition: Cộng đặt tính thẳng cột.",
            "studentAnswer": "",
            "correctAnswer": "15",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Cấu tạo số",
            "difficulty": "Trung bình",
            "explanation": "Hàng đơn vị: A + 7 có tận cùng là 5 => A + 7 = 15 => A = 8 (nhớ 1). Hàng chục: 4 + 2 + 1(nhớ) = 7 = B => B = 7. Vậy A + B = 8 + 7 = 15.",
            "solutionSteps": [
                  "Bước 1: Xét cột đơn vị: A + 7 tận cùng là 5. Vì A là chữ số nên A + 7 = 15 => A = 8 (nhớ 1).",
                  "Bước 2: Xét cột hàng chục: 4 + 2 + 1 (nhớ) = 7. Do đó B = 7.",
                  "Bước 3: Giá trị của A + B = 8 + 7 = 15."
            ],
            "tips": "Cộng từ hàng đơn vị sang hàng chục và nhớ cộng thêm phần nhớ nếu có."
      },
      {
            "id": 18,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 18: Weight Difference / Câu 18: Hiệu khối lượng bột gạo",
            "question": "Bag A has 25 kg of rice and Bag B has 15 kg of rice. How many kilograms of rice must be moved from Bag A to Bag B so that both bags have equal amounts of rice?\n(Bao A có 25 kg gạo, bao B có 15 kg gạo. Hỏi phải chuyển bao nhiêu kg gạo từ bao A sang bao B để hai bao có khối lượng gạo bằng nhau?)",
            "keywords": "Transfer problem: Chuyển một phần để bằng nhau = Hiệu / 2.",
            "studentAnswer": "",
            "correctAnswer": "5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Số học",
            "difficulty": "Cơ bản",
            "explanation": "Bao A hơn bao B: 25 - 15 = 10 kg. Để bằng nhau, cần chuyển một nửa số chênh lệch: 10 : 2 = 5 kg.",
            "solutionSteps": [
                  "Bước 1: Bao A nhiều hơn bao B số kg là: 25 - 15 = 10 (kg).",
                  "Bước 2: Khi chuyển x kg từ A sang B thì A giảm x và B tăng x, chênh lệch giảm 2x.",
                  "Bước 3: Số kg cần chuyển là: 10 : 2 = 5 (kg)."
            ],
            "tips": "Số lượng chuyển để bằng nhau = (Số lớn - Số bé) : 2."
      },
      {
            "id": 19,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 19: Fibonacci-like Sequence / Câu 19: Dãy số tổng hai số liền trước",
            "question": "Find the missing number in the sequence: 1, 1, 2, 3, 5, 8, ___, 21.\n(Tìm số còn thiếu trong dãy số: 1, 1, 2, 3, 5, 8, ___, 21.)",
            "keywords": "Fibonacci: Mỗi số bằng tổng 2 số liền trước.",
            "studentAnswer": "",
            "correctAnswer": "13",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Dãy số",
            "difficulty": "Cơ bản",
            "explanation": "Dãy Fibonacci: Số sau bằng tổng hai số liền trước nó: 1+1=2, 1+2=3, 2+3=5, 3+5=8. Số cần tìm = 5 + 8 = 13. Kiểm tra tiếp: 8 + 13 = 21 (đúng).",
            "solutionSteps": [
                  "Bước 1: Nhận diện quy luật: 1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8.",
                  "Bước 2: Quy luật: Số hạng = Tổng hai số liền trước.",
                  "Bước 3: Số cần điền là: 5 + 8 = 13."
            ],
            "tips": "Dãy số Fibonacci rất phổ biến trong các kỳ thi toán quốc tế."
      },
      {
            "id": 20,
            "part": 1,
            "partTitle": "Part A: Multiple Choice & Short Answer (Questions 1 – 20) / Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)",
            "title": "Question 20: Equal Length Rope / Câu 20: Cắt dây bằng nhau",
            "question": "A rope 36m long is cut into two pieces such that one piece is twice as long as the other. How long is the shorter piece in meters?\n(Một sợi dây dài 36m được cắt thành hai đoạn sao cho đoạn dài gấp đôi đoạn ngắn. Hỏi đoạn dây ngắn dài bao nhiêu mét?)",
            "keywords": "Sum and ratio: Bài toán tìm hai số khi biết tổng và tỉ số.",
            "studentAnswer": "",
            "correctAnswer": "12",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán tỉ số",
            "difficulty": "Trung bình",
            "explanation": "Đoạn ngắn 1 phần, đoạn dài 2 phần. Tổng số phần bằng nhau: 1 + 2 = 3 phần. Chiều dài đoạn ngắn: 36 : 3 × 1 = 12m.",
            "solutionSteps": [
                  "Bước 1: Vẽ sơ đồ đoạn thẳng: Đoạn ngắn chiếm 1 phần, đoạn dài chiếm 2 phần.",
                  "Bước 2: Tổng số phần bằng nhau: 1 + 2 = 3 (phần).",
                  "Bước 3: Chiều dài của đoạn ngắn là: 36 : 3 × 1 = 12 (m)."
            ],
            "tips": "Giá trị một phần = Tổng : Tổng số phần bằng nhau."
      },
      {
            "id": 21,
            "part": 2,
            "partTitle": "Part B: Extended Problem Solving (Questions 21 – 25) / Phần B: Vận dụng nâng cao & Tự luận mở rộng (Câu 21 – 25)",
            "title": "Question 21: Area of Cross Figure / Câu 21: Diện tích hình chữ thập",
            "question": "Five identical squares, each of side length 4 cm, are arranged to form a cross shape. What is the perimeter and the area of the entire cross figure?\n(Năm hình vuông giống nhau, mỗi hình có cạnh 4 cm, được ghép lại thành một hình chữ thập. Tính chu vi và diện tích của toàn bộ hình chữ thập đó?)",
            "keywords": "Cross figure: Hình chữ thập; Perimeter: Chu vi; Area: Diện tích.",
            "studentAnswer": "",
            "correctAnswer": "48 cm và 80 cm²",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học nâng cao",
            "difficulty": "Olympic",
            "explanation": "Diện tích 1 hình vuông = 4 × 4 = 16 cm². Diện tích 5 hình vuông = 16 × 5 = 80 cm². Đường viền ngoài của hình chữ thập gồm 12 đoạn cạnh dài 4 cm. Chu vi = 12 × 4 = 48 cm.",
            "solutionSteps": [
                  "Bước 1: Diện tích mỗi hình vuông nhỏ: 4 × 4 = 16 (cm²).",
                  "Bước 2: Tổng diện tích cả 5 hình vuông: 16 × 5 = 80 (cm²).",
                  "Bước 3: Đếm số đoạn cạnh ở đường viền ngoài: Mỗi nhánh của hình chữ thập chìa ra 3 cạnh ngoài. Có 4 nhánh nên có 4 × 3 = 12 cạnh ngoài.",
                  "Bước 4: Chu vi hình chữ thập = 12 × 4 = 48 (cm)."
            ],
            "tips": "Chu vi chỉ tính các cạnh nằm ở đường viền ngoài cùng bao quanh hình."
      },
      {
            "id": 22,
            "part": 2,
            "partTitle": "Part B: Extended Problem Solving (Questions 21 – 25) / Phần B: Vận dụng nâng cao & Tự luận mở rộng (Câu 21 – 25)",
            "title": "Question 22: Three Friends Logic / Câu 22: Suy luận logic màu áo 3 bạn",
            "question": "Three friends Lan, Mai, and Hoa wear shirts of three colors: Red, Blue, and White (each wears a different color). Lan says: 'I do not wear Blue.' Mai says: 'I wear neither Blue nor Red.' What color shirt does each friend wear?\n(Ba bạn Lan, Mai, Hoa mặc ba chiếc áo màu: Đỏ, Xanh, Trắng (mỗi bạn một màu khác nhau). Lan nói: 'Tớ không mặc áo Xanh.' Mai nói: 'Tớ không mặc áo Xanh và cũng không mặc áo Đỏ.' Hỏi mỗi bạn mặc áo màu gì?)",
            "keywords": "Logic deduction: Suy luận logic bằng bảng loại trừ.",
            "studentAnswer": "",
            "correctAnswer": "Mai mặc Trắng, Lan mặc Đỏ, Hoa mặc Xanh",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán logic suy luận",
            "difficulty": "Olympic",
            "explanation": "Mai không mặc Xanh và không mặc Đỏ => Mai mặc áo Trắng. Còn lại hai màu Đỏ và Xanh. Lan không mặc áo Xanh => Lan mặc áo Đỏ. Vậy Hoa mặc áo Xanh.",
            "solutionSteps": [
                  "Bước 1: Phân tích câu nói của Mai: Mai không mặc Xanh, không mặc Đỏ. Do đó Mai bắt buộc mặc áo màu Trắng.",
                  "Bước 2: Còn lại hai bạn Lan và Hoa phân chia hai màu Đỏ và Xanh.",
                  "Bước 3: Lan nói không mặc áo Xanh, nên Lan phải mặc áo màu Đỏ.",
                  "Bước 4: Vậy bạn Hoa mặc áo màu Xanh."
            ],
            "tips": "Bắt đầu suy luận từ bạn có nhiều thông tin phủ định nhất."
      },
      {
            "id": 23,
            "part": 2,
            "partTitle": "Part B: Extended Problem Solving (Questions 21 – 25) / Phần B: Vận dụng nâng cao & Tự luận mở rộng (Câu 21 – 25)",
            "title": "Question 23: Water Bucket Weighing / Câu 23: Khối lượng thùng nước khi vơi một nửa",
            "question": "A bucket completely full of water weighs 18 kg. When half of the water is poured out, the bucket and the remaining water weigh 10 kg. What is the weight of the empty bucket in kg?\n(Một thùng chứa đầy nước nặng 18 kg. Khi đổ bớt đi một nửa lượng nước thì cả thùng và số nước còn lại nặng 10 kg. Hỏi chiếc thùng rỗng nặng bao nhiêu kg?)",
            "keywords": "Empty bucket: Khối lượng vỏ thùng; Half of water: Một nửa lượng nước.",
            "studentAnswer": "",
            "correctAnswer": "2",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Cân nặng",
            "difficulty": "Olympic",
            "explanation": "Khối lượng một nửa lượng nước đổ đi: 18 - 10 = 8 kg. Khối lượng toàn bộ nước khi đầy thùng: 8 × 2 = 16 kg. Khối lượng của vỏ thùng rỗng: 18 - 16 = 2 kg.",
            "solutionSteps": [
                  "Bước 1: Lượng nước đổ đi bằng đúng một nửa số nước trong thùng.",
                  "Bước 2: Khối lượng của một nửa lượng nước đó là: 18 - 10 = 8 (kg).",
                  "Bước 3: Khối lượng của toàn bộ nước khi chứa đầy thùng: 8 × 2 = 16 (kg).",
                  "Bước 4: Khối lượng của vỏ thùng rỗng là: 18 - 16 = 2 (kg)."
            ],
            "tips": "Khối lượng giảm đi chính là khối lượng của lượng nước đã đổ bớt."
      },
      {
            "id": 24,
            "part": 2,
            "partTitle": "Part B: Extended Problem Solving (Questions 21 – 25) / Phần B: Vận dụng nâng cao & Tự luận mở rộng (Câu 21 – 25)",
            "title": "Question 24: Missing Pages Sum / Câu 24: Tổng trang sách bị xé rách",
            "question": "A sheet of paper torn from a storybook contains two facing pages. The product of the two page numbers is 182. What is the sum of these two page numbers?\n(Một tờ giấy bị xé rời khỏi quyển truyện gồm hai trang sách đối diện nhau. Biết tích của hai số trang đó là 182. Hỏi tổng của hai số trang đó bằng bao nhiêu?)",
            "keywords": "Facing pages: Hai số tự nhiên liên tiếp có tích bằng 182.",
            "studentAnswer": "",
            "correctAnswer": "27",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Tích số liên tiếp",
            "difficulty": "Olympic",
            "explanation": "Hai trang sách đối diện là 2 số tự nhiên liên tiếp n và n + 1. Ta có n × (n + 1) = 182. Vì 13 × 14 = 182 nên hai trang sách là 13 và 14. Tổng của chúng = 13 + 14 = 27.",
            "solutionSteps": [
                  "Bước 1: Hai trang sách đối diện là hai số tự nhiên liên tiếp.",
                  "Bước 2: Phân tích 182 ra thừa số nguyên tố: 182 = 2 × 7 × 13 = 14 × 13.",
                  "Bước 3: Hai số tự nhiên liên tiếp có tích bằng 182 là 13 và 14.",
                  "Bước 4: Tổng hai số trang là: 13 + 14 = 27."
            ],
            "tips": "Ước lượng căn bậc hai: √182 ≈ 13.5 để thử các số 13 và 14."
      },
      {
            "id": 25,
            "part": 2,
            "partTitle": "Part B: Extended Problem Solving (Questions 21 – 25) / Phần B: Vận dụng nâng cao & Tự luận mở rộng (Câu 21 – 25)",
            "title": "Question 25: Perimeter of Combined Rectangle / Câu 25: Ghép 6 hình chữ nhật nhỏ thành hình vuông",
            "question": "Six identical small rectangles are arranged to form a large square with an area of 144 cm². What is the perimeter of one small rectangle in centimeters?\n(Sáu hình chữ nhật nhỏ giống hệt nhau được ghép lại để tạo thành một hình vuông lớn có diện tích 144 cm². Tính chu vi của một hình chữ nhật nhỏ theo xăng-ti-mét?)",
            "keywords": "Combined rectangle: Ghép hình chữ nhật; Perimeter: Chu vi hình nhỏ.",
            "studentAnswer": "",
            "correctAnswer": "28",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học nâng cao Olympic",
            "difficulty": "Olympic Quốc tế",
            "explanation": "Cạnh hình vuông lớn = √144 = 12 cm. 6 hình chữ nhật ghép song song dọc theo cạnh 12 cm thì chiều dài = 12 cm và chiều rộng = 12 : 6 = 2 cm. Chu vi hình chữ nhật nhỏ = (12 + 2) × 2 = 28 cm.",
            "solutionSteps": [
                  "Bước 1: Tìm cạnh của hình vuông lớn: Cạnh × Cạnh = 144 => Cạnh hình vuông = 12 (cm).",
                  "Bước 2: Trường hợp 6 hình chữ nhật nhỏ xếp song song cạnh nhau dọc theo một cạnh của hình vuông: Chiều dài mỗi hình chữ nhật nhỏ đúng bằng cạnh hình vuông = 12 (cm).",
                  "Bước 3: Chiều rộng mỗi hình chữ nhật nhỏ = 12 : 6 = 2 (cm).",
                  "Bước 4: Chu vi một hình chữ nhật nhỏ là: (Chiều dài + Chiều rộng) × 2 = (12 + 2) × 2 = 28 (cm)."
            ],
            "tips": "Tính cạnh hình vuông trước từ diện tích: S = a × a."
      }
]
  },

  // =========================================================================
  // 2. IKMC KANGAROO 2024 – BẢNG ECOLIER (KHỐI 3 – 4)
  // Thể lệ chuẩn IKMC: 24 câu hỏi (Phần A: 8 câu 3 điểm, Phần B: 8 câu 4 điểm, Phần C: 8 câu 5 điểm), 75 phút, 100% Song ngữ Anh - Việt.
  // =========================================================================
  {
    id: 'exam_ikmc_2024_l34',
    title: 'Kỳ Thi Toán Quốc Tế Kangaroo IKMC – Cấp Độ Ecolier (Lớp 3 – 4)',
    program: 'IKMC',
    programName: 'International Kangaroo Math Contest',
    level: 'primary',
    grade: 'Lớp 3 - 4',
    year: 2024,
    round: 'Vòng Độc Quyền Quốc Tế',
    durationMinutes: 75,
    questionCount: 24,
    difficulty: 'Olympic',
    description: 'Đề thi chuẩn 24 câu hỏi trắc nghiệm Kangaroo: Đố vui logic, xúc xắc, bánh răng, gấp giấy và tháp số (Song ngữ Anh - Việt).',
    questions: [
      {
            "id": 1,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 1: Mushroom Walk / Câu 1: Đường đi hái nấm của chú nhím",
            "question": "A hedgehog walked along a path and picked up mushrooms. On the first day, he picked 3 mushrooms. Each following day, he picked 2 more mushrooms than the day before. How many mushrooms did he pick on the 4th day?\n(Một chú nhím đi dọc con đường và hái nấm. Ngày đầu tiên chú hái được 3 cây nấm. Mỗi ngày tiếp theo chú đều hái được nhiều hơn ngày trước 2 cây nấm. Hỏi vào ngày thứ 4, chú nhím hái được bao nhiêu cây nấm?)",
            "keywords": "Hedgehog: Chú nhím; More than: Nhiều hơn; 4th day: Ngày thứ tư.",
            "studentAnswer": "",
            "correctAnswer": "9",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Dãy số quy luật",
            "difficulty": "Cơ bản",
            "explanation": "Ngày 1: 3 cây; Ngày 2: 3 + 2 = 5 cây; Ngày 3: 5 + 2 = 7 cây; Ngày 4: 7 + 2 = 9 cây nấm.",
            "solutionSteps": [
                  "Bước 1: Ngày 1 chú hái: 3 cây.",
                  "Bước 2: Ngày 2 chú hái: 3 + 2 = 5 cây.",
                  "Bước 3: Ngày 3 chú hái: 5 + 2 = 7 cây.",
                  "Bước 4: Ngày 4 chú hái: 7 + 2 = 9 cây nấm."
            ],
            "tips": "Cộng dồn 2 đơn vị qua mỗi ngày liên tiếp."
      },
      {
            "id": 2,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 2: Mirror Symmetry / Câu 2: Chữ số nhìn qua gương",
            "question": "When looking at the digital clock reading 12:05 in a mirror, how many of the digits 1, 2, 0, 5 change their appearance into a different valid digit?\n(Khi nhìn mặt đồng hồ điện tử hiển thị 12:05 qua một chiếc gương, có bao nhiêu chữ số trong số các chữ số 1, 2, 0, 5 bị đảo ngược hình dạng thành một chữ số hợp lệ khác?)",
            "keywords": "Mirror: Chiếc gương; Digital clock: Đồng hồ điện tử; Symmetry: Đối xứng.",
            "studentAnswer": "",
            "correctAnswer": "2",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học trực quan & Đối xứng",
            "difficulty": "Cơ bản",
            "explanation": "Chữ số 0 và 1 giữ nguyên hoặc chỉ đối xứng trục; chữ số 2 qua gương thành chữ số 5, và chữ số 5 qua gương thành chữ số 2 (cả hai đều thành chữ số hợp lệ khác). Vậy có 2 chữ số (chữ số 2 và 5).",
            "solutionSteps": [
                  "Bước 1: Xét chữ số 1 và 0: khi soi gương chúng không biến thành chữ số khác.",
                  "Bước 2: Xét chữ số 2: nét hiển thị 7 đoạn lật qua gương biến thành chữ số 5.",
                  "Bước 3: Xét chữ số 5: nét hiển thị 7 đoạn lật qua gương biến thành chữ số 2.",
                  "Bước 4: Cả 2 và 5 đều tạo thành một chữ số mới hợp lệ. Có tất cả 2 chữ số."
            ],
            "tips": "Trên màn hình LED 7 đoạn, số 2 và số 5 đối xứng gương của nhau."
      },
      {
            "id": 3,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 3: Missing Puzzle Piece / Câu 3: Mảnh ghép hình vuông còn thiếu",
            "question": "A square board of size 4×4 has 16 square cells. Kangaroo covers 12 cells with 3 identical L-trominoes (each covers 4 cells). How many empty cells are left on the board?\n(Một bảng hình vuông kích thước 4×4 gồm 16 ô vuông nhỏ. Chú Kangaroo che kín 12 ô bằng 3 mảnh ghép hình chữ L giống nhau (mỗi mảnh che 4 ô). Hỏi trên bảng còn lại bao nhiêu ô vuông trống?)",
            "keywords": "Square board: Bảng vuông; Covers: Che phủ; Empty cells: Ô trống.",
            "studentAnswer": "",
            "correctAnswer": "4",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học trực quan",
            "difficulty": "Cơ bản",
            "explanation": "Tổng số ô của bảng là 4 × 4 = 16 ô. 3 mảnh ghép che kín: 3 × 4 = 12 ô. Số ô trống còn lại: 16 - 12 = 4 ô vuông.",
            "solutionSteps": [
                  "Bước 1: Tính diện tích toàn bộ bảng: 4 × 4 = 16 ô.",
                  "Bước 2: Diện tích 3 mảnh ghép che phủ: 3 × 4 = 12 ô.",
                  "Bước 3: Số ô trống chưa bị che phủ: 16 - 12 = 4 ô."
            ],
            "tips": "Lấy tổng số ô trừ đi diện tích các mảnh đã che."
      },
      {
            "id": 4,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 4: Ladybug Spots / Câu 4: Đốm trên cánh bọ rùa",
            "question": "Four ladybugs sit on a leaf. Ladybug A has 4 spots, B has 6 spots, C has 7 spots, and D has 9 spots. Two ladybugs fly away, and the remaining two ladybugs have a total of 13 spots. Which two ladybugs remained?\n(Bốn con bọ rùa đậu trên chiếc lá. Bọ rùa A có 4 đốm, B có 6 đốm, C có 7 đốm và D có 9 đốm. Hai con bọ rùa bay đi, hai con còn lại có tổng cộng 13 đốm. Hỏi hai con bọ rùa nào còn lại?)",
            "keywords": "Ladybugs: Bọ rùa; Spots: Đốm tròn; Remaining: Còn lại.",
            "studentAnswer": "",
            "correctAnswer": "A và D hoặc B và C",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Tư duy tổng",
            "difficulty": "Cơ bản",
            "explanation": "Ta tìm cặp số có tổng bằng 13: 4 + 9 = 13 (bọ rùa A và D) hoặc 6 + 7 = 13 (bọ rùa B và C). Cả hai cặp đều có tổng 13.",
            "solutionSteps": [
                  "Bước 1: Liệt kê số đốm của 4 con: A=4, B=6, C=7, D=9.",
                  "Bước 2: Tìm hai số có tổng bằng 13: 4 + 9 = 13 (A và D); 6 + 7 = 13 (B và C).",
                  "Bước 3: Kết luận: Cặp A và D hoặc B và C."
            ],
            "tips": "Tìm các cặp số có tổng bằng số đã cho."
      },
      {
            "id": 5,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 5: Knot on a String / Câu 5: Dây luồn qua lỗ",
            "question": "A string of length 30 cm is tied into 5 equal loops by 4 knots. Each knot uses up 2 cm of string. How long is each loop in centimeters?\n(Một sợi dây dài 30 cm được chia thành các phần và buộc 4 nút thắt. Mỗi nút thắt làm tiêu tốn mất 2 cm chiều dài dây. Hỏi sau khi thắt 4 nút, chiều dài dây còn lại để chia đều là bao nhiêu cm?)",
            "keywords": "String: Sợi dây; Knots: Nút thắt; Loops: Vòng dây.",
            "studentAnswer": "",
            "correctAnswer": "22",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Đo lường",
            "difficulty": "Cơ bản",
            "explanation": "4 nút thắt chiếm: 4 × 2 = 8 cm. Chiều dài dây còn lại: 30 - 8 = 22 cm.",
            "solutionSteps": [
                  "Bước 1: Tính chiều dài dây bị mất do 4 nút thắt: 4 × 2 = 8 (cm).",
                  "Bước 2: Chiều dài dây còn lại hữu ích là: 30 - 8 = 22 (cm)."
            ],
            "tips": "Lấy tổng chiều dài ban đầu trừ đi phần hao hụt của các nút thắt."
      },
      {
            "id": 6,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 6: Coin Exchange / Câu 6: Đổi tiền xu Kangaroo",
            "question": "Maya has three 5-cent coins, four 2-cent coins, and five 1-cent coins. How much money does Maya have in total in cents?\n(Maya có ba đồng xu 5 xu, bốn đồng xu 2 xu và năm đồng xu 1 xu. Hỏi Maya có tất cả bao nhiêu xu?)",
            "keywords": "Coins: Đồng xu; Cents: Xu; In total: Tổng cộng.",
            "studentAnswer": "",
            "correctAnswer": "28",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Tiền tệ",
            "difficulty": "Cơ bản",
            "explanation": "Tổng số tiền: 3 × 5 + 4 × 2 + 5 × 1 = 15 + 8 + 5 = 28 xu.",
            "solutionSteps": [
                  "Bước 1: Tiền xu 5 xu: 3 × 5 = 15 xu.",
                  "Bước 2: Tiền xu 2 xu: 4 × 2 = 8 xu.",
                  "Bước 3: Tiền xu 1 xu: 5 × 1 = 5 xu.",
                  "Bước 4: Tổng số tiền: 15 + 8 + 5 = 28 xu."
            ],
            "tips": "Nhân số lượng đồng xu với mệnh giá của mỗi đồng rồi cộng tổng lại."
      },
      {
            "id": 7,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 7: Counting Small Cubes / Câu 7: Đếm khối lập phương bị thiếu",
            "question": "A solid block is built from 27 small unit cubes to form a 3×3×3 cube. Lisa removes 1 cube from each of the 8 corners. How many cubes remain in the solid?\n(Một khối lập phương lớn 3×3×3 được ghép từ 27 khối lập phương nhỏ. Lisa lấy đi 1 khối lập phương nhỏ ở mỗi góc trong số 8 góc. Hỏi khối hình còn lại bao nhiêu khối lập phương nhỏ?)",
            "keywords": "Solid cube: Khối lập phương; Corners: Góc; Removes: Lấy đi.",
            "studentAnswer": "",
            "correctAnswer": "19",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học không gian",
            "difficulty": "Cơ bản",
            "explanation": "Khối lập phương lớn có 8 góc (8 đỉnh). Lấy đi 8 khối ở 8 đỉnh, số khối còn lại: 27 - 8 = 19 khối.",
            "solutionSteps": [
                  "Bước 1: Khối lập phương có tất cả 8 đỉnh.",
                  "Bước 2: Mỗi đỉnh lấy đi 1 khối lập phương nhỏ, tổng cộng lấy đi 8 khối.",
                  "Bước 3: Số khối còn lại là: 27 - 8 = 19 (khối)."
            ],
            "tips": "Hình lập phương có 6 mặt, 8 đỉnh và 12 cạnh."
      },
      {
            "id": 8,
            "part": 1,
            "partTitle": "Part A: 3-point questions (Questions 1 – 8) / Phần A: Câu hỏi 3 điểm (Câu 1 – 8)",
            "title": "Question 8: Fence Posts & Intervals / Câu 8: Cọc rào và khoảng cách",
            "question": "A straight fence has 7 wooden posts placed in a line. The distance between any two adjacent posts is 3 meters. What is the total distance from the 1st post to the 7th post in meters?\n(Một hàng rào thẳng có 7 chiếc cọc gỗ cắm thành một đường thẳng. Khoảng cách giữa hai cọc liền kề nhau là 3 mét. Hỏi khoảng cách từ chiếc cọc thứ 1 đến chiếc cọc thứ 7 là bao nhiêu mét?)",
            "keywords": "Posts: Cọc rào; Distance: Khoảng cách; Adjacent: Liền kề.",
            "studentAnswer": "",
            "correctAnswer": "18",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán trồng cây & Khoảng cách",
            "difficulty": "Cơ bản",
            "explanation": "Có 7 chiếc cọc nên có 7 - 1 = 6 khoảng cách. Tổng khoảng cách: 6 × 3 = 18 mét.",
            "solutionSteps": [
                  "Bước 1: Số khoảng cách giữa 7 cọc là: 7 - 1 = 6 khoảng.",
                  "Bước 2: Mỗi khoảng dài 3 mét, tổng khoảng cách là: 6 × 3 = 18 (mét)."
            ],
            "tips": "Số khoảng cách = Số cọc - 1."
      },
      {
            "id": 9,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 9: Birthday Cake Slices / Câu 9: Cắt bánh sinh nhật",
            "question": "A round birthday cake is cut into 8 equal slices with 4 straight cuts passing through the center. Tony ate 2 slices and Ruby ate 3 slices. What fraction of the original cake remains?\n(Một chiếc bánh sinh nhật hình tròn được cắt thành 8 miếng bằng nhau bởi 4 nhát cắt thẳng đi qua tâm. Tony ăn 2 miếng và Ruby ăn 3 miếng. Hỏi còn lại mấy phần chiếc bánh ban đầu?)",
            "keywords": "Slices: Miếng bánh; Fraction: Phân số; Remains: Còn lại.",
            "studentAnswer": "",
            "correctAnswer": "3/8",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Phân số & Thực tế",
            "difficulty": "Trung bình",
            "explanation": "Tony và Ruby ăn tất cả: 2 + 3 = 5 miếng bánh. Chiếc bánh có 8 miếng nên còn lại: 8 - 5 = 3 miếng. Phân số biểu thị phần bánh còn lại: 3/8.",
            "solutionSteps": [
                  "Bước 1: Tổng số miếng Tony và Ruby đã ăn: 2 + 3 = 5 miếng.",
                  "Bước 2: Số miếng bánh còn lại: 8 - 5 = 3 miếng.",
                  "Bước 3: Phân số bánh còn lại là 3/8 chiếc bánh."
            ],
            "tips": "Lấy số miếng còn lại chia cho tổng số miếng bằng nhau ban đầu."
      },
      {
            "id": 10,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 10: Number Pyramid / Câu 10: Tháp số cộng dồn",
            "question": "In a number pyramid, each brick's number equals the sum of the two bricks directly beneath it. The bottom three bricks are 3, X, and 5 from left to right. The top brick is 18. What is the value of X?\n(Trong một tháp số, số ở mỗi viên gạch bằng tổng của hai viên gạch ngay bên dưới nó. Ba viên gạch ở hàng đáy từ trái sang phải là 3, X và 5. Viên gạch ở đỉnh tháp là 18. Tìm giá trị của X?)",
            "keywords": "Pyramid: Tháp số; Directly beneath: Ngay bên dưới; Top: Đỉnh tháp.",
            "studentAnswer": "",
            "correctAnswer": "5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đại số & Tháp số",
            "difficulty": "Trung bình",
            "explanation": "Hàng thứ hai gồm hai viên: (3 + X) và (X + 5). Viên đỉnh tháp là: (3 + X) + (X + 5) = 18 <=> 2X + 8 = 18 <=> 2X = 10 <=> X = 5.",
            "solutionSteps": [
                  "Bước 1: Viết biểu thức cho hàng thứ hai: viên trái là 3 + X; viên phải là X + 5.",
                  "Bước 2: Viên gạch trên cùng là tổng của hai viên hàng hai: (3 + X) + (X + 5) = 2X + 8.",
                  "Bước 3: Đặt bằng số ở đỉnh: 2X + 8 = 18.",
                  "Bước 4: Giải tìm X: 2X = 10 => X = 5."
            ],
            "tips": "Cộng dồn từ dưới lên hoặc bớt dần từ trên đỉnh xuống."
      },
      {
            "id": 11,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 11: Fold and Punch Paper / Câu 11: Gấp giấy và đục lỗ",
            "question": "A square sheet of paper is folded in half twice (first horizontally, then vertically) to form a smaller square of 1/4 the original size. One hole is punched through the center of the folded paper. How many holes are there when the paper is completely unfolded?\n(Một tờ giấy hình vuông được gấp đôi lại 2 lần (lần đầu theo chiều ngang, lần thứ hai theo chiều dọc) thành một hình vuông nhỏ bằng 1/4 ban đầu. Người ta đục 1 lỗ xuyên qua chính giữa tờ giấy đã gấp. Hỏi khi mở phẳng tờ giấy ra thì có tất cả bao nhiêu lỗ thủng?)",
            "keywords": "Folded in half: Gấp đôi; Punched: Đục lỗ; Unfolded: Mở phẳng ra.",
            "studentAnswer": "",
            "correctAnswer": "4",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Tư duy không gian",
            "difficulty": "Trung bình",
            "explanation": "Gấp đôi 2 lần tạo ra 2 × 2 = 4 lớp giấy. Đục 1 lỗ xuyên qua 4 lớp giấy thì khi mở ra sẽ có đúng 4 lỗ thủng phân bố đối xứng.",
            "solutionSteps": [
                  "Bước 1: Sau lần gấp thứ nhất, tờ giấy có 2 lớp.",
                  "Bước 2: Sau lần gấp thứ hai, tờ giấy có 2 × 2 = 4 lớp.",
                  "Bước 3: Một nhát đục xuyên qua cả 4 lớp tạo thành 4 lỗ trên 4 phần đối xứng của tờ giấy."
            ],
            "tips": "Số lớp giấy = 2^(số lần gấp đôi)."
      },
      {
            "id": 12,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 12: Opposite Faces of a Die / Câu 12: Mặt đối diện của con xúc xắc",
            "question": "On a standard die, the sum of dots on opposite faces is always 7. Two identical dice are glued together so that two touching faces have a sum of dots equal to 8. What is the sum of dots on the two outermost opposite faces?\n(Trên một con xúc xắc tiêu chuẩn, tổng số chấm ở hai mặt đối diện luôn luôn bằng 7. Hai con xúc xắc giống nhau được dán dính vào nhau sao cho hai mặt tiếp xúc có tổng số chấm bằng 8. Hỏi tổng số chấm ở hai mặt ngoài cùng đối diện là bao nhiêu?)",
            "keywords": "Standard die: Xúc xắc tiêu chuẩn; Opposite faces: Mặt đối diện; Sum: Tổng.",
            "studentAnswer": "",
            "correctAnswer": "6",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học không gian & Xúc xắc",
            "difficulty": "Nâng cao",
            "explanation": "Gọi mặt tiếp xúc của xúc xắc 1 là A thì mặt ngoài đối diện là 7 - A. Gọi mặt tiếp xúc của xúc xắc 2 là B thì mặt ngoài đối diện là 7 - B. Đề cho A + B = 8. Tổng hai mặt ngoài cùng = (7 - A) + (7 - B) = 14 - (A + B) = 14 - 8 = 6 chấm.",
            "solutionSteps": [
                  "Bước 1: Nhớ lại tính chất xúc xắc tiêu chuẩn: Tổng hai mặt đối diện luôn bằng 7.",
                  "Bước 2: Gọi số chấm trên 2 mặt dán vào nhau là a và b. Đề bài cho a + b = 8.",
                  "Bước 3: Hai mặt ngoài cùng là mặt đối diện của a và b, nên có số chấm lần lượt là (7 - a) và (7 - b).",
                  "Bước 4: Tổng hai mặt ngoài cùng = (7 - a) + (7 - b) = 14 - (a + b) = 14 - 8 = 6."
            ],
            "tips": "Dùng tính chất bù tổng 7: Mặt ngoài = 7 - Mặt tiếp xúc."
      },
      {
            "id": 13,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 13: Snail Climbing Well / Câu 13: Ốc sên leo giếng",
            "question": "A snail is at the bottom of a 10-meter deep well. Each day, it climbs up 3 meters, but each night it slides down 1 meter. On which day will the snail reach the top of the well?\n(Một chú ốc sên ở dưới đáy một cái giếng sâu 10 mét. Mỗi ngày chú leo lên được 3 mét, nhưng mỗi đêm chú lại bị trượt tụt xuống 1 mét. Hỏi vào ngày thứ mấy chú ốc sên sẽ leo lên đến miệng giếng?)",
            "keywords": "Climbs up: Leo lên; Slides down: Trượt xuống; Top: Miệng giếng.",
            "studentAnswer": "",
            "correctAnswer": "Ngày thứ 5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán tư duy thực tế",
            "difficulty": "Trung bình",
            "explanation": "Mỗi chu kỳ ngày-đêm leo được: 3 - 1 = 2m. Sau 4 ngày đêm, ốc sên ở độ cao: 4 × 2 = 8m (còn 2m nữa tới miệng). Vào ban ngày của ngày thứ 5, ốc sên leo lên 3m, 8 + 3 = 11m > 10m nên chạm miệng giếng ngay ban ngày thứ 5.",
            "solutionSteps": [
                  "Bước 1: Sau 1 ngày và đêm, tiến độ thực tế là 3 - 1 = 2 (m).",
                  "Bước 2: Đến hết đêm ngày thứ 3: ở mốc 3 × 2 = 6 m.",
                  "Bước 3: Đến hết đêm ngày thứ 4: ở mốc 4 × 2 = 8 m.",
                  "Bước 4: Sang ban ngày thứ 5: ốc sên leo 3 m đạt mốc 8 + 3 = 11 m (vượt qua miệng giếng 10 m trước khi bị trượt ban đêm).",
                  "Bước 5: Kết luận: Ốc sên lên tới miệng giếng vào ngày thứ 5."
            ],
            "tips": "Chú ý ngày cuối cùng chú đã lên tới đỉnh vào ban ngày nên không bị trượt ban đêm nữa."
      },
      {
            "id": 14,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 14: Symmetrical Digital Time / Câu 14: Giờ đối xứng trên đồng hồ điện tử",
            "question": "A digital clock shows time in 24-hour format HH:MM (for example 14:41). How many times between 10:00 and 19:59 does the clock show a palindromic (symmetrical) time that reads the same forwards and backwards?\n(Đồng hồ điện tử hiển thị dạng HH:MM (ví dụ 14:41). Hỏi từ 10:00 đến 19:59 có bao nhiêu lần đồng hồ hiển thị thời gian đối xứng (đọc xuôi đọc ngược đều giống nhau)?)",
            "keywords": "Palindromic: Đối xứng; Digital clock: Đồng hồ điện tử.",
            "studentAnswer": "",
            "correctAnswer": "10",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Đối xứng",
            "difficulty": "Nâng cao",
            "explanation": "Dạng 1H:H1. Với mỗi giờ từ 10 đến 19 (H nhận từ 0 đến 9), phút tương ứng là H1. Các giờ đối xứng: 10:01, 11:11, 12:21, 13:31, 14:41, 15:51, và khi H từ 6 đến 9 thì phút H1 (ví dụ 61, 71 phút) không tồn tại. Như vậy H chỉ có thể là 0, 1, 2, 3, 4, 5 (6 lần).",
            "solutionSteps": [
                  "Bước 1: Dạng đối xứng có dạng 1H:H1 với H là chữ số hàng đơn vị của giờ.",
                  "Bước 2: Vì phút trên đồng hồ chỉ từ 00 đến 59, chữ số hàng chục của phút (là H) chỉ có thể nhận giá trị: 0, 1, 2, 3, 4, 5.",
                  "Bước 3: Các thời điểm đối xứng là: 10:01, 11:11, 12:21, 13:31, 14:41, 15:51.",
                  "Bước 4: Có tất cả 6 thời điểm thỏa mãn."
            ],
            "tips": "Chú ý số phút trong một giờ chỉ từ 00 đến 59, không có phút 61 hay 71."
      },
      {
            "id": 15,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 15: Two Circles Overlapping / Câu 15: Hai hình tròn lồng nhau",
            "question": "Two identical circular rings, each with an area of 50 cm², overlap so that their intersection area is 18 cm². What is the total area covered by the two rings together in cm²?\n(Hai hình tròn giống hệt nhau, mỗi hình có diện tích 50 cm², đặt đè lên nhau sao cho phần giao nhau có diện tích là 18 cm². Hỏi tổng diện tích mà hai hình tròn cùng phủ lên mặt phẳng là bao nhiêu cm²?)",
            "keywords": "Circular rings: Hình tròn; Overlap: Đè lên nhau; Intersection: Phần giao nhau.",
            "studentAnswer": "",
            "correctAnswer": "82",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học & Diện tích tập hợp",
            "difficulty": "Trung bình",
            "explanation": "Áp dụng công thức hợp hai hình: S(A ∪ B) = S(A) + S(B) - S(A ∩ B) = 50 + 50 - 18 = 82 cm².",
            "solutionSteps": [
                  "Bước 1: Lấy tổng diện tích của cả hai hình tròn riêng biệt: 50 + 50 = 100 (cm²).",
                  "Bước 2: Vì phần chung 18 cm² bị tính 2 lần, ta trừ đi 1 lần diện tích phần giao nhau.",
                  "Bước 3: Diện tích hợp: 100 - 18 = 82 (cm²)."
            ],
            "tips": "S_tổng = S1 + S2 - S_chung."
      },
      {
            "id": 16,
            "part": 2,
            "partTitle": "Part B: 4-point questions (Questions 9 – 16) / Phần B: Câu hỏi 4 điểm (Câu 9 – 16)",
            "title": "Question 16: Age Logic Problem / Câu 16: Bài toán tuổi mẹ và hai con",
            "question": "Mother is 36 years old. Her son is 8 and her daughter is 4 years old. In how many years will the mother's age be equal to the sum of the ages of her two children?\n(Mẹ 36 tuổi. Con trai 8 tuổi và con gái 4 tuổi. Hỏi sau bao nhiêu năm nữa thì tuổi của mẹ sẽ bằng tổng số tuổi của hai người con?)",
            "keywords": "Age: Tuổi tác; Sum of ages: Tổng số tuổi; In how many years: Sau bao nhiêu năm.",
            "studentAnswer": "",
            "correctAnswer": "24",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đại số & Bài toán tuổi",
            "difficulty": "Trung bình",
            "explanation": "Hiện tại tổng tuổi 2 con là: 8 + 4 = 12 tuổi. Hiệu giữa tuổi mẹ và tổng tuổi 2 con là: 36 - 12 = 24 tuổi. Mỗi năm trôi qua, mẹ tăng 1 tuổi nhưng hai con tăng 1 + 1 = 2 tuổi. Vậy mỗi năm khoảng cách rút ngắn: 2 - 1 = 1 tuổi. Số năm cần tìm: 24 : 1 = 24 năm.",
            "solutionSteps": [
                  "Bước 1: Tính tổng tuổi hai con hiện nay: 8 + 4 = 12 (tuổi).",
                  "Bước 2: Tính độ chênh lệch tuổi: 36 - 12 = 24 (tuổi).",
                  "Bước 3: Mỗi năm, mẹ tăng 1 tuổi còn 2 con tăng 2 tuổi, do đó mỗi năm khoảng cách thu hẹp: 2 - 1 = 1 (tuổi).",
                  "Bước 4: Thời gian để bằng nhau là: 24 : 1 = 24 (năm)."
            ],
            "tips": "Khi so sánh 1 người với tổng số tuổi của n người, mỗi năm tổng của n người tăng nhanh hơn n - 1 tuổi."
      },
      {
            "id": 17,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 17: Magic Square 3x3 / Câu 17: Ma phương bậc 3",
            "question": "In a 3×3 magic square using numbers from 1 to 9, the sum of numbers in every row, column, and main diagonal is 15. What number must be placed in the center cell?\n(Trong một bảng ma phương 3×3 điền các số từ 1 đến 9, tổng các số trên mỗi hàng, mỗi cột và hai đường chéo đều bằng 15. Hỏi số nào bắt buộc phải nằm ở ô chính giữa?)",
            "keywords": "Magic square: Ma phương; Center cell: Ô chính giữa; Sum: Tổng 15.",
            "studentAnswer": "",
            "correctAnswer": "5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán logic ma phương",
            "difficulty": "Nâng cao",
            "explanation": "Ô trung tâm tham gia vào 4 đường (1 hàng, 1 cột, 2 đường chéo). Tổng của 4 đường này = 4 × 15 = 60 = Tổng 9 số (45) + 3 × (ô trung tâm). Suy ra: 3 × (ô trung tâm) = 60 - 45 = 15 => Ô trung tâm = 5.",
            "solutionSteps": [
                  "Bước 1: Tính tổng cả 9 số từ 1 đến 9: (1 + 9) × 9 : 2 = 45.",
                  "Bước 2: Ô tâm C tham gia vào 1 hàng ngang, 1 cột dọc và 2 đường chéo (tổng cộng 4 đường có tổng = 4 × 15 = 60).",
                  "Bước 3: 4 đường này phủ hết 9 số trên bảng và đi qua ô tâm thêm 3 lần nữa.",
                  "Bước 4: 45 + 3 × C = 60 => 3 × C = 15 => C = 5."
            ],
            "tips": "Ô trung tâm của ma phương bậc 3 với các số từ 1 đến 9 luôn luôn là số trung vị: 5."
      },
      {
            "id": 18,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 18: Interlocked Gears / Câu 18: Bánh răng cưa ăn khớp",
            "question": "Gear A has 12 teeth and is connected to Gear B which has 18 teeth. If Gear A rotates 6 full turns clockwise, how many full turns does Gear B rotate, and in which direction?\n(Bánh răng A có 12 răng ăn khớp với bánh răng B có 18 răng. Nếu bánh răng A quay 6 vòng theo chiều kim đồng hồ, hỏi bánh răng B quay bao nhiêu vòng và theo chiều nào?)",
            "keywords": "Gears: Bánh răng; Teeth: Số răng; Clockwise: Theo chiều kim đồng hồ; Counter-clockwise: Ngược chiều kim đồng hồ.",
            "studentAnswer": "",
            "correctAnswer": "4 vòng ngược chiều kim đồng hồ",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán chuyển động cơ học",
            "difficulty": "Nâng cao",
            "explanation": "Hai bánh răng ăn khớp luôn quay ngược chiều nhau. Số răng bánh A quay: 6 × 12 = 72 răng. Số vòng bánh B: 72 : 18 = 4 vòng ngược chiều kim đồng hồ.",
            "solutionSteps": [
                  "Bước 1: Hai bánh răng tiếp xúc ngoài luôn quay ngược chiều nhau: A quay thuận kim đồng hồ => B quay ngược chiều kim đồng hồ.",
                  "Bước 2: Tổng số răng truyền qua là: 6 × 12 = 72 răng.",
                  "Bước 3: Số vòng bánh B quay được: 72 : 18 = 4 (vòng)."
            ],
            "tips": "Số vòng 1 × Số răng 1 = Số vòng 2 × Số răng 2."
      },
      {
            "id": 19,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 19: Cryptarithm KAN + GAR = OO / Câu 19: Phép tính chữ cái Kangaroo",
            "question": "In the addition problem: AB + BA = 132, where A and B represent different non-zero digits and A > B, find the value of A × B.\n(Trong phép cộng: AB + BA = 132, với A và B là các chữ số khác nhau, khác 0 và A > B. Tính giá trị của tích A × B.)",
            "keywords": "Digits: Chữ số; Product: Tích.",
            "studentAnswer": "",
            "correctAnswer": "35",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Cấu tạo số & Mật mã",
            "difficulty": "Nâng cao",
            "explanation": "AB + BA = 10A + B + 10B + A = 11(A + B) = 132 => A + B = 12. Vì A, B là chữ số khác nhau và A > B. Để A, B thỏa mãn chữ số, các cặp là (9,3), (8,4), (7,5). Xét bài toán chuẩn (7,5): A × B = 7 × 5 = 35.",
            "solutionSteps": [
                  "Bước 1: Khai triển cấu tạo số: AB = 10A + B; BA = 10B + A.",
                  "Bước 2: Tổng: AB + BA = 11 × (A + B) = 132.",
                  "Bước 3: Suy ra: A + B = 132 : 11 = 12.",
                  "Bước 4: Với cặp chữ số (7, 5): A = 7, B = 5 thỏa mãn A > B và tích A × B = 35."
            ],
            "tips": "Tổng hai số đảo ngược luôn chia hết cho 11: ab + ba = 11 × (a + b)."
      },
      {
            "id": 20,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 20: Circle of Friends Counting / Câu 20: Đếm vòng tròn ngược chiều",
            "question": "Children stand in a circle facing the center, numbered 1, 2, 3, ... in clockwise order. Child number 7 is standing directly opposite child number 23. How many children are there in the circle in total?\n(Các bạn nhỏ đứng thành một vòng tròn hướng mặt vào tâm, được đánh số 1, 2, 3, ... theo chiều kim đồng hồ. Bạn số 7 đứng đối diện trực tiếp với bạn số 23. Hỏi trong vòng tròn có tất cả bao nhiêu bạn nhỏ?)",
            "keywords": "Circle: Vòng tròn; Directly opposite: Đứng đối diện trực tiếp; Total: Tổng số bạn.",
            "studentAnswer": "",
            "correctAnswer": "32",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán vòng tròn & Đối xứng",
            "difficulty": "Olympic",
            "explanation": "Hai người đối diện trực tiếp nhau chia vòng tròn thành hai nửa bằng nhau. Khoảng cách giữa người số 7 và người số 23 là: 23 - 7 = 16 bạn (đây là nửa vòng tròn). Tổng số bạn trong vòng tròn: 16 × 2 = 32 bạn.",
            "solutionSteps": [
                  "Bước 1: Tính khoảng cách số giữa hai bạn đứng đối diện nhau: 23 - 7 = 16.",
                  "Bước 2: Số này biểu thị đúng một nửa số lượng người trong vòng tròn.",
                  "Bước 3: Tổng số người trong vòng tròn là: 16 × 2 = 32 (người)."
            ],
            "tips": "Nếu hai người đối diện nhau là a và b (b > a), tổng số người = (b - a) × 2."
      },
      {
            "id": 21,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 21: Three Boxes Weighing / Câu 21: Cân 3 hộp quà",
            "question": "Three boxes A, B, and C are weighed in pairs. Box A and Box B weigh 15 kg. Box B and Box C weigh 17 kg. Box C and Box A weigh 20 kg. What is the weight of Box C in kg?\n(Ba hộp quà A, B và C được cân từng đôi một. Hộp A và hộp B nặng 15 kg. Hộp B và hộp C nặng 17 kg. Hộp C và hộp A nặng 20 kg. Hỏi hộp C nặng bao nhiêu kg?)",
            "keywords": "Boxes: Hộp quà; Weighed in pairs: Cân từng đôi; Weight: Cân nặng.",
            "studentAnswer": "",
            "correctAnswer": "11",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đại số & Cân nặng",
            "difficulty": "Nâng cao",
            "explanation": "Cộng cả 3 phương trình: 2(A + B + C) = 15 + 17 + 20 = 52 => A + B + C = 26 kg. Trọng lượng hộp C = (A + B + C) - (A + B) = 26 - 15 = 11 kg.",
            "solutionSteps": [
                  "Bước 1: Cộng tổng 3 lần cân: 2 lần (A + B + C) = 15 + 17 + 20 = 52 (kg).",
                  "Bước 2: Tổng cân nặng của cả 3 hộp là: 52 : 2 = 26 (kg).",
                  "Bước 3: Trọng lượng của hộp C là: 26 - 15 = 11 (kg)."
            ],
            "tips": "Cộng tất cả các cặp lại rồi chia đôi để được tổng của cả 3 vật."
      },
      {
            "id": 22,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 22: Unfolded Box Net / Câu 22: Hình khai triển của hộp chữ nhật",
            "question": "A net of a closed rectangular box has 6 rectangular faces. If four of the faces have dimensions 2×3, 2×3, 3×5, and 3×5, what must be the dimensions of the remaining two faces?\n(Hình khai triển của một chiếc hộp kín hình chữ nhật gồm 6 mặt chữ nhật. Nếu 4 trong 6 mặt có kích thước là 2×3, 2×3, 3×5 và 3×5, hỏi kích thước của hai mặt còn lại là bao nhiêu?)",
            "keywords": "Net: Hình khai triển; Rectangular box: Hình hộp chữ nhật; Dimensions: Kích thước.",
            "studentAnswer": "",
            "correctAnswer": "2×5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học không gian",
            "difficulty": "Nâng cao",
            "explanation": "Hình hộp chữ nhật có ba kích thước a, b, c. Từ các mặt đã cho, ba kích thước là 2, 3 và 5. Ba cặp mặt đối diện là: (2×3, 2×3), (3×5, 3×5), và cặp thứ ba phải là (2×5, 2×5).",
            "solutionSteps": [
                  "Bước 1: Một hình hộp chữ nhật được tạo thành bởi 3 kích thước dài, rộng, cao (a, b, c).",
                  "Bước 2: Các mặt có kích thước 2×3 và 3×5 chỉ ra rằng ba kích thước là 2, 3, và 5.",
                  "Bước 3: Ba cặp mặt đối diện có kích thước là a×b, b×c, và c×a.",
                  "Bước 4: Cặp mặt còn lại là 2×5."
            ],
            "tips": "Hình hộp chữ nhật luôn gồm 3 cặp mặt đối diện bằng nhau từng đôi một."
      },
      {
            "id": 23,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 23: Knights and Liars / Câu 23: Người nói thật và kẻ nói dối",
            "question": "On an island, Knights always tell the truth and Knaves always lie. You meet two islanders, A and B. Islander A says: 'At least one of us is a Knave.' What are islanders A and B?\n(Trên một hòn đảo, Hiệp sĩ luôn nói thật và Kẻ dối trá luôn nói dối. Bạn gặp hai cư dân A và B. Cư dân A nói: 'Ít nhất một trong hai chúng tôi là Kẻ dối trá.' Hỏi A và B là ai?)",
            "keywords": "Knights: Hiệp sĩ nói thật; Knaves: Kẻ nói dối; At least one: Ít nhất một người.",
            "studentAnswer": "",
            "correctAnswer": "A là Hiệp sĩ, B là Kẻ dối trá",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Logic học",
            "difficulty": "Olympic",
            "explanation": "Nếu A là Kẻ dối trá thì câu nói 'ít nhất một trong hai chúng tôi là Kẻ dối trá' là đúng sự thật (mâu thuẫn vì Kẻ dối trá không thể nói thật). Vậy A là Hiệp sĩ (nói thật). Để câu nói của A đúng thì người còn lại B phải là Kẻ dối trá.",
            "solutionSteps": [
                  "Bước 1: Giả sử A là Kẻ dối trá. Khi đó có ít nhất một kẻ dối trá (chính là A), câu nói của A là sự thật. Điều này vô lý vì Kẻ dối trá không bao giờ nói thật.",
                  "Bước 2: Vậy A chắc chắn là Hiệp sĩ, và câu nói của A là sự thật.",
                  "Bước 3: Vì A là Hiệp sĩ và câu nói 'ít nhất một trong hai là Kẻ dối trá' là thật, người dối trá đó phải là B.",
                  "Bước 4: Kết luận: A là Hiệp sĩ, B là Kẻ dối trá."
            ],
            "tips": "Giả sử phản chứng để loại bỏ các trường hợp dẫn tới mâu thuẫn."
      },
      {
            "id": 24,
            "part": 3,
            "partTitle": "Part C: 5-point questions (Questions 17 – 24) / Phần C: Câu hỏi 5 điểm (Câu 17 – 24)",
            "title": "Question 24: Colored Strip Invariant / Câu 24: Bất biến băng giấy màu Kangaroo",
            "question": "A paper ribbon is colored in 4 repeating colors: Red, Blue, Green, Yellow, Red, Blue, Green, Yellow, ... What color is the 2024th centimeter segment of the ribbon, and how many Green segments are in the first 2024 segments?\n(Một dải ruy băng được tô màu lặp lại 4 màu: Đỏ, Xanh dương, Xanh lá, Vàng, Đỏ, Xanh dương, Xanh lá, Vàng, ... Hỏi đoạn xăng-ti-mét thứ 2024 có màu gì, và có bao nhiêu đoạn màu Xanh lá trong 2024 đoạn đầu tiên?)",
            "keywords": "Ribbon: Dải ruy băng; Repeating colors: Màu lặp lại; Segment: Đoạn.",
            "studentAnswer": "",
            "correctAnswer": "Vàng và 506",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Dãy số & Chu kỳ bất biến",
            "difficulty": "Olympic",
            "explanation": "Chu kỳ dài 4 màu: Đỏ (1), Xanh dương (2), Xanh lá (3), Vàng (4). 2024 chia hết cho 4 (2024 = 506 × 4) nên đoạn 2024 là màu thứ 4: Vàng. Mỗi chu kỳ có 1 đoạn Xanh lá nên trong 2024 đoạn có đúng 506 đoạn màu Xanh lá.",
            "solutionSteps": [
                  "Bước 1: Xác định chu kỳ gồm 4 màu: 1-Đỏ, 2-Xanh dương, 3-Xanh lá, 4-Vàng.",
                  "Bước 2: Lấy 2024 chia cho 4: 2024 : 4 = 506 (dư 0).",
                  "Bước 3: Vì phép chia hết, đoạn thứ 2024 là màu cuối cùng của chu kỳ: Vàng.",
                  "Bước 4: Có 506 chu kỳ trọn vẹn, mỗi chu kỳ có đúng 1 đoạn Xanh lá, nên có: 506 × 1 = 506 đoạn Xanh lá."
            ],
            "tips": "Chia cho độ dài chu kỳ để tìm số dư vị trí màu và số lần lặp lại."
      }
]
  },

  // =========================================================================
  // 3. ITMC 2025 – VÒNG QUỐC GIA (KHỐI 6 - DÀNH CHO LISA ĐOÀN HỒNG ANH)
  // Thể lệ chuẩn ITMC Quốc tế: 30 câu hỏi (29 câu giải quyết vấn đề + 1 câu thưởng 20 điểm), 90 phút, 100% Song ngữ Anh - Việt.
  // =========================================================================
  {
    id: 'exam_itmc_2025_l6',
    title: 'Đề Thi Toán Quốc Tế ITMC 2025 – Vòng Quốc Gia (Lớp 6)',
    program: 'ITMC',
    programName: 'International Teenagers Mathematics Cup',
    level: 'secondary',
    grade: 'Lớp 6',
    year: 2025,
    round: 'Vòng Quốc Gia (National Final)',
    durationMinutes: 90,
    questionCount: 30,
    difficulty: 'Olympic Quốc tế',
    description: 'Bộ đề thi chuẩn 30 câu ITMC Quốc tế: Phép tính cấu tạo số, góc song song, phân số triệt tiêu, lập phương sơn đỏ, bài toán cưa khúc gỗ, đồng dư thức và câu hỏi điểm thưởng đường chéo cắt lưới m × n (Song ngữ Anh - Việt).',
    questions: [
      {
            "id": 1,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 1: Addition and Place Value / Câu 1: Phép cộng & Cấu tạo số",
            "question": "There are two positive integers a and b: a is two thousand, five hundred, and sixty two; b is two thousand and nineteen. Find the value of a + b.\n(Cho hai số nguyên dương a và b: a là hai nghìn năm trăm sáu mươi hai; b là hai nghìn không trăm mười chín. Tính giá trị của a + b.)",
            "keywords": "Positive integers: Số nguyên dương; Sum: Tổng.",
            "studentAnswer": "",
            "correctAnswer": "4581",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Phép tính",
            "difficulty": "Cơ bản",
            "explanation": "Ta có a = 2562 và b = 2019. Tổng a + b = 2562 + 2019 = 4581.",
            "solutionSteps": [
                  "Bước 1: Chuyển các số từ dạng chữ sang dạng số: a = 2562, b = 2019.",
                  "Bước 2: Thực hiện phép cộng đặt tính: 2562 + 2019 = 4581.",
                  "Bước 3: Kết luận đáp số: 4581."
            ],
            "tips": "Đọc kỹ từng lớp nghìn, trăm, chục, đơn vị để tránh nhầm lẫn chữ số 0."
      },
      {
            "id": 2,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 2: Decimals & Capacity / Câu 2: Số thập phân & Dung tích",
            "question": "A bottle with a capacity of 1.25 liters is full of water. 0.45 liters of water is used in the morning and 0.35 liters is used in the afternoon. What is the amount of water (in liters) left in the bottle?\n(Một bình có dung tích 1,25 lít chứa đầy nước. Buổi sáng dùng 0,45 lít nước và buổi chiều dùng 0,35 lít nước. Hỏi lượng nước còn lại trong bình là bao nhiêu lít?)",
            "keywords": "Capacity: Dung tích; Left: Còn lại; Decimals: Số thập phân.",
            "studentAnswer": "",
            "correctAnswer": "0.45",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Đo lường",
            "difficulty": "Cơ bản",
            "explanation": "Tổng lượng nước đã dùng: 0,45 + 0,35 = 0,8 lít. Lượng nước còn lại: 1,25 - 0,8 = 0,45 lít.",
            "solutionSteps": [
                  "Bước 1: Tính tổng lượng nước sử dụng trong cả ngày: 0,45 + 0,35 = 0,80 (lít).",
                  "Bước 2: Lấy dung tích ban đầu trừ đi lượng đã dùng: 1,25 - 0,80 = 0,45 (lít)."
            ],
            "tips": "Đặt dấu phẩy thẳng hàng khi cộng trừ số thập phân."
      },
      {
            "id": 3,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 3: Sum of Digits & Multiplication / Câu 3: Tổng chữ số & Phép nhân nhanh",
            "question": "The sum of all digits in the number 2562 is 2 + 5 + 6 + 2 = 15. What is the sum of all digits in the product of 999 × 25?\n(Tổng các chữ số của số 2562 là 2 + 5 + 6 + 2 = 15. Tính tổng các chữ số của tích 999 × 25?)",
            "keywords": "Sum of digits: Tổng các chữ số; Product: Tích.",
            "studentAnswer": "",
            "correctAnswer": "27",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Tính nhanh",
            "difficulty": "Cơ bản",
            "explanation": "Ta có 999 × 25 = (1000 - 1) × 25 = 25000 - 25 = 24975. Tổng các chữ số: 2 + 4 + 9 + 7 + 5 = 27.",
            "solutionSteps": [
                  "Bước 1: Nhân nhanh bằng cách tách 999 = 1000 - 1.",
                  "Bước 2: Tích = 25 × 1000 - 25 × 1 = 25000 - 25 = 24975.",
                  "Bước 3: Tính tổng các chữ số: 2 + 4 + 9 + 7 + 5 = 27."
            ],
            "tips": "Nhân với 99, 999 nên đưa về (100 - 1) hoặc (1000 - 1) để tính nhẩm siêu tốc."
      },
      {
            "id": 4,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 4: Parallel Lines & Angle Ratio / Câu 4: Đường song song & Tỉ số góc",
            "question": "In the figure, line AB is parallel to CD, and EGF is a right angle (90°). The ratio of angle FEG to angle FHD is 3 : 2. If both angles are acute, find the measure of angle FEG in degrees.\n(Cho đường thẳng AB song song với CD, và góc EGF là góc vuông (90°). Tỉ số giữa góc FEG và góc FHD là 3 : 2. Biết cả hai góc đều là góc nhọn, tính số đo góc FEG theo độ.)",
            "keywords": "Parallel lines: Đường song song; Right angle: Góc vuông; Ratio: Tỉ số.",
            "studentAnswer": "",
            "correctAnswer": "54",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học trực quan",
            "difficulty": "Trung bình",
            "explanation": "Do tính chất góc so le trong và tam giác vuông, tổng hai góc phụ nhau: 3x + 2x = 90° => 5x = 90° => x = 18°. Góc FEG = 3 × 18° = 54°.",
            "solutionSteps": [
                  "Bước 1: Đặt số đo góc FEG là 3x và góc FHD là 2x (x > 0).",
                  "Bước 2: Do AB // CD và góc EGF = 90°, tổng hai góc có mối quan hệ phụ nhau: 3x + 2x = 90°.",
                  "Bước 3: 5x = 90° => x = 18°. Vậy góc FEG = 3 × 18° = 54°."
            ],
            "tips": "Vẽ đường thẳng phụ song song qua đỉnh góc vuông để thấy rõ các cặp góc so le trong."
      },
      {
            "id": 5,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 5: Train Passing Tunnel Speed / Câu 5: Vận tốc đoàn tàu qua hầm",
            "question": "A train 180 meters long travels at a constant speed of 54 km/h. How many seconds does it take for the train to completely pass through a tunnel of length 360 meters?\n(Một đoàn tàu dài 180m chạy với vận tốc không đổi 54 km/h. Hỏi đoàn tàu mất bao nhiêu giây để vượt qua hoàn toàn một đường hầm dài 360m?)",
            "keywords": "Speed: Vận tốc; Constant: Không đổi; Completely pass: Vượt qua hoàn toàn.",
            "studentAnswer": "",
            "correctAnswer": "36",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán chuyển động",
            "difficulty": "Cơ bản",
            "explanation": "Đổi 54 km/h = 54 × 1000 / 3600 = 15 m/s. Quãng đường cần đi = Chiều dài tàu + Chiều dài hầm = 180 + 360 = 540m. Thời gian = 540 / 15 = 36 giây.",
            "solutionSteps": [
                  "Bước 1: Đổi đơn vị vận tốc sang m/s: 54 km/h = 54 : 3,6 = 15 m/s.",
                  "Bước 2: Quãng đường tàu đi để qua hoàn toàn hầm: S = 180 + 360 = 540 (m).",
                  "Bước 3: Thời gian t = S : v = 540 : 15 = 36 (giây)."
            ],
            "tips": "Để vượt qua hoàn toàn một vật có chiều dài L, đầu tàu phải đi quãng đường = Chiều dài tàu + L."
      },
      {
            "id": 6,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 6: Divisibility Rules / Câu 6: Dấu hiệu chia hết cho 5 và 9",
            "question": "If the 4-digit number 4A7B is divisible by both 5 and 9, and A > B, find the value of A + B.\n(Cho số tự nhiên có 4 chữ số 4A7B chia hết cho cả 5 và 9, biết A > B. Tính giá trị của A + B.)",
            "keywords": "Divisible: Chia hết; Digits: Chữ số.",
            "studentAnswer": "",
            "correctAnswer": "7",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Chia hết",
            "difficulty": "Cơ bản",
            "explanation": "Số chia hết cho 5 nên B = 0 hoặc B = 5. Nếu B = 0: 4 + A + 7 + 0 = 11 + A chia hết cho 9 => A = 7. A = 7 > B = 0 thỏa mãn. A + B = 7 + 0 = 7. Nếu B = 5: 11 + A + 5 = 16 + A => A = 2, nhưng A < B (loại).",
            "solutionSteps": [
                  "Bước 1: Để 4A7B chia hết cho 5, tận cùng B phải là 0 hoặc 5.",
                  "Bước 2: Trường hợp B = 0: Tổng chữ số là 4 + A + 7 + 0 = 11 + A. Để chia hết cho 9 thì A = 7. Ta có A = 7 > B = 0 (Thỏa mãn).",
                  "Bước 3: Trường hợp B = 5: Tổng chữ số là 16 + A. Để chia hết cho 9 thì A = 2. Khi đó A = 2 < B = 5 (Loại vì đề yêu cầu A > B).",
                  "Bước 4: Kết luận: A + B = 7 + 0 = 7."
            ],
            "tips": "Xét dấu hiệu chia hết của chữ số tận cùng trước, sau đó xét tổng các chữ số."
      },
      {
            "id": 7,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 7: Area & Perimeter / Câu 7: Chu vi và diện tích hình chữ nhật",
            "question": "A rectangular garden has a perimeter of 56 meters. The length is 8 meters longer than the width. Find the area of the garden in square meters.\n(Một khu vườn hình chữ nhật có chu vi 56m. Chiều dài hơn chiều rộng 8m. Tính diện tích khu vườn theo mét vuông.)",
            "keywords": "Perimeter: Chu vi; Area: Diện tích; Length: Chiều dài; Width: Chiều rộng.",
            "studentAnswer": "",
            "correctAnswer": "180",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học & Đo lường",
            "difficulty": "Cơ bản",
            "explanation": "Nửa chu vi = 56 : 2 = 28m. Chiều rộng = (28 - 8) : 2 = 10m. Chiều dài = 10 + 8 = 18m. Diện tích = 18 × 10 = 180 m².",
            "solutionSteps": [
                  "Bước 1: Nửa chu vi mảnh vườn là: 56 : 2 = 28 (m).",
                  "Bước 2: Bài toán tìm hai số khi biết Tổng (28) và Hiệu (8). Chiều rộng = (28 - 8) : 2 = 10 (m).",
                  "Bước 3: Chiều dài mảnh vườn = 10 + 8 = 18 (m).",
                  "Bước 4: Diện tích = 18 × 10 = 180 (m²)."
            ],
            "tips": "Số bé = (Tổng - Hiệu) : 2; Số lớn = (Tổng + Hiệu) : 2."
      },
      {
            "id": 8,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 8: Last Digit Pattern / Câu 8: Chữ số tận cùng theo chu kỳ",
            "question": "Find the unit digit of the product: P = 3 × 13 × 23 × 33 × ... × 2023.\n(Tìm chữ số tận cùng của tích: P = 3 × 13 × 23 × 33 × ... × 2023.)",
            "keywords": "Unit digit: Chữ số tận cùng; Product: Tích; Factors: Thừa số.",
            "studentAnswer": "",
            "correctAnswer": "7",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Chu kỳ",
            "difficulty": "Trung bình",
            "explanation": "Số thừa số trong tích là: (2023 - 3) : 10 + 1 = 203 thừa số có tận cùng là 3. Chu kỳ tích tận cùng là 3: 3 -> 9 -> 7 -> 1 (chu kỳ 4). Ta có 203 chia 4 dư 3 => Chữ số tận cùng là 7.",
            "solutionSteps": [
                  "Bước 1: Đếm số lượng thừa số: (2023 - 3) / 10 + 1 = 203 thừa số.",
                  "Bước 2: Tìm chu kỳ chữ số tận cùng của lũy thừa của 3: 3¹ tận cùng 3; 3² tận cùng 9; 3³ tận cùng 7; 3⁴ tận cùng 1; chu kỳ lặp lại là 4.",
                  "Bước 3: Lấy số mũ chia cho chu kỳ: 203 : 4 = 50 (dư 3).",
                  "Bước 4: Số dư là 3 tương ứng với vị trí thứ 3 trong chu kỳ, vậy tận cùng là 7."
            ],
            "tips": "Lập bảng 4 lũy thừa đầu tiên để tìm chu kỳ chữ số tận cùng."
      },
      {
            "id": 9,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 9: Simultaneous Cost / Câu 9: Bài toán khử giá tiền",
            "question": "Lisa bought 4 notebooks and 3 pens for 85,000 VND. Minh bought 2 notebooks and 5 pens for 95,000 VND. What is the price of 1 notebook in VND?\n(Lisa mua 4 quyển vở và 3 chiếc bút hết 85.000 đồng. Minh mua 2 quyển vở và 5 chiếc bút hết 95.000 đồng. Hỏi giá tiền của 1 quyển vở là bao nhiêu đồng?)",
            "keywords": "Simultaneous equations: Phương pháp khử; Price: Giá tiền.",
            "studentAnswer": "",
            "correctAnswer": "10000",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đại số & Thực tế",
            "difficulty": "Cơ bản",
            "explanation": "Gấp đôi đơn hàng của Minh: 4 vở + 10 bút = 190.000 đ. So sánh với Lisa (4 vở + 3 bút = 85.000 đ): 7 bút = 105.000 đ => 1 bút = 15.000 đ. Giá 1 quyển vở = (85.000 - 3 × 15.000) : 4 = 10.000 đ.",
            "solutionSteps": [
                  "Bước 1: Nhân đôi số lượng đồ Minh mua để làm bằng số vở của Lisa: 4 quyển vở + 10 chiếc bút = 95.000 × 2 = 190.000 (đồng).",
                  "Bước 2: Lấy đơn hàng mới trừ đi đơn hàng của Lisa: (4 vở + 10 bút) - (4 vở + 3 bút) = 7 chiếc bút = 190.000 - 85.000 = 105.000 (đồng).",
                  "Bước 3: Giá tiền 1 chiếc bút là: 105.000 : 7 = 15.000 (đồng).",
                  "Bước 4: Giá tiền 1 quyển vở là: (85.000 - 3 × 15.000) : 4 = (85.000 - 45.000) : 4 = 10.000 (đồng)."
            ],
            "tips": "Dùng phương pháp thế hoặc khử để làm triệt tiêu 1 đại lượng."
      },
      {
            "id": 10,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 10: Painted Cube / Câu 10: Khối lập phương sơn màu",
            "question": "A cube of edge 4 cm is painted red on all 6 faces, then cut into 64 small cubes of edge 1 cm. How many small unit cubes have exactly 2 faces painted red?\n(Một khối lập phương cạnh 4 cm được sơn đỏ cả 6 mặt, rồi cắt thành 64 khối lập phương nhỏ cạnh 1 cm. Hỏi có bao nhiêu khối lập phương nhỏ có đúng 2 mặt được sơn đỏ?)",
            "keywords": "Cube: Khối lập phương; Painted faces: Mặt sơn đỏ; Edges: Cạnh.",
            "studentAnswer": "",
            "correctAnswer": "24",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học không gian",
            "difficulty": "Trung bình",
            "explanation": "Các khối có đúng 2 mặt sơn nằm ở các cạnh nhưng không nằm ở 8 đỉnh. Mỗi cạnh có: 4 - 2 = 2 khối. Khối lập phương có 12 cạnh => Số khối thỏa mãn: 12 × 2 = 24 khối.",
            "solutionSteps": [
                  "Bước 1: Xác định vị trí các khối có đúng 2 mặt sơn đỏ: chúng nằm trên các cạnh của khối lập phương lớn (trừ đi 2 khối ở 2 đầu đỉnh).",
                  "Bước 2: Số khối trên mỗi cạnh thỏa mãn: 4 - 2 = 2 khối.",
                  "Bước 3: Một hình lập phương luôn có 12 cạnh. Do đó tổng số khối là: 12 × 2 = 24 khối."
            ],
            "tips": "Công thức khối có 2 mặt sơn của lập phương cạnh n: 12 × (n - 2)."
      },
      {
            "id": 11,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 11: Telescoping Fractions / Câu 11: Phân số triệt tiêu liên tiếp",
            "question": "Find the value of the sum: S = 1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(99×100).\n(Tính giá trị của tổng: S = 1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(99×100).)",
            "keywords": "Telescoping series: Dãy phân số triệt tiêu; Fraction: Phân số.",
            "studentAnswer": "",
            "correctAnswer": "99/100",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đại số & Phân số",
            "difficulty": "Cơ bản",
            "explanation": "Áp dụng công thức 1/(n(n+1)) = 1/n - 1/(n+1). Khi đó các số hạng ở giữa triệt tiêu: S = 1 - 1/100 = 99/100.",
            "solutionSteps": [
                  "Bước 1: Tách từng phân số: 1/(1×2) = 1 - 1/2; 1/(2×3) = 1/2 - 1/3; ... ; 1/(99×100) = 1/99 - 1/100.",
                  "Bước 2: Cộng các vế lại với nhau, các số đối nhau triệt tiêu: S = 1 - 1/2 + 1/2 - 1/3 + ... + 1/99 - 1/100.",
                  "Bước 3: Thu gọn: S = 1 - 1/100 = 99/100."
            ],
            "tips": "Dạng phân số có tích hai mẫu cách nhau k đơn vị: k/(a×(a+k)) = 1/a - 1/(a+k)."
      },
      {
            "id": 12,
            "part": 1,
            "partTitle": "Part 1: Questions 1 – 12 (4 points each) / Phần 1: Câu 1 – 12 (Mỗi câu 4 điểm)",
            "title": "Question 12: Average Age / Câu 12: Bài toán số trung bình cộng tuổi",
            "question": "The average age of a teacher and 24 students is 14 years old. The average age of the 24 students alone is 13 years old. How old is the teacher?\n(Tuổi trung bình của một thầy giáo và 24 học sinh là 14 tuổi. Tuổi trung bình của riêng 24 học sinh là 13 tuổi. Hỏi thầy giáo bao nhiêu tuổi?)",
            "keywords": "Average age: Tuổi trung bình; Total: Tổng số tuổi.",
            "studentAnswer": "",
            "correctAnswer": "38",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Trung bình cộng",
            "difficulty": "Cơ bản",
            "explanation": "Tổng số người gồm thầy và trò là 25 người. Tổng số tuổi của 25 người: 25 × 14 = 350 tuổi. Tổng tuổi của 24 học sinh: 24 × 13 = 312 tuổi. Tuổi của thầy giáo: 350 - 312 = 38 tuổi.",
            "solutionSteps": [
                  "Bước 1: Đếm tổng số người gồm thầy giáo và 24 học sinh là 1 + 24 = 25 (người).",
                  "Bước 2: Tổng số tuổi của cả nhóm: 25 × 14 = 350 (tuổi).",
                  "Bước 3: Tổng số tuổi của riêng 24 học sinh: 24 × 13 = 312 (tuổi).",
                  "Bước 4: Tuổi của thầy giáo là: 350 - 312 = 38 (tuổi)."
            ],
            "tips": "Tổng = Số trung bình cộng × Số lượng đối tượng."
      },
      {
            "id": 13,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 13: Combinatorics of Digits / Câu 13: Đếm số có tổng các chữ số bằng 6",
            "question": "How many 3-digit positive integers have the property that the sum of their digits equals 6?\n(Có bao nhiêu số tự nhiên có 3 chữ số mà tổng các chữ số của số đó bằng 6?)",
            "keywords": "3-digit integers: Số tự nhiên có 3 chữ số; Sum of digits: Tổng các chữ số.",
            "studentAnswer": "",
            "correctAnswer": "21",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Tổ hợp & Đếm số",
            "difficulty": "Nâng cao",
            "explanation": "Gọi số có dạng abc với 1 <= a <= 6; 0 <= b, c <= 6 và a + b + c = 6. Đặt a' = a - 1 >= 0 => a' + b + c = 5. Số nghiệm tự nhiên là C(5 + 3 - 1, 3 - 1) = C(7, 2) = 21 số.",
            "solutionSteps": [
                  "Bước 1: Gọi số có 3 chữ số là abc, trong đó chữ số hàng trăm a thuộc {1, 2, 3, 4, 5, 6}.",
                  "Bước 2: Liệt kê theo a:",
                  " - a = 6: b + c = 0 -> (0,0) (1 số: 600)",
                  " - a = 5: b + c = 1 -> (0,1), (1,0) (2 số: 501, 510)",
                  " - a = 4: b + c = 2 -> (0,2), (1,1), (2,0) (3 số)",
                  " - a = 3: b + c = 3 -> 4 số",
                  " - a = 2: b + c = 4 -> 5 số",
                  " - a = 1: b + c = 5 -> 6 số",
                  "Bước 3: Tổng số lượng = 1 + 2 + 3 + 4 + 5 + 6 = 21 (số)."
            ],
            "tips": "Tổng các số hạng từ 1 đến n là n(n+1)/2. Với n = 6, tổng = 6 × 7 / 2 = 21."
      },
      {
            "id": 14,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 14: Fast Clock Problem / Câu 14: Bài toán đồng hồ chạy nhanh",
            "question": "A clock gains 3 minutes every 4 hours. If it is set correctly at 6:00 AM on Monday, what time will the clock show at 6:00 PM on Tuesday of the same week?\n(Một chiếc đồng hồ chạy nhanh 3 phút sau mỗi 4 giờ. Nếu đồng hồ được chỉnh đúng lúc 6:00 sáng Thứ Hai, hỏi đồng hồ sẽ chỉ mấy giờ lúc 6:00 chiều Thứ Ba cùng tuần?)",
            "keywords": "Gains: Chạy nhanh; Elapsed time: Thời gian trôi qua.",
            "studentAnswer": "",
            "correctAnswer": "18:27",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thời gian & Chu kỳ",
            "difficulty": "Trung bình",
            "explanation": "Khoảng thời gian từ 6h sáng T2 đến 6h chiều T3: 24h + 12h = 36 giờ. Số chu kỳ 4 giờ là 36 : 4 = 9 chu kỳ. Thời gian nhanh thêm: 9 × 3 = 27 phút. Đồng hồ chỉ 18:27 (hay 6:27 PM).",
            "solutionSteps": [
                  "Bước 1: Tính tổng số giờ thực tế trôi qua từ 6:00 AM T2 đến 6:00 PM T3: từ 6:00 AM T2 đến 6:00 AM T3 là 24 giờ; từ 6:00 AM T3 đến 6:00 PM T3 là 12 giờ. Tổng cộng = 24 + 12 = 36 giờ.",
                  "Bước 2: Tìm số lần đồng hồ chạy nhanh: 36 : 4 = 9 lần.",
                  "Bước 3: Tổng số phút chạy nhanh: 9 × 3 = 27 phút.",
                  "Bước 4: Thời gian đồng hồ hiển thị: 18 giờ + 27 phút = 18:27."
            ],
            "tips": "Tính tổng thời gian trôi qua trước, rồi chia cho khoảng thời gian của một chu kỳ sai số."
      },
      {
            "id": 15,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 15: Cooperative Work / Câu 15: Bài toán năng suất làm chung công việc",
            "question": "Worker A can finish a job alone in 12 days. Worker B can finish the same job alone in 15 days. If they work together for 5 days, what fraction of the job is still left unfinished?\n(Công nhân A hoàn thành công việc một mình trong 12 ngày. Công nhân B hoàn thành công việc đó một mình trong 15 ngày. Nếu hai người cùng làm chung trong 5 ngày thì còn lại mấy phần công việc chưa hoàn thành?)",
            "keywords": "Work rate: Năng suất làm việc; Fraction left: Phân số phần việc còn lại.",
            "studentAnswer": "",
            "correctAnswer": "1/4",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán năng suất & Đại số",
            "difficulty": "Trung bình",
            "explanation": "Trong 1 ngày cả 2 người làm: 1/12 + 1/15 = 9/60 = 3/20 công việc. Trong 5 ngày cả 2 làm: 5 × (3/20) = 3/4 công việc. Phần công việc còn lại: 1 - 3/4 = 1/4.",
            "solutionSteps": [
                  "Bước 1: Trong 1 ngày, công nhân A làm được 1/12 công việc; công nhân B làm được 1/15 công việc.",
                  "Bước 2: Trong 1 ngày cả hai người cùng làm được: 1/12 + 1/15 = 5/60 + 4/60 = 9/60 = 3/20 (công việc).",
                  "Bước 3: Trong 5 ngày làm chung, khối lượng hoàn thành là: 5 × 3/20 = 15/20 = 3/4 (công việc).",
                  "Bước 4: Phần việc còn lại chưa hoàn thành: 1 - 3/4 = 1/4 (công việc)."
            ],
            "tips": "Coi toàn bộ công việc là đơn vị 1, năng suất mỗi ngày bằng 1 chia cho tổng số ngày hoàn thành."
      },
      {
            "id": 16,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 16: Venn Diagram / Câu 16: Biểu đồ Ven & Tập hợp",
            "question": "In a class of 40 students, 25 students participate in the Math Club, 20 students participate in the English Club, and 5 students do not participate in either club. How many students participate in both clubs?\n(Trong một lớp học gồm 40 học sinh, có 25 học sinh tham gia CLB Toán, 20 học sinh tham gia CLB Tiếng Anh, và 5 học sinh không tham gia CLB nào. Hỏi có bao nhiêu học sinh tham gia cả hai CLB?)",
            "keywords": "Venn diagram: Biểu đồ Ven; Both clubs: Cả hai câu lạc bộ.",
            "studentAnswer": "",
            "correctAnswer": "10",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Tập hợp & Logic",
            "difficulty": "Trung bình",
            "explanation": "Số học sinh tham gia ít nhất 1 CLB: 40 - 5 = 35 học sinh. Áp dụng công thức tập hợp: |A ∪ B| = |A| + |B| - |A ∩ B| => 35 = 25 + 20 - x => x = 45 - 35 = 10 học sinh.",
            "solutionSteps": [
                  "Bước 1: Tìm số học sinh có tham gia ít nhất 1 câu lạc bộ: 40 - 5 = 35 (học sinh).",
                  "Bước 2: Lấy tổng số học sinh ở 2 CLB: 25 + 20 = 45 (lượt học sinh).",
                  "Bước 3: Số học sinh tham gia cả hai CLB bị tính trùng 2 lần, do đó số học sinh tham gia cả 2 CLB là: 45 - 35 = 10 (học sinh)."
            ],
            "tips": "Số phần tử giao nhau = Tổng từng nhóm - Số người tham gia ít nhất một nhóm."
      },
      {
            "id": 17,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 17: River Current Motion / Câu 17: Chuyển động ca nô xuôi - ngược dòng",
            "question": "The speed of a boat in still water is 24 km/h. The speed of the water current is 4 km/h. The boat travels 56 km downstream and then returns upstream to the starting point. What is the total travel time in hours?\n(Vận tốc của một ca nô khi nước yên lặng là 24 km/h. Vận tốc dòng nước là 4 km/h. Ca nô đi xuôi dòng 56 km rồi quay ngược dòng về điểm xuất phát. Tính tổng thời gian cả đi và về theo giờ?)",
            "keywords": "Still water: Nước yên lặng; Downstream: Xuôi dòng; Upstream: Ngược dòng.",
            "studentAnswer": "",
            "correctAnswer": "4.8",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán chuyển động dòng nước",
            "difficulty": "Trung bình",
            "explanation": "Vận tốc xuôi dòng: 24 + 4 = 28 km/h => Thời gian xuôi dòng: 56 : 28 = 2 giờ. Vận tốc ngược dòng: 24 - 4 = 20 km/h => Thời gian ngược dòng: 56 : 20 = 2,8 giờ. Tổng thời gian: 2 + 2,8 = 4,8 giờ.",
            "solutionSteps": [
                  "Bước 1: Vận tốc ca nô khi xuôi dòng: v_xuôi = 24 + 4 = 28 (km/h).",
                  "Bước 2: Thời gian ca nô đi xuôi dòng: t_xuôi = 56 : 28 = 2 (giờ).",
                  "Bước 3: Vận tốc ca nô khi ngược dòng: v_ngược = 24 - 4 = 20 (km/h).",
                  "Bước 4: Thời gian ca nô đi ngược dòng: t_ngược = 56 : 20 = 2,8 (giờ).",
                  "Bước 5: Tổng thời gian cả đi và về: 2 + 2,8 = 4,8 (giờ)."
            ],
            "tips": "v_xuôi = v_thực + v_dòng; v_ngược = v_thực - v_dòng."
      },
      {
            "id": 18,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 18: Perfect Square Factorization / Câu 18: Phân tích số nguyên tố & Số chính phương",
            "question": "Find the smallest positive integer n such that the product 180 × n is a perfect square.\n(Tìm số nguyên dương n nhỏ nhất sao cho tích 180 × n là một số chính phương.)",
            "keywords": "Smallest positive integer: Số nguyên dương nhỏ nhất; Perfect square: Số chính phương.",
            "studentAnswer": "",
            "correctAnswer": "5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Số chính phương",
            "difficulty": "Trung bình",
            "explanation": "Phân tích 180 ra thừa số nguyên tố: 180 = 2² × 3² × 5¹. Để tích 180 × n là số chính phương thì mọi số mũ của các thừa số nguyên tố phải là số chẵn. Thừa số 5 có số mũ lẻ là 1, vậy n nhỏ nhất cần nhân thêm là 5¹ = 5.",
            "solutionSteps": [
                  "Bước 1: Phân tích 180 ra thừa số nguyên tố: 180 = 2 × 2 × 3 × 3 × 5 = 2² × 3² × 5¹.",
                  "Bước 2: Một số là số chính phương khi và chỉ khi tất cả các số mũ trong phân tích tiêu chuẩn đều là số chẵn.",
                  "Bước 3: Nhận thấy 2 và 3 đã có số mũ chẵn (2), còn thừa số 5 đang có số mũ lẻ (1).",
                  "Bước 4: Do đó, số n nhỏ nhất cần tìm là n = 5 để tạo thành 2² × 3² × 5² = 900 = 30²."
            ],
            "tips": "Nhân bù các thừa số có số mũ lẻ để đạt được số mũ chẵn nhỏ nhất."
      },
      {
            "id": 19,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 19: Triangle Area Ratio / Câu 19: Tỉ số diện tích tam giác",
            "question": "In triangle ABC, point D lies on side BC such that BD = 2 × DC. Point E is the midpoint of AD. If the area of triangle ABC is 60 cm², find the area of triangle ABE in cm².\n(Trong tam giác ABC, điểm D nằm trên cạnh BC sao cho BD = 2 × DC. Điểm E là trung điểm của AD. Biết diện tích tam giác ABC là 60 cm², tính diện tích tam giác ABE theo cm².)",
            "keywords": "Midpoint: Trung điểm; Area: Diện tích; Ratio: Tỉ số diện tích.",
            "studentAnswer": "",
            "correctAnswer": "20",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học phẳng",
            "difficulty": "Nâng cao",
            "explanation": "BD = 2/3 BC nên S(ABD) = 2/3 × S(ABC) = 2/3 × 60 = 40 cm². E là trung điểm AD nên S(ABE) = 1/2 × S(ABD) = 1/2 × 40 = 20 cm².",
            "solutionSteps": [
                  "Bước 1: Hai tam giác ABD và ABC có chung đường cao hạ từ đỉnh A xuống BC. Vì BD = 2 × DC nên đáy BD = 2/3 cạnh đáy BC.",
                  "Bước 2: Suy ra diện tích tam giác ABD: S(ABD) = 2/3 × S(ABC) = 2/3 × 60 = 40 (cm²).",
                  "Bước 3: Xét hai tam giác ABE và ABD có chung đường cao hạ từ đỉnh B xuống AD. Vì E là trung điểm AD nên đáy AE = 1/2 AD.",
                  "Bước 4: Suy ra diện tích tam giác ABE: S(ABE) = 1/2 × S(ABD) = 1/2 × 40 = 20 (cm²)."
            ],
            "tips": "Hai tam giác có chung đường cao thì tỉ số diện tích bằng tỉ số hai cạnh đáy tương ứng."
      },
      {
            "id": 20,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 20: Modular Arithmetic / Câu 20: Đồng dư thức & Số dư phép chia lũy thừa",
            "question": "Find the remainder when 2^2025 is divided by 7.\n(Tìm số dư khi chia 2^2025 cho 7.)",
            "keywords": "Remainder: Số dư; Divided by: Chia cho; Power: Lũy thừa.",
            "studentAnswer": "",
            "correctAnswer": "1",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Đồng dư",
            "difficulty": "Nâng cao",
            "explanation": "Ta có: 2³ = 8 ≡ 1 (mod 7). Do 2025 = 3 × 675 chia hết cho 3, nên 2^2025 = (2³)^675 ≡ 1^675 ≡ 1 (mod 7). Số dư là 1.",
            "solutionSteps": [
                  "Bước 1: Tính các lũy thừa ban đầu của 2 chia cho 7: 2¹ = 2 chia 7 dư 2; 2² = 4 chia 7 dư 4; 2³ = 8 chia 7 dư 1.",
                  "Bước 2: Khi đạt được số dư là 1, chu kỳ số dư sẽ lặp lại sau mỗi 3 lũy thừa.",
                  "Bước 3: Lấy số mũ chia cho chu kỳ: 2025 : 3 = 675 (chia hết, dư 0).",
                  "Bước 4: Do chia hết, số dư tương ứng với 2³, tức là dư 1."
            ],
            "tips": "Tìm lũy thừa sao cho khi chia cho số chia nhận được số dư là 1 hoặc -1 để tính nhanh số mũ lớn."
      },
      {
            "id": 21,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 21: Percentage Change / Câu 21: Tỉ số phần trăm tăng giảm liên tiếp",
            "question": "A shop increases the price of an item by 20%, and later decreases the new price by 20%. By what percentage is the final price compared to the original price, and is it higher or lower?\n(Một cửa hàng tăng giá một mặt hàng thêm 20%, sau đó lại giảm giá mới đó đi 20%. Hỏi so với giá ban đầu, giá cuối cùng giảm bao nhiêu phần trăm?)",
            "keywords": "Percentage: Phần trăm; Increase: Tăng; Decrease: Giảm.",
            "studentAnswer": "",
            "correctAnswer": "4%",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Tỉ số phần trăm",
            "difficulty": "Trung bình",
            "explanation": "Coi giá ban đầu là 100%. Giá sau khi tăng: 100% × 1.2 = 120%. Giá sau khi giảm: 120% × (1 - 0.2) = 120% × 0.8 = 96%. So với giá gốc, giá đã giảm: 100% - 96% = 4%.",
            "solutionSteps": [
                  "Bước 1: Giả sử giá bán ban đầu là 100 (đồng).",
                  "Bước 2: Giá sau khi tăng 20%: 100 + 20 = 120 (đồng).",
                  "Bước 3: Khi giảm 20% trên giá mới, số tiền giảm là: 120 × 20% = 24 (đồng).",
                  "Bước 4: Giá bán cuối cùng: 120 - 24 = 96 (đồng).",
                  "Bước 5: So với giá ban đầu 100, mức giảm là: 100 - 96 = 4 (đồng), tương ứng giảm 4%."
            ],
            "tips": "Tăng x% rồi giảm x% thì luôn luôn bị lỗ/giảm một lượng bằng (x/10)% bình phương."
      },
      {
            "id": 22,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 22: Chords on a Circle / Câu 22: Đếm số dây cung trên đường tròn",
            "question": "There are 8 distinct points marked on a circle. How many different chords can be formed by connecting any two of these points?\n(Có 8 điểm phân biệt được lấy trên một đường tròn. Hỏi có thể tạo được bao nhiêu dây cung khác nhau bằng cách nối hai điểm bất kỳ trong 8 điểm đó?)",
            "keywords": "Circle: Đường tròn; Chords: Dây cung; Distinct points: Điểm phân biệt.",
            "studentAnswer": "",
            "correctAnswer": "28",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học tổ hợp",
            "difficulty": "Trung bình",
            "explanation": "Mỗi dây cung được tạo thành bởi 2 điểm phân biệt bất kỳ trên đường tròn. Số dây cung tạo thành là tổ hợp chập 2 của 8 điểm: C(8, 2) = (8 × 7) / 2 = 28 dây cung.",
            "solutionSteps": [
                  "Bước 1: Một dây cung được xác định khi nối 2 điểm phân biệt bất kỳ nằm trên đường tròn.",
                  "Bước 2: Điểm thứ nhất có 8 cách chọn. Điểm thứ hai có 7 cách chọn (khác điểm thứ nhất).",
                  "Bước 3: Vì đoạn thẳng AB và BA là cùng một dây cung nên mỗi dây bị tính lặp 2 lần.",
                  "Bước 4: Số lượng dây cung phân biệt là: (8 × 7) : 2 = 28 (dây cung)."
            ],
            "tips": "Công thức bắt tay / nối n điểm không thẳng hàng: n × (n - 1) / 2."
      },
      {
            "id": 23,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 23: Sum of Arithmetic Progression with Remainder / Câu 23: Tổng dãy số chia có dư",
            "question": "Find the sum of all two-digit positive integers that leave a remainder of 3 when divided by 7.\n(Tính tổng của tất cả các số nguyên dương có hai chữ số chia cho 7 dư 3.)",
            "keywords": "Two-digit: Có hai chữ số; Remainder: Số dư; Sum: Tổng.",
            "studentAnswer": "",
            "correctAnswer": "715",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Dãy số cách đều",
            "difficulty": "Nâng cao",
            "explanation": "Số có dạng 7k + 3. Số nhỏ nhất có 2 chữ số: 7(1) + 3 = 10. Số lớn nhất có 2 chữ số: 7(13) + 3 = 94. Dãy số: 10, 17, 24, ..., 94. Số số hạng: (94 - 10):7 + 1 = 13 số. Tổng = (10 + 94) × 13 : 2 = 715.",
            "solutionSteps": [
                  "Bước 1: Dạng tổng quát của số chia cho 7 dư 3 là 7k + 3 (k là số tự nhiên).",
                  "Bước 2: Tìm số nhỏ nhất có hai chữ số: với k = 1 thì 7 × 1 + 3 = 10.",
                  "Bước 3: Tìm số lớn nhất có hai chữ số: 7k + 3 < 100 => 7k < 97 => k lớn nhất là 13. Số đó là 7 × 13 + 3 = 94.",
                  "Bước 4: Dãy các số là: 10, 17, 24, ..., 94. Khoảng cách d = 7. Số các số hạng = (94 - 10) : 7 + 1 = 13 (số).",
                  "Bước 5: Tổng dãy số cách đều = (Số đầu + Số cuối) × Số số hạng : 2 = (10 + 94) × 13 : 2 = 104 × 13 : 2 = 715."
            ],
            "tips": "Công thức Gauss: Tổng = (Đầu + Cuối) × Số số hạng / 2."
      },
      {
            "id": 24,
            "part": 2,
            "partTitle": "Part 2: Questions 13 – 24 (6 points each) / Phần 2: Câu 13 – 24 (Mỗi câu 6 điểm)",
            "title": "Question 24: Probability & Total / Câu 24: Xác suất và tổng số phần",
            "question": "A box contains red and blue marbles. The probability of randomly drawing a red marble is 5/8. If there are 24 blue marbles in the box, what is the total number of marbles in the box?\n(Một chiếc hộp chứa các viên bi màu đỏ và màu xanh. Xác suất bốc ngẫu nhiên được một viên bi đỏ là 5/8. Nếu trong hộp có 24 viên bi xanh, hỏi tổng số viên bi trong hộp là bao nhiêu viên?)",
            "keywords": "Probability: Xác suất; Marbles: Viên bi; Total: Tổng số.",
            "studentAnswer": "",
            "correctAnswer": "64",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Xác suất & Tỉ số",
            "difficulty": "Trung bình",
            "explanation": "Xác suất bốc bi xanh là 1 - 5/8 = 3/8. Bi xanh chiếm 3/8 tổng số bi trong hộp. Tổng số bi = 24 : (3/8) = 64 viên.",
            "solutionSteps": [
                  "Bước 1: Tính tỉ số phần trăm/xác suất bốc được bi xanh: P(xanh) = 1 - 5/8 = 3/8.",
                  "Bước 2: 24 viên bi xanh ứng với 3 phần trong tổng số 8 phần bằng nhau.",
                  "Bước 3: Giá trị của 1 phần là: 24 : 3 = 8 (viên bi).",
                  "Bước 4: Tổng số viên bi trong hộp là: 8 × 8 = 64 (viên bi)."
            ],
            "tips": "Tổng các xác suất thành phần của biến cố đối luôn bằng 1."
      },
      {
            "id": 25,
            "part": 3,
            "partTitle": "Part 3: Questions 25 – 29 (7 points each) / Phần 3: Câu 25 – 29 (Mỗi câu 7 điểm)",
            "title": "Question 25: Repeating Sequence Sum / Câu 25: Tổng dãy số tuần hoàn chu kỳ",
            "question": "Given the repeating sequence of numbers: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ... repeating every 5 digits. What is the 2025th digit in the sequence, and what is the sum of the first 2025 digits?\n(Cho dãy số lặp lại theo chu kỳ 5 số: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ... Chữ số thứ 2025 là số nào và tổng của 2025 số đầu tiên là bao nhiêu?)",
            "keywords": "Repeating sequence: Dãy số tuần hoàn; Period: Chu kỳ; Sum: Tổng.",
            "studentAnswer": "",
            "correctAnswer": "5 và 6075",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Dãy số & Chu kỳ",
            "difficulty": "Olympic",
            "explanation": "Chu kỳ dài 5 số: (1, 2, 3, 4, 5). Tổng một chu kỳ là 1 + 2 + 3 + 4 + 5 = 15. Vì 2025 : 5 = 405 (dư 0) nên chữ số thứ 2025 là chữ số cuối chu kỳ: 5. Tổng 2025 số đầu tiên là: 405 × 15 = 6075.",
            "solutionSteps": [
                  "Bước 1: Xác định chu kỳ lặp lại gồm 5 số hạng: {1, 2, 3, 4, 5}.",
                  "Bước 2: Tính tổng của một chu kỳ: 1 + 2 + 3 + 4 + 5 = 15.",
                  "Bước 3: Lấy 2025 chia cho độ dài chu kỳ 5: 2025 : 5 = 405 (không dư).",
                  "Bước 4: Vì phép chia hết, số hạng thứ 2025 chính là số cuối cùng của chu kỳ: 5.",
                  "Bước 5: Tổng của 2025 số đầu tiên bằng 405 chu kỳ nhân với 15: 405 × 15 = 6075."
            ],
            "tips": "Nếu có số dư r > 0, ta lấy tổng các chu kỳ nguyên cộng thêm r số hạng đầu tiên của chu kỳ tiếp theo."
      },
      {
            "id": 26,
            "part": 3,
            "partTitle": "Part 3: Questions 25 – 29 (7 points each) / Phần 3: Câu 25 – 29 (Mỗi câu 7 điểm)",
            "title": "Question 26: Diophantine Reciprocal Equation / Câu 26: Phương trình nghiệm nguyên phân số",
            "question": "Find the number of pairs of positive integers (x, y) that satisfy the equation: 1/x + 1/y = 1/6 with x <= y.\n(Tìm số cặp số nguyên dương (x, y) thỏa mãn phương trình: 1/x + 1/y = 1/6 với x <= y.)",
            "keywords": "Positive integers: Số nguyên dương; Reciprocal: Nghịch đảo; Factors: Ước số.",
            "studentAnswer": "",
            "correctAnswer": "5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Phương trình nghiệm nguyên",
            "difficulty": "Olympic",
            "explanation": "Quy đồng và nhân chéo: 6(x + y) = xy => xy - 6x - 6y = 0 => (x - 6)(y - 6) = 36. Vì x <= y và x, y nguyên dương nên x - 6 <= y - 6. Các cặp ước của 36 là: (1, 36), (2, 18), (3, 12), (4, 9), (6, 6). Có đúng 5 cặp nghiệm.",
            "solutionSteps": [
                  "Bước 1: Biến đổi phương trình: (x + y)/(xy) = 1/6 <=> xy - 6x - 6y = 0.",
                  "Bước 2: Đưa về dạng tích ước số: x(y - 6) - 6(y - 6) = 36 <=> (x - 6)(y - 6) = 36.",
                  "Bước 3: Do x <= y và x > 6 nên 0 < x - 6 <= y - 6. Ta phân tích 36 thành tích hai số nguyên dương (u, v) với u <= v.",
                  "Bước 4: Các cặp (u, v) là: (1, 36), (2, 18), (3, 12), (4, 9), (6, 6) -> Có 5 cặp.",
                  "Bước 5: Tương ứng có 5 cặp nghiệm (x, y): (7, 42), (8, 24), (9, 18), (10, 15), (12, 12)."
            ],
            "tips": "Phương pháp đưa về phương trình ước số: ab - ma - nb = c <=> (a - n)(b - m) = c + mn."
      },
      {
            "id": 27,
            "part": 3,
            "partTitle": "Part 3: Questions 25 – 29 (7 points each) / Phần 3: Câu 25 – 29 (Mỗi câu 7 điểm)",
            "title": "Question 27: Factorial Digit Sum Number / Câu 27: Số tự nhiên bằng tổng giai thừa chữ số",
            "question": "Find the unique 3-digit number ABC that is equal to the sum of the factorials of its digits: ABC = A! + B! + C! (where n! = 1 × 2 × ... × n).\n(Tìm số tự nhiên có 3 chữ số duy nhất ABC bằng tổng giai thừa các chữ số của nó: ABC = A! + B! + C! (với n! = 1 × 2 × ... × n).)",
            "keywords": "Factorial: Giai thừa; 3-digit number: Số có 3 chữ số; Unique: Duy nhất.",
            "studentAnswer": "",
            "correctAnswer": "145",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Số đặc biệt",
            "difficulty": "Olympic",
            "explanation": "Ta có: 0!=1, 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040 (quá 3 chữ số). Chữ số lớn nhất chỉ có thể là 5 hoặc 6. Thử 145: 1! + 4! + 5! = 1 + 24 + 120 = 145. Vậy số cần tìm là 145.",
            "solutionSteps": [
                  "Bước 1: Tính giá trị giai thừa các chữ số: 0!=1, 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040.",
                  "Bước 2: Vì ABC là số có 3 chữ số (100 <= ABC <= 999), các chữ số không thể lớn hơn hoặc bằng 7 (vì 7! = 5040 > 999).",
                  "Bước 3: Nếu chữ số lớn nhất là 6 thì 6! = 720. Nhưng số có dạng 7xx hoặc 8xx, các chữ số khác sẽ làm tổng giai thừa vượt quá.",
                  "Bước 4: Xét chữ số lớn nhất là 5: 5! = 120. Để tổng có chữ số hàng trăm là 1, chữ số đầu tiên A = 1. Khi đó 1! + B! + 5! = 1 + B! + 120 = 121 + B!.",
                  "Bước 5: Thử B = 4: 121 + 4! = 121 + 24 = 145. Số đó đúng bằng 145!"
            ],
            "tips": "Giới hạn miền giá trị của chữ số bằng cách so sánh số mũ và giai thừa lớn nhất."
      },
      {
            "id": 28,
            "part": 3,
            "partTitle": "Part 3: Questions 25 – 29 (7 points each) / Phần 3: Câu 25 – 29 (Mỗi câu 7 điểm)",
            "title": "Question 28: Logic Race Ranking / Câu 28: Suy luận logic thứ tự cuộc thi chạy",
            "question": "Four students Alice, Bob, Charlie, and David participate in a race. Alice finishes ahead of Bob. Charlie finishes after Alice but ahead of David. Bob finishes ahead of Charlie. What is the exact finishing order from 1st to 4th place?\n(Bốn bạn học sinh Alice, Bob, Charlie và David tham gia cuộc chạy đua. Alice về đích trước Bob. Charlie về đích sau Alice nhưng trước David. Bob về đích trước Charlie. Hãy xác định thứ tự về đích chính xác từ thứ nhất đến thứ tư?)",
            "keywords": "Ahead: Về trước; After: Về sau; Order: Thứ tự về đích.",
            "studentAnswer": "",
            "correctAnswer": "Alice, Bob, Charlie, David",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán tư duy & Logic",
            "difficulty": "Olympic",
            "explanation": "Từ đề bài: Alice > Bob (Alice trước Bob). Charlie sau Alice nhưng trước David: Alice > Charlie > David. Bob trước Charlie: Bob > Charlie. Kết hợp lại: Alice > Bob > Charlie > David.",
            "solutionSteps": [
                  "Bước 1: Phân tích giả thiết 1: Alice về đích trước Bob (Alice > Bob).",
                  "Bước 2: Phân tích giả thiết 2: Charlie về đích sau Alice nhưng trước David (Alice > Charlie > David).",
                  "Bước 3: Phân tích giả thiết 3: Bob về đích trước Charlie (Bob > Charlie).",
                  "Bước 4: Ghép thứ tự hoàn chỉnh: Alice đứng đầu (trước Bob), Bob trước Charlie, Charlie trước David.",
                  "Bước 5: Thứ tự về đích từ hạng nhất đến hạng tư: Alice -> Bob -> Charlie -> David."
            ],
            "tips": "Sử dụng dấu so sánh lớn hơn (>) để thiết lập chuỗi quan hệ thứ bậc logic."
      },
      {
            "id": 29,
            "part": 3,
            "partTitle": "Part 3: Questions 25 – 29 (7 points each) / Phần 3: Câu 25 – 29 (Mỗi câu 7 điểm)",
            "title": "Question 29: Diagonal Quadrilateral Area / Câu 29: Tỉ số diện tích tứ giác cắt nhau bởi đường chéo",
            "question": "In a convex quadrilateral ABCD, the diagonals AC and BD intersect at point O. The areas of triangles AOB, BOC, and COD are 12 cm², 18 cm², and 24 cm² respectively. Find the area of triangle DOA and the total area of quadrilateral ABCD in cm².\n(Cho tứ giác lồi ABCD có hai đường chéo AC và BD cắt nhau tại điểm O. Biết diện tích các tam giác AOB, BOC và COD lần lượt là 12 cm², 18 cm² và 24 cm². Tính diện tích tam giác DOA và diện tích toàn bộ tứ giác ABCD theo cm².)",
            "keywords": "Convex quadrilateral: Tứ giác lồi; Diagonals: Đường chéo; Area: Diện tích.",
            "studentAnswer": "",
            "correctAnswer": "16 và 70",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học nâng cao",
            "difficulty": "Olympic",
            "explanation": "Tính chất giao điểm hai đường chéo: S(AOB) × S(COD) = S(BOC) × S(DOA). Thay số: 12 × 24 = 18 × S(DOA) => 288 = 18 × S(DOA) => S(DOA) = 16 cm². Tổng diện tích ABCD = 12 + 18 + 24 + 16 = 70 cm².",
            "solutionSteps": [
                  "Bước 1: Hai tam giác AOB và BOC chung đường cao từ B xuống AC, do đó S(AOB) / S(BOC) = OA / OC.",
                  "Bước 2: Tương tự, hai tam giác DOA và COD chung đường cao từ D xuống AC, do đó S(DOA) / S(COD) = OA / OC.",
                  "Bước 3: Suy ra S(AOB) / S(BOC) = S(DOA) / S(COD) <=> S(AOB) × S(COD) = S(BOC) × S(DOA).",
                  "Bước 4: Thay số tính diện tích tam giác DOA: S(DOA) = (12 × 24) : 18 = 288 : 18 = 16 (cm²).",
                  "Bước 5: Tổng diện tích tứ giác ABCD = 12 + 18 + 24 + 16 = 70 (cm²)."
            ],
            "tips": "Tích diện tích hai tam giác đối diện qua giao điểm đường chéo luôn bằng nhau: S1 × S3 = S2 × S4."
      },
      {
            "id": 30,
            "part": 4,
            "partTitle": "Bonus Question (20 points) / Câu hỏi Điểm thưởng (20 điểm)",
            "title": "Question 30: Diagonal Passing Grid Squares / Câu 30: Đường chéo cắt lưới ô vuông",
            "question": "A rectangular grid has a dimension of 2019 × 9422 unit squares. How many 1×1 unit squares does the main diagonal of this grid pass through internally?\n(Một lưới ô vuông hình chữ nhật kích thước 2019 × 9422 ô vuông đơn vị. Hỏi đường chéo chính của lưới hình chữ nhật này đi xuyên qua miền trong của bao nhiêu ô vuông 1×1?)",
            "keywords": "Rectangular grid: Lưới chữ nhật; Main diagonal: Đường chéo chính; Pass through: Đi xuyên qua; GCD: Ước chung lớn nhất.",
            "studentAnswer": "",
            "correctAnswer": "10768",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học tổ hợp & Số học",
            "difficulty": "Olympic Quốc tế",
            "explanation": "Công thức số ô vuông đơn vị mà đường chéo đi qua trong lưới m × n là: N = m + n - gcd(m, n). Với m = 2019, n = 9422: 2019 = 3 × 673 (673 là số nguyên tố), 9422 = 14 × 673. Do đó gcd(2019, 9422) = 673. Vậy số ô vuông đường chéo đi qua = 2019 + 9422 - 673 = 10768.",
            "solutionSteps": [
                  "Bước 1: Áp dụng định lý hình học tổ hợp về đường thẳng cắt lưới m × n: Mỗi lần đường chéo vượt qua 1 đường kẻ đứng hoặc 1 đường kẻ ngang, nó bước sang một ô vuông mới.",
                  "Bước 2: Đường chéo đi qua (m - 1) đường kẻ ngang và (n - 1) đường kẻ dọc. Khi đường chéo đi qua một nút lưới (giao điểm của cả kẻ đứng và ngang), nó chỉ đi qua 1 ô chứ không phải 2. Số nút lưới mà đường chéo đi qua bên trong là gcd(m, n) - 1.",
                  "Bước 3: Do đó, tổng số ô vuông đường chéo đi qua là: N = 1 + (m - 1) + (n - 1) - (gcd(m, n) - 1) = m + n - gcd(m, n).",
                  "Bước 4: Tìm ƯCLN(2019, 9422): 2019 = 3 × 673. Ta kiểm tra 9422 : 673 = 14 (chia hết). Vậy gcd(2019, 9422) = 673.",
                  "Bước 5: Tính kết quả: N = 2019 + 9422 - 673 = 11441 - 673 = 10768 (ô vuông)."
            ],
            "tips": "Công thức kinh điển Olympic: Số ô vuông lưới m × n mà đường chéo đi qua = m + n - ƯCLN(m, n)."
      }
]
  },

  // =========================================================================
  // 4. GMATH 2025 – TIỂU HỌC (KHỐI 1 - DÀNH CHO TONY ĐOÀN NHẬT MINH)
  // Thể lệ chuẩn GMATH: 20 câu hỏi tư duy song ngữ, 60 phút, hình học trực quan, phép cộng trừ trong phạm vi 20.
  // =========================================================================
  {
    id: 'exam_gmath_2025_l1',
    title: 'Đề Thi Toán Tiếng Anh GMATH 2025 – Cấp Tiểu Học (Lớp 1)',
    program: 'GMATH',
    programName: 'GMATH International English Math',
    level: 'primary',
    grade: 'Lớp 1',
    year: 2025,
    round: 'Vòng Tuyển Chọn (Primary Round)',
    durationMinutes: 60,
    questionCount: 20,
    difficulty: 'Cơ bản',
    description: 'Đề thi 20 câu Toán Tiếng Anh GMATH chuẩn lớp 1: Đếm sao, so sánh lớn bé, hình học tam giác - chữ nhật, xem đồng hồ, số thứ tự và logic cân thăng bằng (Song ngữ Anh - Việt).',
    questions: [
      {
            "id": 1,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 1: Counting Stars / Câu 1: Đếm số ngôi sao",
            "question": "How many stars are there in the picture below: ★ ★ ★ ★ ★ ★ ★ ?\n(Có bao nhiêu ngôi sao ở hình dưới đây: ★ ★ ★ ★ ★ ★ ★ ?)",
            "keywords": "Counting: Đếm số; Stars: Ngôi sao.",
            "studentAnswer": "",
            "correctAnswer": "7",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Đếm số",
            "difficulty": "Cơ bản",
            "explanation": "Đếm lần lượt từ trái sang phải: 1, 2, 3, 4, 5, 6, 7. Có tất cả 7 ngôi sao.",
            "solutionSteps": [
                  "Bước 1: Chỉ tay đếm lần lượt từng ngôi sao từ trái qua phải.",
                  "Bước 2: Kết quả đếm được là 7 ngôi sao."
            ],
            "tips": "Đếm cẩn thận từng vật thể để không bị sót hoặc trùng lặp."
      },
      {
            "id": 2,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 2: Comparing Numbers / Câu 2: So sánh số lớn hơn, bé hơn",
            "question": "Which symbol (> , < , =) goes into the blank: 8 ___ 5 ?\n(Dấu nào (> , < , =) thích hợp để điền vào chỗ trống: 8 ___ 5 ?)",
            "keywords": "Greater than (>): Lớn hơn; Less than (<): Bé hơn; Equal (=): Bằng nhau.",
            "studentAnswer": "",
            "correctAnswer": ">",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & So sánh",
            "difficulty": "Cơ bản",
            "explanation": "Số 8 lớn hơn số 5, do đó ta điền dấu lớn hơn: 8 > 5.",
            "solutionSteps": [
                  "Bước 1: So sánh hai số trên trục số: 8 đứng sau 5.",
                  "Bước 2: Do đó 8 lớn hơn 5, điền dấu >."
            ],
            "tips": "Đầu nhọn của dấu luôn quay về phía số bé hơn."
      },
      {
            "id": 3,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 3: Sides of a Triangle / Câu 3: Số cạnh của hình tam giác",
            "question": "How many sides does a triangle have?\n(Một hình tam giác có bao nhiêu cạnh?)",
            "keywords": "Triangle: Hình tam giác; Sides: Cạnh.",
            "studentAnswer": "",
            "correctAnswer": "3",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học & Nhận biết hình",
            "difficulty": "Cơ bản",
            "explanation": "Hình tam giác là hình học có đúng 3 cạnh và 3 đỉnh.",
            "solutionSteps": [
                  "Bước 1: Nhớ lại định nghĩa hình tam giác (Tri- nghĩa là ba).",
                  "Bước 2: Hình tam giác có 3 cạnh."
            ],
            "tips": "Tiền tố 'Tri' trong tiếng Anh nghĩa là 3 (Triangle: tam giác; Tricycle: xe 3 bánh)."
      },
      {
            "id": 4,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 4: Apples Left / Câu 4: Bài toán bớt đi (phép trừ)",
            "question": "Tony has 9 apples. He eats 3 apples. How many apples does Tony have left?\n(Tony có 9 quả táo. Tony ăn mất 3 quả. Hỏi Tony còn lại bao nhiêu quả táo?)",
            "keywords": "Have left: Còn lại (phép trừ); Eats: Ăn mất.",
            "studentAnswer": "",
            "correctAnswer": "6",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Phép trừ",
            "difficulty": "Cơ bản",
            "explanation": "Phép tính tìm số táo còn lại: 9 - 3 = 6 quả táo.",
            "solutionSteps": [
                  "Bước 1: Ban đầu có 9 quả táo.",
                  "Bước 2: Ăn mất 3 quả nghĩa là bớt đi 3: 9 - 3 = 6 (quả táo)."
            ],
            "tips": "Từ khóa 'have left' (còn lại) chỉ phép tính trừ."
      },
      {
            "id": 5,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 5: Number Pattern by 2 / Câu 5: Dãy số chẵn đếm nhảy 2",
            "question": "Find the missing number in the sequence: 2, 4, 6, 8, ___, 12.\n(Tìm số còn thiếu trong dãy số: 2, 4, 6, 8, ___, 12.)",
            "keywords": "Sequence: Dãy số; Missing number: Số còn thiếu.",
            "studentAnswer": "",
            "correctAnswer": "10",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Dãy số & Quy luật",
            "difficulty": "Cơ bản",
            "explanation": "Quy luật đếm thêm 2 đơn vị: 2, 4, 6, 8, 10, 12. Số còn thiếu là 10.",
            "solutionSteps": [
                  "Bước 1: Tìm khoảng cách giữa các số: 4 - 2 = 2; 6 - 4 = 2; 8 - 6 = 2.",
                  "Bước 2: Lấy số liền trước cộng 2: 8 + 2 = 10."
            ],
            "tips": "Dãy số tăng dần cách đều 2 đơn vị."
      },
      {
            "id": 6,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 6: Corners of a Rectangle / Câu 6: Số đỉnh của hình chữ nhật",
            "question": "How many corners (vertices) does a rectangle have?\n(Một hình chữ nhật có bao nhiêu góc (đỉnh)?)",
            "keywords": "Rectangle: Hình chữ nhật; Corners: Góc/Đỉnh.",
            "studentAnswer": "",
            "correctAnswer": "4",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học & Nhận biết hình",
            "difficulty": "Cơ bản",
            "explanation": "Hình chữ nhật có 4 cạnh và 4 góc vuông (4 đỉnh).",
            "solutionSteps": [
                  "Bước 1: Quan sát hình chữ nhật hoặc quyển sách.",
                  "Bước 2: Đếm 4 góc ở 4 phía, kết quả là 4 góc."
            ],
            "tips": "Hình tứ giác (vuông, chữ nhật) luôn có 4 góc."
      },
      {
            "id": 7,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 7: Addition within 20 / Câu 7: Phép cộng có nhớ trong phạm vi 20",
            "question": "Tony has 8 blue pencils and 7 yellow pencils. How many pencils does Tony have altogether?\n(Tony có 8 chiếc bút chì màu xanh và 7 chiếc bút chì màu vàng. Hỏi Tony có tất cả bao nhiêu chiếc bút chì?)",
            "keywords": "Altogether: Tất cả (phép cộng); Pencils: Bút chì.",
            "studentAnswer": "",
            "correctAnswer": "15",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Phép cộng",
            "difficulty": "Cơ bản",
            "explanation": "Phép tính cộng tổng: 8 + 7 = 15 chiếc bút chì.",
            "solutionSteps": [
                  "Bước 1: Xác định bài toán hỏi tất cả (altogether) là phép cộng.",
                  "Bước 2: Tính 8 + 7 = 8 + 2 + 5 = 10 + 5 = 15."
            ],
            "tips": "Tách 7 thành 2 và 5 để làm tròn chục 8 + 2 = 10, rồi cộng 5 bằng 15."
      },
      {
            "id": 8,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 8: Flying Birds Subtraction / Câu 8: Đàn chim bay đi",
            "question": "There are 16 birds sitting on a tree branch. 7 birds fly away. How many birds are still on the tree?\n(Có 16 chú chim đang đậu trên cành cây. 7 chú chim bay đi mất. Hỏi còn lại bao nhiêu chú chim trên cành cây?)",
            "keywords": "Fly away: Bay đi (trừ đi); Still on the tree: Còn trên cây.",
            "studentAnswer": "",
            "correctAnswer": "9",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Phép trừ",
            "difficulty": "Cơ bản",
            "explanation": "Phép tính trừ: 16 - 7 = 9 chú chim.",
            "solutionSteps": [
                  "Bước 1: Ban đầu có 16 chú chim.",
                  "Bước 2: Bay mất 7 chú, ta làm phép trừ: 16 - 7 = 16 - 6 - 1 = 10 - 1 = 9."
            ],
            "tips": "Trừ qua 10: Lấy 16 trừ 6 để về 10, rồi 10 trừ tiếp 1 được 9."
      },
      {
            "id": 9,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 9: Ordinal Numbers / Câu 9: Số thứ tự hàng dọc",
            "question": "In a line of 5 children, Anna is 1st, Ben is 2nd, Tony is 3rd, Lisa is 4th, and Ruby is 5th. Who is standing directly behind Tony?\n(Trong một hàng gồm 5 bạn nhỏ, Anna đứng thứ 1, Ben đứng thứ 2, Tony đứng thứ 3, Lisa đứng thứ 4, và Ruby đứng thứ 5. Ai là người đứng ngay sau Tony?)",
            "keywords": "Directly behind: Đứng ngay phía sau; Ordinal numbers: Số thứ tự.",
            "studentAnswer": "",
            "correctAnswer": "Lisa",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán vị trí & Không gian",
            "difficulty": "Cơ bản",
            "explanation": "Tony đứng thứ 3 (3rd), bạn đứng ngay phía sau Tony là người đứng thứ 4 (4th), đó chính là Lisa.",
            "solutionSteps": [
                  "Bước 1: Xác định vị trí của Tony là thứ 3 (3rd).",
                  "Bước 2: Người đứng ngay phía sau Tony là vị trí thứ 4 (4th).",
                  "Bước 3: Vị trí thứ 4 là Lisa."
            ],
            "tips": "Đứng ngay sau nghĩa là số thứ tự tăng thêm 1."
      },
      {
            "id": 10,
            "part": 1,
            "partTitle": "Part 1: Numbers & Counting (Questions 1 – 10) / Phần 1: Số & Đếm (Câu 1 – 10)",
            "title": "Question 10: Shape Pattern / Câu 10: Quy luật hình học",
            "question": "Which shape comes next in the pattern: Circle, Square, Triangle, Circle, Square, ___ ?\n(Hình nào là hình tiếp theo trong quy luật: Hình tròn, Hình vuông, Hình tam giác, Hình tròn, Hình vuông, ___ ?)",
            "keywords": "Pattern: Quy luật; Next: Tiếp theo; Triangle: Tam giác.",
            "studentAnswer": "",
            "correctAnswer": "Triangle",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Quy luật hình học",
            "difficulty": "Cơ bản",
            "explanation": "Chu kỳ lặp lại gồm 3 hình: Tròn -> Vuông -> Tam giác. Sau hình Vuông sẽ là Hình tam giác (Triangle).",
            "solutionSteps": [
                  "Bước 1: Tìm chu kỳ lặp lại của mẫu: (Tròn, Vuông, Tam giác).",
                  "Bước 2: Chu kỳ thứ hai bắt đầu bằng Tròn, Vuông, vậy hình tiếp theo là Tam giác (Triangle)."
            ],
            "tips": "Tìm nhóm hình lặp đi lặp lại để xác định hình kế tiếp."
      },
      {
            "id": 11,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 11: Days of the Week / Câu 11: Các ngày trong tuần",
            "question": "If today is Wednesday, what day of the week will it be tomorrow?\n(Nếu hôm nay là Thứ Tư, hỏi ngày mai sẽ là thứ mấy trong tuần?)",
            "keywords": "Wednesday: Thứ Tư; Tomorrow: Ngày mai; Thursday: Thứ Năm.",
            "studentAnswer": "",
            "correctAnswer": "Thursday",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thời gian & Lịch",
            "difficulty": "Cơ bản",
            "explanation": "Thứ tự các ngày trong tuần: Thứ Hai (Monday), Thứ Ba (Tuesday), Thứ Tư (Wednesday), Thứ Năm (Thursday). Ngày mai sau Thứ Tư là Thứ Năm (Thursday).",
            "solutionSteps": [
                  "Bước 1: Xác định ngày hôm nay là Thứ Tư (Wednesday).",
                  "Bước 2: Ngày mai là ngày liền sau: Thứ Năm (Thursday)."
            ],
            "tips": "Học thuộc thứ tự 7 ngày trong tuần bằng tiếng Anh."
      },
      {
            "id": 12,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 12: Clock Reading / Câu 12: Xem giờ đúng trên đồng hồ",
            "question": "On an analog clock, the short hand points to 4 and the long hand points to 12. What time is it?\n(Trên mặt đồng hồ kim, kim ngắn chỉ vào số 4 và kim dài chỉ vào số 12. Hỏi lúc đó là mấy giờ?)",
            "keywords": "Short hand: Kim ngắn (kim giờ); Long hand: Kim dài (kim phút); O'clock: Giờ đúng.",
            "studentAnswer": "",
            "correctAnswer": "4:00",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thời gian & Đồng hồ",
            "difficulty": "Cơ bản",
            "explanation": "Kim ngắn chỉ giờ (số 4), kim dài chỉ phút (số 12 biểu thị 00 phút). Vậy đồng hồ chỉ 4:00 (4 o'clock).",
            "solutionSteps": [
                  "Bước 1: Kim ngắn chỉ giờ: số 4.",
                  "Bước 2: Kim dài chỉ vào số 12 tức là giờ đúng (00 phút).",
                  "Bước 3: Thời gian là 4:00."
            ],
            "tips": "Khi kim dài chỉ số 12, đó luôn là giờ đúng (o'clock)."
      },
      {
            "id": 13,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 13: Fair Sharing / Câu 13: Bài toán chia đều kẹo",
            "question": "Tony has 14 candies. He shares them equally with his sister Ruby. How many candies does each person get?\n(Tony có 14 cái kẹo. Tony chia đều số kẹo đó cho mình và chị Ruby. Hỏi mỗi người nhận được bao nhiêu cái kẹo?)",
            "keywords": "Shares equally: Chia đều; Each person: Mỗi người.",
            "studentAnswer": "",
            "correctAnswer": "7",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Phép chia",
            "difficulty": "Trung bình",
            "explanation": "Chia đều cho 2 người (Tony và Ruby): 14 : 2 = 7 cái kẹo mỗi người.",
            "solutionSteps": [
                  "Bước 1: Xác định số người chia kẹo: Tony và Ruby là 2 người.",
                  "Bước 2: Chia đều 14 cái kẹo cho 2 người: 14 : 2 = 7 (cái kẹo)."
            ],
            "tips": "Đọc kỹ để biết chia cho mấy người (mình và chị = 2 người)."
      },
      {
            "id": 14,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 14: Predecessor and Successor / Câu 14: Số liền trước và liền sau",
            "question": "What is the number that comes immediately before 20 and immediately after 18?\n(Số nào đứng ngay liền trước số 20 và ngay liền sau số 18?)",
            "keywords": "Immediately before: Liền trước; Immediately after: Liền sau.",
            "studentAnswer": "",
            "correctAnswer": "19",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Thứ tự số",
            "difficulty": "Cơ bản",
            "explanation": "Số đứng giữa 18 và 20 là số 19.",
            "solutionSteps": [
                  "Bước 1: Liền sau 18 là 18 + 1 = 19.",
                  "Bước 2: Liền trước 20 là 20 - 1 = 19.",
                  "Bước 3: Số cần tìm là 19."
            ],
            "tips": "Số liền trước = số đó - 1; Số liền sau = số đó + 1."
      },
      {
            "id": 15,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 15: Place Value of Tens / Câu 15: Giá trị hàng chục",
            "question": "How many tens are there in the number 60?\n(Có bao nhiêu chục trong số 60?)",
            "keywords": "Tens: Số chục; Number: Số.",
            "studentAnswer": "",
            "correctAnswer": "6",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Cấu tạo số",
            "difficulty": "Cơ bản",
            "explanation": "Số 60 gồm 6 chục và 0 đơn vị. Do đó có 6 chục.",
            "solutionSteps": [
                  "Bước 1: Phân tích cấu tạo số 60: 60 = 6 chục + 0 đơn vị.",
                  "Bước 2: Trả lời: có 6 chục."
            ],
            "tips": "1 chục = 10 đơn vị; 60 = 6 chục."
      },
      {
            "id": 16,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 16: Balance Scale / Câu 16: Cân thăng bằng so sánh cân nặng",
            "question": "On a balance scale, 1 pineapple balances with 3 apples. If each apple weighs 2 kg, how many kilograms does the pineapple weigh?\n(Trên một chiếc cân thăng bằng, 1 quả dứa cân thăng bằng với 3 quả táo. Nếu mỗi quả táo nặng 2 kg, hỏi quả dứa nặng bao nhiêu ki-lô-gam?)",
            "keywords": "Balance scale: Cân thăng bằng; Weighs: Cân nặng; Kilograms: Ki-lô-gam.",
            "studentAnswer": "",
            "correctAnswer": "6",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đo lường & Cân nặng",
            "difficulty": "Trung bình",
            "explanation": "1 quả dứa = 3 quả táo. Vì mỗi quả táo nặng 2 kg, quả dứa nặng: 3 × 2 = 6 kg.",
            "solutionSteps": [
                  "Bước 1: Cân thăng bằng nghĩa là khối lượng 2 bên bằng nhau.",
                  "Bước 2: 3 quả táo nặng: 2 + 2 + 2 = 6 (kg).",
                  "Bước 3: Do đó quả dứa nặng 6 kg."
            ],
            "tips": "Thăng bằng = Khối lượng vế trái bằng khối lượng vế phải."
      },
      {
            "id": 17,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 17: Age Difference Logic / Câu 17: Bài toán tuổi chị em",
            "question": "Tony is 7 years old. His sister Ruby is 2 years older than him. How old is Ruby?\n(Tony 7 tuổi. Chị Ruby nhiều hơn Tony 2 tuổi. Hỏi chị Ruby bao nhiêu tuổi?)",
            "keywords": "Older than: Lớn tuổi hơn (nhiều hơn); Years old: Tuổi.",
            "studentAnswer": "",
            "correctAnswer": "9",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán thực tế & Bài toán tuổi",
            "difficulty": "Cơ bản",
            "explanation": "Tuổi của Ruby: 7 + 2 = 9 tuổi.",
            "solutionSteps": [
                  "Bước 1: Tony hiện tại 7 tuổi.",
                  "Bước 2: Ruby nhiều hơn Tony 2 tuổi, làm phép cộng: 7 + 2 = 9 (tuổi)."
            ],
            "tips": "Nhiều tuổi hơn (older than) thì làm phép tính cộng."
      },
      {
            "id": 18,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 18: Counting Cubes / Câu 18: Đếm số khối lập phương xếp tầng",
            "question": "Tony builds a tower using unit blocks. The bottom row has 4 blocks, the middle row has 3 blocks, and the top row has 1 block. How many blocks does the tower have in total?\n(Tony xếp một tòa tháp bằng các khối gỗ. Tầng đáy có 4 khối, tầng giữa có 3 khối, và tầng trên cùng có 1 khối. Hỏi tòa tháp có tất cả bao nhiêu khối gỗ?)",
            "keywords": "Tower: Tòa tháp; Blocks: Khối gỗ; In total: Tổng cộng.",
            "studentAnswer": "",
            "correctAnswer": "8",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học không gian & Đếm khối",
            "difficulty": "Cơ bản",
            "explanation": "Tổng số khối gỗ của cả 3 tầng: 4 + 3 + 1 = 8 khối.",
            "solutionSteps": [
                  "Bước 1: Tầng đáy có 4 khối.",
                  "Bước 2: Tầng giữa có 3 khối.",
                  "Bước 3: Tầng trên cùng có 1 khối.",
                  "Bước 4: Tổng cộng: 4 + 3 + 1 = 8 (khối gỗ)."
            ],
            "tips": "Cộng lần lượt từng tầng từ dưới lên trên."
      },
      {
            "id": 19,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 19: Comparing Length / Câu 19: So sánh độ dài dây",
            "question": "Ribbon A is 12 cm long. Ribbon B is 17 cm long. How many centimeters longer is Ribbon B than Ribbon A?\n(Dây ruy băng A dài 12 cm. Dây ruy băng B dài 17 cm. Hỏi dây ruy băng B dài hơn dây ruy băng A bao nhiêu xăng-ti-mét?)",
            "keywords": "Longer than: Dài hơn; Difference: Hiệu số.",
            "studentAnswer": "",
            "correctAnswer": "5",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đo lường & Chiều dài",
            "difficulty": "Cơ bản",
            "explanation": "Độ dài hơn kém nhau: 17 - 12 = 5 cm.",
            "solutionSteps": [
                  "Bước 1: Chiều dài dây B là 17 cm, dây A là 12 cm.",
                  "Bước 2: Tìm phần dài hơn: 17 - 12 = 5 (cm)."
            ],
            "tips": "Dài hơn bao nhiêu = Lấy số đo lớn trừ đi số đo bé."
      },
      {
            "id": 20,
            "part": 2,
            "partTitle": "Part 2: Logic & Problem Solving (Questions 11 – 20) / Phần 2: Logic & Giải quyết vấn đề (Câu 11 – 20)",
            "title": "Question 20: Animal Legs Puzzle / Câu 20: Đố vui số chân con vật",
            "question": "In a farm yard, Tony sees 3 chickens and 2 dogs. How many legs do they have in total? (A chicken has 2 legs, a dog has 4 legs).\n(Trong sân trang trại, Tony nhìn thấy 3 con gà và 2 con chó. Hỏi tất cả chúng có tổng cộng bao nhiêu cái chân? (Biết 1 con gà có 2 chân, 1 con chó có 4 chân).)",
            "keywords": "Legs: Cái chân; Chickens: Con gà; Dogs: Con chó; In total: Tổng cộng.",
            "studentAnswer": "",
            "correctAnswer": "14",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Toán tư duy thực tế",
            "difficulty": "Trung bình",
            "explanation": "Số chân của 3 con gà: 3 × 2 = 6 chân. Số chân của 2 con chó: 2 × 4 = 8 chân. Tổng số chân: 6 + 8 = 14 cái chân.",
            "solutionSteps": [
                  "Bước 1: 3 con gà có số chân là: 2 + 2 + 2 = 6 (chân).",
                  "Bước 2: 2 con chó có số chân là: 4 + 4 = 8 (chân).",
                  "Bước 3: Tổng số chân của cả gà và chó: 6 + 8 = 14 (cái chân)."
            ],
            "tips": "Tính riêng số chân của từng loài động vật rồi cộng lại với nhau."
      }
]
  },

  // =========================================================================
  // 5. CHUYÊN TOÁN VÀO 10 & THPT (KHỐI 10 - DÀNH CHO CHIP ĐOÀN QUỲNH CHI)
  // Cấu trúc chuẩn Đề thi Tuyển sinh Chuyên Toán THPT: 5 bài toán lớn (15 ý hỏi phân hóa chuyên sâu), 150 phút, 100% Song ngữ Anh - Việt.
  // =========================================================================
  {
    id: 'exam_chuyen_2025_l10',
    title: 'Đề Tuyển Chọn Vào Lớp 10 Chuyên Toán & Olympic THPT 2025',
    program: 'CHUYEN_THPT',
    programName: 'Bồi Dưỡng Chuyên Toán THPT & VMO',
    level: 'high_school',
    grade: 'Lớp 10',
    year: 2025,
    round: 'Kỳ Thi Tuyển Sinh Chuyên',
    durationMinutes: 150,
    questionCount: 5,
    difficulty: 'Nâng cao',
    description: 'Bộ đề thi chuẩn 5 bài lớn vào lớp 10 Chuyên Toán: Đại số căn thức & hệ đối xứng, phương trình nghiệm nguyên, BĐT Cauchy-Schwarz, hình học tứ giác nội tiếp và nguyên lý Dirichlet điểm lưới (Song ngữ Anh - Việt).',
    questions: [
      {
            "id": 1,
            "part": 1,
            "partTitle": "Problem 1: Algebra & Radical Equations (3.0 pts) / Bài 1: Đại số & Phương trình vô tỉ (3.0 điểm)",
            "title": "Problem 1: Simplifying Expression & Radical System / Bài 1: Rút gọn biểu thức & Giải hệ phương trình",
            "question": "Part a: Simplify P = [√x / (√x - 2) - 4 / (x - 2√x)] : [(√x + 2) / √x] for x > 0, x ≠ 4.\nPart b: Solve the system of equations: { x + y + xy = 7; x² + y² + xy = 13 }.\n(Ý a: Rút gọn biểu thức P = [√x / (√x - 2) - 4 / (x - 2√x)] : [(√x + 2) / √x] với x > 0, x ≠ 4.\nÝ b: Giải hệ phương trình đối xứng: { x + y + xy = 7; x² + y² + xy = 13 }.)",
            "keywords": "Radical expression: Biểu thức chứa căn; Symmetric system: Hệ phương trình đối xứng loại 1.",
            "studentAnswer": "",
            "correctAnswer": "P = 1; (x, y) = (1, 3), (3, 1)",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Đại số chuyên",
            "difficulty": "Olympic",
            "explanation": "Ý a: Quy đồng rút gọn trong ngoặc được (x - 4) / [√x(√x - 2)] = (√x + 2) / √x. Chia cho (√x + 2)/√x được P = 1. Ý b: Đặt S = x + y và P = xy. Hệ trở thành: S + P = 7 và S² - P = 13. Cộng lại: S² + S - 20 = 0 => S = 4 (loại S = -5 vì S² >= 4P). Với S = 4 => P = 3. Khi đó x, y là nghiệm của t² - 4t + 3 = 0 => t = 1 hoặc t = 3. Nghiệm (x, y) là (1, 3) và (3, 1).",
            "solutionSteps": [
                  "Bước 1: Rút gọn P: Mẫu thức chung là √x(√x - 2). Ngoặc thứ nhất = (x - 4) / [√x(√x - 2)] = [(√x - 2)(√x + 2)] / [√x(√x - 2)] = (√x + 2) / √x.",
                  "Bước 2: Biểu thức P = [(√x + 2) / √x] : [(√x + 2) / √x] = 1.",
                  "Bước 3: Giải hệ phương trình: Đặt S = x + y, P = xy (với điều kiện S² >= 4P).",
                  "Bước 4: Thay vào hệ: S + P = 7 và S² - P = 13. Cộng hai phương trình vế theo vế: S² + S = 20 <=> S² + S - 20 = 0 <=> (S - 4)(S + 5) = 0.",
                  "Bước 5: Với S = 4 => P = 7 - 4 = 3 (thỏa mãn S² = 16 >= 4P = 12). Tìm được nghiệm (x, y) thuộc {(1, 3), (3, 1)}.",
                  "Bước 6: Với S = -5 => P = 12 (loại vì S² = 25 < 4P = 48)."
            ],
            "tips": "Đặt ẩn phụ tổng S = x + y và tích P = xy để giải hệ đối xứng loại 1."
      },
      {
            "id": 2,
            "part": 1,
            "partTitle": "Problem 2: Number Theory & Diophantine Equations (2.5 pts) / Bài 2: Số học & Phương trình nghiệm nguyên (2.5 điểm)",
            "title": "Problem 2: Integer Solutions & Divisibility / Bài 2: Nghiệm nguyên & Tính chất chia hết",
            "question": "Find all pairs of integers (x, y) satisfying the equation: x² - 2xy + 3y² - 4x + 2y - 5 = 0.\n(Tìm tất cả các cặp số nguyên (x, y) thỏa mãn phương trình: x² - 2xy + 3y² - 4x + 2y - 5 = 0.)",
            "keywords": "Diophantine equation: Phương trình nghiệm nguyên; Discriminant: Biệt thức Delta.",
            "studentAnswer": "",
            "correctAnswer": "(x, y) = (5, 0), (-1, 0), (5, 2), (-1, 2)",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Số học & Nghiệm nguyên",
            "difficulty": "Olympic",
            "explanation": "Coi phương trình là bậc hai đối với x: x² - 2(y + 2)x + (3y² + 2y - 5) = 0. Biệt thức Delta' = (y + 2)² - (3y² + 2y - 5) = -2y² + 2y + 9. Để có nghiệm x nguyên thì Delta' >= 0 <=> -2y² + 2y + 9 >= 0 <=> -1.7 <= y <= 2.7. Vì y nguyên nên y thuộc {-1, 0, 1, 2}. Thử từng giá trị của y để Delta' là số chính phương.",
            "solutionSteps": [
                  "Bước 1: Viết lại phương trình theo bậc 2 đối với biến x: x² - 2(y + 2)x + (3y² + 2y - 5) = 0.",
                  "Bước 2: Tính biệt thức thu gọn: Delta' = (y + 2)² - (3y² + 2y - 5) = y² + 4y + 4 - 3y² - 2y + 5 = -2y² + 2y + 9.",
                  "Bước 3: Điều kiện cần để có nghiệm thực là Delta' >= 0 <=> 2y² - 2y - 9 <= 0. Do y nguyên nên y chỉ có thể là -1, 0, 1, 2.",
                  "Bước 4: Kiểm tra điều kiện Delta' là số chính phương:",
                  " - y = 0: Delta' = 9 = 3² (chính phương). Nghiệm x = 2 ± 3 => x = 5 hoặc x = -1.",
                  " - y = 2: Delta' = -2(4) + 4 + 9 = 5 (không chính phương, loại).",
                  " - y = 1: Delta' = -2 + 2 + 9 = 9 = 3² (chính phương). Nghiệm x = 3 ± 3 => x = 6 hoặc x = 0.",
                  " - y = -1: Delta' = -2 - 2 + 9 = 5 (không chính phương, loại).",
                  "Bước 5: Kết luận các cặp nghiệm nguyên: (5, 0), (-1, 0), (6, 1), (0, 1)."
            ],
            "tips": "Phương pháp chặn miền giá trị của một biến bằng biệt thức Delta >= 0."
      },
      {
            "id": 3,
            "part": 1,
            "partTitle": "Problem 3: Inequalities & Extrema (2.0 pts) / Bài 3: Bất đẳng thức & Cực trị đại số (2.0 điểm)",
            "title": "Problem 3: Cauchy-Schwarz Minimum Value / Bài 3: Bất đẳng thức Cauchy-Schwarz tìm GTNN",
            "question": "For positive real numbers a, b, c such that a + b + c = 3, find the minimum value of: P = a² / (b + 1) + b² / (c + 1) + c² / (a + 1).\n(Cho các số thực dương a, b, c thỏa mãn a + b + c = 3. Tìm giá trị nhỏ nhất của biểu thức: P = a² / (b + 1) + b² / (c + 1) + c² / (a + 1).)",
            "keywords": "Inequality: Bất đẳng thức; Cauchy-Schwarz / Bergstrom; Minimum: Giá trị nhỏ nhất.",
            "studentAnswer": "",
            "correctAnswer": "3/2",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Bất đẳng thức Olympic",
            "difficulty": "Olympic Quốc tế",
            "explanation": "Áp dụng BĐT Cauchy-Schwarz dạng Engel (BĐT phân thức Schwarz): P >= (a + b + c)² / [(b + 1) + (c + 1) + (a + 1)] = (a + b + c)² / (a + b + c + 3) = 3² / (3 + 3) = 9/6 = 3/2. Dấu bằng xảy ra khi a = b = c = 1.",
            "solutionSteps": [
                  "Bước 1: Áp dụng bất đẳng thức Bunhiacopxki dạng phân thức (Bổ đề Cauchy-Schwarz / Engel): Với mọi x, y, z > 0 ta có a²/x + b²/y + c²/z >= (a + b + c)² / (x + y + z).",
                  "Bước 2: Đặt x = b + 1, y = c + 1, z = a + 1.",
                  "Bước 3: Mẫu số tổng: x + y + z = (a + b + c) + 3 = 3 + 3 = 6.",
                  "Bước 4: Tử số: (a + b + c)² = 3² = 9.",
                  "Bước 5: Suy ra P >= 9 / 6 = 3/2.",
                  "Bước 6: Dấu bằng xảy ra khi a/(b+1) = b/(c+1) = c/(a+1) và a + b + c = 3 <=> a = b = c = 1. Vậy GTNN là 3/2."
            ],
            "tips": "BĐT phân thức Schwarz: ∑(a_i² / x_i) >= (∑a_i)² / (∑x_i)."
      },
      {
            "id": 4,
            "part": 1,
            "partTitle": "Problem 4: Advanced Euclidean Geometry (3.0 pts) / Bài 4: Hình học phẳng chuyên sâu (3.0 điểm)",
            "title": "Problem 4: Cyclic Quadrilateral & Tangents / Bài 4: Tứ giác nội tiếp & Tiếp tuyến cát tuyến",
            "question": "Given acute triangle ABC inscribed in circle (O). Altitudes AD, BE, CF intersect at orthocenter H. Let M be the midpoint of BC.\nPart a: Prove that quadrilateral BCEF is cyclic.\nPart b: Prove that OA is perpendicular to EF.\n(Cho tam giác nhọn ABC nội tiếp đường tròn (O). Các đường cao AD, BE, CF cắt nhau tại trực tâm H. Gọi M là trung điểm của BC.\nÝ a: Chứng minh tứ giác BCEF nội tiếp một đường tròn.\nÝ b: Chứng minh rằng bán kính OA vuông góc với đoạn thẳng EF.)",
            "keywords": "Orthocenter: Trực tâm; Cyclic quadrilateral: Tứ giác nội tiếp; Perpendicular: Vuông góc.",
            "studentAnswer": "",
            "correctAnswer": "OA vuông góc với EF (BCEF nội tiếp đường tròn tâm M)",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Hình học chuyên",
            "difficulty": "Olympic Quốc tế",
            "explanation": "Ý a: Vì góc BFC = 90° và góc BEC = 90° nên hai đỉnh F và E cùng nhìn đoạn BC dưới góc vuông. Do đó BCEF nội tiếp đường tròn đường kính BC tâm là M. Ý b: Kẻ tiếp tuyến Ax của (O) tại A. Góc xAB = góc ACB (góc tạo bởi tiếp tuyến và dây cung). Tứ giác BCEF nội tiếp nên góc AFE = góc ACB. Suy ra góc xAB = góc AFE, do đó Ax song song với EF. Vì OA vuông góc với Ax nên OA vuông góc với EF.",
            "solutionSteps": [
                  "Bước 1: Chứng minh ý a: Xét tứ giác BCEF có góc BFC = 90° (CF là đường cao) và góc BEC = 90° (BE là đường cao). Hai đỉnh kề nhau F, E cùng nhìn cạnh đối diện BC dưới một góc 90°. Theo dấu hiệu nhận biết, BCEF là tứ giác nội tiếp đường tròn đường kính BC (tâm là trung điểm M của BC).",
                  "Bước 2: Chứng minh ý b: Kẻ tiếp tuyến Ax của đường tròn (O) tại điểm A sao cho tia Ax nằm trên nửa mặt phẳng bờ AB chứa điểm C.",
                  "Bước 3: Ta có góc xAB = góc ACB (góc tạo bởi tiếp tuyến và dây cung chắn cung AB của đường tròn (O)).",
                  "Bước 4: Do tứ giác BCEF nội tiếp, góc trong tại một đỉnh bằng góc ngoài tại đỉnh đối diện: góc AFE = góc ACB.",
                  "Bước 5: Từ đó suy ra góc xAB = góc AFE. Hai góc này ở vị trí so le trong nên tiếp tuyến Ax song song với đoạn thẳng EF.",
                  "Bước 6: Mặt khác, theo tính chất tiếp tuyến ta luôn có bán kính OA vuông góc với tiếp tuyến Ax tại tiếp điểm A. Vì Ax // EF nên OA vuông góc với EF (đpcm)."
            ],
            "tips": "Bổ đề kinh điển: Tiếp tuyến tại đỉnh tam giác luôn song song với đường thẳng nối hai chân đường cao tương ứng."
      },
      {
            "id": 5,
            "part": 1,
            "partTitle": "Problem 5: Combinatorics & Pigeonhole Principle (1.5 pts) / Bài 5: Tổ hợp & Nguyên lý Dirichlet (1.5 điểm)",
            "title": "Problem 5: Pigeonhole Grid Points / Bài 5: Điểm lưới nguyên và trung điểm nguyên",
            "question": "In the Cartesian coordinate plane, consider 5 points with integer coordinates: P1, P2, P3, P4, P5. Prove that there must exist at least one pair of points whose midpoint also has integer coordinates.\n(Trong mặt phẳng tọa độ Oxy, cho 5 điểm có tọa độ là các số nguyên: P1, P2, P3, P4, P5. Chứng minh rằng trong 5 điểm đó, luôn tồn tại ít nhất một cặp điểm mà trung điểm của đoạn thẳng nối chúng cũng có tọa độ là các số nguyên.)",
            "keywords": "Midpoint: Trung điểm; Integer coordinates: Tọa độ nguyên; Pigeonhole principle: Nguyên lý Dirichlet; Parity: Tính chẵn lẻ.",
            "studentAnswer": "",
            "correctAnswer": "Tồn tại ít nhất 2 điểm cùng tính chẵn lẻ (Chẵn, Chẵn), (Chẵn, Lẻ), (Lẻ, Chẵn), (Lẻ, Lẻ)",
            "status": "correct",
            "statusText": "Đúng",
            "category": "Tổ hợp & Dirichlet",
            "difficulty": "Olympic Quốc tế",
            "explanation": "Tọa độ trung điểm của hai điểm (x1, y1) và (x2, y2) là ((x1 + x2)/2, (y1 + y2)/2). Tọa độ này nguyên khi và chỉ khi x1 và x2 cùng tính chẵn lẻ, đồng thời y1 và y2 cùng tính chẵn lẻ. Mỗi điểm nguyên (x, y) có 4 trạng thái chẵn lẻ: (Chẵn, Chẵn), (Chẵn, Lẻ), (Lẻ, Chẵn), (Lẻ, Lẻ). Theo nguyên lý Dirichlet, xếp 5 điểm vào 4 trạng thái chẵn lẻ thì chắc chắn có ít nhất 2 điểm có cùng trạng thái chẵn lẻ. Khi đó trung điểm của chúng có tọa độ nguyên.",
            "solutionSteps": [
                  "Bước 1: Gọi tọa độ của điểm Pi là (xi, yi) với xi, yi là các số nguyên.",
                  "Bước 2: Tọa độ trung điểm M của đoạn PiPj là: M = ((xi + xj) / 2, (yi + yj) / 2).",
                  "Bước 3: M có tọa độ nguyên khi và chỉ khi: xi + xj là số chẵn và yi + yj là số chẵn, tức là xi cùng tính chẵn lẻ với xj và yi cùng tính chẵn lẻ với yj.",
                  "Bước 4: Xét tính chẵn lẻ của một cặp số nguyên (x, y), chỉ có đúng 2 × 2 = 4 trường hợp có thể xảy ra: (Chẵn, Chẵn), (Chẵn, Lẻ), (Lẻ, Chẵn), (Lẻ, Lẻ).",
                  "Bước 5: Áp dụng nguyên lý Dirichlet: Coi 4 trường hợp chẵn lẻ là 4 'lồng', và 5 điểm nguyên đã cho là 5 'chú thỏ'. Vì 5 > 4 nên theo nguyên lý Dirichlet tồn tại ít nhất 2 điểm rơi vào cùng 1 lồng (tức là có cùng tính chẵn lẻ cả hoành độ và tung độ).",
                  "Bước 6: Khi đó tổng hoành độ của 2 điểm này chẵn và tổng tung độ chẵn, dẫn đến tọa độ trung điểm của chúng là các số nguyên (đpcm)."
            ],
            "tips": "Nguyên lý Dirichlet kết hợp tính chẵn lẻ (Parity) là công cụ nền tảng của toán tổ hợp rời rạc."
      }
]
  }
];
