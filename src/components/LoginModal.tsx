import React, { useState } from 'react';
import { Sparkles, Lock, User as UserIcon, CheckCircle2, ShieldCheck, Heart, Eye, EyeOff } from 'lucide-react';
import { authService, INITIAL_USERS } from '../services/authService';
import { User } from '../types/auth';

interface LoginModalProps {
  isOpen: boolean;
  onLoginSuccess: (user: User) => void;
  onClose?: () => void;
  canClose?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onLoginSuccess,
  onClose,
  canClose = false
}) => {
  const [username, setUsername] = useState('Ruby');
  const [password, setPassword] = useState('1');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = authService.login(username, password, rememberMe);
      setIsLoading(false);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.message || 'Đăng nhập thất bại.');
      }
    }, 250);
  };

  const handleQuickSelect = (u: User) => {
    setUsername(u.username);
    setPassword(u.password || '1');
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = authService.login(u.username, u.password || '1', rememberMe);
      setIsLoading(false);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Top Header Decor */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white text-center relative">
          {canClose && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          )}

          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg mb-3">
            <Sparkles className="w-9 h-9" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            MathMind AI
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-sm mx-auto font-medium">
            Nền tảng Chấm điểm AI & Học Toán Thông Minh Đa Cấp
          </p>

          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-xs border border-white/20 text-white">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>Dành cho Ruby, Lisa, Tony, Chip & Gia Đình</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {/* Quick Account Switcher */}
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
              <span>Đăng nhập nhanh cho các con:</span>
              <span className="text-[11px] text-blue-600 font-medium lowercase">bấm để vào ngay</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INITIAL_USERS.filter(u => u.role === 'student').map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickSelect(u)}
                  className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 hover:shadow-md hover:scale-[1.02] ${
                    username.toLowerCase() === u.username.toLowerCase()
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-white'
                  }`}
                >
                  <img src={u.avatar} alt={u.nickname} className="w-10 h-10 rounded-xl bg-white shadow-xs" />
                  <div className="text-xs font-bold text-slate-800">{u.nickname}</div>
                  <div className="text-[10px] text-slate-500 truncate w-full">{u.currentGrade}</div>
                </button>
              ))}
            </div>

            {/* Quick admin button */}
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => handleQuickSelect(INITIAL_USERS[0])}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Hoặc đăng nhập Admin (Sếp)</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="shrink-0 mx-3 text-xs text-slate-400 font-medium">Hoặc nhập tài khoản</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tên đăng nhập (Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin, Ruby, Lisa, Tony, Chip..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mật khẩu (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 transition-colors"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Ghi nhớ đăng nhập trên thiết bị này
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-bold rounded-xl shadow-md shadow-blue-500/20 text-sm transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đăng Nhập Ngay</span>
                </>
              )}
            </button>
          </form>

          {/* Account credentials cheat-sheet note for convenience */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Thông tin tài khoản mặc định:</span>
            <div className="grid grid-cols-2 gap-1 mt-1 font-mono text-[10px]">
              <div>• <b>admin</b>: pass <code className="bg-slate-200 px-1 rounded">admin</code></div>
              <div>• <b>Ruby</b>: pass <code className="bg-slate-200 px-1 rounded">1</code></div>
              <div>• <b>Lisa</b>: pass <code className="bg-slate-200 px-1 rounded">1</code></div>
              <div>• <b>Tony</b>: pass <code className="bg-slate-200 px-1 rounded">1</code></div>
              <div>• <b>Chip</b>: pass <code className="bg-slate-200 px-1 rounded">1</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
