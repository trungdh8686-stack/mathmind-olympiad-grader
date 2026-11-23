export type UserRole = 'admin' | 'student';

export type EducationLevel = 'primary' | 'secondary' | 'high_school';

export interface MathProgram {
  id: string;
  name: string;
  level: EducationLevel;
  description: string;
  badge: string;
  isInternational?: boolean;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  fullName: string;
  nickname: string;
  role: UserRole;
  avatar: string;
  level: EducationLevel;
  currentGrade: string; // e.g. "Lớp 4", "Lớp 7", "Lớp 11"
  targetProgram: string; // e.g. "ASMO", "ITMC", "GDPT"
  bio?: string;
  createdAt: string;
}

export const EDUCATION_LEVELS: { id: EducationLevel; name: string; grades: string; icon: string }[] = [
  { id: 'primary', name: 'Tiểu học', grades: 'Lớp 1 – 5', icon: '🎒' },
  { id: 'secondary', name: 'THCS', grades: 'Lớp 6 – 9', icon: '📐' },
  { id: 'high_school', name: 'THPT', grades: 'Lớp 10 – 12', icon: '🔬' }
];

export const MATH_PROGRAMS: MathProgram[] = [
  // Olympic & Quốc tế
  { id: 'ASMO', name: 'ASMO', level: 'primary', description: 'Asian Science & Math Olympiad', badge: 'Olympic Châu Á', isInternational: true },
  { id: 'ITMC', name: 'ITMC', level: 'primary', description: 'Kỳ thi Toán Quốc tế ITMC (Thái Lan & Đông Nam Á)', badge: 'Quốc tế', isInternational: true },
  { id: 'GMATH', name: 'GMATH', level: 'primary', description: 'Toán Tiếng Anh GMATH tăng cường năng lực', badge: 'Toán Tiếng Anh', isInternational: true },
  { id: 'SASMO', name: 'SASMO', level: 'primary', description: 'Singapore and Asian Schools Math Olympiad', badge: 'Singapore Olympic', isInternational: true },
  { id: 'AMO', name: 'AMO', level: 'primary', description: 'Kỳ thi Toán học Hoa Kỳ (American Mathematics Olympiad)', badge: 'Mỹ - Quốc tế', isInternational: true },
  { id: 'IKMC', name: 'Kangaroo (IKMC)', level: 'primary', description: 'Kỳ thi Toán Quốc tế Kangaroo tư duy logic', badge: 'Kangaroo', isInternational: true },
  { id: 'TIMO', name: 'TIMO', level: 'primary', description: 'Kỳ thi Olympic Toán học Quốc tế Thái Lan', badge: 'Thái Lan Olympic', isInternational: true },
  { id: 'HKIMO', name: 'HKIMO', level: 'secondary', description: 'Olympic Toán Quốc tế Hồng Kông', badge: 'Quốc tế', isInternational: true },

  // Chương trình Việt Nam
  { id: 'GDPT_NEW', name: 'SGK Mới (Bộ GD&ĐT)', level: 'primary', description: 'Kết nối tri thức, Chân trời sáng tạo, Cánh Diều', badge: 'Chuẩn GD&ĐT' },
  { id: 'HSG_TIEUHOC', name: 'Toán Bồi Dưỡng & HSG Tiểu Học', level: 'primary', description: 'Toán nâng cao, các chuyên đề số học và hình học', badge: 'Nâng cao' },
  { id: 'CHUYEN_THCS', name: 'Bồi Dưỡng & Thi Chuyên THCS', level: 'secondary', description: 'Ôn thi vào lớp 10 Chuyên Toán & Olympic Cấp 2', badge: 'Chuyên Toán' },
  { id: 'GDPT_THCS', name: 'Toán THCS SGK Mới', level: 'secondary', description: 'Đại số & Hình học Lớp 6, 7, 8, 9', badge: 'Chuẩn GD&ĐT' },
  { id: 'THPT_QG', name: 'Toán THPT & Luyện Thi TN/ĐH', level: 'high_school', description: 'Hàm số, Oxyz, Tích phân, Lượng giác & Xác suất', badge: 'Luyện thi ĐH' },
  { id: 'CHUYEN_THPT', name: 'Chuyên Toán THPT & VMO', level: 'high_school', description: 'Bồi dưỡng Học sinh giỏi Quốc gia & Chuyên sâu', badge: 'VMO / Chuyên' }
];

export const PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=Ruby&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Lisa&backgroundColor=d1e7dd',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Tony&backgroundColor=cfe2ff',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Chip&backgroundColor=fff3cd',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Admin&backgroundColor=e2e3e5',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Ruby&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Lisa&backgroundColor=d1e7dd',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Tony&backgroundColor=cfe2ff',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Chip&backgroundColor=fff3cd',
  'https://api.dicebear.com/7.x/micah/svg?seed=MathGenius&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/micah/svg?seed=SuperHero&backgroundColor=cfe2ff'
];
