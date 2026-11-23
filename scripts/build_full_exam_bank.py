# -*- coding: utf-8 -*-
import json
import os
import sys

# Add scripts directory to path
sys.path.append(os.path.dirname(__file__))

from generate_itmc import itmc_questions
from generate_gmath import gmath_questions
from generate_ikmc import ikmc_questions
from generate_asmo_bilingual import asmo_bilingual_questions
from generate_chuyen_bilingual import chuyen_bilingual_questions

def to_ts_object(obj, indent=2):
    return json.dumps(obj, ensure_ascii=False, indent=indent)

def build_exam_bank():
    print(f"Building Exam Bank:")
    print(f"- ASMO (Ruby, Grade 3): {len(asmo_bilingual_questions)} questions")
    print(f"- IKMC (Grade 3-4): {len(ikmc_questions)} questions")
    print(f"- ITMC (Lisa, Grade 6): {len(itmc_questions)} questions")
    print(f"- GMATH (Tony, Grade 1): {len(gmath_questions)} questions")
    print(f"- CHUYEN_THPT (Chip, Grade 10): {len(chuyen_bilingual_questions)} questions")

    ts_content = """import { EducationLevel } from '../types/auth';
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
    questions: """ + to_ts_object(asmo_bilingual_questions, 6) + """
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
    questions: """ + to_ts_object(ikmc_questions, 6) + """
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
    questions: """ + to_ts_object(itmc_questions, 6) + """
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
    questions: """ + to_ts_object(gmath_questions, 6) + """
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
    questions: """ + to_ts_object(chuyen_bilingual_questions, 6) + """
  }
];
"""
    target_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/data/examBank.ts'))
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print(f"Successfully wrote {len(ts_content)} characters to {target_path}!")

if __name__ == '__main__':
    build_exam_bank()
