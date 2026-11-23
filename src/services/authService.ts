import { User, EducationLevel } from '../types/auth';

const STORAGE_USERS_KEY = 'mathmind_users_v2';
const STORAGE_CURRENT_USER_KEY = 'mathmind_active_user_v2';
const STORAGE_REMEMBER_KEY = 'mathmind_remember_me_v2';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_admin',
    username: 'admin',
    password: 'admin',
    fullName: 'Sếp Quản Trị Viên',
    nickname: 'Admin',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin&backgroundColor=e2e3e5',
    level: 'primary',
    currentGrade: 'Toàn hệ thống',
    targetProgram: 'Quản trị viên',
    bio: 'Quyền cao nhất: Phân quyền, quản lý tài khoản con, cấu hình chương trình học.',
    createdAt: '2026-01-01'
  },
  {
    id: 'user_ruby',
    username: 'Ruby',
    password: '1',
    fullName: 'Ruby Đoàn Minh Châu',
    nickname: 'Ruby',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ruby&backgroundColor=ffd5dc',
    level: 'primary',
    currentGrade: 'Lớp 4 - Tiểu học',
    targetProgram: 'ASMO',
    bio: 'Chiến binh Olympic Toán – Say mê tư duy logic và các kỳ thi quốc tế!',
    createdAt: '2026-01-02'
  },
  {
    id: 'user_lisa',
    username: 'Lisa',
    password: '1',
    fullName: 'Lisa Đoàn Hồng Anh',
    nickname: 'Lisa',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lisa&backgroundColor=d1e7dd',
    level: 'secondary',
    currentGrade: 'Lớp 7 - THCS',
    targetProgram: 'ITMC',
    bio: 'Tự tin chinh phục Toán THCS & Olympic Quốc tế ITMC / SASMO!',
    createdAt: '2026-01-02'
  },
  {
    id: 'user_tony',
    username: 'Tony',
    password: '1',
    fullName: 'Tony Đoàn Nhật Minh',
    nickname: 'Tony',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Tony&backgroundColor=cfe2ff',
    level: 'primary',
    currentGrade: 'Lớp 2 - Tiểu học',
    targetProgram: 'GMATH',
    bio: 'Toán Tiếng Anh GMATH & Siêu nhí giải đố tư duy!',
    createdAt: '2026-01-03'
  },
  {
    id: 'user_chip',
    username: 'Chip',
    password: '1',
    fullName: 'Chip Đoàn Quỳnh Chi',
    nickname: 'Chip',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Chip&backgroundColor=fff3cd',
    level: 'primary',
    currentGrade: 'Tiểu học',
    targetProgram: 'IKMC',
    bio: 'Bé cưng chăm ngoan, hào hứng khám phá các bài toán vui sắc màu!',
    createdAt: '2026-01-03'
  }
];

export const authService = {
  getUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 4) {
        return parsed;
      }
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
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
      return found || active;
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
