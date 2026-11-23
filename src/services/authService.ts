import { User, EducationLevel } from '../types/auth';
import { RUBY_AVATAR, LISA_AVATAR, CHIP_AVATAR, TONY_AVATAR, ADMIN_AVATAR } from '../utils/avatarSVGs';
import { calculateProgressedGrade } from '../utils/gradeProgression';

const STORAGE_USERS_KEY = 'mathmind_users_v6';
const STORAGE_CURRENT_USER_KEY = 'mathmind_active_user_v6';
const STORAGE_REMEMBER_KEY = 'mathmind_remember_me_v6';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_admin',
    username: 'admin',
    password: 'admin',
    fullName: 'Sếp Quản Trị Viên',
    nickname: 'Admin',
    role: 'admin',
    avatar: ADMIN_AVATAR,
    level: 'all',
    currentGrade: 'Toàn hệ thống',
    targetProgram: 'Quản trị viên • Toàn cấp học',
    bio: 'Quyền cao nhất: Phân quyền, quản lý tài khoản con, mở quyền toàn bộ các cấp học.',
    createdAt: '2026-01-01'
  },
  {
    id: 'user_ruby',
    username: 'Ruby',
    password: '1',
    fullName: 'Ruby Đoàn Minh Châu',
    nickname: 'Ruby',
    role: 'student',
    avatar: RUBY_AVATAR,
    level: 'all',
    baseGradeNumber: 3,
    currentGrade: calculateProgressedGrade(3).gradeText,
    targetProgram: 'Đa cấp học (Tiểu học • THCS • THPT)',
    bio: 'Bé gái tóc đuôi gà – Tự động tịnh tiến cấp học & mở toàn bộ các kỳ thi Olympic!',
    createdAt: '2026-01-02'
  },
  {
    id: 'user_lisa',
    username: 'Lisa',
    password: '1',
    fullName: 'Lisa Đoàn Hồng Anh',
    nickname: 'Lisa',
    role: 'student',
    avatar: LISA_AVATAR,
    level: 'all',
    baseGradeNumber: 6,
    currentGrade: calculateProgressedGrade(6).gradeText,
    targetProgram: 'Đa cấp học (Tiểu học • THCS • THPT)',
    bio: 'Bé gái buộc tóc gọn gàng – Tự động tịnh tiến cấp học & mở toàn bộ các kỳ thi Olympic!',
    createdAt: '2026-01-02'
  },
  {
    id: 'user_tony',
    username: 'Tony',
    password: '1',
    fullName: 'Tony Đoàn Nhật Minh',
    nickname: 'Tony',
    role: 'student',
    avatar: TONY_AVATAR,
    level: 'all',
    baseGradeNumber: 1,
    currentGrade: calculateProgressedGrade(1).gradeText,
    targetProgram: 'Đa cấp học (Tiểu học • THCS • THPT)',
    bio: 'Bé trai tóc ngắn lanh lợi – Tự động tịnh tiến cấp học & Toán Tiếng Anh!',
    createdAt: '2026-01-03'
  },
  {
    id: 'user_chip',
    username: 'Chip',
    password: '1',
    fullName: 'Chip Đoàn Quỳnh Chi',
    nickname: 'Chip',
    role: 'student',
    avatar: CHIP_AVATAR,
    level: 'all',
    baseGradeNumber: 10,
    currentGrade: calculateProgressedGrade(10).gradeText,
    targetProgram: 'Đa cấp học (Tiểu học • THCS • THPT)',
    bio: 'Bé gái thả tóc dài dịu dàng – Tự động tịnh tiến cấp học & Chuyên Toán Olympic!',
    createdAt: '2026-01-03'
  }
];

// Helper to ensure dynamic grade progression is applied
function enrichUserWithDynamicGrade(user: User): User {
  if (user.baseGradeNumber) {
    const progression = calculateProgressedGrade(user.baseGradeNumber);
    return {
      ...user,
      currentGrade: progression.gradeText
    };
  }
  return user;
}

