# -*- coding: utf-8 -*-
import json
import os

itmc_questions = [
    # --- PART 1 (Questions 1 - 12: 4 points each) ---
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

    # --- PART 2 (Questions 13 - 24: 6 points each) ---
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

    # --- PART 3 (Questions 25 - 29: 7 points each) ---
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

    # --- BONUS QUESTION (Question 30: 20 points) ---
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

print(f"Total ITMC questions generated: {len(itmc_questions)}")
