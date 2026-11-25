import React, { useState, useEffect } from 'react';
import { X, Key, User, ExternalLink, Save, Sparkles, Bot } from 'lucide-react';
import { TestSummary } from '../data/mockData';

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
    return (localStorage.getItem('AI_ENGINE') as any) || 'chatgpt';
  });
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [openAiApiKey, setOpenAiApiKey] = useState(() => localStorage.getItem('OPENAI_API_KEY') || '');
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

    if (geminiApiKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', geminiApiKey.trim());
    } else {
      localStorage.removeItem('GEMINI_API_KEY');
    }

    if (openAiApiKey.trim()) {
      localStorage.setItem('OPENAI_API_KEY', openAiApiKey.trim());
    } else {
      localStorage.removeItem('OPENAI_API_KEY');
    }

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
              <h3 className="text-lg font-bold text-slate-900">Cấu Hình Nền Tảng AI</h3>
              <p className="text-xs text-slate-500">Hệ sinh thái ChatGPT Plus & Google Gemini</p>
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
          {/* AI Engine Choice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mô hình AI cốt lõi ưu tiên:
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
                  OpenAI GPT-4o Plus, nhận diện chuẩn xác 100% không bỏ sót câu
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
                    <span>Gemini AI (Google)</span>
                  </span>
                  {aiEngine === 'gemini' && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Gemini 3.5 Flash Vision, xử lý nhanh đa phương tiện
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

          {/* OpenAI ChatGPT API Key */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-600" />
                <span>OpenAI / ChatGPT API Key:</span>
              </label>
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Lấy key ChatGPT</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={openAiApiKey}
              onChange={(e) => setOpenAiApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
              placeholder="Dán sk-proj-... hoặc sk-... của tài khoản ChatGPT Plus"
            />
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Dành cho Sếp đã có gói ChatGPT Plus / OpenAI để giải đề thi bằng GPT-4o chuẩn mực nhất.
            </p>
          </div>

          {/* Gemini API Key */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Gemini API Key:</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Lấy key miễn phí</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              placeholder="Dán AIzaSy... để kích hoạt Gemini Vision"
            />
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Khóa API được lưu cục bộ an toàn trên trình duyệt của máy con, không gửi về bất kỳ máy chủ trung gian nào.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2">
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
              <span>{isSaved ? 'Đã lưu thành công!' : 'Lưu cài đặt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
