import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Lightbulb,
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Send,
  MessageCircle,
  HelpCircle,
  BrainCircuit,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  RotateCcw,
  RefreshCw,
  Printer
} from 'lucide-react';
import { User } from '../types/auth';
import {
  solveMathProblemWithAI,
  SolvedMathResult,
  askFollowUpQuestionToAI,
  SolverChatMessage
} from '../services/mathSolverService';
import { MathView } from './MathView';
import { BilingualView } from './BilingualView';

interface MathSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User;
}

export const MathSolverModal: React.FC<MathSolverModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [inputMode, setInputMode] = useState<'image' | 'text'>('image');
  const [selectedGrade, setSelectedGrade] = useState<string>(() => {
    if (currentUser?.currentGrade) {
      return `${currentUser.currentGrade} (${currentUser.fullName})`;
    }
    return 'Lớp 3 (Ruby Đoàn Minh Châu)';
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ percent: number; message: string }>({
    percent: 0,
    message: ''
  });

  const [solvedResult, setSolvedResult] = useState<SolvedMathResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Follow-up chat
  const [chatMessages, setChatMessages] = useState<SolverChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
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

  // Clean up preview url
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  if (!isOpen) return null;

  const handleSelectFile = (file: File) => {
    setImageFile(file);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleSelectFile(file);
      }
    }
  };

  const handleSolve = async () => {
    if (inputMode === 'image' && !imageFile) return;
    if (inputMode === 'text' && !textPrompt.trim()) return;

    setIsLoading(true);
    setProgress({ percent: 10, message: 'Khởi tạo trợ lý giải toán...' });
    const apiKey = localStorage.getItem('GEMINI_API_KEY') || '';

    try {
      const result = await solveMathProblemWithAI(
        {
          imageFile: inputMode === 'image' && imageFile ? imageFile : undefined,
          textPrompt: inputMode === 'text' ? textPrompt : undefined
        },
        {
          apiKey,
          studentName: currentUser?.fullName,
          gradeLevel: selectedGrade,
          program: currentUser?.targetProgram
        },
        (p, msg) => {
          setProgress({ percent: p, message: msg });
        }
      );

      setSolvedResult(result);
      setChatMessages([
        {
          role: 'assistant',
          content: `Chào con! Thầy/cô AI đã giải xong bài toán "${result.title}". Con và bố mẹ hãy xem kỹ từng bước giải, nếu có chỗ nào chưa hiểu hãy nhắn vào ô trò chuyện bên dưới nhé!`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Solve error:', err);
      setProgress({ percent: 0, message: 'Có lỗi xảy ra khi giải bài toán. Vui lòng thử lại!' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySolution = () => {
    if (!solvedResult) return;
    const textToCopy = `[MATHMIND AI - BÀI GIẢI CHI TIẾT]
ĐỀ BÀI:
${solvedResult.problemTextVi}

ĐÁP SỐ: ${solvedResult.finalAnswer}

CÁC BƯỚC GIẢI:
${solvedResult.solutionSteps.map(s => `Bước ${s.stepNumber} (${s.stepTitle}):\n${s.content}`).join('\n\n')}

MẸO GIẢI NHANH OLYMPIC:
${solvedResult.olympiadTips.map(t => `- ${t}`).join('\n')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || !solvedResult || isChatLoading) return;

    const userQ = chatInput.trim();
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const updatedMessages: SolverChatMessage[] = [
      ...chatMessages,
      { role: 'user', content: userQ, timestamp: now }
    ];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const apiKey = localStorage.getItem('GEMINI_API_KEY') || '';
      const reply = await askFollowUpQuestionToAI(
        userQ,
        solvedResult,
        updatedMessages,
        apiKey
      );

      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleReset = () => {
    setSolvedResult(null);
    setImageFile(null);
    setImagePreviewUrl(null);
    setTextPrompt('');
    setChatMessages([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-orange-500/25 shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Giải Bài Toán Bằng AI
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Siêu tốc ~3s
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Tải ảnh đề bài hoặc nhập văn bản • AI giải chi tiết từng bước, mẹo Olympic & giải đáp thắc mắc
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {!solvedResult ? (
            /* INPUT VIEW */
            <div className="space-y-6">
              {/* Target Grade Selector */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Chọn cấp học để AI điều chỉnh phương pháp giải chuẩn sư phạm:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Lớp 1 (Tony)', label: 'Lớp 1 (Tony)', desc: 'Cộng trừ, đếm hình, sơ đồ trực quan' },
                    { id: 'Lớp 3 (Ruby Đoàn Minh Châu)', label: 'Lớp 3 (Ruby)', desc: 'Bảng cửu chương, ASMO, Kangaroo' },
                    { id: 'Lớp 6 (Lisa Đoàn Hồng Anh)', label: 'Lớp 6 (Lisa)', desc: 'Số nguyên, phân số, ITMC, SASMO' },
                    { id: 'Lớp 10 (Chip Đoàn Quỳnh Chi)', label: 'Lớp 10 (Chip)', desc: 'Hàm số, phương trình, giải tích THPT' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setSelectedGrade(lvl.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedGrade.includes(lvl.label.split(' ')[0])
                          ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900">{lvl.label}</div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Toggle: Image vs Text */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
                <button
                  type="button"
                  onClick={() => setInputMode('image')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    inputMode === 'image'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Chụp / Tải ảnh bài toán</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    inputMode === 'text'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Nhập đề bài bằng chữ</span>
                </button>
              </div>

              {/* Input Area */}
              {inputMode === 'image' ? (
                <div className="space-y-3">
                  {!imagePreviewUrl ? (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                        isDragging
                          ? 'border-amber-500 bg-amber-50/50 scale-[0.99]'
                          : 'border-slate-300 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/20'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleSelectFile(e.target.files[0]);
                          }
                        }}
                      />
                      <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                        <Upload className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-base sm:text-lg">
                          Kéo thả ảnh đề bài toán vào đây
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          hoặc bấm vào để chọn ảnh từ điện thoại / máy tính (PNG, JPG, HEIC)
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-2">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Tự động nén ảnh & OCR nhận diện đề bài trong 3 giây</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-3xl border border-slate-200 overflow-hidden bg-slate-900 flex items-center justify-center max-h-80 group">
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        className="max-h-80 w-auto object-contain mx-auto"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreviewUrl(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-700 text-white text-xs font-bold shadow-md backdrop-blur-md transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Đổi ảnh khác</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    rows={6}
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    placeholder="Dán hoặc gõ nội dung đề bài toán vào đây... (Ví dụ: Một khu vườn hình chữ nhật có chiều dài 40m, chiều rộng bằng 3/4 chiều dài. Tính diện tích khu vườn?)"
                    className="w-full p-4 rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none text-slate-900 text-sm leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>Hỗ trợ cả ký hiệu toán học như x², √, phân số...</span>
                    <span>{textPrompt.length} ký tự</span>
                  </div>
                </div>
              )}

              {/* Progress Bar when Loading */}
              {isLoading && (
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-amber-900">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                      <span>{progress.message || 'Đang xử lý...'}</span>
                    </span>
                    <span>{progress.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl text-slate-600 hover:text-slate-800 font-bold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  disabled={isLoading || (inputMode === 'image' && !imageFile) || (inputMode === 'text' && !textPrompt.trim())}
                  onClick={handleSolve}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>{isLoading ? 'Đang Giải Bài Toán...' : '🚀 Nhận Diện & Giải Bài Ngay'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* SOLVED RESULT VIEW */
            <div className="space-y-6 animate-in fade-in">
              {/* Result Meta & Badge Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{solvedResult.category}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {solvedResult.gradeLevel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    {solvedResult.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySolution}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Sao chép toàn bộ đề bài và lời giải"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép!' : 'Copy lời giải'}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Giải bài khác</span>
                  </button>
                </div>
              </div>

              {/* Problem Title & Statement */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4 text-indigo-600" />
                  <span>Đề bài toán: {solvedResult.title}</span>
                </div>

                {/* Bilingual statement */}
                {solvedResult.problemTextEn ? (
                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      <MathView text={solvedResult.problemTextEn} />
                    </div>
                    <div className="font-normal italic text-slate-600 text-xs sm:text-sm leading-relaxed border-l-2 border-indigo-300 pl-3 py-1 bg-indigo-50/40 rounded-r-xl">
                      <MathView text={solvedResult.problemTextVi} />
                    </div>
                  </div>
                ) : (
                  <div className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                    <MathView text={solvedResult.problemTextVi} />
                  </div>
                )}
              </div>

              {/* Prominent Final Answer Card */}
              <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đáp Số Cuối Cùng</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight">
                    <MathView text={solvedResult.finalAnswer} />
                  </div>
                </div>
                <div className="px-3.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-100 self-start sm:self-auto border border-white/20">
                  Chuẩn sư phạm theo lứa tuổi
                </div>
              </div>

              {/* Step-by-Step Pedagogical Solution */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Phương Pháp & Lời Giải Chi Tiết Từng Bước:</span>
                </h4>

                <div className="space-y-3">
                  {solvedResult.solutionSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {step.stepNumber}
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm">
                          {step.stepTitle}
                        </h5>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8 font-medium whitespace-pre-line">
                        <MathView text={step.content} />
                      </div>
                      {step.subNotes && (
                        <div className="ml-8 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[12px] text-amber-900 font-normal">
                          💡 <strong>Lưu ý:</strong> {step.subNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Olympic Pro Tips & Core Formulas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pro Tips */}
                {solvedResult.olympiadTips && solvedResult.olympiadTips.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Bí Kíp & Mẹo Giải Nhanh Olympic:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {solvedResult.olympiadTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold shrink-0">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Core Formulas */}
                {solvedResult.coreFormulas && solvedResult.coreFormulas.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Kiến Thức & Công Thức Cốt Lõi:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {solvedResult.coreFormulas.map((form, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold shrink-0">✓</span>
                          <span className="font-semibold text-slate-900"><MathView text={form} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Alternate Method (If available) */}
              {solvedResult.alternateMethod && (
                <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span>Cách Giải Thứ 2 (Trắc Nghiệm / Suy Luận Nhanh):</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    <MathView text={solvedResult.alternateMethod} />
                  </div>
                </div>
              )}

              {/* Interactive Follow-up Q&A Section */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Hỏi thêm AI về bài toán này
                  </h4>
                  <span className="text-xs text-slate-400 font-normal">
                    (Con chưa hiểu bước nào cứ hỏi thầy/cô AI nhé!)
                  </span>
                </div>

                {/* Chat History Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-h-60 overflow-y-auto space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                        }`}
                      >
                        <MathView text={msg.content} />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {msg.role === 'user' ? 'Con' : 'Gia sư AI'} • {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isChatLoading && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                      <span>Gia sư AI đang soạn câu trả lời...</span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendChat();
                    }}
                    placeholder="Ví dụ: 'Thầy giải thích rõ hơn bước 2 được không?', 'Có cách nào làm ngắn hơn không?'..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm text-slate-900 outline-none"
                  />
                  <button
                    type="button"
                    disabled={!chatInput.trim() || isChatLoading}
                    onClick={handleSendChat}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm disabled:opacity-50 cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Mô hình Gemini AI 3.0 Flash Vision – Tốc độ cao & chuẩn xác</span>
          </div>
          <div>
            Nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-[10px] text-slate-700">Esc</kbd> để thoát
          </div>
        </div>
      </div>
    </div>
  );
};
