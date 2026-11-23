import React, { useState } from 'react';
import { X, User as UserIcon, Lock, Camera, Check, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import { User, PRESET_AVATARS, EDUCATION_LEVELS, MATH_PROGRAMS } from '../types/auth';
import { authService } from '../services/authService';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUserUpdated: (updatedUser: User) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'avatar' | 'password' | 'study'>('avatar');
  
  // Avatar state
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [avatarSuccess, setAvatarSuccess] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  // Study / Curriculum state
  const [fullName, setFullName] = useState(user.fullName);
  const [nickname, setNickname] = useState(user.nickname);
  const [level, setLevel] = useState(user.level);
  const [currentGrade, setCurrentGrade] = useState(user.currentGrade);
  const [targetProgram, setTargetProgram] = useState(user.targetProgram);
  const [studySuccess, setStudySuccess] = useState(false);

  if (!isOpen) return null;

  // Handle local image file upload for avatar
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    authService.updateAvatar(user.id, selectedAvatar);
    const updated = { ...user, avatar: selectedAvatar };
    onUserUpdated(updated);
    setAvatarSuccess(true);
    setTimeout(() => setAvatarSuccess(false), 2000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (newPassword !== confirmPassword) {
      setPassError('Mật khẩu mới và xác nhận mật khẩu không khớp nhau.');
      return;
    }

    if (newPassword.length < 1) {
      setPassError('Vui lòng nhập mật khẩu mới.');
      return;
    }

    const res = authService.changePassword(user.id, oldPassword, newPassword);
    if (res.success) {
      setPassSuccess('Đổi mật khẩu thành công!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      const updated = { ...user, password: newPassword };
      onUserUpdated(updated);
    } else {
      setPassError(res.message);
    }
  };

  const handleSaveStudy = (e: React.FormEvent) => {
    e.preventDefault();
    authService.adminUpdateUser(user.id, {
      fullName,
      nickname,
      level,
      currentGrade,
      targetProgram
    });
    const updated = { ...user, fullName, nickname, level, currentGrade, targetProgram };
    onUserUpdated(updated);
    setStudySuccess(true);
    setTimeout(() => setStudySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="bg-slate-900 p-6 sm:p-7 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.nickname}
              className="w-13 h-13 rounded-2xl bg-white/10 p-1 border border-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{user.fullName}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-blue-500/30 text-blue-300 border border-blue-400/30">
                  @{user.username}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {user.role === 'admin' ? 'Tài khoản Quản trị viên' : `Học sinh • ${user.currentGrade} • ${user.targetProgram}`}
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('avatar')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'avatar'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Đổi Avatar</span>
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'password'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Đổi Mật Khẩu</span>
          </button>

          <button
            onClick={() => setActiveTab('study')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'study'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Cấp Học & Chương Trình</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: AVATAR */}
          {activeTab === 'avatar' && (
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={selectedAvatar}
                    alt="Preview"
                    className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-blue-500 shadow-md p-1"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow-xs">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Ảnh đại diện hiện tại</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Chọn từ bộ sưu tập dễ thương bên dưới hoặc tải ảnh từ máy tính/điện thoại lên.
                  </p>

                  <label className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl cursor-pointer border border-blue-200 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Tải ảnh từ máy lên</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Hoặc chọn avatar có sẵn:
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {PRESET_AVATARS.map((avt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(avt)}
                      className={`p-1.5 rounded-2xl border transition-all hover:scale-105 ${
                        selectedAvatar === avt
                          ? 'border-blue-500 ring-2 ring-blue-300 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <img src={avt} alt={`preset ${idx}`} className="w-full h-auto rounded-xl" />
                    </button>
                  ))}
                </div>
              </div>

              {avatarSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã cập nhật ảnh đại diện thành công!</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleSaveAvatar}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-sm transition-all shadow-sm"
              >
                Lưu Ảnh Đại Diện Mới
              </button>
            </div>
          )}

          {/* TAB 2: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              {passError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
                  ⚠️ {passError}
                </div>
              )}
              {passSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{passSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Nhập mật khẩu cũ (mặc định: 1 hoặc admin)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-sm transition-all shadow-sm"
              >
                Cập Nhật Mật Khẩu
              </button>
            </form>
          )}

          {/* TAB 3: STUDY LEVEL & CURRICULUM */}
          {activeTab === 'study' && (
            <form onSubmit={handleSaveStudy} className="space-y-4">
              {studySuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã lưu cấp học & chương trình thành công!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Họ và tên đầy đủ
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tên gọi ở nhà (Nickname)
                  </label>
                  <input
                    type="text"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Education Level Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Cấp học quan tâm (Tự do chọn học mọi cấp 1 – 12)
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Không giới hạn cấp học
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EDUCATION_LEVELS.map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setLevel(lvl.id)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        level === lvl.id
                          ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 text-blue-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div className="text-xl mb-1">{lvl.icon}</div>
                      <div className="text-xs font-bold">{lvl.name}</div>
                      <div className="text-[10px] text-slate-500">{lvl.grades}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Grade & Target Program */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Lớp đang theo học
                  </label>
                  <input
                    type="text"
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(e.target.value)}
                    placeholder="VD: Lớp 4, Lớp 7, Lớp 11..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Chương trình / Kỳ thi mục tiêu
                  </label>
                  <select
                    value={targetProgram}
                    onChange={(e) => setTargetProgram(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <optgroup label="Kỳ thi Quốc tế & Olympic">
                      <option value="ASMO">ASMO (Asian Science & Math Olympiad)</option>
                      <option value="ITMC">ITMC (Đông Nam Á / Thái Lan)</option>
                      <option value="GMATH">GMATH (Toán Tiếng Anh Năng Khiếu)</option>
                      <option value="SASMO">SASMO (Singapore & Asian Schools)</option>
                      <option value="AMO">AMO (Toán Quốc tế Hoa Kỳ)</option>
                      <option value="IKMC">Kangaroo (IKMC)</option>
                      <option value="TIMO">TIMO (Olympic Thái Lan)</option>
                      <option value="HKIMO">HKIMO (Olympic Hồng Kông)</option>
                    </optgroup>
                    <optgroup label="Chương trình GDPT Việt Nam">
                      <option value="GDPT_NEW">SGK Mới (Kết nối, Chân trời, Cánh Diều)</option>
                      <option value="HSG_TIEUHOC">Bồi Dưỡng & Học Sinh Giỏi Tiểu Học</option>
                      <option value="CHUYEN_THCS">Bồi Dưỡng & Thi Chuyên Toán Cấp 2</option>
                      <option value="GDPT_THCS">Toán THCS Cơ bản & Nâng cao</option>
                      <option value="THPT_QG">Toán THPT & Ôn Thi Đại Học</option>
                      <option value="CHUYEN_THPT">Chuyên Toán THPT & VMO</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-sm transition-all shadow-sm"
              >
                Lưu Thay Đổi Cấp Học & Chương Trình
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
