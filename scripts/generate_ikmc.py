# -*- coding: utf-8 -*-
ikmc_questions = [
    # --- PART A: 3-point questions (Questions 1 – 8) ---
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

    # --- PART B: 4-point questions (Questions 9 – 16) ---
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

    # --- PART C: 5-point questions (Questions 17 – 24) ---
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

print(f"Total IKMC questions generated: {len(ikmc_questions)}")
