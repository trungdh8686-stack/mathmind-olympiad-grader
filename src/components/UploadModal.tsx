import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Sparkles, CheckCircle2, Image as ImageIcon, Key, AlertCircle } from 'lucide-react';
import { gradeImagesWithAI, GradingProgress } from '../services/aiGrader';
import { MathQuestion, TestSummary } from '../data/mockData';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGradingComplete: (result: { questions: MathQuestion[]; summary: TestSummary }) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onGradingComplete
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [progress, setProgress] = useState<GradingProgress>({
    status: 'idle',
    progress: 0,
    message: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartGrading = async () => {
    if (apiKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', apiKey.trim());
    }

    try {
      const result = await gradeImagesWithAI(files, apiKey, (p) => setProgress(p));
      setTimeout(() => {
        onGradingComplete(result);
        onClose();
      }, 700);
    } catch (err: any) {
      setProgress({
        status: 'error',
        progress: 0,
        message: 'Có lỗi xảy ra trong quá trình chấm điểm. Vui lòng thử lại!'
      });
    }
  };

  const handleLoadSample = async () => {
    // Quick load simulated test
    setProgress({ status: 'uploading', progress: 20, message: 'Đang tải mẫu đề Tuần 11...' });
    const result = await gradeImagesWithAI([], apiKey, (p) => setProgress(p));
    onGradingComplete(result);
    onClose();
  };

  const isGrading = progress.status !== 'idle' && progress.status !== 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Chấm Điểm Bài Tập Mới Bằng AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Tải lên 1 hoặc nhiều ảnh bài làm để hệ thống tự động nhận diện & chấm điểm
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGrading}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-5">
          {/* File Upload Zone */}
          {!isGrading && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-3xl p-6 text-center cursor-pointer transition-all bg-slate-50/60 hover:bg-emerald-50/30 group"
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
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Bấm vào đây để chọn ảnh hoặc chụp từ camera
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Hỗ trợ chụp nhiều trang bài tập cùng lúc (JPG, PNG, WebP)
              </p>
            </div>
          )}

          {/* Selected Files Preview */}
          {files.length > 0 && !isGrading && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Đã chọn {files.length} trang ảnh:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {files.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <span className="truncate max-w-[100px] font-medium text-slate-700">
                      {f.name}
                    </span>
                    <button
                      onClick={() => removeFile(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gemini API Key input (Optional) */}
          {!isGrading && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Gemini API Key (Tùy chọn):</span>
                </label>
                <span className="text-[11px] text-slate-400">Không bắt buộc</span>
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Dán API Key để chấm trực tiếp bằng mô hình Gemini 1.5 Flash Vision..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                💡 Nếu chưa có key, hệ thống sẽ sử dụng Trợ lý Phân tích Tự động thông minh có sẵn để đánh giá bài làm.
              </p>
            </div>
          )}

          {/* Grading Progress Indicator */}
          {isGrading && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">{progress.message}</h4>
                <p className="text-xs text-slate-500">Vui lòng đợi vài giây để AI phân tích đề bài và chữ viết tay...</p>
              </div>
              <div className="w-full max-w-md mx-auto h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isGrading && (
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleLoadSample}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              🔄 Tải lại dữ liệu mẫu 63 câu Tuần 11
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleStartGrading}
                disabled={files.length === 0}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bắt đầu chấm bài</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
