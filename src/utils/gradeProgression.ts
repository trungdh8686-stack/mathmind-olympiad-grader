/**
 * Logic tự động tịnh tiến khối lớp theo năm học Việt Nam:
 * - Năm học Việt Nam bắt đầu từ ngày 01/09 năm trước đến ngày 31/05 năm sau (tháng 6, 7, 8 là nghỉ hè, vẫn tính vào chuẩn bị năm học mới).
 * - Mốc xuất phát (Năm học 2025 – 2026):
 *   + Ruby: Lớp 3
 *   + Lisa: Lớp 6
 *   + Tony: Lớp 1
 *   + Chip: Lớp 10
 */

export interface SchoolYearInfo {
  schoolYearString: string; // e.g. "2025 – 2026"
  startYear: number;        // e.g. 2025
  isSummer: boolean;        // true nếu tháng 6, 7, 8
}

// Lấy thông tin năm học hiện tại theo thời gian thực
export function getCurrentSchoolYear(date: Date = new Date()): SchoolYearInfo {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1 to 12

  // Nếu từ tháng 9 đến tháng 12: thuộc năm học (year) – (year + 1)
  // Nếu từ tháng 1 đến tháng 5: thuộc năm học (year - 1) – (year)
  // Nếu tháng 6, 7, 8: giai đoạn hè chuyển giao lên năm học (year) – (year + 1)
  let startYear: number;
  let isSummer = false;

  if (month >= 9) {
    startYear = year;
  } else if (month >= 6 && month <= 8) {
    startYear = year;
    isSummer = true;
  } else {
    startYear = year - 1;
  }

  return {
    schoolYearString: `${startYear} – ${startYear + 1}`,
    startYear,
    isSummer
  };
}

// Tính số năm tịnh tiến so với năm mốc 2025
export function getProgressionOffset(baseStartYear: number = 2025, date: Date = new Date()): number {
  const current = getCurrentSchoolYear(date);
  return Math.max(0, current.startYear - baseStartYear);
}

// Tự động tính lớp và cấp học tương ứng
export function calculateProgressedGrade(
  baseGradeNumber: number, // e.g. Ruby=3, Lisa=6, Tony=1, Chip=10
  baseStartYear: number = 2025,
  date: Date = new Date()
): {
  gradeNumber: number;
  gradeText: string;
  level: 'primary' | 'secondary' | 'high_school' | 'graduated';
  levelText: string;
  schoolYear: string;
} {
  const offset = getProgressionOffset(baseStartYear, date);
  const gradeNumber = baseGradeNumber + offset;
  const currentSchoolYear = getCurrentSchoolYear(date).schoolYearString;

  if (gradeNumber <= 5) {
    return {
      gradeNumber,
      gradeText: `Lớp ${gradeNumber}`,
      level: 'primary',
      levelText: 'Tiểu học',
      schoolYear: currentSchoolYear
    };
  } else if (gradeNumber <= 9) {
    return {
      gradeNumber,
      gradeText: `Lớp ${gradeNumber}`,
      level: 'secondary',
      levelText: 'THCS',
      schoolYear: currentSchoolYear
    };
  } else if (gradeNumber <= 12) {
    return {
      gradeNumber,
      gradeText: `Lớp ${gradeNumber}`,
      level: 'high_school',
      levelText: 'THPT',
      schoolYear: currentSchoolYear
    };
  } else {
    return {
      gradeNumber,
      gradeText: 'Đã tốt nghiệp THPT',
      level: 'graduated',
      levelText: 'Đại học / Tốt nghiệp',
      schoolYear: currentSchoolYear
    };
  }
}
