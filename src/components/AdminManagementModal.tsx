import React, { useState } from 'react';
import { X, ShieldCheck, UserPlus, KeyRound, Trash2, Edit3, Check, User as UserIcon, AlertCircle } from 'lucide-react';
import { User, UserRole, EducationLevel, PRESET_AVATARS } from '../types/auth';
import { authService } from '../services/authService';

interface AdminManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUsersChanged: () => void;
}

export const AdminManagementModal: React.FC<AdminManagementModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUsersChanged
}) => {
  const [users, setUsers] = useState<User[]>(() => authService.getUsers());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New user form state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('1');
  const [newFullName, setNewFullName] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('student');
  const [newLevel, setNewLevel] = useState<EducationLevel>('primary');
  const [newGrade, setNewGrade] = useState('Lớp 1');
  const [newProgram, setNewProgram] = useState('ASMO');

  // Reset password state
  const [resetPassModalUser, setResetPassModalUser] = useState<User | null>(null);
  const [resetPassInput, setResetPassInput] = useState('1');

  if (!isOpen) return null;

  const refreshList = () => {
    setUsers(authService.getUsers());
    onUsersChanged();
  };

  const showNotify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newFullName.trim()) {
      showNotify('error', 'Vui lòng điền đầy đủ Tên đăng nhập và Họ tên.');
      return;
    }

    const randomAvt = PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)];

    const res = authService.adminCreateUser({
      username: newUsername.trim(),
      password: newPassword,
      fullName: newFullName.trim(),
      nickname: newNickname.trim() || newUsername.trim(),
      role: newRole,
      avatar: randomAvt,
      level: newLevel,
      currentGrade: newGrade,
      targetProgram: newProgram
    });

    if (res.success) {
      showNotify('success', `Đã thêm tài khoản "${newFullName}" thành công!`);
      setIsAddingUser(false);
      setNewUsername('');
      setNewFullName('');
      setNewNickname('');
      refreshList();
    } else {
      showNotify('error', res.message);
    }
  };

  const handleDeleteUser = (u: User) => {
    if (confirm(`Sếp có chắc chắn muốn xóa tài khoản "${u.fullName}" không?`)) {
      const res = authService.adminDeleteUser(u.id);
      if (res.success) {
        showNotify('success', res.message);
        refreshList();
      } else {
        showNotify('error', res.message);
      }
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPassModalUser) return;

    authService.adminResetPassword(resetPassModalUser.id, resetPassInput);
    showNotify('success', `Đã đặt lại mật khẩu cho ${resetPassModalUser.nickname} thành "${resetPassInput}"`);
    setResetPassModalUser(null);
    refreshList();
  };

  const handleToggleRole = (u: User) => {
    if (u.id === 'user_admin') {
      showNotify('error', 'Không thể đổi quyền tài khoản Admin gốc.');
      return;
    }
    const targetRole: UserRole = u.role === 'admin' ? 'student' : 'admin';
    authService.adminUpdateUser(u.id, { role: targetRole });
    showNotify('success', `Đã đổi quyền của ${u.nickname} sang "${targetRole === 'admin' ? 'Quản trị viên' : 'Học sinh'}"`);
    refreshList();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">Trung Tâm Quản Trị Hệ Thống</h2>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
                  Dành riêng cho Sếp
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Quản lý các tài khoản của con, đặt lại mật khẩu, phân quyền và cấu hình lộ trình học.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar & Notifications */}
        <div className="p-6 sm:p-8">
          {notification && (
            <div className={`p-4 mb-5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in ${
              notification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {notification.type === 'success' ? <Check className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
              <span>{notification.message}</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Danh sách tài khoản ({users.length})</h3>
              <p className="text-xs text-slate-500">Mỗi tài khoản có không gian và kết quả chấm điểm cá nhân riêng</p>
            </div>

            <button
              onClick={() => setIsAddingUser(!isAddingUser)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isAddingUser ? 'Đóng form tạo' : 'Thêm tài khoản mới'}</span>
            </button>
          </div>

          {/* Form Create New User */}
          {isAddingUser && (
            <form onSubmit={handleCreateUser} className="mb-6 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 animate-in fade-in space-y-4">
              <div className="font-bold text-sm text-indigo-950 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-indigo-600" />
                <span>Thêm tài khoản thành viên mới</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên đăng nhập (Username)</label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="VD: Ken, Moon..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu ban đầu</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mặc định: 1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phân quyền</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="student">Học sinh (Con)</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên đầy đủ</label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="VD: Đoàn Minh Ken"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên thân mật (Nickname)</label>
                  <input
                    type="text"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    placeholder="VD: Ken"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cấp học</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as EducationLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  >
                    <option value="primary">Tiểu học (Lớp 1-5)</option>
                    <option value="secondary">THCS (Lớp 6-9)</option>
                    <option value="high_school">THPT (Lớp 10-12)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lớp hiện tại</label>
                  <input
                    type="text"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    placeholder="Lớp 3"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kỳ thi / Chương trình</label>
                  <input
                    type="text"
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    placeholder="ASMO, ITMC, GDPT..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Tạo Tài Khoản
                </button>
              </div>
            </form>
          )}

          {/* Users Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Thành viên</th>
                    <th className="py-3 px-4">Tên đăng nhập</th>
                    <th className="py-3 px-4">Mật khẩu</th>
                    <th className="py-3 px-4">Phân quyền</th>
                    <th className="py-3 px-4">Quyền truy cập cấp học</th>
                    <th className="py-3 px-4">Lớp thực tế</th>
                    <th className="py-3 px-4 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img src={u.avatar} alt={u.nickname} className="w-9 h-9 rounded-xl bg-slate-100 p-0.5 border border-slate-200" />
                          <div>
                            <div className="font-bold text-slate-900 text-xs sm:text-sm">{u.fullName}</div>
                            <div className="text-[11px] text-slate-500">Tên gọi: {u.nickname}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                        {u.username}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold">
                          {u.password || '•••'}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleRole(u)}
                          title="Bấm để chuyển đổi quyền"
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                            u.role === 'admin'
                              ? 'bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200'
                          }`}
                        >
                          {u.role === 'admin' ? 'Quản trị viên (Admin)' : 'Học sinh'}
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ✓ Mọi cấp học (Lớp 1 – 12)
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">Tiểu học • THCS • THPT & Olympic</div>
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-extrabold text-slate-900 text-xs sm:text-sm">{u.currentGrade}</div>
                        <div className="text-[10px] text-blue-600 font-medium">Tự do đổi cấp học bất kỳ lúc nào</div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setResetPassModalUser(u);
                              setResetPassInput('1');
                            }}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Đặt lại mật khẩu"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>

                          {u.id !== 'user_admin' && (
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Xóa tài khoản"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Reset Password */}
        {resetPassModalUser && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-slate-200 animate-in fade-in">
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                Đặt lại mật khẩu cho {resetPassModalUser.fullName}
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Nhập mật khẩu mới cho tài khoản @{resetPassModalUser.username}
              </p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <input
                  type="text"
                  required
                  value={resetPassInput}
                  onChange={(e) => setResetPassInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-indigo-500"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setResetPassModalUser(null)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
