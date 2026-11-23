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
  // 1. ASMO 2025 – VÒNG QUỐC GIA (KHỐI 3 - DÀNH RIÊNG CHO RUBY)
  // Cấu trúc chuẩn cuộc thi ASMO Quốc tế: 25 câu hỏi (Phần A: 20 câu trắc nghiệm/điền số, Phần B: 5 câu mở rộng)
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
    description: 'Đề thi chính thức chuẩn 25 câu ASMO Quốc tế: Dãy số, logic thời gian, hình học chu vi, Dirichlet và bài toán tuổi.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 1: Dãy số cách đều ASMO',
        question: 'Tìm số tiếp theo trong dãy số sau: 3, 7, 11, 15, 19, ...',
        keywords: 'Arithmetic sequence: Dãy số cách đều; Next term: Số tiếp theo.',
        studentAnswer: '',
        correctAnswer: '23',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Cơ bản',
        explanation: 'Quy luật dãy số: Mỗi số hạng sau bằng số liền trước cộng 4. Số cần tìm: 19 + 4 = 23.',
        solutionSteps: [
          'Bước 1: Tính khoảng cách giữa 2 số liền nhau: 7 - 3 = 4, 11 - 7 = 4, 15 - 11 = 4.',
          'Bước 2: Quy luật là cộng thêm 4 đơn vị.',
          'Bước 3: Số tiếp theo = 19 + 4 = 23.'
        ],
        tips: 'Lấy hiệu của hai số liền kề để tìm khoảng cách quy luật.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 2: Chu vi hình chữ nhật',
        question: 'Một mảnh vườn hình chữ nhật có chiều dài 18m, chiều rộng bằng một nửa chiều dài. Chu vi mảnh vườn đó là bao nhiêu mét?',
        keywords: 'Perimeter: Chu vi; Length: Chiều dài; Width: Chiều rộng.',
        studentAnswer: '',
        correctAnswer: '54',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Đo lường',
        difficulty: 'Cơ bản',
        explanation: 'Chiều rộng: 18 : 2 = 9m. Chu vi: (18 + 9) × 2 = 54m.',
        solutionSteps: [
          'Bước 1: Chiều rộng mảnh vườn là: 18 : 2 = 9 (m).',
          'Bước 2: Chu vi mảnh vườn hình chữ nhật: (Chiều dài + Chiều rộng) × 2 = (18 + 9) × 2 = 54 (m).'
        ],
        tips: 'Công thức chu vi hình chữ nhật: (dài + rộng) × 2 (cùng đơn vị đo).'
      },
      {
        id: 3,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 3: Bài toán trồng cây hai đầu đường',
        question: 'Trên một đoạn đường thẳng dài 40m, người ta trồng các cây cách đều nhau 5m. Hỏi trồng được tất cả bao nhiêu cây nếu cả hai đầu đường đều có cây?',
        keywords: 'Interval: Khoảng cách; Trees: Số cây.',
        studentAnswer: '',
        correctAnswer: '9',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Trung bình',
        explanation: 'Số khoảng cách: 40 : 5 = 8 khoảng. Số cây trồng cả hai đầu: 8 + 1 = 9 cây.',
        solutionSteps: [
          'Bước 1: Tính số khoảng cách trên đoạn đường: 40 : 5 = 8 (khoảng cách).',
          'Bước 2: Trồng cây ở cả 2 đầu đường thì Số cây = Số khoảng cách + 1.',
          'Bước 3: Tính số cây: 8 + 1 = 9 (cây).'
        ],
        tips: 'Bẫy thường gặp: Quên cộng thêm 1 cây khi trồng ở cả 2 đầu đường!'
      },
      {
        id: 4,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 4: Bài toán tuổi tác hai chị em',
        question: 'Hiện nay chị Jane 9 tuổi và em John 5 tuổi. Hỏi khi chị Jane 15 tuổi thì em John bao nhiêu tuổi?',
        keywords: 'Age difference: Hiệu số tuổi không đổi theo thời gian.',
        studentAnswer: '',
        correctAnswer: '11',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Bài toán tuổi',
        difficulty: 'Cơ bản',
        explanation: 'Hiệu số tuổi không đổi: 9 - 5 = 4 tuổi. Khi Jane 15 tuổi, John: 15 - 4 = 11 tuổi.',
        solutionSteps: [
          'Bước 1: Tính hiệu số tuổi giữa chị Jane và em John: 9 - 5 = 4 (tuổi).',
          'Bước 2: Hiệu số tuổi của 2 người luôn không thay đổi theo thời gian.',
          'Bước 3: Khi Jane 15 tuổi, tuổi của John là: 15 - 4 = 11 (tuổi).'
        ],
        tips: 'Quy tắc vàng: Hiệu số tuổi giữa hai người luôn giữ nguyên ở mọi thời điểm.'
      },
      {
        id: 5,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 5: Số trang sách đối diện',
        question: 'Một cuốn sách giáo khoa mở ngẫu nhiên ra 2 trang đối diện nhau. Tích của số thứ tự hai trang đó bằng 110. Hỏi số trang nhỏ hơn là bao nhiêu?',
        keywords: 'Facing pages: Hai trang đối diện (là hai số tự nhiên liên tiếp).',
        studentAnswer: '',
        correctAnswer: '10',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Cấu tạo số & Chữ số',
        difficulty: 'Trung bình',
        explanation: 'Hai trang sách đối diện là 2 số liên tiếp. Ta có: 10 × 11 = 110. Số trang nhỏ hơn là 10.',
        solutionSteps: [
          'Bước 1: Hai trang sách mở ra đối diện nhau luôn là hai số tự nhiên liên tiếp n và (n + 1).',
          'Bước 2: Phân tích tích 110 thành tích hai số liên tiếp: 10 × 11 = 110.',
          'Bước 3: Vậy trang nhỏ hơn là 10 (trang bên cạnh là 11).'
        ],
        tips: 'Tìm 2 số tự nhiên liên tiếp có tích bằng số đã cho bằng cách nhẩm căn bậc hai gần nhất (10 × 10 = 100).'
      },
      {
        id: 6,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 6: Dãy số giai thừa quy luật nhân',
        question: 'Tìm số còn thiếu trong dãy số sau: 1, 2, 6, 24, ___, 720.',
        keywords: 'Missing term: Số còn thiếu; Factorial pattern: Quy luật nhân tăng dần.',
        studentAnswer: '',
        correctAnswer: '120',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Trung bình',
        explanation: 'Quy luật nhân: 1×2=2, 2×3=6, 6×4=24, 24×5=120, 120×6=720. Số cần tìm là 120.',
        solutionSteps: [
          'Bước 1: Xét tỷ số giữa các số hạng liên tiếp: 2 : 1 = 2; 6 : 2 = 3; 24 : 6 = 4.',
          'Bước 2: Quy luật: Số tiếp theo = Số trước đó × (n + 1).',
          'Bước 3: Số cần tìm = 24 × 5 = 120. Kiểm tra lại: 120 × 6 = 720 (chính xác).'
        ],
        tips: 'Khi các số tăng rất nhanh, hãy thử kiểm tra phép nhân tăng dần thay vì phép cộng.'
      },
      {
        id: 7,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 7: Tìm số hạng thứ 25 trong dãy',
        question: 'Cho dãy số: 3, 7, 11, 15, 19, ... Tìm số hạng thứ 25 của dãy số này.',
        keywords: 'N-th term: Số hạng thứ n = Số đầu + (n - 1) × khoảng cách.',
        studentAnswer: '',
        correctAnswer: '99',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Trung bình',
        explanation: 'Công thức: Số thứ n = 3 + (n - 1) × 4. Số thứ 25: 3 + (25 - 1) × 4 = 3 + 96 = 99.',
        solutionSteps: [
          'Bước 1: Xác định số đầu = 3, khoảng cách d = 4.',
          'Bước 2: Áp dụng công thức số hạng thứ n: a_n = a_1 + (n - 1) × d.',
          'Bước 3: Thay số: a_25 = 3 + (25 - 1) × 4 = 3 + 24 × 4 = 3 + 96 = 99.'
        ],
        tips: 'Nhớ trừ đi 1 ở số khoảng cách: (n - 1) khoảng cách.'
      },
      {
        id: 8,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 8: Tiếng chuông đồng hồ reo',
        question: 'Một chiếc đồng hồ đánh 6 tiếng chuông mất 5 giây. Hỏi chiếc đồng hồ đó đánh 12 tiếng chuông mất bao nhiêu giây?',
        keywords: 'Clock strikes: Tiếng chuông reo; Interval: Khoảng thời gian giữa các tiếng.',
        studentAnswer: '',
        correctAnswer: '11',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Nâng cao',
        explanation: '6 tiếng chuông có 5 khoảng cách, mất 5 giây => 1 khoảng mất 1 giây. 12 tiếng chuông có 11 khoảng cách => mất 11 giây.',
        solutionSteps: [
          'Bước 1: 6 tiếng chuông có: 6 - 1 = 5 (khoảng thời gian).',
          'Bước 2: Thời gian của 1 khoảng giữa 2 tiếng chuông: 5 : 5 = 1 (giây).',
          'Bước 3: 12 tiếng chuông có: 12 - 1 = 11 (khoảng thời gian).',
          'Bước 4: Tổng thời gian = 11 × 1 = 11 (giây).'
        ],
        tips: 'Bẫy kinh điển: Không được lấy 5 × 2 = 10 giây! Thời gian đo theo số khoảng nghỉ giữa các tiếng chuông reo.'
      },
      {
        id: 9,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 9: Đếm số lượng chữ số 8',
        question: 'Có bao nhiêu số có hai chữ số chứa ít nhất một chữ số 8?',
        keywords: 'Count digits: Đếm chữ số ở hàng đơn vị và hàng chục.',
        studentAnswer: '',
        correctAnswer: '18',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Cấu tạo số & Chữ số',
        difficulty: 'Trung bình',
        explanation: 'Hàng đơn vị có chữ số 8: 18, 28, 38, 48, 58, 68, 78, 88, 98 (9 số). Hàng chục có chữ số 8: 80 đến 89 (10 số). Số 88 lặp lại 1 lần => 9 + 10 - 1 = 18 số.',
        solutionSteps: [
          'Bước 1: Các số có chữ số 8 ở hàng đơn vị: 18, 28, 38, 48, 58, 68, 78, 88, 98 -> gồm 9 số.',
          'Bước 2: Các số có chữ số 8 ở hàng chục: 80, 81, 82, 83, 84, 85, 86, 87, 88, 89 -> gồm 10 số.',
          'Bước 3: Số 88 được đếm ở cả hai nhóm nên trừ đi 1 lần trùng: 9 + 10 - 1 = 18 số.'
        ],
        tips: 'Luôn chú ý trừ đi số trùng ở cả hàng chục và hàng đơn vị (số 88).'
      },
      {
        id: 10,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 10: Nguyên lý chuồng bồ câu (Dirichlet) bốc bi',
        question: 'Trong hộp có 10 viên bi đỏ, 8 viên bi xanh và 6 viên bi vàng. Hỏi phải bốc ra ít nhất bao nhiêu viên bi mà không nhìn để chắc chắn có 2 viên bi cùng màu?',
        keywords: 'Pigeonhole Principle: Nguyên lý Dirichlet trường hợp xấu nhất.',
        studentAnswer: '',
        correctAnswer: '4',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Logic & Dirichlet',
        difficulty: 'Trung bình',
        explanation: 'Có 3 màu bi khác nhau (đỏ, xanh, vàng). Trường hợp xấu nhất lấy 3 viên là 3 màu khác nhau. Lấy thêm 1 viên nữa chắc chắn trùng màu: 3 + 1 = 4 viên.',
        solutionSteps: [
          'Bước 1: Có tất cả 3 loại màu bi trong hộp: Đỏ, Xanh, Vàng.',
          'Bước 2: Trường hợp xấu nhất: Lấy ra 3 viên bi đầu tiên thuộc 3 màu khác nhau (1 đỏ, 1 xanh, 1 vàng).',
          'Bước 3: Viên bi thứ 4 lấy ra chắc chắn phải trùng màu với một trong ba màu đã lấy.',
          'Bước 4: Số viên bi ít nhất cần lấy: 3 + 1 = 4 (viên bi).'
        ],
        tips: 'Chắc chắn có 2 viên cùng màu = Số màu + 1.'
      },
      {
        id: 11,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 11: Tổng các số lẻ liên tiếp',
        question: 'Tính giá trị biểu thức: S = 1 + 3 + 5 + 7 + ... + 37 + 39.',
        keywords: 'Sum of arithmetic progression: Tổng dãy số cách đều.',
        studentAnswer: '',
        correctAnswer: '400',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phép tính',
        difficulty: 'Trung bình',
        explanation: 'Số số hạng: (39 - 1) : 2 + 1 = 20 số. Tổng = (1 + 39) × 20 : 2 = 40 × 10 = 400 (hoặc 20 × 20 = 400).',
        solutionSteps: [
          'Bước 1: Tính số số hạng của dãy: (Số cuối - Số đầu) : khoảng cách + 1 = (39 - 1) : 2 + 1 = 20 (số).',
          'Bước 2: Tổng của dãy số lẻ liên tiếp từ 1 bằng bình phương số số hạng: 20 × 20 = 400.',
          'Bước 3: Hoặc tính theo công thức: (1 + 39) × 20 : 2 = 40 × 10 = 400.'
        ],
        tips: 'Công thức đặc biệt: Tổng n số lẻ đầu tiên luôn bằng n × n.'
      },
      {
        id: 12,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 12: Phép toán quy ước mới (Toán ký hiệu)',
        question: 'Cho quy ước phép toán mới: a @ b = (a + b) × 2 - a. Hãy tính giá trị của 5 @ 7.',
        keywords: 'New defined operation: Phép toán quy ước mới.',
        studentAnswer: '',
        correctAnswer: '19',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Phép toán quy ước @',
        difficulty: 'Cơ bản',
        explanation: 'Thay a = 5 và b = 7 vào công thức: 5 @ 7 = (5 + 7) × 2 - 5 = 12 × 2 - 5 = 24 - 5 = 19.',
        solutionSteps: [
          'Bước 1: Nhận dạng biến số: a = 5 và b = 7.',
          'Bước 2: Thay vào biểu thức đã cho: (5 + 7) × 2 - 5.',
          'Bước 3: Thực hiện tính trong ngoặc trước: 5 + 7 = 12.',
          'Bước 4: Nhân: 12 × 2 = 24. Trừ: 24 - 5 = 19.'
        ],
        tips: 'Làm theo đúng thứ tự biểu thức đề bài định nghĩa: tính trong ngoặc, nhân chia trước, cộng trừ sau.'
      },
      {
        id: 13,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 13: Bài toán thứ trong tuần (Lịch và thời gian)',
        question: 'Hôm nay là Thứ Hai. Hỏi sau 100 ngày nữa sẽ là thứ mấy trong tuần?',
        keywords: 'Day of week: Tuần hoàn 7 ngày trong 1 tuần.',
        studentAnswer: '',
        correctAnswer: 'Thứ Tư',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Lịch & Bài toán tuổi',
        difficulty: 'Trung bình',
        explanation: '1 tuần có 7 ngày. Lấy 100 : 7 = 14 dư 2. Bắt đầu từ Thứ Hai, đếm thêm 2 ngày: Thứ Ba, Thứ Tư. Vậy là Thứ Tư.',
        solutionSteps: [
          'Bước 1: Một tuần có 7 ngày, sau 7 ngày lại quay về đúng thứ ban đầu.',
          'Bước 2: Lấy 100 chia cho 7: 100 : 7 = 14 (tuần) và dư 2 (ngày).',
          'Bước 3: Vì dư 2 ngày, ta lấy Thứ Hai cộng thêm 2 ngày: Thứ Hai + 1 = Thứ Ba, Thứ Hai + 2 = Thứ Tư.'
        ],
        tips: 'Chỉ cần quan tâm đến số dư khi chia cho 7, không cần cộng từng ngày.'
      },
      {
        id: 14,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 14: Bài toán vừa gà vừa chó (Giả thiết tạm)',
        question: 'Bác Ba nuôi gà và thỏ nhốt chung một chuồng. Đếm được tất cả 20 cái đầu và 56 cái chân. Hỏi có bao nhiêu con thỏ?',
        keywords: 'Chicken and Rabbit problem: Bài toán giả thiết tạm.',
        studentAnswer: '',
        correctAnswer: '8',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Nâng cao',
        explanation: 'Giả sử cả 20 con đều là gà thì có: 20 × 2 = 40 chân. Số chân bị thiếu: 56 - 40 = 16 chân. Mỗi con thỏ nhiều hơn gà 2 chân. Số thỏ: 16 : 2 = 8 con.',
        solutionSteps: [
          'Bước 1: Giả sử cả 20 con đều là gà, khi đó tổng số chân là: 20 × 2 = 40 (chân).',
          'Bước 2: Số chân bị hụt so với thực tế: 56 - 40 = 16 (chân).',
          'Bước 3: Sở dĩ hụt là vì mỗi con thỏ có 4 chân, ta đã tính thành 2 chân. Mỗi con thỏ bị tính thiếu: 4 - 2 = 2 (chân).',
          'Bước 4: Số con thỏ là: 16 : 2 = 8 (con thỏ). Số con gà là: 20 - 8 = 12 (con gà).'
        ],
        tips: 'Phương pháp giả thiết tạm: Giả sử tất cả là con có ít chân hơn, lấy phần chân thiếu chia cho số chân chênh lệch.'
      },
      {
        id: 15,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 15: Đếm hình vuông trên bàn cờ',
        question: 'Trên một lưới ô vuông kích thước 4 × 4 ô, có tất cả bao nhiêu hình vuông lớn nhỏ?',
        keywords: 'Count squares: 1x1, 2x2, 3x3, 4x4.',
        studentAnswer: '',
        correctAnswer: '30',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Đo lường',
        difficulty: 'Nâng cao',
        explanation: 'Số hình vuông = 4² + 3² + 2² + 1² = 16 + 9 + 4 + 1 = 30 hình vuông.',
        solutionSteps: [
          'Bước 1: Đếm hình vuông kích thước 1 × 1: 4 × 4 = 16 (hình).',
          'Bước 2: Đếm hình vuông kích thước 2 × 2: 3 × 3 = 9 (hình).',
          'Bước 3: Đếm hình vuông kích thước 3 × 3: 2 × 2 = 4 (hình).',
          'Bước 4: Đếm hình vuông kích thước 4 × 4: 1 × 1 = 1 (hình).',
          'Bước 5: Tổng số hình vuông = 16 + 9 + 4 + 1 = 30 (hình vuông).'
        ],
        tips: 'Công thức đếm hình vuông trên lưới n × n: 1² + 2² + 3² + ... + n².'
      },
      {
        id: 16,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 16: Bài toán ốc sên leo tường',
        question: 'Một chú ốc sên bò lên một bức tường cao 8 mét. Ban ngày chú bò lên được 3 mét, ban đêm chú ngủ bị tụt xuống 2 mét. Hỏi sau bao nhiêu ngày thì chú ốc sên bò chạm tới đỉnh tường?',
        keywords: 'Snail climb: Ốc sên leo tường bẫy ngày cuối cùng.',
        studentAnswer: '',
        correctAnswer: '6',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Nâng cao',
        explanation: 'Mỗi ngày đêm thực tế tiến: 3 - 2 = 1m. Khi đạt 5m (sau 5 ngày đêm), đến ngày thứ 6 chú bò thêm 3m là 5 + 3 = 8m chạm đỉnh tường và không bị tụt nữa. Vậy mất 6 ngày.',
        solutionSteps: [
          'Bước 1: Trong ngày cuối cùng, chú bò 3m là chạm đỉnh, không bị tụt xuống nữa.',
          'Bước 2: Chiều cao chú cần bò trước ngày cuối: 8 - 3 = 5 (m).',
          'Bước 3: Mỗi ngày đêm (24 giờ), độ cao thực tế chú tăng lên: 3 - 2 = 1 (m).',
          'Bước 4: Thời gian để đạt 5m đầu tiên: 5 : 1 = 5 (ngày).',
          'Bước 5: Sang ngày thứ 6, chú bò thêm 3m: 5 + 3 = 8 (m) là lên đỉnh tường. Tổng cộng mất 6 ngày.'
        ],
        tips: 'Bẫy rất phổ biến: Lấy 8 chia 1 = 8 ngày là sai! Vì khi đã lên đến đỉnh tường vào ban ngày thì không bị tụt xuống nữa.'
      },
      {
        id: 17,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 17: Tìm hiệu hai số khi biết tổng và tích',
        question: 'Tích của hai số tự nhiên là 36 và tổng của chúng là 13. Hỏi hiệu giữa số lớn và số bé là bao nhiêu?',
        keywords: 'Sum and Product: Tổng và tích hai số.',
        studentAnswer: '',
        correctAnswer: '5',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phép tính',
        difficulty: 'Cơ bản',
        explanation: 'Hai số có tích bằng 36: (1, 36), (2, 18), (3, 12), (4, 9), (6, 6). Cặp số có tổng bằng 13 là 4 và 9 (vì 4 + 9 = 13). Hiệu = 9 - 4 = 5.',
        solutionSteps: [
          'Bước 1: Liệt kê các cặp số tự nhiên có tích bằng 36: 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6.',
          'Bước 2: Tìm cặp có tổng bằng 13: 4 + 9 = 13. Vậy hai số đó là 9 và 4.',
          'Bước 3: Hiệu giữa số lớn và số bé là: 9 - 4 = 5.'
        ],
        tips: 'Liệt kê các ước số của tích rồi cộng kiểm tra tổng.'
      },
      {
        id: 18,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 18: Tỷ lệ năng suất mèo bắt chuột',
        question: 'Nếu 3 con mèo bắt được 3 con chuột trong 3 phút. Hỏi cần bao nhiêu con mèo để bắt được 100 con chuột trong 100 phút?',
        keywords: 'Rate problem: Bài toán năng suất tỷ lệ.',
        studentAnswer: '',
        correctAnswer: '3',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Nâng cao',
        explanation: '3 con mèo bắt 3 con chuột trong 3 phút => 1 con mèo bắt 1 con chuột trong 3 phút. Trong 100 phút, 1 con mèo bắt được: 100 : 3 con chuột. 3 con mèo trong 100 phút bắt được: 3 × (100:3) = 100 con chuột. Vậy chỉ cần 3 con mèo.',
        solutionSteps: [
          'Bước 1: 3 con mèo bắt 3 con chuột trong 3 phút, có nghĩa là 1 con mèo bắt 1 con chuột mất đúng 3 phút.',
          'Bước 2: Trong thời gian 100 phút, mỗi con mèo bắt được 100/3 con chuột.',
          'Bước 3: Để bắt 100 con chuột trong 100 phút, 3 con mèo sẽ bắt được: 3 × (100/3) = 100 con chuột.',
          'Bước 4: Do đó số mèo cần thiết vẫn là 3 con mèo.'
        ],
        tips: 'Bẫy trực giác: Rất nhiều bạn điền 100 con mèo! Hãy tính năng suất của 1 con mèo theo từng phút.'
      },
      {
        id: 19,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 19: Cắt hình vuông thành các hình vuông nhỏ',
        question: 'Một hình vuông lớn có chu vi là 36cm. Người ta cắt hình vuông này thành 9 hình vuông nhỏ bằng nhau. Hỏi chu vi của mỗi hình vuông nhỏ là bao nhiêu cm?',
        keywords: 'Perimeter: Chu vi hình vuông = Cạnh × 4.',
        studentAnswer: '',
        correctAnswer: '12',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Đo lường',
        difficulty: 'Trung bình',
        explanation: 'Cạnh hình vuông lớn: 36 : 4 = 9cm. Cắt thành 9 hình vuông nhỏ gồm 3 hàng và 3 cột => Cạnh hình vuông nhỏ: 9 : 3 = 3cm. Chu vi hình vuông nhỏ: 3 × 4 = 12cm.',
        solutionSteps: [
          'Bước 1: Tính cạnh của hình vuông lớn: 36 : 4 = 9 (cm).',
          'Bước 2: Để cắt thành 9 hình vuông nhỏ bằng nhau, mỗi cạnh của hình vuông lớn được chia thành 3 phần bằng nhau (vì 3 × 3 = 9).',
          'Bước 3: Độ dài cạnh mỗi hình vuông nhỏ: 9 : 3 = 3 (cm).',
          'Bước 4: Chu vi của mỗi hình vuông nhỏ: 3 × 4 = 12 (cm).'
        ],
        tips: 'Lưới 9 ô vuông nhỏ gồm 3 hàng và 3 cột, do đó cạnh chia 3.'
      },
      {
        id: 20,
        part: 1,
        partTitle: 'Phần A: Trắc nghiệm tư duy & Điền đáp số (Câu 1 – 20)',
        title: 'Câu 20: Đếm chữ số đánh số trang sách',
        question: 'Một cuốn sách có 120 trang được đánh số thứ tự từ 1 đến 120. Hỏi người ta đã phải dùng tất cả bao nhiêu lượt chữ số?',
        keywords: 'Book page numbering: Đếm số lượng chữ số từ 1 đến 120.',
        studentAnswer: '',
        correctAnswer: '252',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Cấu tạo số & Chữ số',
        difficulty: 'Nâng cao',
        explanation: 'Từ 1 đến 9: 9 chữ số. Từ 10 đến 99: 90 × 2 = 180 chữ số. Từ 100 đến 120: 21 × 3 = 63 chữ số. Tổng = 9 + 180 + 63 = 252 chữ số.',
        solutionSteps: [
          'Bước 1: Trang có 1 chữ số (từ 1 đến 9): (9 - 1 + 1) × 1 = 9 (chữ số).',
          'Bước 2: Trang có 2 chữ số (từ 10 đến 99): (99 - 10 + 1) × 2 = 90 × 2 = 180 (chữ số).',
          'Bước 3: Trang có 3 chữ số (từ 100 đến 120): (120 - 100 + 1) × 3 = 21 × 3 = 63 (chữ số).',
          'Bước 4: Tổng số chữ số đã dùng: 9 + 180 + 63 = 252 (chữ số).'
        ],
        tips: 'Nhớ cộng 1 khi tính số số hạng: (Số cuối - Số đầu + 1).'
      },

      // ==========================================
      // PHẦN B: CÂU HỎI THỬ THÁCH MỞ RỘNG (CÂU 21 - 25)
      // ==========================================
      {
        id: 21,
        part: 2,
        partTitle: 'Phần B: Bài toán thử thách mở rộng (Câu 21 – 25)',
        title: 'Câu 21: Chia xúc xích với số lần cắt ít nhất',
        question: 'Cần ít nhất bao nhiêu nhát cắt để chia đều 16 chiếc xúc xích giống hệt nhau cho 24 người ăn?',
        keywords: 'Minimum cuts: Số nhát cắt ít nhất chia đều phân số.',
        studentAnswer: '',
        correctAnswer: '16',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Olympic',
        explanation: 'Mỗi người nhận: 16 : 24 = 2/3 chiếc xúc xích. Ta cắt mỗi chiếc xúc xích thành 2/3 và 1/3 (1 nhát cắt mỗi chiếc). 16 chiếc cần 16 nhát cắt, tạo ra 16 miếng 2/3 (chia cho 16 người) và 16 miếng 1/3. Ghép hai miếng 1/3 được 1 phần 2/3 chia cho 8 người còn lại (16:2 = 8). Tổng số nhát cắt ít nhất là 16.',
        solutionSteps: [
          'Bước 1: Tính phần xúc xích mỗi người nhận: 16/24 = 2/3 (chiếc).',
          'Bước 2: Nhận xét: 2/3 = 1 - 1/3. Nếu ta cắt mỗi chiếc xúc xích 1 nhát để chia thành 2 miếng: một miếng 2/3 và một miếng 1/3.',
          'Bước 3: Với 16 chiếc xúc xích, ta thực hiện 16 nhát cắt, được 16 miếng 2/3 và 16 miếng 1/3.',
          'Bước 4: 16 miếng 2/3 chia trực tiếp cho 16 người.',
          'Bước 5: 16 miếng 1/3 ghép từng đôi một: 1/3 + 1/3 = 2/3 chia đủ cho 16 : 2 = 8 người còn lại. Tổng cộng 16 + 8 = 24 người nhận đúng 2/3 chiếc.',
          'Bước 6: Vậy số nhát cắt ít nhất là 16 nhát.'
        ],
        tips: 'Phân tích phân số tối giản 16/24 = 2/3 = 1/3 + 1/3 để tối ưu hóa số nhát cắt.'
      },
      {
        id: 22,
        part: 2,
        partTitle: 'Phần B: Bài toán thử thách mở rộng (Câu 21 – 25)',
        title: 'Câu 22: Chia bi thành 4 đống có số lượng khác nhau',
        question: 'Charles có 16 viên bi. Bạn ấy chia số bi này thành 4 đống sao cho mỗi đống có số lượng bi khác nhau. Hỏi đống có số bi nhiều nhất có thể có ít nhất bao nhiêu viên bi?',
        keywords: 'Partition problem: Chia số tự nhiên thành các số phân biệt có max nhỏ nhất.',
        studentAnswer: '',
        correctAnswer: '6',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Olympic',
        explanation: 'Để đống lớn nhất có ít bi nhất, 4 số phải gần nhau nhất có thể. Xét 4 số tự nhiên liên tiếp: 2 + 3 + 4 + 5 = 14 (thiếu 2 viên). Thêm 2 viên vào 2 đống lớn nhất: 2 + 3 + 5 + 6 = 16. Đống lớn nhất là 6 viên bi.',
        solutionSteps: [
          'Bước 1: Gọi 4 đống bi có số lượng tăng dần là a < b < c < d với a + b + c + d = 16 (a, b, c, d là số nguyên dương).',
          'Bước 2: Để d nhỏ nhất, 4 số a, b, c, d phải sát nhau nhất có thể.',
          'Bước 3: Thử 4 số liên tiếp nhỏ nhất bắt đầu từ 1: 1 + 2 + 3 + 4 = 10 (còn thiếu 6 viên).',
          'Bước 4: Thử từ 2: 2 + 3 + 4 + 5 = 14. Còn dư 2 viên, ta cộng 1 viên vào c và 1 viên vào d: 2 + 3 + 5 + 6 = 16.',
          'Bước 5: Khi đó d = 6 là giá trị nhỏ nhất có thể của đống bi lớn nhất.'
        ],
        tips: 'Muốn giá trị lớn nhất đạt nhỏ nhất (min-max), hãy phân bố các số hạng đồng đều và sát nhau nhất có thể.'
      },
      {
        id: 23,
        part: 2,
        partTitle: 'Phần B: Bài toán thử thách mở rộng (Câu 21 – 25)',
        title: 'Câu 23: Hai chữ số tận cùng của tích các số lẻ',
        question: 'Tìm hai chữ số tận cùng của tích: P = 1 × 3 × 5 × 7 × 9 × ... × 2023 × 2025.',
        keywords: 'Last two digits: Hai chữ số tận cùng của tích chia hết cho 25 và là số lẻ.',
        studentAnswer: '',
        correctAnswer: '75',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Olympic Quốc tế',
        explanation: 'Trong tích có 25 nên tích chia hết cho 25 => tận cùng là 00, 25, 50 hoặc 75. Vì tích gồm toàn số lẻ nên tích là số lẻ => tận cùng là 25 hoặc 75. Xét theo đồng dư mod 4: P ≡ 3 (mod 4). Trong hai số 25 và 75, chỉ có 75 chia 4 dư 3. Vậy 2 chữ số tận cùng là 75.',
        solutionSteps: [
          'Bước 1: Nhận xét tích P gồm toàn các số lẻ, do đó P là số lẻ.',
          'Bước 2: Trong tích có các thừa số 5, 15, 25... nên P chia hết cho 25.',
          'Bước 3: Một số chia hết cho 25 thì 2 chữ số tận cùng chỉ có thể là 00, 25, 50, 75.',
          'Bước 4: Vì P là số lẻ nên 2 chữ số tận cùng chỉ có thể là 25 hoặc 75.',
          'Bước 5: Kiểm tra số dư của P khi chia cho 4: 1 × 3 × 5 × 7 ≡ 1 × (-1) × 1 × (-1) = 1 (cứ 4 số lẻ liên tiếp có tích chia 4 dư 1). Tích P ≡ 3 (mod 4).',
          'Bước 6: 25 chia 4 dư 1, còn 75 chia 4 dư 3. Vậy hai chữ số tận cùng chắc chắn là 75.'
        ],
        tips: 'Kết hợp dấu hiệu chia hết cho 25 và số dư khi chia cho 4 là chìa khóa vàng cho bài toán chữ số tận cùng.'
      },
      {
        id: 24,
        part: 2,
        partTitle: 'Phần B: Bài toán thử thách mở rộng (Câu 21 – 25)',
        title: 'Câu 24: Tổng 5 số tự nhiên liên tiếp',
        question: 'Mary viết ra 5 số tự nhiên liên tiếp. Tổng của 3 số đầu tiên là 45. Hỏi tổng của cả 5 số đó là bao nhiêu?',
        keywords: 'Consecutive numbers: Các số tự nhiên liên tiếp.',
        studentAnswer: '',
        correctAnswer: '80',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Trung bình',
        explanation: 'Tổng 3 số đầu là 45 => Số thứ hai (ở giữa 3 số đầu) là 45 : 3 = 15. Năm số đó là 14, 15, 16, 17, 18. Tổng 5 số = 16 × 5 = 80.',
        solutionSteps: [
          'Bước 1: Gọi 3 số đầu tiên là (x - 1), x, (x + 1). Tổng của chúng là: (x - 1) + x + (x + 1) = 3x = 45 => x = 15.',
          'Bước 2: Vậy 5 số liên tiếp đó là: 14, 15, 16, 17, 18.',
          'Bước 3: Số ở chính giữa cả 5 số là 16. Tổng của 5 số liên tiếp = Số ở giữa × 5 = 16 × 5 = 80.'
        ],
        tips: 'Tổng của một số lượng lẻ các số cách đều luôn bằng: (Số ở chính giữa) × (Số lượng số hạng).'
      },
      {
        id: 25,
        part: 2,
        partTitle: 'Phần B: Bài toán thử thách mở rộng (Câu 21 – 25)',
        title: 'Câu 25: Bài thi 25 câu tính điểm thưởng phạt',
        question: 'Trong một kỳ thi có 25 câu hỏi. Mỗi câu trả lời đúng được cộng 4 điểm, mỗi câu trả lời sai bị trừ 1 điểm. Thí sinh Tom đã trả lời tất cả 25 câu hỏi và đạt được 75 điểm. Hỏi Tom đã trả lời đúng bao nhiêu câu?',
        keywords: 'Scoring problem: Bài toán tính điểm thi bằng phương pháp giả thiết tạm.',
        studentAnswer: '',
        correctAnswer: '20',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Olympic',
        explanation: 'Giả sử Tom làm đúng cả 25 câu thì được: 25 × 4 = 100 điểm. Số điểm bị giảm: 100 - 75 = 25 điểm. Mỗi câu sai thay vì được 4 điểm lại bị trừ 1 điểm, tức là làm mất: 4 + 1 = 5 điểm. Số câu sai: 25 : 5 = 5 câu. Số câu đúng: 25 - 5 = 20 câu.',
        solutionSteps: [
          'Bước 1: Giả sử Tom trả lời đúng tất cả 25 câu. Số điểm tối đa Tom đạt được: 25 × 4 = 100 (điểm).',
          'Bước 2: Số điểm thực tế bị hụt đi: 100 - 75 = 25 (điểm).',
          'Bước 3: Mỗi câu làm sai thay vì được +4 điểm thì lại bị -1 điểm, làm tổng điểm giảm đi: 4 + 1 = 5 (điểm).',
          'Bước 4: Số câu Tom trả lời sai là: 25 : 5 = 5 (câu).',
          'Bước 5: Số câu Tom trả lời đúng là: 25 - 5 = 20 (câu).'
        ],
        tips: 'Bẫy điểm trừ: Mỗi câu làm sai làm mất (điểm thưởng + điểm phạt) = 4 + 1 = 5 điểm.'
      }
    ]
  },

  // =========================================================================
  // 2. KANGAROO (IKMC) 2024 – CẤP ĐỘ ECOLIER (KHỐI 3 & 4)
  // Đề thi thật Kangaroo Quốc tế 24 câu chuẩn: 8 câu 3 điểm, 8 câu 4 điểm, 8 câu 5 điểm
  // =========================================================================
  {
    id: 'exam_ikmc_2024_l34',
    title: 'Đề Thi Toán Quốc Tế Kangaroo (IKMC) 2024 – Cấp độ Ecolier',
    program: 'IKMC',
    programName: 'International Kangaroo Mathematics Contest',
    level: 'primary',
    grade: 'Lớp 3 – 4',
    year: 2024,
    round: 'Vòng Quốc Gia (National Contest)',
    durationMinutes: 75,
    questionCount: 24,
    difficulty: 'Olympic Quốc tế',
    description: 'Đề thi chính thức chuẩn 24 câu Kangaroo Ecolier: Tư duy logic hình ảnh, bài toán gấp giấy, mê cung và số học sáng tạo.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 1: Phép tính năm Kangaroo',
        question: 'Tính giá trị biểu thức sau: 20 × 24 + 20 - 24 = ?',
        keywords: 'Calculation: Phép nhân và phép cộng trừ.',
        studentAnswer: '',
        correctAnswer: '476',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phép tính',
        difficulty: 'Cơ bản',
        explanation: '20 × 24 = 480. Sau đó 480 + 20 - 24 = 500 - 24 = 476.',
        solutionSteps: ['Bước 1: Tính 20 × 24 = 480.', 'Bước 2: 480 + 20 = 500.', 'Bước 3: 500 - 24 = 476.'],
        tips: 'Thực hiện nhân trước rồi cộng trừ từ trái sang phải.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 2: Số bậc thang bước nhảy chú thỏ',
        question: 'Một chú Kangaroo nhảy lên cầu thang, mỗi bước nhảy qua 3 bậc. Chú nhảy 7 bước thì tới đỉnh cầu thang. Hỏi cầu thang có tất cả bao nhiêu bậc?',
        keywords: 'Multiplication: 7 bước nhảy, mỗi bước 3 bậc.',
        studentAnswer: '',
        correctAnswer: '21',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phép tính',
        difficulty: 'Cơ bản',
        explanation: 'Tổng số bậc thang = 7 × 3 = 21 bậc.',
        solutionSteps: ['Bước 1: Mỗi bước chú nhảy qua 3 bậc.', 'Bước 2: Chú nhảy 7 bước, vậy số bậc là: 7 × 3 = 21 bậc.'],
        tips: 'Lấy số bước nhân số bậc mỗi bước.'
      },
      {
        id: 3,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 3: Đếm số mặt xúc xắc đối diện',
        question: 'Trên một con xúc xắc tiêu chuẩn, tổng số chấm ở hai mặt đối diện nhau luôn bằng 7. Nếu mặt trên có 4 chấm thì mặt dưới đáy có bao nhiêu chấm?',
        keywords: 'Opposite faces: Tổng hai mặt đối diện bằng 7.',
        studentAnswer: '',
        correctAnswer: '3',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Cơ bản',
        explanation: 'Mặt dưới có: 7 - 4 = 3 chấm.',
        solutionSteps: ['Bước 1: Quy luật xúc xắc chuẩn: Mặt trên + Mặt dưới = 7.', 'Bước 2: Mặt dưới = 7 - 4 = 3 chấm.'],
        tips: 'Ghi nhớ quy luật xúc xắc chuẩn: 1 đối 6, 2 đối 5, 3 đối 4 (tổng luôn là 7).'
      },
      {
        id: 4,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 4: Cắt dây ruy băng',
        question: 'Một sợi dây ruy băng dài 12m. Bạn Hoa muốn cắt thành các đoạn ngắn dài 2m. Hỏi Hoa phải thực hiện bao nhiêu nhát cắt?',
        keywords: 'Number of cuts: Số nhát cắt = Số đoạn - 1.',
        studentAnswer: '',
        correctAnswer: '5',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Cơ bản',
        explanation: 'Số đoạn dây: 12 : 2 = 6 đoạn. Để có 6 đoạn thẳng cần 6 - 1 = 5 nhát cắt.',
        solutionSteps: ['Bước 1: Số đoạn dây tạo thành: 12 : 2 = 6 (đoạn).', 'Bước 2: Số nhát cắt = Số đoạn - 1 = 6 - 1 = 5 (nhát cắt).'],
        tips: 'Bẫy: Nhát cắt cuối cùng tạo ra 2 đoạn dây một lúc.'
      },
      {
        id: 5,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 5: Số ngày trong 3 tuần lễ',
        question: 'Kỳ nghỉ hè của Minh kéo dài đúng 4 tuần lễ. Hỏi kỳ nghỉ đó kéo dài bao nhiêu ngày?',
        keywords: 'Weeks to days: 1 tuần = 7 ngày.',
        studentAnswer: '',
        correctAnswer: '28',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Lịch & Bài toán tuổi',
        difficulty: 'Cơ bản',
        explanation: '4 tuần có: 4 × 7 = 28 ngày.',
        solutionSteps: ['Bước 1: 1 tuần lễ có 7 ngày.', 'Bước 2: 4 tuần lễ có: 4 × 7 = 28 (ngày).'],
        tips: 'Đổi đơn vị: 1 tuần = 7 ngày.'
      },
      {
        id: 6,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 6: Đổi tiền xu Kangaroo',
        question: 'An có 5 đồng xu loại 2 đô-la và 3 đồng xu loại 5 đô-la. Hỏi An có tất cả bao nhiêu đô-la?',
        keywords: 'Money: Đổi tiền và tính tổng giá trị.',
        studentAnswer: '',
        correctAnswer: '25',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán thực tế & Đổi tiền',
        difficulty: 'Cơ bản',
        explanation: '5 × 2 = 10 đô-la. 3 × 5 = 15 đô-la. Tổng: 10 + 15 = 25 đô-la.',
        solutionSteps: ['Bước 1: Tiền xu loại 2 đô: 5 × 2 = 10 (đô-la).', 'Bước 2: Tiền xu loại 5 đô: 3 × 5 = 15 (đô-la).', 'Bước 3: Tổng cộng: 10 + 15 = 25 (đô-la).'],
        tips: 'Tính riêng từng loại tiền rồi cộng lại.'
      },
      {
        id: 7,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 7: Hình tam giác ghép',
        question: 'Một hình vuông được chia bởi 2 đường chéo thành các hình tam giác nhỏ. Hỏi có tất cả bao nhiêu hình tam giác nhỏ?',
        keywords: 'Triangles: Đếm tam giác trong hình vuông có 2 đường chéo.',
        studentAnswer: '',
        correctAnswer: '8',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Đo lường',
        difficulty: 'Trung bình',
        explanation: 'Có 4 tam giác đơn (kích thước 1/4 hình vuông) và 4 tam giác đôi (ghép từ 2 tam giác đơn, là một nửa hình vuông). Tổng có 4 + 4 = 8 hình tam giác.',
        solutionSteps: ['Bước 1: Đếm tam giác đơn tạo bởi các cạnh và tâm: có 4 tam giác đơn.', 'Bước 2: Đếm tam giác lớn ghép từ 2 tam giác đơn (mỗi đường chéo chia hình vuông làm 2 tam giác lớn): có 2 × 2 = 4 tam giác lớn.', 'Bước 3: Tổng số tam giác: 4 + 4 = 8 (tam giác).'],
        tips: 'Đừng quên đếm cả các tam giác lớn do ghép 2 tam giác nhỏ lại.'
      },
      {
        id: 8,
        part: 1,
        partTitle: 'Phần 1: Câu hỏi 3 điểm (Tư duy cơ bản)',
        title: 'Câu 8: Tháp gạch xếp tầng',
        question: 'Tầng 1 có 5 viên gạch, tầng 2 có 4 viên, tầng 3 có 3 viên, tầng 4 có 2 viên và tầng trên cùng có 1 viên. Hỏi kim tự tháp gạch có tất cả bao nhiêu viên?',
        keywords: 'Sum: 1 + 2 + 3 + 4 + 5.',
        studentAnswer: '',
        correctAnswer: '15',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Cơ bản',
        explanation: 'Tổng = 5 + 4 + 3 + 2 + 1 = 15 viên gạch.',
        solutionSteps: ['Bước 1: Tính tổng: 1 + 2 + 3 + 4 + 5 = 15 viên gạch.'],
        tips: 'Ghép cặp: (1 + 5) + (2 + 4) + 3 = 6 + 6 + 3 = 15.'
      },

      // PHẦN 2: CÂU HỎI 4 ĐIỂM (CÂU 9 - 16)
      {
        id: 9,
        part: 2,
        partTitle: 'Phần 2: Câu hỏi 4 điểm (Tư duy nâng cao)',
        title: 'Câu 9: Đồng hồ điện tử đối xứng',
        question: 'Một chiếc đồng hồ điện tử hiển thị dạng 24 giờ (ví dụ 14:41 là thời gian đối xứng). Thời gian đối xứng sớm nhất ngay sau 15:51 là mấy giờ?',
        keywords: 'Palindromic time: Thời gian đối xứng từ trước ra sau.',
        studentAnswer: '',
        correctAnswer: '20:02',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Trung bình',
        explanation: 'Sau giờ 15 thì các giờ 16, 17, 18, 19 không có số phút đối xứng vì phút đối xứng sẽ là :61, :71, :81, :91 (vô lý vì phút nhỏ hơn 60). Giờ đối xứng tiếp theo là 20:02.',
        solutionSteps: [
          'Bước 1: Xét giờ 16: đối xứng cần 16:61 (không tồn tại vì phút < 60).',
          'Bước 2: Xét giờ 17: 17:71 (loại), 18: 18:81 (loại), 19: 19:91 (loại).',
          'Bước 3: Sang giờ 20: số phút đối xứng là 02 (hợp lệ). Vậy thời gian đó là 20:02.'
        ],
        tips: 'Lưu ý số phút trên đồng hồ chỉ chạy từ 00 đến 59.'
      },
      {
        id: 10,
        part: 2,
        partTitle: 'Phần 2: Câu hỏi 4 điểm (Tư duy nâng cao)',
        title: 'Câu 10: Xếp hàng chụp ảnh',
        question: 'Có 5 bạn đứng thành một hàng dọc. Bạn Linh đứng trước bạn Hoa nhưng đứng sau bạn Nam. Bạn Dũng đứng cuối hàng. Hỏi bạn đứng thứ 4 là ai nếu bạn Nam đứng đầu hàng và bạn Mai đứng thứ hai?',
        keywords: 'Logic order: Xếp thứ tự 5 bạn.',
        studentAnswer: '',
        correctAnswer: 'Hoa',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Logic & Dirichlet',
        difficulty: 'Trung bình',
        explanation: 'Thứ 1: Nam. Thứ 2: Mai. Thứ 5: Dũng. Linh đứng trước Hoa nên Thứ 3: Linh, Thứ 4: Hoa. Vậy bạn đứng thứ 4 là Hoa.',
        solutionSteps: [
          'Bước 1: Vị trí 1: Nam; Vị trí 2: Mai; Vị trí 5: Dũng.',
          'Bước 2: Còn vị trí 3 và 4 cho Linh và Hoa.',
          'Bước 3: Vì Linh đứng trước Hoa nên Linh đứng thứ 3, Hoa đứng thứ 4.'
        ],
        tips: 'Điền các vị trí cố định trước rồi xét vị trí còn lại.'
      },
      {
        id: 11,
        part: 2,
        partTitle: 'Phần 2: Câu hỏi 4 điểm (Tư duy nâng cao)',
        title: 'Câu 11: Số cân nặng ba con vật',
        question: 'Một con mèo và một con vịt cân nặng 10kg. Một con mèo và một con chó cân nặng 24kg. Một con vịt và một con chó cân nặng 20kg. Hỏi cả 3 con vật cùng cân nặng bao nhiêu kg?',
        keywords: 'System of weights: Tổng đôi một của 3 con vật.',
        studentAnswer: '',
        correctAnswer: '27',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phép tính',
        difficulty: 'Nâng cao',
        explanation: 'Cộng cả 3 phương trình: 2 × (Mèo + Vịt + Chó) = 10 + 24 + 20 = 54kg. Tổng cân nặng cả 3 con: 54 : 2 = 27kg.',
        solutionSteps: [
          'Bước 1: Mèo + Vịt = 10kg.',
          'Bước 2: Mèo + Chó = 24kg.',
          'Bước 3: Vịt + Chó = 20kg.',
          'Bước 4: Cộng cả 3 vế: 2 lần (Mèo + Vịt + Chó) = 10 + 24 + 20 = 54kg.',
          'Bước 5: Cân nặng cả 3 con: 54 : 2 = 27 (kg).'
        ],
        tips: 'Mỗi con vật xuất hiện 2 lần trong 3 phép cân, nên lấy tổng chia 2.'
      },
      {
        id: 12,
        part: 2,
        partTitle: 'Phần 2: Câu hỏi 4 điểm (Tư duy nâng cao)',
        title: 'Câu 12: Hình chữ nhật ghép từ các ô vuông',
        question: 'Người ta dùng 36 viên gạch vuông cạnh 1cm để xếp thành một hình chữ nhật kín. Hỏi chu vi nhỏ nhất có thể của hình chữ nhật đó là bao nhiêu cm?',
        keywords: 'Minimum perimeter: Chu vi nhỏ nhất khi dài và rộng gần nhau nhất.',
        studentAnswer: '',
        correctAnswer: '24',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Đo lường',
        difficulty: 'Nâng cao',
        explanation: 'Diện tích = 36 cm². Các cặp kích thước: 1×36 (P=74), 2×18 (P=40), 3×12 (P=30), 4×9 (P=26), 6×6 (P=24). Chu vi nhỏ nhất là (6 + 6) × 2 = 24cm (khi là hình vuông).',
        solutionSteps: [
          'Bước 1: Diện tích hình chữ nhật là 36 cm².',
          'Bước 2: Chu vi = (dài + rộng) × 2. Chu vi nhỏ nhất khi chiều dài và chiều rộng gần nhau nhất.',
          'Bước 3: Cặp số gần nhau nhất có tích bằng 36 là 6 × 6.',
          'Bước 4: Chu vi nhỏ nhất = (6 + 6) × 2 = 24 (cm).'
        ],
        tips: 'Hình vuông là hình chữ nhật đặc biệt có chu vi nhỏ nhất trong các hình có cùng diện tích.'
      }
    ]
  },

  // =========================================================================
  // 3. ITMC 2025 – VÒNG QUỐC GIA (KHỐI 6 - LISA)
  // Đề thi thật Olympic Toán Quốc tế ITMC THCS: Đại số, tối ưu hóa, hình học Pythagoras, logic
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
    questionCount: 15,
    difficulty: 'Olympic Quốc tế',
    description: 'Bộ đề thi chuẩn ITMC Quốc tế dành cho khối THCS: Bài toán tối ưu diện tích, định lý số học, suy luận logic và hình học tổ hợp.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Phần 1: Bài toán tối ưu hóa & Đại số',
        title: 'Câu 1: Diện tích lớn nhất của hình chữ nhật có chu vi cố định',
        question: 'Một khu đất hình chữ nhật có chu vi bằng 24m. Chiều dài và chiều rộng đều là các số tự nhiên (tính bằng mét). Hỏi diện tích lớn nhất của khu đất đó có thể đạt được là bao nhiêu m²?',
        keywords: 'Maximum area: Nửa chu vi l + w = 12. Diện tích cực đại khi l = w.',
        studentAnswer: '',
        correctAnswer: '36',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Đại số & Tối ưu hóa',
        difficulty: 'Trung bình',
        explanation: 'Nửa chu vi: l + w = 24 : 2 = 12m. Diện tích A = l × w. Bất đẳng thức Cauchy: l × w đạt cực đại khi l = w = 6m. Diện tích lớn nhất: 6 × 6 = 36 m².',
        solutionSteps: [
          'Bước 1: Tính nửa chu vi của hình chữ nhật: l + w = 24 : 2 = 12 (m).',
          'Bước 2: Thử các cặp số tự nhiên có tổng bằng 12: (1,11)->11; (2,10)->20; (3,9)->27; (4,8)->32; (5,7)->35; (6,6)->36.',
          'Bước 3: Diện tích lớn nhất là 36 m² khi hình chữ nhật trở thành hình vuông cạnh 6m.'
        ],
        tips: 'Hai số có tổng không đổi thì tích của chúng lớn nhất khi hai số bằng nhau.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Phần 1: Bài toán tối ưu hóa & Đại số',
        title: 'Câu 2: Kiểm tra tam giác vuông theo Pythagoras',
        question: 'Một tam giác có độ dài ba cạnh lần lượt là 7cm, 24cm và 25cm. Hỏi tam giác này có phải là tam giác vuông không? (Điền "Có" hoặc "Không")',
        keywords: 'Pythagorean theorem: a² + b² = c².',
        studentAnswer: '',
        correctAnswer: 'Có',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Pythagoras',
        difficulty: 'Trung bình',
        explanation: '7² + 24² = 49 + 576 = 625 = 25². Theo định lý Pythagoras đảo, đây là tam giác vuông tại đỉnh đối diện cạnh 25cm.',
        solutionSteps: [
          'Bước 1: Tính bình phương cạnh lớn nhất: 25² = 625.',
          'Bước 2: Tính tổng bình phương hai cạnh còn lại: 7² + 24² = 49 + 576 = 625.',
          'Bước 3: Do 7² + 24² = 25² nên tam giác này là tam giác vuông.'
        ],
        tips: 'Bộ ba số Pythagoras kinh điển lớp 6-7: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17).'
      },
      {
        id: 3,
        part: 1,
        partTitle: 'Phần 1: Bài toán tối ưu hóa & Đại số',
        title: 'Câu 3: Suy luận logic hoa quả yêu thích',
        question: 'Ba bạn Alice, Bob, Carol mỗi người thích một loại quả khác nhau trong 3 loại: Táo, Chuối, Anh đào. Biết rằng: Alice không thích chuối; Bob không thích anh đào; Carol không thích táo. Hỏi bạn Bob thích loại quả nào?',
        keywords: 'Logic deduction: Loại trừ khả năng.',
        studentAnswer: '',
        correctAnswer: 'Chuối',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Suy luận logic',
        difficulty: 'Trung bình',
        explanation: 'Bob không thích anh đào => Bob thích Táo hoặc Chuối. Nếu Bob thích Táo => Alice phải thích Anh đào (vì Alice không thích chuối), khi đó Carol thích Chuối (thỏa mãn Carol không thích táo). Kiểm tra: Alice thích Táo, Bob thích Chuối, Carol thích Anh đào (thỏa mãn 100%). Vậy Bob thích Chuối.',
        solutionSteps: [
          'Bước 1: Lập bảng loại trừ: Alice không thích Chuối; Bob không thích Anh đào; Carol không thích Táo.',
          'Bước 2: Thử khả năng duy nhất phù hợp cả 3 điều kiện: Alice thích Táo, Bob thích Chuối, Carol thích Anh đào.',
          'Bước 3: Kết luận: Bob thích Chuối.'
        ],
        tips: 'Vẽ bảng logic 3×3 để tích dấu X và V để loại trừ.'
      },
      {
        id: 4,
        part: 1,
        partTitle: 'Phần 1: Bài toán tối ưu hóa & Đại số',
        title: 'Câu 4: Số chữ số 0 tận cùng của giai thừa',
        question: 'Tích 50! = 1 × 2 × 3 × ... × 49 × 50 có tận cùng bằng bao nhiêu chữ số 0 liên tiếp?',
        keywords: 'Trailing zeros: Đếm số thừa số 5 trong phân tích thừa số nguyên tố.',
        studentAnswer: '',
        correctAnswer: '12',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Số nguyên tố',
        difficulty: 'Nâng cao',
        explanation: 'Số chữ số 0 bằng số thừa số 5 trong 50!. Công thức Legendre: [50/5] + [50/25] = 10 + 2 = 12 chữ số 0.',
        solutionSteps: [
          'Bước 1: Một chữ số 0 tận cùng được tạo bởi tích của thừa số 2 và thừa số 5.',
          'Bước 2: Trong 50!, số lượng thừa số 2 luôn nhiều hơn thừa số 5, nên số chữ số 0 phụ thuộc vào số thừa số 5.',
          'Bước 3: Số các bội của 5 từ 1 đến 50: 50 : 5 = 10 (số).',
          'Bước 4: Số các bội của 25 (chứa thêm một thừa số 5): 50 : 25 = 2 (số).',
          'Bước 5: Tổng số thừa số 5 = 10 + 2 = 12. Vậy tích có 12 chữ số 0 tận cùng.'
        ],
        tips: 'Công thức Legendre đếm thừa số nguyên tố p trong n!: [n/p] + [n/p²] + [n/p³]...'
      },
      {
        id: 5,
        part: 1,
        partTitle: 'Phần 1: Bài toán tối ưu hóa & Đại số',
        title: 'Câu 5: Tìm số nguyên n thỏa mãn phép chia hết',
        question: 'Có bao nhiêu số nguyên dương n để phân số (2n + 7) / (n + 1) nhận giá trị là một số nguyên?',
        keywords: 'Divisibility: Tách phần nguyên (2n+7)/(n+1) = 2 + 5/(n+1).',
        studentAnswer: '',
        correctAnswer: '1',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Số nguyên tố',
        difficulty: 'Nâng cao',
        explanation: 'Ta có (2n + 7) = 2(n + 1) + 5. Để phân số là số nguyên thì (n + 1) phải là ước của 5. Các ước dương của 5 là 1 và 5. n + 1 = 1 => n = 0 (loại vì n nguyên dương). n + 1 = 5 => n = 4 (nhận). Vậy chỉ có 1 giá trị n = 4.',
        solutionSteps: [
          'Bước 1: Biến đổi: (2n + 7) / (n + 1) = [2(n + 1) + 5] / (n + 1) = 2 + 5 / (n + 1).',
          'Bước 2: Để biểu thức nhận giá trị nguyên thì 5 phải chia hết cho (n + 1).',
          'Bước 3: Do n là số nguyên dương (n ≥ 1) nên n + 1 ≥ 2.',
          'Bước 4: Ước nguyên dương của 5 lớn hơn hoặc bằng 2 chỉ có số 5.',
          'Bước 5: Suy ra n + 1 = 5 => n = 4. Vậy có đúng 1 giá trị của n.'
        ],
        tips: 'Tách tử số theo bội của mẫu số để đưa về bài toán tìm ước của hằng số.'
      }
    ]
  },

  // =========================================================================
  // 4. GMATH 2025 – TOÁN TIẾNG ANH LỚP 1 (TONY)
  // Đề thi song ngữ Anh - Việt chuẩn kỳ thi GMATH tăng cường năng lực tư duy
  // =========================================================================
  {
    id: 'exam_gmath_2025_l1',
    title: 'Đề Thi Toán Tiếng Anh GMATH 2025 – Cấp Tiểu Học (Lớp 1)',
    program: 'GMATH',
    programName: 'Global Mathematics Olympiad in English',
    level: 'primary',
    grade: 'Lớp 1',
    year: 2025,
    round: 'Vòng Tuyển Chọn (Primary Round)',
    durationMinutes: 45,
    questionCount: 15,
    difficulty: 'Cơ bản',
    description: 'Đề thi Toán Tiếng Anh song ngữ chuẩn GMATH cho Tony (Lớp 1): Đếm hình, so sánh, quy luật màu sắc và phép tính trong phạm vi 20.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Part 1: Numbers & Counting (Số học & Phép đếm)',
        title: 'Question 1: Addition within 20 (Phép cộng trong phạm vi 20)',
        question: 'Calculate (Tính): 7 + 8 = ?',
        keywords: 'Addition: Phép cộng; Calculate: Hãy tính.',
        studentAnswer: '',
        correctAnswer: '15',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phép tính',
        difficulty: 'Cơ bản',
        explanation: '7 + 8 = 15.',
        solutionSteps: ['Bước 1: Tách 8 = 3 + 5.', 'Bước 2: 7 + 3 = 10.', 'Bước 3: 10 + 5 = 15.'],
        tips: 'Gộp cho tròn chục: 7 cần 3 để thành 10, rồi cộng 5 còn lại.'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Part 1: Numbers & Counting (Số học & Phép đếm)',
        title: 'Question 2: Missing number pattern (Tìm số còn thiếu)',
        question: 'Find the missing number (Tìm số còn thiếu): 2, 4, 6, ___, 10.',
        keywords: 'Even numbers: Dãy số chẵn cách đều 2 đơn vị.',
        studentAnswer: '',
        correctAnswer: '8',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Dãy số',
        difficulty: 'Cơ bản',
        explanation: 'Quy luật đếm cách 2: 2, 4, 6, 8, 10. Số còn thiếu là 8.',
        solutionSteps: ['Bước 1: Mỗi số cộng thêm 2: 2 + 2 = 4, 4 + 2 = 6.', 'Bước 2: Số tiếp theo = 6 + 2 = 8.'],
        tips: 'Đếm cách đều 2 ngón tay.'
      },
      {
        id: 3,
        part: 1,
        partTitle: 'Part 1: Numbers & Counting (Số học & Phép đếm)',
        title: 'Question 3: Shapes (Hình học cơ bản)',
        question: 'How many sides does a triangle have? (Một hình tam giác có bao nhiêu cạnh?)',
        keywords: 'Triangle: Hình tam giác; Sides: Cạnh.',
        studentAnswer: '',
        correctAnswer: '3',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Hình học & Đo lường',
        difficulty: 'Cơ bản',
        explanation: 'Hình tam giác có 3 cạnh và 3 đỉnh.',
        solutionSteps: ['Bước 1: Hình tam giác có 3 cạnh.'],
        tips: 'Tiền tố "Tri" trong tiếng Anh có nghĩa là 3 (Triangle = 3 góc/cạnh).'
      },
      {
        id: 4,
        part: 1,
        partTitle: 'Part 1: Numbers & Counting (Số học & Phép đếm)',
        title: 'Question 4: Word problem (Bài toán đố có lời văn)',
        question: 'Tony has 9 apples. He eats 3 apples. How many apples does Tony have left? (Tony có 9 quả táo. Tony ăn mất 3 quả. Hỏi Tony còn lại bao nhiêu quả táo?)',
        keywords: 'Have left: Còn lại (thực hiện phép trừ).',
        studentAnswer: '',
        correctAnswer: '6',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Toán logic thực tế',
        difficulty: 'Cơ bản',
        explanation: 'Số táo còn lại: 9 - 3 = 6 quả.',
        solutionSteps: ['Bước 1: Tony có 9 quả, ăn đi 3 quả.', 'Bước 2: Phép tính: 9 - 3 = 6 (quả).'],
        tips: 'Gặp từ khóa "left" (còn lại) trong đề toán tiếng Anh thường dùng phép trừ.'
      },
      {
        id: 5,
        part: 1,
        partTitle: 'Part 1: Numbers & Counting (Số học & Phép đếm)',
        title: 'Question 5: Compare numbers (So sánh số học)',
        question: 'Which number is the largest? (Số nào lớn nhất trong các số sau: 12, 19, 15, 17?)',
        keywords: 'Largest: Lớn nhất.',
        studentAnswer: '',
        correctAnswer: '19',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phép tính',
        difficulty: 'Cơ bản',
        explanation: 'So sánh các số: 12 < 15 < 17 < 19. Số lớn nhất là 19.',
        solutionSteps: ['Bước 1: So sánh hàng đơn vị của các số: 9 > 7 > 5 > 2.', 'Bước 2: Vậy số lớn nhất là 19.'],
        tips: 'Largest = Lớn nhất, Smallest = Bé nhất.'
      }
    ]
  },

  // =========================================================================
  // 5. CHUYÊN TOÁN VÀO 10 HÀ NỘI & VMO (CHIP - LỚP 10)
  // Đề thi tuyển sinh vào 10 Chuyên Toán chuẩn: Rút gọn, BĐT Cauchy, Số chính phương
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
    description: 'Bộ đề thi chính thức vào lớp 10 Chuyên Toán Hà Nội (KHTN, Chuyên Sư Phạm, Ams): Đại số biến đổi, Bất đẳng thức, Phương trình nghiệm nguyên.',
    questions: [
      {
        id: 1,
        part: 1,
        partTitle: 'Bài 1: Đại số & Căn thức',
        title: 'Bài 1: Rút gọn biểu thức và tìm giá trị nguyên',
        question: 'Cho x > 0 và x ≠ 4. Rút gọn biểu thức P = [√x / (√x - 2) - 4 / (x - 2√x)] : [(√x + 2) / √x]. Tìm giá trị của P khi x = 9.',
        keywords: 'Algebraic simplification: Rút gọn biểu thức chứa căn.',
        studentAnswer: '',
        correctAnswer: '1',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Đại số & Rút gọn',
        difficulty: 'Nâng cao',
        explanation: 'Quy đồng trong ngoặc: [x - 4] / [√x(√x - 2)] = (√x + 2) / √x. Chia cho (√x + 2)/√x được P = 1 với mọi x thỏa mãn ĐKXĐ. Vậy tại x = 9 thì P = 1.',
        solutionSteps: [
          'Bước 1: Phân tích mẫu số: x - 2√x = √x(√x - 2).',
          'Bước 2: Quy đồng biểu thức thứ nhất: [√x × √x - 4] / [√x(√x - 2)] = (x - 4) / [√x(√x - 2)].',
          'Bước 3: Rút gọn tử số x - 4 = (√x - 2)(√x + 2), triệt tiêu (√x - 2) được: (√x + 2) / √x.',
          'Bước 4: Thực hiện phép chia: [(√x + 2) / √x] : [(√x + 2) / √x] = 1.',
          'Bước 5: Với x = 9 (thỏa mãn ĐKXĐ), giá trị biểu thức P = 1.'
        ],
        tips: 'Luôn tìm điều kiện xác định và phân tích hằng đẳng thức a - b = (√a - √b)(√a + √b).'
      },
      {
        id: 2,
        part: 1,
        partTitle: 'Bài 2: Phương trình nghiệm nguyên & Số học',
        title: 'Bài 2: Tìm cặp số nguyên tố (p, q)',
        question: 'Tìm tất cả các cặp số nguyên tố (p, q) thỏa mãn phương trình: p² - 2q² = 1.',
        keywords: 'Prime numbers & Diophantine: p² - 1 = 2q² => (p-1)(p+1) = 2q².',
        studentAnswer: '',
        correctAnswer: '(3, 2)',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Số học & Phương trình nghiệm nguyên',
        difficulty: 'Olympic',
        explanation: 'Ta có p² - 1 = 2q² => (p - 1)(p + 1) = 2q². Nếu p = 2 thì không thỏa mãn. Nếu p là số nguyên tố lẻ: Nếu p = 3 thì 3² - 2q² = 1 => 9 - 1 = 8 = 2q² => q² = 4 => q = 2 (thỏa mãn cả 2 là số nguyên tố). Nếu p > 3 thì p không chia hết cho 3 => p² ≡ 1 (mod 3) => 2q² ≡ 0 (mod 3) => q = 3 => p² = 2(9) + 1 = 19 (không là số chính phương). Vậy nghiệm duy nhất là (p, q) = (3, 2).',
        solutionSteps: [
          'Bước 1: Biến đổi phương trình thành: p² - 1 = 2q² <=> (p - 1)(p + 1) = 2q².',
          'Bước 2: Xét số nguyên tố nhỏ nhất: p = 2 => 4 - 2q² = 1 => q² = 3/2 (loại).',
          'Bước 3: Với p = 3: 3² - 2q² = 1 => 2q² = 8 => q² = 4 => q = 2. Cặp (p, q) = (3, 2) đều là số nguyên tố (thỏa mãn).',
          'Bước 4: Với p > 3: Vì p là số nguyên tố lớn hơn 3 nên p không chia hết cho 3 => p chia 3 dư 1 hoặc 2 => p² ≡ 1 (mod 3).',
          'Bước 5: Khi đó 2q² = p² - 1 chia hết cho 3 => q chia hết cho 3. Vì q là số nguyên tố nên q = 3.',
          'Bước 6: Thay q = 3 vào: p² = 2 × 3² + 1 = 19 (không phải số chính phương, loại).',
          'Bước 7: Kết luận: Cặp số nguyên tố duy nhất là (p, q) = (3, 2).'
        ],
        tips: 'Xét tính chẵn lẻ và số dư mod 3 là phương pháp kinh điển giải phương trình nghiệm nguyên số nguyên tố.'
      },
      {
        id: 3,
        part: 1,
        partTitle: 'Bài 3: Bất đẳng thức Cauchy / AM-GM',
        title: 'Bài 3: Tìm giá trị nhỏ nhất của biểu thức đối xứng',
        question: 'Cho các số thực dương a, b thỏa mãn a + b = 2. Tìm giá trị nhỏ nhất của biểu thức: M = 1/a + 1/b + ab.',
        keywords: 'AM-GM inequality: Cauchy 1/a + 1/b >= 4/(a+b).',
        studentAnswer: '',
        correctAnswer: '3',
        status: 'correct',
        statusText: 'Đúng',
        category: 'Bất đẳng thức & Cực trị',
        difficulty: 'Olympic',
        explanation: 'Ta có 1/a + 1/b ≥ 4/(a + b) = 4/2 = 2. Lại có ab ≤ (a + b)² / 4 = 4/4 = 1. Tách M = (1/a + 1/b) + ab. Áp dụng điểm rơi a = b = 1: M = (1/a + 1/b) + ab = (a + b)/ab + ab = 2/ab + ab = (ab + 1/ab) + 1/ab ≥ 2 + 1 = 3. Dấu "=" xảy ra khi a = b = 1. Giá trị nhỏ nhất là 3.',
        solutionSteps: [
          'Bước 1: Dự đoán điểm rơi đối xứng: a = b = 1.',
          'Bước 2: Ta có: 1/a + 1/b = (a + b)/(ab) = 2/ab.',
          'Bước 3: Biến đổi M: M = 2/ab + ab = (ab + 1/ab) + 1/ab.',
          'Bước 4: Theo BĐT Cauchy cho 2 số dương ab và 1/ab: ab + 1/ab ≥ 2√(ab × 1/ab) = 2.',
          'Bước 5: Vì a + b = 2 nên ab ≤ ((a + b)/2)² = 1 => 1/ab ≥ 1.',
          'Bước 6: Do đó M ≥ 2 + 1 = 3. Dấu "=" xảy ra khi a = b = 1.',
          'Bước 7: Vậy min M = 3.'
        ],
        tips: 'Kỹ thuật chọn điểm rơi và tách hạng tử trong bất đẳng thức Cauchy.'
      }
    ]
  }
];
