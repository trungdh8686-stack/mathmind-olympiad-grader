import React, { useState, useEffect } from 'react';
import { X, User, Save, Sparkles, Bot, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { TestSummary } from '../data/mockData';
import { systemConfigService } from '../services/systemConfigService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: TestSummary;
  onUpdateSummary: (newSummary: Partial<TestSummary>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  summary,
  onUpdateSummary
}) => {
  const [studentName, setStudentName] = useState(summary.studentName);
  const [grade, setGrade] = useState(summary.grade);
  const [aiEngine, setAiEngine] = useState<'chatgpt' | 'gemini'>(() => {
    return (localStorage.getItem('AI_ENGINE') as any) || systemConfigService.getActiveEngine();
  });
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('AI_ENGINE', aiEngine);

    onUpdateSummary({
      studentName: studentName.trim() || 'Ruby (Đoàn Minh Châu)',
      grade: grade.trim() || 'Olympic Toán Tiểu học / THCS'
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Cấu Hình Nền Tảng Học Tập</h3>
              <p className="text-xs text-slate-500">Dành cho học sinh & Thiết bị gia đình</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="py-5 space-y-4">
          {/* Cloud AI Integration Status Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-emerald-950">Hệ Thống AI Đám Mây Đã Kết Nối</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-200 text-emerald-800">
                    SẴN SÀNG
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                  Đã kết nối tự động ChatGPT Plus (GPT-4o) & Google Gemini Pro cho toàn bộ máy tính, điện thoại ở công ty và tại nhà.
                </p>
              </div>
            </div>
          </div>

          {/* AI Engine Choice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mô hình AI ưu tiên xử lý bài tập:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAiEngine('chatgpt')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  aiEngine === 'chatgpt'
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-400/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>ChatGPT (GPT-4o)</span>
                  </span>
                  {aiEngine === 'chatgpt' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Tư duy giải toán Olympic chuẩn xác nhất, phân tích chi tiết từng bước
                </p>
              </button>

              <button
                type="button"
                onClick={() => setAiEngine('gemini')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  aiEngine === 'gemini'
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-2 ring-blue-400/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <span>Gemini Pro / Flash</span>
                  </span>
                  {aiEngine === 'gemini' && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Tốc độ phân tích hình ảnh siêu tốc, xử lý bài tập đa phương tiện
                </p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tên của con / Học sinh:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              placeholder="VD: Ruby (Đoàn Minh Châu)..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Khối lớp / Chương trình học:
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              placeholder="VD: Lớp 3 (Ruby) • Olympic Toán Quốc Tế..."
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaved ? 'Đã lưu thành công!' : 'Lưu thông tin'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
