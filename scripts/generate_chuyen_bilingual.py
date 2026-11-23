# -*- coding: utf-8 -*-
chuyen_bilingual_questions = [
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

print(f"Total Chuyen bilingual questions generated: {len(chuyen_bilingual_questions)}")
