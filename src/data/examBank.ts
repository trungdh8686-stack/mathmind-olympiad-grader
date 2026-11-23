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
  difficulty: 'Cơ bản' | 'Nâng cao' | 'Olympic Quốc tế';
  description: string;
  questions: MathQuestion[];
}

export const EXAM_BANK: ExamPaper[] = [
  // 1. TIỂU HỌC - LỚP 3 (RUBY) - ASMO 2025
  {
    id: 'exam_asmo_2025_l3',
    title: 'Đề Thi Toán Quốc Tế ASMO 2025 – Vòng Quốc Gia (Lớp 3)',
    program: 'ASMO',
    programName: 'Asian Science & Math Olympiad',
    level: 'primary',
    grade: 'Lớp 3',
    year: 2025,
    round: 'Vòng Quốc Gia (National Round)',
    durationMinutes: 60,
    questionCount: 10,
    difficulty: 'Olympic Quốc tế',
    description: 'Chuyên đề: Dãy số cách đều, tư duy hình học và logic điền số.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy',
        title: 'Câu 1: Dãy số cách đều ASMO',
        question: 'Tìm số tiếp theo trong dãy số sau: 3, 7, 11, 15, 19, ...',
        keywords: 'Arithmetic sequence: Dãy số cách đều; Next term: Số tiếp theo.',
        studentAnswer: '',
        correctAnswer: '23',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Cơ bản',
        explanation: 'Quy luật: Mỗi số hạng sau bằng số hạng trước cộng thêm 4. Số tiếp theo: 19 + 4 = 23.',
        solutionSteps: [
          'Bước 1: Tính khoảng cách giữa 2 số liền nhau: 7 - 3 = 4, 11 - 7 = 4, 15 - 11 = 4.',
          'Bước 2: Đây là dãy số cách đều với khoảng cách d = 4.',
          'Bước 3: Số cần tìm = 19 + 4 = 23.'
        ],
        tips: 'Lấy hiệu của hai số liền kề để tìm khoảng cách quy luật.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy',
        title: 'Câu 2: Bài toán chu vi hình vuông ASMO',
        question: 'Một mảnh vườn hình chữ nhật có chiều dài 18m, chiều rộng bằng một nửa chiều dài. Chu vi mảnh vườn đó là bao nhiêu mét?',
        keywords: 'Perimeter: Chu vi; Length: Chiều dài; Width: Chiều rộng.',
        studentAnswer: '',
        correctAnswer: '54m',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Đo lường',
        difficulty: 'Cơ bản',
        explanation: 'Chiều rộng: 18 : 2 = 9m. Chu vi: (18 + 9) × 2 = 54m.',
        solutionSteps: [
          'Bước 1: Tính chiều rộng mảnh vườn: 18 : 2 = 9 (m).',
          'Bước 2: Công thức chu vi hình chữ nhật: P = (Dài + Rộng) × 2.',
          'Bước 3: Thay số tính toán: (18 + 9) × 2 = 27 × 2 = 54 (m).'
        ],
        tips: 'Ghi nhớ công thức chu vi hình chữ nhật: (Chiều dài + Chiều rộng) × 2.'
      },
      {
        id: 3,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy',
        title: 'Câu 3: Bài toán trồng cây ASMO',
        question: 'Trên một đoạn đường dài 40m, người ta trồng các cây cách đều nhau 5m. Hỏi trồng được tất cả bao nhiêu cây nếu cả hai đầu đường đều có cây?',
        keywords: 'Interval: Khoảng cách; Trees planted: Số cây trồng.',
        studentAnswer: '',
        correctAnswer: '9 cây',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Olympic Quốc tế',
        explanation: 'Số khoảng cách: 40 : 5 = 8 khoảng. Số cây trồng cả hai đầu: 8 + 1 = 9 cây.',
        solutionSteps: [
          'Bước 1: Tính số khoảng cách trên đoạn đường: 40 : 5 = 8 (khoảng cách).',
          'Bước 2: Trồng cây ở cả hai đầu đường thì: Số cây = Số khoảng cách + 1.',
          'Bước 3: Tính số cây: 8 + 1 = 9 (cây).'
        ],
        tips: 'Bẫy thường gặp: quên cộng 1 khi bài toán trồng cây ở cả hai đầu đường!'
      }
    ]
  },

  // 2. TIỂU HỌC - LỚP 1 (TONY) - GMATH 2025
  {
    id: 'exam_gmath_2025_l1',
    title: 'Đề Thi Toán Tiếng Anh GMATH 2025 – Cấp Độ Lớp 1',
    program: 'GMATH',
    programName: 'Toán Tiếng Anh GMATH Năng Khiếu',
    level: 'primary',
    grade: 'Lớp 1',
    year: 2025,
    round: 'Vòng Tuyển Chọn (Qualifying Round)',
    durationMinutes: 45,
    questionCount: 8,
    difficulty: 'Cơ bản',
    description: 'Chuyên đề: Nhận biết hình dạng, đếm số lượng Tiếng Anh, phép cộng trừ trong phạm vi 20.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Part 1: Basic Counting',
        title: 'Question 1: Addition within 20',
        question: 'Tony has 7 blue balloons and 8 red balloons. How many balloons does Tony have in total?',
        keywords: 'Balloons: Quả bóng; In total: Tổng cộng; Addition: Phép cộng.',
        studentAnswer: '',
        correctAnswer: '15',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Đếm',
        difficulty: 'Cơ bản',
        explanation: 'Tổng số bóng Tony có là: 7 + 8 = 15 quả bóng.',
        solutionSteps: [
          'Bước 1: Xác định số bóng xanh là 7 và số bóng đỏ là 8.',
          'Bước 2: Phép tính tổng cộng: 7 + 8 = 15.',
          'Bước 3: Đáp số: 15 quả bóng.'
        ],
        tips: 'Tách 8 thành 3 + 5 để cộng tròn chục: 7 + 3 = 10; 10 + 5 = 15.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Part 1: Shapes',
        title: 'Question 2: Counting Shapes',
        question: 'How many triangles are there in the shape below?',
        keywords: 'Triangle: Hình tam giác; Count: Đếm số lượng.',
        studentAnswer: '',
        correctAnswer: '5',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học trực quan',
        difficulty: 'Cơ bản',
        explanation: 'Có 4 hình tam giác đơn lẻ và 1 hình tam giác lớn hợp thành, tổng cộng 5 hình.',
        solutionSteps: [
          'Bước 1: Đếm các tam giác đơn nhỏ: có 4 hình.',
          'Bước 2: Đếm tam giác lớn bao quanh: có 1 hình.',
          'Bước 3: Tổng số hình tam giác: 4 + 1 = 5 hình.'
        ],
        tips: 'Luôn đếm từ tam giác đơn (cỡ 1 mảnh) rồi đến tam giác ghép (cỡ nhiều mảnh).'
      }
    ]
  },

  // 3. THCS - LỚP 6 (LISA) - ITMC 2025
  {
    id: 'exam_itmc_2025_l6',
    title: 'Đề Thi Toán Quốc Tế ITMC 2025 – Cấp Độ THCS (Lớp 6)',
    program: 'ITMC',
    programName: 'International Teenagers Mathematics Olympiad',
    level: 'secondary',
    grade: 'Lớp 6',
    year: 2025,
    round: 'Vòng Quốc Gia (National Final)',
    durationMinutes: 90,
    questionCount: 12,
    difficulty: 'Olympic Quốc tế',
    description: 'Chuyên đề: Số học nâng cao, dấu hiệu chia hết, phân số và nguyên lý Dirichlet.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Section A: Number Theory',
        title: 'Question 1: Divisibility rules',
        question: 'Find the smallest positive integer that is divisible by 2, 3, 4, 5, and 6.',
        keywords: 'Smallest positive integer: Số nguyên dương nhỏ nhất; Divisible: Chia hết cho.',
        studentAnswer: '',
        correctAnswer: '60',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Chia hết',
        difficulty: 'Nâng cao',
        explanation: 'Số cần tìm chính là Bội chung nhỏ nhất BCNN(2, 3, 4, 5, 6) = 60.',
        solutionSteps: [
          'Bước 1: Phân tích các số ra thừa số nguyên tố: 2 = 2; 3 = 3; 4 = 2²; 5 = 5; 6 = 2 × 3.',
          'Bước 2: BCNN(2, 3, 4, 5, 6) = 2² × 3 × 5 = 4 × 3 × 5 = 60.',
          'Bước 3: Vậy số nguyên dương nhỏ nhất chia hết cho cả 5 số là 60.'
        ],
        tips: 'Áp dụng công thức tìm Bội chung nhỏ nhất (BCNN) bằng cách lấy tích các thừa số nguyên tố với số mũ lớn nhất.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Section A: Fractions',
        title: 'Question 2: Telescoping sum of fractions',
        question: 'Tính giá trị của biểu thức: S = 1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(99×100)',
        keywords: 'Telescoping series: Dãy phân số triệt tiêu.',
        studentAnswer: '',
        correctAnswer: '99/100',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Phân số & Dãy số',
        difficulty: 'Olympic Quốc tế',
        explanation: 'Biến đổi 1/(n×(n+1)) = 1/n - 1/(n+1). Triệt tiêu còn 1 - 1/100 = 99/100.',
        solutionSteps: [
          'Bước 1: Áp dụng công thức sai phân: 1/(k × (k + 1)) = 1/k - 1/(k + 1).',
          'Bước 2: Viết lại tổng S: S = (1 - 1/2) + (1/2 - 1/3) + (1/3 - 1/4) + ... + (1/99 - 1/100).',
          'Bước 3: Triệt tiêu các số hạng đối nhau ở giữa: S = 1 - 1/100 = 99/100.'
        ],
        tips: 'Phương pháp triệt tiêu phân số là dạng toán kinh điển trong các kỳ thi học sinh giỏi THCS.'
      }
    ]
  },

  // 4. THPT - LỚP 10 (CHIP) - OLYMPIC & CHUYÊN TOÁN 2025
  {
    id: 'exam_chuyen_2025_l10',
    title: 'Đề Thi Olympic Toán & Chuyên THPT 2025 (Lớp 10)',
    program: 'CHUYEN_THPT',
    programName: 'Chuyên Toán THPT & VMO',
    level: 'high_school',
    grade: 'Lớp 10',
    year: 2025,
    round: 'Vòng Chọn Đội Tuyển Olympic',
    durationMinutes: 120,
    questionCount: 10,
    difficulty: 'Olympic Quốc tế',
    description: 'Chuyên đề: Bất đẳng thức Cauchy-Schwarz, Hàm số bậc hai, Hệ phương trình đại số.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Phần 1: Bất đẳng thức',
        title: 'Câu 1: Bất đẳng thức Cauchy (AM-GM)',
        question: 'Cho hai số thực dương x, y thỏa mãn x + y = 2. Tìm giá trị nhỏ nhất của biểu thức P = 1/x + 1/y.',
        keywords: 'Inequality: Bất đẳng thức; Minimum value: Giá trị nhỏ nhất.',
        studentAnswer: '',
        correctAnswer: '2',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Đại số & Bất đẳng thức',
        difficulty: 'Olympic Quốc tế',
        explanation: 'Áp dụng BĐT Cauchy-Schwarz dạng Engel: 1/x + 1/y >= (1+1)²/(x+y) = 4/2 = 2. Dấu bằng khi x = y = 1.',
        solutionSteps: [
          'Bước 1: Áp dụng bất đẳng thức Cauchy-Schwarz dạng Engel: 1/x + 1/y >= (1 + 1)² / (x + y) = 4 / (x + y).',
          'Bước 2: Vì x + y = 2 nên P >= 4 / 2 = 2.',
          'Bước 3: Dấu bằng xảy ra khi x = y = 1. Vậy Min P = 2.'
        ],
        tips: 'Với tổng nghịch đảo, dạng Engel (BĐT Svac-xơ) cho lời giải trong vòng 2 dòng.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Phần 2: Phương trình bậc hai',
        title: 'Câu 2: Định lý Viète và dấu tam thức bậc hai',
        question: 'Tìm tất cả các giá trị của tham số m để phương trình x² - 2(m-1)x + m² - 3 = 0 có hai nghiệm phân biệt x1, x2 thỏa mãn x1² + x2² = 10.',
        keywords: 'Viète theorem: Định lý Vi-ét; Distinct roots: Nghiệm phân biệt.',
        studentAnswer: '',
        correctAnswer: 'm = -1',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Phương trình & Hàm số',
        difficulty: 'Nâng cao',
        explanation: 'Theo Vi-ét: x1 + x2 = 2(m-1), x1.x2 = m² - 3. Biến đổi x1² + x2² = (x1+x2)² - 2x1x2 = 10, giải ra m = -1 (thỏa mãn delta > 0).',
        solutionSteps: [
          'Bước 1: Điều kiện 2 nghiệm phân biệt: Delta\' = (m-1)² - (m²-3) = -2m + 4 > 0 <=> m < 2.',
          'Bước 2: Theo định lý Vi-ét: S = x1 + x2 = 2(m-1); P = x1.x2 = m² - 3.',
          'Bước 3: Ta có x1² + x2² = S² - 2P = 4(m-1)² - 2(m² - 3) = 2m² - 8m + 10.',
          'Bước 4: Theo đề bài 2m² - 8m + 10 = 10 <=> 2m(m - 4) = 0 <=> m = 0 hoặc m = 4.',
          'Bước 5: Kết hợp điều kiện m < 2 ta nhận nghiệm m = 0.'
        ],
        tips: 'Luôn luôn kiểm tra điều kiện Delta > 0 để phương trình có 2 nghiệm phân biệt trước khi kết luận tham số m!'
      }
    ]
  },

  // 5. TOÁN KANGAROO (IKMC) 2024 - ĐA CẤP HỌC
  {
    id: 'exam_ikmc_2024',
    title: 'Đề Thi Toán Quốc Tế Kangaroo (IKMC) 2024 – Bản Chuẩn Song Ngữ',
    program: 'IKMC',
    programName: 'International Kangaroo Math Contest',
    level: 'primary',
    grade: 'Lớp 3 – 4',
    year: 2024,
    round: 'Vòng Quốc Gia',
    durationMinutes: 75,
    questionCount: 15,
    difficulty: 'Olympic Quốc tế',
    description: 'Chuyên đề: Toán logic trực quan, hình học không gian gấp giấy và suy luận đa chiều Kangaroo.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: '3 Điểm: Khởi động',
        title: 'Câu 1: Câu đố que tính Kangaroo',
        question: 'Có bao nhiêu que tính cần dùng để xếp thành 3 hình tam giác liền kề nhau có chung cạnh?',
        keywords: 'Matchsticks: Que tính; Shared edge: Cạnh chung.',
        studentAnswer: '',
        correctAnswer: '7',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Tư duy que tính',
        difficulty: 'Cơ bản',
        explanation: 'Tam giác đầu tiên cần 3 que, mỗi tam giác liền kề sau chỉ cần thêm 2 que. Tổng: 3 + 2 + 2 = 7 que.',
        solutionSteps: [
          'Bước 1: Hình tam giác thứ 1 cần 3 que tính.',
          'Bước 2: Hình tam giác thứ 2 ghép chung 1 cạnh nên chỉ cần thêm 2 que tính.',
          'Bước 3: Hình tam giác thứ 3 tiếp tục ghép chung 1 cạnh nên chỉ cần thêm 2 que tính.',
          'Bước 4: Tổng số que tính = 3 + 2 + 2 = 7 que.'
        ],
        tips: 'Vẽ hình ra nháp để thấy rõ các cạnh chung được bớt đi.'
      }
    ]
  }
];
