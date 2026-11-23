import React, { useState, useRef, useEffect } from 'react';
import { User as UserIcon, Camera, Lock, GraduationCap, ShieldCheck, LogOut, ChevronDown, Users, Sparkles } from 'lucide-react';
import { User } from '../types/auth';

interface UserMenuProps {
  user: User;
  onOpenProfile: (tab?: 'avatar' | 'password' | 'study') => void;
  onOpenAdmin: () => void;
  onSwitchAccount: () => void;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  onOpenProfile,
  onOpenAdmin,
  onSwitchAccount,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all shadow-xs"
        title="Menu tài khoản"
      >
        <img
          src={user.avatar}
          alt={user.nickname}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 object-cover border border-slate-200"
        />
        <div className="hidden sm:block text-left">
          <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
            <span>{user.nickname}</span>
            {user.role === 'admin' && (
              <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1 py-0.2 rounded font-extrabold">ADMIN</span>
            )}
          </div>
          <div className="text-[10px] text-slate-500 truncate max-w-[100px] leading-tight">
            {user.role === 'admin' ? 'Quản trị viên' : user.targetProgram}
          </div>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
          {/* User info banner */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.nickname}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{user.fullName}</div>
              <div className="text-[11px] text-slate-500">@{user.username}</div>
              <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">
                {user.role === 'admin' ? '👑 Quản trị viên tối cao' : `🎯 ${user.currentGrade} • ${user.targetProgram}`}
              </div>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenProfile('avatar');
              }}
              className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
            >
              <Camera className="w-4 h-4 text-slate-400" />
              <span>Đổi ảnh đại diện (Avatar)</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenProfile('password');
              }}
              className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
            >
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Đổi mật khẩu tài khoản</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenProfile('study');
              }}
              className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>Cấp học & Chương trình thi</span>
            </button>

            {user.role === 'admin' && (
              <>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full px-4 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-50 flex items-center gap-2.5 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Quản trị người dùng & Phân quyền</span>
                </button>
              </>
            )}

            <div className="border-t border-slate-100 my-1"></div>

            <button
              onClick={() => {
                setIsOpen(false);
                onSwitchAccount();
              }}
              className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Chuyển đổi tài khoản khác</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