export const authService = {
  getUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    let users = INITIAL_USERS;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= 4) {
          users = parsed;
        }
      } catch {
        // fallback
      }
    }
    // Dynamically update progression for all users
    return users.map(enrichUserWithDynamicGrade);
  },

  saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    try {
      const active = JSON.parse(raw);
      // Fresh sync with all users database
      const users = this.getUsers();
      const found = users.find(u => u.id === active.id || u.username.toLowerCase() === active.username.toLowerCase());
      return enrichUserWithDynamicGrade(found || active);
    } catch {
      return null;
    }
  },

  isRemembered(): boolean {
    return localStorage.getItem(STORAGE_REMEMBER_KEY) === 'true';
  },

  login(username: string, password: string, remember: boolean = true): { success: boolean; user?: User; message?: string } {
    const users = this.getUsers();
    const cleanUser = username.trim().toLowerCase();
    const found = users.find(u => u.username.toLowerCase() === cleanUser);

    if (!found) {
      return { success: false, message: 'Tên đăng nhập không tồn tại trên hệ thống.' };
    }

    if (found.password !== password) {
      return { success: false, message: 'Mật khẩu chưa chính xác. Vui lòng kiểm tra lại!' };
    }

    // Save active user
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(found));
    localStorage.setItem(STORAGE_REMEMBER_KEY, remember ? 'true' : 'false');

    return { success: true, user: found };
  },

  logout(): void {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    localStorage.removeItem(STORAGE_REMEMBER_KEY);
  },

  updateAvatar(userId: string, newAvatar: string): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    users[idx].avatar = newAvatar;
    this.saveUsers(users);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.avatar = newAvatar;
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
    }
    return true;
  },

  changePassword(userId: string, oldPass: string, newPass: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return { success: false, message: 'Không tìm thấy tài khoản.' };

    if (users[idx].password !== oldPass) {
      return { success: false, message: 'Mật khẩu hiện tại không đúng.' };
    }

    if (!newPass || newPass.trim().length === 0) {
      return { success: false, message: 'Mật khẩu mới không được để trống.' };
    }

    users[idx].password = newPass;
    this.saveUsers(users);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.password = newPass;
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
    }

    return { success: true, message: 'Đổi mật khẩu thành công!' };
  },

  updateCurriculum(userId: string, level: EducationLevel, program: string, grade?: string): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    users[idx].level = level;
    users[idx].targetProgram = program;
    if (grade) users[idx].currentGrade = grade;

    this.saveUsers(users);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.level = level;
      currentUser.targetProgram = program;
      if (grade) currentUser.currentGrade = grade;
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
    }
    return true;
  },

  adminResetPassword(userId: string, newPass: string): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    users[idx].password = newPass;
    this.saveUsers(users);
    return true;
  },

  adminUpdateUser(userId: string, updateData: Partial<User>): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;

    users[idx] = { ...users[idx], ...updateData };
    this.saveUsers(users);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(users[idx]));
    }
    return true;
  },

  adminCreateUser(newUser: Omit<User, 'id' | 'createdAt'>): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    if (users.some(u => u.username.toLowerCase() === newUser.username.trim().toLowerCase())) {
      return { success: false, message: 'Tên đăng nhập này đã được sử dụng.' };
    }

    const created: User = {
      ...newUser,
      id: 'user_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(created);
    this.saveUsers(users);
    return { success: true, message: 'Tạo tài khoản thành công!', user: created };
  },

  adminDeleteUser(userId: string): { success: boolean; message: string } {
    if (userId === 'user_admin') {
      return { success: false, message: 'Không thể xóa tài khoản Quản trị viên gốc.' };
    }

    let users = this.getUsers();
    users = users.filter(u => u.id !== userId);
    this.saveUsers(users);
    return { success: true, message: 'Đã xóa người dùng thành công.' };
  }
};
