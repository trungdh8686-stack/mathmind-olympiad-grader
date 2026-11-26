import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Camera, Sparkles, Image as ImageIcon, Trash2, CheckCircle, RefreshCw, Plus } from 'lucide-react';
import { gradeImagesWithAI, GradingProgress } from '../services/aiGrader';
import { MathQuestion, TestSummary } from '../data/mockData';

import { User } from '../types/auth';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGradingComplete: (result: { questions: MathQuestion[]; summary: TestSummary }) => void;
  onOpenSolver?: () => void;
  currentUser?: User;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onGradingComplete,
  onOpenSolver,
  currentUser
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [progress, setProgress] = useState<GradingProgress>({
    status: 'idle',
    progress: 0,
    message: ''
  });
  
  // Separate refs: One for Photo Gallery (multiple images, NO capture) and one for live Camera (capture="environment")
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      if (droppedFiles.length > 0) {
        setFiles(prev => [...prev, ...droppedFiles]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (selected.length > 0) {
        setFiles(prev => [...prev, ...selected]);
      }
      // Reset input value so selecting the same file triggers change event
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartGrading = async () => {
    if (files.length === 0) return;
    const apiKey = localStorage.getItem('GEMINI_API_KEY') || '';

    try {
      const result = await gradeImagesWithAI(
        files,
        apiKey,
        (p) => setProgress(p),
        {
          studentName: currentUser?.fullName,
          level: currentUser?.level,
          grade: currentUser?.currentGrade,
          program: currentUser?.targetProgram
        }
      );
      setTimeout(() => {
        onGradingComplete(result);
        onClose();
        setFiles([]);
        setProgress({ status: 'idle', progress: 0, message: '' });
      }, 700);
    } catch {
      setProgress({
        status: 'error',
        progress: 0,
        message: 'Có lỗi xảy ra trong quá trình chấm điểm. Vui lòng thử lại!'
      });
    }
  };

  const handleLoadSample = async () => {
    setProgress({ status: 'uploading', progress: 20, message: 'Đang tải lại dữ liệu mẫu bài tập...' });
    const result = await gradeImagesWithAI(
      [],
      '',
      (p) => setProgress(p),
      {
        studentName: currentUser?.fullName,
        level: currentUser?.level,
        grade: currentUser?.currentGrade,
        program: currentUser?.targetProgram
      }
    );
    onGradingComplete(result);
    onClose();
  };

  const isGrading = progress.status !== 'idle' && progress.status !== 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-5 sm:p-8 border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Chấm Điểm Bài Tập Mới Bằng AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Chọn ảnh từ thư viện hoặc chụp camera trực tiếp bài làm của con
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGrading}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 overflow-y-auto flex-1 pr-0.5">
          {/* Quick Switch to Solver */}
          {onOpenSolver && !isGrading && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 fill-amber-500" />
                <span>
                  Đang có đề bài <strong>chưa làm</strong> cần xem hướng dẫn giải & đáp án?
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSolver();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shrink-0 transition-colors shadow-xs cursor-pointer"
              >
                Mở Trợ lý Giải toán 💡
              </button>
            </div>
          )}

          {/* Hidden inputs: 1 for Gallery (NO capture), 1 for Camera (capture="environment") */}
          <input
            ref={galleryInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Action Cards: Chọn Thư Viện vs Chụp Camera */}
          {!isGrading ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Button 1: Thư viện ảnh (Cho phép chọn nhiều ảnh trên iOS / Android) */}
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-emerald-300 hover:border-emerald-500 bg-gradient-to-br from-emerald-50/70 to-teal-50/50 hover:bg-emerald-100/60 transition-all text-left group cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                      <span>Chọn từ Thư viện ảnh</span>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Nhiều ảnh</span>
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
                      Bật máy ảnh chụp ngay phiếu bài tập của con
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
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 group flex items-center justify-center gap-2 ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
                    : 'border-slate-200 hover:border-emerald-400 bg-slate-50/40 hover:bg-emerald-50/20'
                }`}
              >
                <Upload className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">
                  Hoặc kéo & thả file ảnh trực tiếp vào đây (JPG, PNG, WebP)
                </span>
              </div>
            </div>
          ) : (
            /* Grading Progress Indicator */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce shadow-xs">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">{progress.message}</h4>
                <p className="text-xs text-slate-500">Hệ thống đang đối chiếu đề bài và phương pháp giải chuẩn...</p>
              </div>
              <div className="w-full max-w-md mx-auto h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Selected Files Preview List */}
          {files.length > 0 && !isGrading && (
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between flex-wrap gap-2">
                <span>Đã chọn {files.length} ảnh bài làm:</span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
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
                    type="button"
                    onClick={() => setFiles([])}
                    className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
                {files.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate font-medium text-slate-700">
                        {f.name}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(idx);
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isGrading && (
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleLoadSample}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              🔄 Tải lại dữ liệu mẫu bài tập Tuần 11
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleStartGrading}
                disabled={files.length === 0}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bắt đầu chấm bài ({files.length} ảnh)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
