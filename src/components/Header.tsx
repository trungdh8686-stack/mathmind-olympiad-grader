import React from 'react';
import { Download, Camera, Printer, Settings, Sparkles, Heart, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { TestSummary } from '../data/mockData';
import { User } from '../types/auth';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  summary: TestSummary;
  currentUser: User;
  onOpenUpload: () => void;
  onOpenSolver: () => void;
  onExportDocx: () => void;
  onOpenSettings: () => void;
  onOpenImageViewer: () => void;
  onPrint: () => void;
  onOpenProfile: (tab?: 'avatar' | 'password' | 'study') => void;
  onOpenAdmin: () => void;
  onSwitchAccount: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  summary,
  currentUser,
  onOpenUpload,
  onOpenSolver,
  onExportDocx,
  onOpenSettings,
  onOpenImageViewer,
  onPrint,
  onOpenProfile,
  onOpenAdmin,
  onSwitchAccount,
  onLogout
}) => {
  const isStudent = currentUser.role === 'student';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* ROW 1: Brand & User Profile Bar */}
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Brand Logo & General Platform Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-base sm:text-xl font-black tracking-tight text-slate-900">
                  MathMind <span className="text-blue-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                  Học Toán Đa Cấp
                </span>

                {isStudent ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 whitespace-nowrap shadow-xs truncate max-w-[150px] sm:max-w-none">
                    <Heart className="w-3 h-3 fill-pink-500 text-pink-500 shrink-0" />
                    <span className="truncate">{currentUser.nickname || currentUser.fullName}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 whitespace-nowrap shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Admin</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 truncate hidden md:block mt-0.5 font-medium">
                Chấm điểm AI & Hướng dẫn giải chuẩn Việt Nam (Tiểu học, THCS, THPT) & Quốc tế (ASMO, ITMC, GMATH, Olympic)
              </p>
            </div>
          </div>

          {/* Right Controls: Desktop full buttons, Mobile compact Avatar & Settings */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Action buttons (Hidden on Mobile, shown on lg screens) */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* View Original Photos */}
              <button
                onClick={onOpenImageViewer}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                title="Xem lại các trang ảnh bài làm gốc của con"
              >
                <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                <span>Ảnh bài làm ({summary.sourceImagesCount})</span>
              </button>

              {/* Print */}
              <button
                onClick={onPrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                title="In bảng điểm hoặc lưu PDF"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>In kết quả</span>
              </button>

              {/* Export Docx */}
              <button
                onClick={onExportDocx}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-blue-600/20 whitespace-nowrap cursor-pointer"
                title="Tải xuống file Word chuẩn định dạng gốc"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Tải file Word</span>
              </button>

              {/* Upload New Test */}
              <button
                onClick={onOpenUpload}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap cursor-pointer"
                title="Chụp hoặc tải ảnh phiếu bài tập đã làm để AI chấm điểm"
              >
                <Camera className="w-4 h-4 shrink-0" />
                <span>Chấm bài mới</span>
              </button>

              {/* AI Math Solver */}
              <button
                onClick={onOpenSolver}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 active:scale-95 rounded-xl transition-all shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer ring-1 ring-amber-500/30"
                title="Chụp ảnh bất kỳ đề bài toán nào để AI giải chi tiết từng bước & chỉ mẹo Olympic"
              >
                <Sparkles className="w-4 h-4 text-amber-950 shrink-0 fill-amber-950" />
                <span>Giải bài toán AI</span>
              </button>
            </div>

            {/* User Account Menu with Avatar */}
            <UserMenu
              user={currentUser}
              onOpenProfile={onOpenProfile}
              onOpenAdmin={onOpenAdmin}
              onSwitchAccount={onSwitchAccount}
              onLogout={onLogout}
            />

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0 cursor-pointer"
              title="Cấu hình hệ thống & API Key"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ROW 2: Mobile/Tablet Quick Action Pill Strip (Visible on mobile/tablet, hidden on desktop) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none -mx-3 px-3">
          {/* AI Math Solver Pill */}
          <button
            onClick={onOpenSolver}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 active:scale-95 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Giải bài toán AI</span>
          </button>

          {/* Grade Test Pill */}
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Chấm bài mới</span>
          </button>

          {/* Download Word Docx Pill */}
          <button
            onClick={onExportDocx}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file Word</span>
          </button>

          {/* View Original Photos Pill */}
          <button
            onClick={onOpenImageViewer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Ảnh bài làm ({summary.sourceImagesCount})</span>
          </button>
        </div>

      </div>
    </header>
  );
};
