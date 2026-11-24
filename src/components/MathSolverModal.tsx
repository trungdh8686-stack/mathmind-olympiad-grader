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
  Printer,
  History,
  Trash2,
  ChevronRight,
  Eye,
  AlertCircle,
  Download
} from 'lucide-react';
import { User } from '../types/auth';
import {
  solveMathProblemWithAI,
  SolvedQuestionItem,
  SolverSession,
  getSolverSessions,
  deleteSolverSession,
  askFollowUpQuestionToAI,
  SolverChatMessage
} from '../services/mathSolverService';
import { exportSolverSessionToDocx } from '../utils/docxExport';
import { MathView } from './MathView';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Session & View states
  const [activeSession, setActiveSession] = useState<SolverSession | null>(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [resultTab, setResultTab] = useState<'solution' | 'ocr_text'>('solution');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // History list drawer
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [historySessions, setHistorySessions] = useState<SolverSession[]>(() => getSolverSessions());

  // Follow-up chat for currently selected question
  const [chatMessages, setChatMessages] = useState<SolverChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Refresh history on open
  useEffect(() => {
    if (isOpen) {
      setHistorySessions(getSolverSessions());
    }
  }, [isOpen]);

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
    setErrorMessage(null);
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
    setErrorMessage(null);
    setProgress({ percent: 10, message: 'Khởi tạo trợ lý giải toán...' });
    const apiKey = localStorage.getItem('GEMINI_API_KEY') || '';

    try {
      const session = await solveMathProblemWithAI(
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

      setActiveSession(session);
      setSelectedQuestionIndex(0);
      setHistorySessions(getSolverSessions());
      setChatMessages([
        {
          role: 'assistant',
          content: `Chào con! Thầy/cô AI đã nhận diện và giải xong đề "${session.examTitle}" (${session.totalQuestions} câu). Con có thể bấm vào từng câu hỏi để xem chi tiết hoặc qua tab "Chuyển Đề Ra Text (OCR)" để copy đề nhé!`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error('Solve error:', err);
      setErrorMessage(err.message || 'Có lỗi xảy ra khi phân tích và giải đề bài. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion: SolvedQuestionItem | undefined = activeSession?.questions[selectedQuestionIndex];

  const handleCopyOcrText = () => {
    if (!activeSession) return;
    navigator.clipboard.writeText(activeSession.rawOcrText);
    setCopiedText('ocr');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCopyQuestionSolution = () => {
    if (!currentQuestion) return;
    const textToCopy = `[MATHMIND AI - LỜI GIẢI CÂU ${currentQuestion.questionNumber}]
ĐỀ BÀI:
${currentQuestion.textEn ? `(English) ${currentQuestion.textEn}\n` : ''}${currentQuestion.textVi}

ĐÁP SỐ: ${currentQuestion.finalAnswer}

CÁC BƯỚC GIẢI CHI TIẾT:
${currentQuestion.solutionSteps.join('\n')}

${currentQuestion.tips ? `MẸO GIẢI NHANH OLYMPIC:\n${currentQuestion.tips}` : ''}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedText('solution');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleExportWord = async () => {
    if (!activeSession) return;
    try {
      await exportSolverSessionToDocx(activeSession);
    } catch (err) {
      console.error('Lỗi xuất file Word bài giải:', err);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || !currentQuestion || isChatLoading) return;

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
        currentQuestion,
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

  const handleSelectHistorySession = (session: SolverSession) => {
    setActiveSession(session);
    setSelectedQuestionIndex(0);
    setShowHistory(false);
    setChatMessages([
      {
        role: 'assistant',
        content: `Đã mở lại phiên giải đề: "${session.examTitle}" (${session.createdAt}). Con muốn giải thích thêm phần nào hãy nhắn nhé!`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleDeleteHistorySession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteSolverSession(id);
    setHistorySessions(getSolverSessions());
    if (activeSession?.id === id) {
      setActiveSession(null);
    }
  };

  const handleReset = () => {
    setActiveSession(null);
    setImageFile(null);
    setImagePreviewUrl(null);
    setTextPrompt('');
    setErrorMessage(null);
    setChatMessages([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-orange-500/25 shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Giải Bài Toán Bằng AI
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  OCR & Chuẩn Sư Phạm
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Tải ảnh đề thi bất kỳ • Tự động OCR chuyển sang Text & giải từng câu chuẩn chương trình
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* History Sessions Toggle Button */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                showHistory
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Xem lại các phiên đề bài đã tải lên trước đó"
            >
              <History className="w-3.5 h-3.5" />
              <span>Sổ tay đề đã lưu ({historySessions.length})</span>
            </button>

            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved Sessions Drawer (Dropdown / Drawer view) */}
        {showHistory && (
          <div className="p-4 bg-amber-50/70 border-b border-amber-200 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-600" />
                <span>Lịch sử các phiên tải đề lên:</span>
              </span>
              <span className="text-[11px] text-amber-700">Bấm vào đề bất kỳ để xem lại lời giải chi tiết</span>
            </div>

            {historySessions.length === 0 ? (
              <div className="text-xs text-slate-500 py-3 text-center">Chưa có phiên giải đề nào được lưu.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
                {historySessions.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelectHistorySession(s)}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-start justify-between gap-2 group ${
                      activeSession?.id === s.id
                        ? 'bg-amber-100 border-amber-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 truncate">{s.examTitle}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-amber-700">{s.totalQuestions} câu</span>
                        <span>•</span>
                        <span>{s.createdAt}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteHistorySession(e, s.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Xóa phiên này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {!activeSession ? (
            /* ========================================================
               INPUT VIEW (Chưa tải hoặc bắt đầu giải đề mới)
               ======================================================== */
            <div className="space-y-6">
              {/* Target Grade Selector */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Chọn cấp học của con để AI điều chỉnh phương pháp giải chuẩn sư phạm:</span>
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
                  <span>Chụp / Tải ảnh đề bài (Nhiều câu)</span>
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
                  <span>Nhập đề bài bằng văn bản</span>
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
                          Kéo thả ảnh đề bài toán vào đây (1 hoặc nhiều câu)
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          hoặc bấm vào để chọn ảnh từ điện thoại / máy tính (chụp phiếu bài tập, trang sách, đề thi AMO, ASMO...)
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-2">
                        <Zap className="w-3.5 h-3.5" />
                        <span>AI tự động OCR chuyển đề ra Text, giải từng câu & lưu vào sổ tay phiên học</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-3xl border border-slate-200 overflow-hidden bg-slate-900 flex items-center justify-center max-h-80 group">
                      <img
                        src={imagePreviewUrl}
                        alt="Đề bài tải lên"
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
                    placeholder="Dán hoặc gõ nội dung đề bài toán vào đây (Ví dụ: Câu 1: ... Câu 2: ...)"
                    className="w-full p-4 rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none text-slate-900 text-sm leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>Hỗ trợ cả ký hiệu toán học như x², √, phân số...</span>
                    <span>{textPrompt.length} ký tự</span>
                  </div>
                </div>
              )}

              {/* Error Alert Display */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Không thể giải bài toán:</div>
                    <div className="mt-0.5">{errorMessage}</div>
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

              {/* Action Buttons */}
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
                  <span>{isLoading ? 'Đang OCR & Giải Đề Bài...' : '🚀 Nhận Diện & Giải Đề Ngay'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================
               RESULT VIEW (Đã OCR và giải xong tất cả các câu trong đề)
               ======================================================== */
            <div className="space-y-6 animate-in fade-in">
              {/* Header Info of the Solved Session */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {activeSession.examTitle}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {activeSession.totalQuestions} câu hỏi
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {activeSession.gradeLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportWord}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/25 cursor-pointer"
                    title="Tải về file Word (.docx) chứa toàn bộ đề bài và lời giải chi tiết chuẩn định dạng"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải file Word</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Tải đề mới</span>
                  </button>
                </div>
              </div>

              {/* View Mode Switcher: Lời giải từng câu vs Toàn bộ Text OCR */}
              <div className="flex items-center justify-between gap-3 p-1.5 bg-slate-100 rounded-2xl">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setResultTab('solution')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      resultTab === 'solution'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Lời giải chi tiết ({activeSession.totalQuestions} câu)</span>
                  </button>
                  <button
                    onClick={() => setResultTab('ocr_text')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      resultTab === 'ocr_text'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>Chuyển đề ra Text (OCR thuần)</span>
                  </button>
                </div>

                {resultTab === 'ocr_text' ? (
                  <button
                    onClick={handleCopyOcrText}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    {copiedText === 'ocr' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'ocr' ? 'Đã sao chép Text!' : 'Sao chép Text đề bài'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleCopyQuestionSolution}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedText === 'solution' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'solution' ? 'Đã sao chép!' : 'Copy câu này'}</span>
                  </button>
                )}
              </div>

              {/* TAB 1: FULL OCR RAW TEXT VIEW */}
              {resultTab === 'ocr_text' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-5 rounded-3xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap border border-slate-800 shadow-inner max-h-[500px] overflow-y-auto">
                    {activeSession.rawOcrText}
                  </div>
                  <div className="text-xs text-slate-500 italic">
                    💡 Đề bài đã được AI chuyển đổi hoàn chỉnh từ ảnh chụp sang định dạng Text để Sếp dễ dàng lưu trữ, sao chép hoặc in ấn.
                  </div>
                </div>
              )}

              {/* TAB 2: STEP-BY-STEP PEDAGOGICAL SOLUTION PER QUESTION */}
              {resultTab === 'solution' && currentQuestion && (
                <div className="space-y-6 animate-in fade-in">
                  {/* Question Navigator Tabs (if multiple questions in the exam sheet) */}
                  {activeSession.questions.length > 1 && (
                    <div className="space-y-2">
                      <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                        Chọn câu hỏi trong đề để xem lời giải:
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        {activeSession.questions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedQuestionIndex(idx);
                              setChatMessages([]);
                            }}
                            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                              selectedQuestionIndex === idx
                                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40 font-extrabold'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            <span>Câu {q.questionNumber}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">
                              {q.category}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question Problem Statement (Bilingual) */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                        <BrainCircuit className="w-4 h-4 text-indigo-600" />
                        <span>{currentQuestion.title}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        {currentQuestion.difficulty}
                      </span>
                    </div>

                    {/* Bilingual statement */}
                    {currentQuestion.textEn ? (
                      <div className="space-y-2">
                        <div className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          <MathView text={currentQuestion.textEn} />
                        </div>
                        <div className="font-normal italic text-slate-600 text-xs sm:text-sm leading-relaxed border-l-2 border-indigo-300 pl-3 py-1 bg-indigo-50/40 rounded-r-xl">
                          <MathView text={currentQuestion.textVi} />
                        </div>
                      </div>
                    ) : (
                      <div className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                        <MathView text={currentQuestion.textVi} />
                      </div>
                    )}
                  </div>

                  {/* Prominent Final Answer Highlight Card */}
                  <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Đáp Số Cuối Cùng</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight">
                        <MathView text={currentQuestion.finalAnswer} />
                      </div>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-100 self-start sm:self-auto border border-white/20">
                      Chuẩn sư phạm theo lứa tuổi con
                    </div>
                  </div>

                  {/* Detailed Step-by-Step Solution */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Hướng Dẫn Lời Giải Chi Tiết Từng Bước:</span>
                    </h5>

                    <div className="space-y-2.5">
                      {currentQuestion.solutionSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-300 transition-all space-y-1.5"
                        >
                          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                            <MathView text={step} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Olympic Tips & Core Formulas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Olympic Tips */}
                    {currentQuestion.tips && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>Bí Kíp & Mẹo Giải Nhanh Olympic:</span>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {currentQuestion.tips}
                        </div>
                      </div>
                    )}

                    {/* Core Formulas */}
                    {currentQuestion.coreFormulas && currentQuestion.coreFormulas.length > 0 && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                          <span>Kiến Thức Cốt Lõi Áp Dụng:</span>
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-700">
                          {currentQuestion.coreFormulas.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-indigo-600 font-bold">✓</span>
                              <span><MathView text={f} /></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Interactive Q&A Chat for this Question */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-indigo-600" />
                      <h5 className="text-sm font-extrabold text-slate-900">
                        Hỏi thêm Gia sư AI về Câu {currentQuestion.questionNumber}
                      </h5>
                      <span className="text-xs text-slate-400 font-normal">
                        (Chưa hiểu bước nào con cứ nhắn hỏi nhé!)
                      </span>
                    </div>

                    {/* Chat Messages Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-h-56 overflow-y-auto space-y-2.5">
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
                        placeholder={`Hỏi thầy/cô AI về Câu ${currentQuestion.questionNumber} (ví dụ: 'Vì sao lại có kết quả này?', 'Có cách nào giải ngắn hơn không?')...`}
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
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Gemini Vision AI (OCR tốc độ cao ~7s, tự động lưu phiên & trích xuất Text)</span>
          </div>
          <div>
            Nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-[10px] text-slate-700">Esc</kbd> để đóng
          </div>
        </div>
      </div>
    </div>
  );
};
