import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Sparkles, Image as ImageIcon, Trash2, CheckCircle, RefreshCw } from 'lucide-react';
import { gradeImagesWithAI, GradingProgress } from '../services/aiGrader';
import { MathQuestion, TestSummary } from '../data/mockData';

import { User } from '../types/auth';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGradingComplete: (result: { questions: MathQuestion[]; summary: TestSummary }) => void;
  currentUser?: User;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onGradingComplete,
  currentUser
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [progress, setProgress] = useState<GradingProgress>({
    status: 'idle',
    progress: 0,
    message: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setFiles(prev => [...prev, ...selected]);
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
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Chấm Điểm Bài Tập Mới Bằng AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Kéo thả hoặc tải lên nhiều ảnh bài làm của con để hệ thống chấm tự động
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
        <div className="py-6 space-y-4">
          {/* File Drag and Drop Zone */}
          {!isGrading ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
                  : 'border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform shadow-xs">
                <Upload className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                Kéo & thả nhiều ảnh vào đây, hoặc <span className="text-emerald-600 underline">bấm để chọn ảnh / chụp camera</span>
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">
                Hỗ trợ chọn hoặc kéo thả nhiều trang cùng lúc (JPG, PNG, WebP)
              </p>
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
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                <span>Đã chọn {files.length} ảnh bài làm:</span>
                <button
                  onClick={() => setFiles([])}
                  className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  Xóa tất cả
                </button>
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
