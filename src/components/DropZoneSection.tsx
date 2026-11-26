import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, X, FileImage, Image as ImageIcon, Plus, CheckCircle, RefreshCw } from 'lucide-react';
import { gradeImagesWithAI, GradingProgress } from '../services/aiGrader';
import { MathQuestion, TestSummary } from '../data/mockData';

import { User } from '../types/auth';

interface DropZoneSectionProps {
  onGradingComplete: (result: { questions: MathQuestion[]; summary: TestSummary }) => void;
  currentUser?: User;
}

export const DropZoneSection: React.FC<DropZoneSectionProps> = ({ onGradingComplete, currentUser }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState<GradingProgress>({
    status: 'idle',
    progress: 0,
    message: ''
  });
  
  // Separate refs: One for Photo Gallery (multiple photos, NO capture) and one for live Camera (capture="environment")
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      setFiles(prev => [...prev, ...dropped]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (selected.length > 0) {
        setFiles(prev => [...prev, ...selected]);
      }
      e.target.value = '';
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleStartGrading = async () => {
    if (files.length === 0) return;
    const apiKey = localStorage.getItem('GEMINI_API_KEY') || '';
    try {
      const result = await gradeImagesWithAI(
        files,
        apiKey,
        p => setProgress(p),
        {
          studentName: currentUser?.fullName,
          level: currentUser?.level,
          grade: currentUser?.currentGrade,
          program: currentUser?.targetProgram
        }
      );
      onGradingComplete(result);
      setFiles([]);
      setTimeout(() => {
        setProgress({ status: 'idle', progress: 0, message: '' });
        document.getElementById('question-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    } catch {
      setProgress({
        status: 'error',
        progress: 0,
        message: 'Có lỗi xảy ra trong quá trình chấm điểm. Vui lòng thử lại!'
      });
    }
  };

  const isGrading = progress.status !== 'idle' && progress.status !== 'error';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Scanner & Auto-Grading</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Chấm Điểm Phiếu Luyện Tập Mới (Bất Kỳ Tuần Nào)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            Chọn ảnh từ thư viện hoặc chụp camera phiếu làm bài (Tuần 11, Tuần 12, Đề thi Olympic...) để AI tự động chấm!
          </p>
        </div>

        {files.length > 0 && !isGrading && (
          <button
            onClick={handleStartGrading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Chấm ngay ({files.length} trang)</span>
          </button>
        )}
      </div>

      {/* Hidden inputs */}
      <input
        ref={galleryInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInput}
      />

      {/* Actions & Drag Drop Box */}
      {!isGrading ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Button 1: Thư viện ảnh (Cho phép chọn nhiều ảnh trên mobile) */}
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-indigo-300 hover:border-indigo-500 bg-gradient-to-br from-indigo-50/70 to-blue-50/50 hover:bg-indigo-100/60 transition-all text-left group cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center gap-1.5">
                  <span>Chọn từ Thư viện ảnh</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">Nhiều ảnh</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  Mở album ảnh để chọn cùng lúc nhiều trang (Trang 1, 2, 3...)
                </p>
              </div>
            </button>

            {/* Button 2: Chụp trực tiếp bằng Camera */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-teal-300 hover:border-teal-500 bg-gradient-to-br from-teal-50/70 to-cyan-50/50 hover:bg-teal-100/60 transition-all text-left group cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center gap-1.5">
                  <span>Chụp ảnh từ Camera</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-700">Trực tiếp</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  Mở máy ảnh chụp ngay phiếu bài tập của con
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Drag and Drop fallback */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => galleryInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 group flex items-center justify-center gap-2 ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                : 'border-slate-200 hover:border-indigo-400 bg-slate-50/40 hover:bg-indigo-50/20'
            }`}
          >
            <Upload className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-xs text-slate-600 font-medium">
              Hoặc kéo & thả file ảnh trực tiếp vào đây (PNG, JPG, WebP)
            </span>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-indigo-50/40 rounded-2xl border border-indigo-100 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">{progress.message}</h4>
            <p className="text-xs text-slate-500">Đang đối chiếu phương pháp giải chuẩn Toán Việt Nam...</p>
          </div>
          <div className="w-full max-w-sm mx-auto h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Selected images preview */}
      {files.length > 0 && !isGrading && (
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between flex-wrap gap-2">
            <span>Đã chọn {files.length} ảnh phiếu bài:</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm ảnh</span>
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Chụp thêm</span>
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={() => setFiles([])}
                className="text-slate-400 hover:text-rose-500 font-semibold cursor-pointer text-xs"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="relative group p-2 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileImage className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="truncate font-medium text-slate-700">{file.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
