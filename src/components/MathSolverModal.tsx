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
  Download,
  Plus,
  Key,
  Bot,
  Image as ImageIcon
} from 'lucide-react';
import { User } from '../types/auth';
import {
  solveMathProblemWithAI,
  extractTextFromImagesWithAI,
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

  // Multiple image upload support
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [textPrompt, setTextPrompt] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Engine selection
  const [aiEngine, setAiEngine] = useState<'chatgpt' | 'gemini'>(() => {
    return (localStorage.getItem('AI_ENGINE') as any) || 'chatgpt';
  });
  const [openAiKey, setOpenAiKey] = useState<string>(() => localStorage.getItem('OPENAI_API_KEY') || '');
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);

  // Loading & Progress
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOcrLoading, setIsOcrLoading] = useState<boolean>(false);
  const [ocrSuccessMsg, setOcrSuccessMsg] = useState<string | null>(null);
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
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);
  const addMoreCameraInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Refresh history on open
  useEffect(() => {
    if (isOpen) {
      setHistorySessions(getSolverSessions());
      setOpenAiKey(localStorage.getItem('OPENAI_API_KEY') || '');
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

  // Clean up preview urls
  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviewUrls]);

  if (!isOpen) return null;

  const handleSelectFiles = (files: FileList | File[]) => {
    const validImages = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validImages.length === 0) return;

    setErrorMessage(null);
    setOcrSuccessMsg(null);

    const newFiles = [...imageFiles, ...validImages];
    setImageFiles(newFiles);

    const newUrls = validImages.map(f => URL.createObjectURL(f));
    setImagePreviewUrls(prev => [...prev, ...newUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const fileToRemove = imageFiles[index];
    const urlToRemove = imagePreviewUrls[index];
    if (urlToRemove) URL.revokeObjectURL(urlToRemove);

    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSelectFiles(e.dataTransfer.files);
    }
  };

  const handleSaveOpenAiKey = (key: string) => {
    setOpenAiKey(key);
    if (key.trim()) {
      localStorage.setItem('OPENAI_API_KEY', key.trim());
    } else {
      localStorage.removeItem('OPENAI_API_KEY');
    }
  };

  // Convert uploaded images to Text (OCR)
  const handleExtractTextFromImages = async () => {
    if (imageFiles.length === 0) return;

    setIsOcrLoading(true);
    setErrorMessage(null);
    setOcrSuccessMsg(null);
    setProgress({ percent: 15, message: `Bắt đầu trích xuất đề bài từ ${imageFiles.length} trang ảnh...` });

    try {
      const extracted = await extractTextFromImagesWithAI(
        imageFiles,
        {
          aiEngine,
          openAiKey,
          gradeLevel: selectedGrade,
          program: currentUser?.targetProgram
        },
        (p, msg) => {
          setProgress({ percent: p, message: msg });
        }
      );

      setTextPrompt(extracted);
      setInputMode('text'); // Switch to text view for easy review/editing
      setOcrSuccessMsg(`Đã trích xuất thành công toàn bộ câu hỏi từ ${imageFiles.length} trang ảnh! Sếp có thể xem, chỉnh sửa các câu bên dưới rồi bấm "Bắt đầu Giải toán".`);
    } catch (err: any) {
      console.error('OCR error:', err);
      setErrorMessage(err.message || 'Lỗi khi trích xuất đề bài từ ảnh. Vui lòng thử lại!');
    } finally {
      setIsOcrLoading(false);
    }
  };

  const handleSolve = async () => {
    if (inputMode === 'image' && imageFiles.length === 0) return;
    if (inputMode === 'text' && !textPrompt.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setProgress({ percent: 10, message: `Khởi tạo trợ lý giải toán bằng ${aiEngine === 'chatgpt' ? 'ChatGPT (GPT-4o)' : 'Gemini AI'}...` });

    try {
      const session = await solveMathProblemWithAI(
        {
          imageFiles: inputMode === 'image' ? imageFiles : undefined,
          textPrompt: inputMode === 'text' ? textPrompt : undefined
        },
        {
          aiEngine,
          openAiKey,
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
      const reply = await askFollowUpQuestionToAI(
        userQ,
        currentQuestion,
        updatedMessages,
        undefined,
        openAiKey,
        aiEngine
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
    setImageFiles([]);
    setImagePreviewUrls([]);
    setTextPrompt('');
    setErrorMessage(null);
    setOcrSuccessMsg(null);
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
                  Trợ Lý Giải Toán Bằng AI
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Nhiều Trang Ảnh • OCR Ra Text
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Tải nhiều ảnh đề thi • Chuyển đề thành Text & giải bài chuẩn ChatGPT Plus / Gemini
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
              <span>Sổ tay đề ({historySessions.length})</span>
            </button>

            <button
              onClick={onClose}
              disabled={isLoading || isOcrLoading}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved Sessions Drawer */}
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
              
              {/* Engine Choice + API Key configuration bar */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Động cơ AI giải toán:
                  </span>
                  <div className="inline-flex p-1 bg-slate-200/80 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setAiEngine('chatgpt');
                        localStorage.setItem('AI_ENGINE', 'chatgpt');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        aiEngine === 'chatgpt'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ChatGPT (GPT-4o)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAiEngine('gemini');
                        localStorage.setItem('AI_ENGINE', 'gemini');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        aiEngine === 'gemini'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Gemini AI</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {aiEngine === 'chatgpt' && !openAiKey && (
                    <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      <span>Chưa có Key ChatGPT</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowKeyInput(!showKeyInput)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Key className="w-3 h-3" />
                    <span>{openAiKey ? 'Đổi Key ChatGPT' : 'Nhập Key ChatGPT Plus'}</span>
                  </button>
                </div>
              </div>

              {/* Inline OpenAI Key Input if toggled */}
              {showKeyInput && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">
                      Nhập OpenAI API Key (tài khoản ChatGPT Plus):
                    </span>
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-emerald-700 hover:underline font-semibold"
                    >
                      Lấy API key tại OpenAI
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      value={openAiKey}
                      onChange={(e) => handleSaveOpenAiKey(e.target.value)}
                      placeholder="sk-proj-... hoặc sk-..."
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKeyInput(false)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                    >
                      Lưu
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Khóa được lưu cục bộ an toàn trên trình duyệt của máy Sếp. Sau khi nhập, AI sẽ gọi trực tiếp mô hình GPT-4o để giải toàn bộ các bài toán.
                  </p>
                </div>
              )}

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
                  <span>Tải ảnh đề thi ({imageFiles.length > 0 ? `${imageFiles.length} ảnh` : 'Nhiều ảnh'})</span>
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
                  <span>Đề bài dạng Text {textPrompt ? '(Đã có nội dung)' : ''}</span>
                </button>
              </div>

              {/* Input Area */}
              {inputMode === 'image' ? (
                <div className="space-y-4">
                  {imageFiles.length === 0 ? (
                    <div className="space-y-3">
                      {/* Action cards: Thư viện vs Camera */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-amber-300 hover:border-amber-500 bg-gradient-to-br from-amber-50/70 to-orange-50/50 hover:bg-amber-100/60 transition-all text-left group cursor-pointer shadow-xs active:scale-[0.98]"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1.5">
                              <span>Chọn từ Thư viện ảnh</span>
                              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Nhiều ảnh</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                              Mở album chọn cùng lúc nhiều trang đề bài (Trang 1, 2, 3...)
                            </p>
                          </div>
                        </button>

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
                              Mở máy ảnh chụp ngay phiếu đề bài toán
                            </p>
                          </div>
                        </button>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            handleSelectFiles(e.target.files);
                          }
                          e.target.value = '';
                        }}
                      />
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            handleSelectFiles(e.target.files);
                          }
                          e.target.value = '';
                        }}
                      />

                      {/* Desktop drag & drop fallback */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isDragging
                            ? 'border-amber-500 bg-amber-50/50 scale-[0.99]'
                            : 'border-slate-200 hover:border-amber-400 bg-slate-50/40 hover:bg-amber-50/20'
                        }`}
                      >
                        <Upload className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-xs text-slate-600 font-medium">
                          Hoặc kéo thả file ảnh đề bài vào đây (JPG, PNG, WebP)
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Multi-image thumbnail gallery */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-amber-600" />
                          <span>Đã chọn {imageFiles.length} trang ảnh đề thi:</span>
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <input
                            ref={addMoreInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files) {
                                handleSelectFiles(e.target.files);
                              }
                              e.target.value = '';
                            }}
                          />
                          <input
                            ref={addMoreCameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files) {
                                handleSelectFiles(e.target.files);
                              }
                              e.target.value = '';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => addMoreInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-xl border border-slate-300 hover:border-amber-400 bg-white text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-amber-600" />
                            <span>+ Thêm ảnh</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => addMoreCameraInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-xl border border-teal-300 hover:border-teal-500 bg-teal-50 text-teal-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Camera className="w-3.5 h-3.5 text-teal-600" />
                            <span>+ Chụp thêm</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setImageFiles([]);
                              setImagePreviewUrls([]);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa tất cả</span>
                          </button>
                        </div>
                      </div>

                      {/* Image Thumbnails Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3 bg-slate-100 rounded-3xl border border-slate-200">
                        {imagePreviewUrls.map((url, idx) => (
                          <div
                            key={idx}
                            className="relative group rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 aspect-[3/4] flex items-center justify-center shadow-xs"
                          >
                            <img
                              src={url}
                              alt={`Trang ${idx + 1}`}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
                              Trang {idx + 1}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-2 right-2 p-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-700 text-white shadow-md transition-all cursor-pointer opacity-90 group-hover:opacity-100"
                              title="Xóa trang này"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent text-[10px] text-white truncate px-2 font-medium">
                              {imageFiles[idx]?.name}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Prominent Action Strip: Chuyển thành Đề Text (OCR) */}
                      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-indigo-950">
                              Chuyển các trang ảnh thành Đề Text để rà soát
                            </div>
                            <p className="text-[11px] text-indigo-700">
                              AI sẽ OCR nhận diện toàn bộ các câu hỏi ra văn bản thuần để Sếp đọc, chỉnh sửa trước khi bắt đầu giải.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={isOcrLoading || isLoading}
                          onClick={handleExtractTextFromImages}
                          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
                        >
                          {isOcrLoading ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Đang OCR chuyển đề ra Text...</span>
                            </>
                          ) : (
                            <>
                              <FileText className="w-4 h-4" />
                              <span>Chuyển ảnh thành Đề Text (OCR)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Text Prompt View */
                <div className="space-y-3">
                  {ocrSuccessMsg && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>{ocrSuccessMsg}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                      <span className="font-bold text-slate-800">Nội dung đề bài toán (Text):</span>
                      <span>{textPrompt.length} ký tự</span>
                    </div>
                    <textarea
                      rows={10}
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      placeholder="Dán hoặc gõ nội dung đề bài toán vào đây (Ví dụ:&#10;Câu 1: ...&#10;Câu 2: ...&#10;Hoặc bấm 'Chuyển ảnh thành Đề Text' ở tab tải ảnh để tự động trích xuất)"
                      className="w-full p-4 rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none text-slate-900 text-xs sm:text-sm leading-relaxed font-mono bg-slate-50 focus:bg-white"
                    />
                    <div className="text-[11px] text-slate-500 italic px-1">
                      💡 Sếp có thể tự do gõ sửa số liệu hoặc thêm chú thích vào từng câu hỏi trước khi bấm Giải toán.
                    </div>
                  </div>
                </div>
              )}

              {/* Error Alert Display */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Không thể thực hiện:</div>
                    <div className="mt-0.5">{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* Progress Bar when Loading */}
              {(isLoading || isOcrLoading) && (
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
                  disabled={isLoading || isOcrLoading || (inputMode === 'image' && imageFiles.length === 0) || (inputMode === 'text' && !textPrompt.trim())}
                  onClick={handleSolve}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>
                    {isLoading
                      ? 'Đang giải đề bài toán...'
                      : inputMode === 'text'
                        ? '🚀 Bắt đầu Giải đề Text'
                        : `🚀 Giải toàn bộ đề (${imageFiles.length} trang)`
                    }
                  </span>
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
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>{activeSession.aiEngine === 'chatgpt' ? 'ChatGPT (GPT-4o)' : 'Gemini AI'}</span>
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Giải đề khác</span>
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
                    <div className="text-xs text-emerald-100 max-w-sm sm:text-right">
                      Dạng toán: <span className="font-bold text-white">{currentQuestion.category}</span>
                      <br />
                      Mức độ: <span className="font-bold text-white">{currentQuestion.difficulty}</span>
                    </div>
                  </div>

                  {/* Step-by-Step Pedagogical Steps */}
                  <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <BookOpen className="w-5 h-5 text-amber-600" />
                      <h5 className="font-black text-slate-900 text-base">
                        Phương Pháp & Các Bước Giải Chi Tiết Chuẩn Sư Phạm:
                      </h5>
                    </div>

                    <div className="space-y-3">
                      {currentQuestion.solutionSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100 text-slate-800 text-xs sm:text-sm leading-relaxed"
                        >
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            {sIdx + 1}
                          </span>
                          <div className="flex-1 font-medium pt-0.5">
                            <MathView text={step} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Alternate Method (if available) */}
                    {currentQuestion.alternateMethod && (
                      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-slate-800 text-xs sm:text-sm mt-3">
                        <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span>Cách giải 2 (Tư duy nhanh):</span>
                        </div>
                        <div className="leading-relaxed">
                          <MathView text={currentQuestion.alternateMethod} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Core Formulas & Tips Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tips Card */}
                    {currentQuestion.tips && (
                      <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Mẹo Giải Nhanh & Tránh Bẫy:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                          <MathView text={currentQuestion.tips} />
                        </p>
                      </div>
                    )}

                    {/* Core Formulas */}
                    {currentQuestion.coreFormulas && currentQuestion.coreFormulas.length > 0 && (
                      <div className="p-5 rounded-3xl bg-indigo-50/80 border border-indigo-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900">
                          <Award className="w-4 h-4 text-indigo-600" />
                          <span>Quy Tắc / Công Thức Cốt Lõi:</span>
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-indigo-950 font-medium">
                          {currentQuestion.coreFormulas.map((f, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5">
                              <span className="text-indigo-600">•</span>
                              <MathView text={f} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Follow-up Interactive AI Tutor Section */}
                  <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-amber-400" />
                        <span className="font-bold text-sm sm:text-base">
                          Hỏi Thêm Gia Sư AI Về Câu {currentQuestion.questionNumber}:
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {aiEngine === 'chatgpt' ? 'Trò chuyện cùng ChatGPT Plus' : 'Trò chuyện cùng Gemini AI'}
                      </span>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                      {chatMessages.map((msg, mIdx) => (
                        <div
                          key={mIdx}
                          className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {msg.role === 'assistant' && (
                            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              AI
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-2xl text-xs sm:text-sm max-w-[85%] leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-none'
                                : 'bg-slate-800 text-slate-100 rounded-bl-none'
                            }`}
                          >
                            <MathView text={msg.content} />
                            <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-amber-900' : 'text-slate-400'} text-right`}>
                              {msg.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isChatLoading && (
                        <div className="flex items-center gap-2 text-xs text-amber-300 italic py-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Gia sư AI đang viết câu trả lời cho con...</span>
                        </div>
                      )}
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Chat Input Bar */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendChat();
                          }
                        }}
                        placeholder="Con chưa hiểu bước nào? Nhập câu hỏi vào đây (VD: Tại sao bước 2 lại chia 4?)..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs sm:text-sm border border-slate-700 focus:border-amber-400 focus:outline-none placeholder:text-slate-500"
                      />
                      <button
                        type="button"
                        onClick={handleSendChat}
                        disabled={!chatInput.trim() || isChatLoading}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
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
      </div>
    </div>
  );
};
