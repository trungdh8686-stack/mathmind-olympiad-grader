import React from 'react';
import { Download, Camera, Printer, Settings, Sparkles, BookOpen, Layers } from 'lucide-react';
import { TestSummary } from '../data/mockData';

interface HeaderProps {
  summary: TestSummary;
  onOpenUpload: () => void;
  onExportDocx: () => void;
  onOpenSettings: () => void;
  onOpenImageViewer: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  summary,
  onOpenUpload,
  onExportDocx,
  onOpenSettings,
  onOpenImageViewer,
  onPrint
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Student Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  MathMind <span className="text-blue-600">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  Toán Olympic & Nâng Cao
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>{summary.title}</span>
                <span className="hidden md:inline text-slate-300">•</span>
                <span className="hidden md:inline text-emerald-600 font-semibold">Dành riêng cho {summary.studentName}</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Original Photos */}
            <button
              onClick={onOpenImageViewer}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all shadow-sm"
              title="Xem lại 5 trang ảnh bài làm gốc của con"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Ảnh bài làm ({summary.sourceImagesCount})</span>
            </button>

            {/* Print */}
            <button
              onClick={onPrint}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all shadow-sm"
              title="In bảng điểm hoặc lưu PDF"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>In kết quả</span>
            </button>

            {/* Export Docx */}
            <button
              onClick={onExportDocx}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-md shadow-blue-600/20"
              title="Tải xuống file Word chuẩn định dạng gốc"
            >
              <Download className="w-4 h-4" />
              <span>Tải file Word (.docx)</span>
            </button>

            {/* Upload New Test */}
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl transition-all shadow-md shadow-emerald-600/20"
              title="Chụp hoặc tải ảnh đề bài mới để AI chấm điểm"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden md:inline">Chấm bài mới</span>
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Cấu hình hệ thống & API Key"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
