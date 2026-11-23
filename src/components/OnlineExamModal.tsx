import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  BookOpen,
  Flag,
  Trophy,
  ChevronRight,
  Eye,
  Check,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamPaper } from '../data/examBank';
import { MathQuestion, TestSummary } from '../data/mockData';
import { User } from '../types/auth';
import { sessionService } from '../services/sessionService';
import { BilingualView } from './BilingualView';
import { MathView } from './MathView';

interface OnlineExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamPaper | null;
  currentUser: User;
  onExamCompleted: (result: { questions: MathQuestion[]; summary: TestSummary }) => void;
}

export const OnlineExamModal: React.FC<OnlineExamModalProps> = ({
  isOpen,
  onClose,
  exam,
  currentUser,
  onExamCompleted
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [mode, setMode] = useState<'exam' | 'practice'>('exam');
  const [revealedSolutions, setRevealedSolutions] = useState<Set<number>>(new Set());
  const [scoreResult, setScoreResult] = useState<{
    score10: number;
    correctCount: number;
    wrongCount: number;
    medal: string;
    medalColor: string;
    categoryStats: Record<string, { total: number; correct: number }>;
  } | null>(null);

  useEffect(() => {
    if (exam) {
      setTimeLeft(exam.durationMinutes * 60);
      setAnswers({});
      setFlagged(new Set());
      setRevealedSolutions(new Set());
      setIsSubmitted(false);
      setScoreResult(null);
    }
  }, [exam]);

  // Countdown timer (only active in exam mode when not submitted)
  useEffect(() => {
    if (!isOpen || isSubmitted || mode === 'practice' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, timeLeft, mode]);

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

  if (!isOpen || !exam) return null;

  const totalQuestions = exam.questions.length;
  const answeredCount = Object.keys(answers).filter(k => (answers[Number(k)] || '').trim().length > 0).length;
  const flaggedCount = flagged.size;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleInputChange = (qId: number, val: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const toggleFlag = (qId: number) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const toggleRevealSolution = (qId: number) => {
    setRevealedSolutions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const scrollToQuestion = (qId: number) => {
    const el = document.getElementById(`question-item-${qId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitted) return;

    let correctCount = 0;
    let wrongCount = 0;
    const categoryStats: Record<string, { total: number; correct: number }> = {};

    const evaluatedQuestions: MathQuestion[] = exam.questions.map(q => {
      const cat = q.category || 'Toán tổng hợp';
      if (!categoryStats[cat]) {
        categoryStats[cat] = { total: 0, correct: 0 };
      }
      categoryStats[cat].total++;

      const studentAns = (answers[q.id] || '').trim();
      const normalize = (s: string) => s.toLowerCase().replace(/[\s\.,]/g, '');
      const isCorrect = normalize(studentAns) === normalize(q.correctAnswer);

      if (isCorrect) {
        correctCount++;
        categoryStats[cat].correct++;
      } else {
        wrongCount++;
      }

      return {
        ...q,
        studentAnswer: studentAns || '(Chưa điền)',
        status: isCorrect ? 'correct' : 'wrong',
        statusText: isCorrect ? 'Đúng' : 'Sai / cần sửa'
      };
    });

    const total = exam.questions.length;
    const score10 = Number(((correctCount / total) * 10).toFixed(1));
    const accuracyRate = Number(((correctCount / total) * 100).toFixed(1));

    // Award Medal based on contest percentiles
    let medal = 'Giải Khuyến Khích';
    let medalColor = 'text-blue-600 bg-blue-50 border-blue-200';
    if (accuracyRate >= 85) {
      medal = '🥇 Huy Chương Vàng (Gold Medal)';
      medalColor = 'text-amber-700 bg-amber-50 border-amber-300';
    } else if (accuracyRate >= 70) {
      medal = '🥈 Huy Chương Bạc (Silver Medal)';
      medalColor = 'text-slate-700 bg-slate-100 border-slate-300';
    } else if (accuracyRate >= 55) {
      medal = '🥉 Huy Chương Đồng (Bronze Medal)';
      medalColor = 'text-orange-700 bg-orange-50 border-orange-300';
    }

    const summary: TestSummary = {
      title: exam.title,
      subtitle: `Thi trực tuyến – ${exam.programName} (${exam.round})`,
      studentName: currentUser.fullName,
      grade: `${exam.grade} • ${exam.program}`,
      testDate: new Date().toLocaleDateString('vi-VN'),
      totalQuestions: total,
      correctCount,
      wrongCount,
      unansweredCount: total - (correctCount + wrongCount),
      verifyCount: 0,
      score10,
      accuracyRate,
      completionRate: 100,
      sourceImagesCount: 0,
      notes: `Bài luyện thi ${exam.program} hoàn thành bởi ${currentUser.fullName} đạt ${score10}/10 điểm (${medal}).`
    };

    // Save session to user's history
    sessionService.createNewSession(currentUser.id, currentUser.fullName, summary, evaluatedQuestions, 0);

    setScoreResult({
      score10,
      correctCount,
      wrongCount,
      medal,
      medalColor,
      categoryStats
    });
    setIsSubmitted(true);

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-5 sm:p-6 text-white shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner shrink-0">
                <BookOpen className="w-6 h-6 text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                    {exam.program} {exam.year}
                  </span>
                  <span className="text-xs font-semibold text-blue-200">
                    {exam.round}
                  </span>
                  <span className="text-xs bg-white/15 px-2 py-0.5 rounded-md font-medium text-blue-100">
                    {exam.grade}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-black mt-1 truncate">{exam.title}</h3>
                <p className="text-xs text-blue-100 mt-0.5">
                  Thí sinh: <b>{currentUser.fullName}</b> • Điểm tối đa: <b>10.0</b>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Mode Toggle Button */}
              {!isSubmitted && (
                <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 text-xs font-bold">
                  <button
                    onClick={() => setMode('exam')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      mode === 'exam' ? 'bg-white text-indigo-900 shadow-xs' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    ⏱️ Thi bấm giờ
                  </button>
                  <button
                    onClick={() => setMode('practice')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      mode === 'practice' ? 'bg-white text-indigo-900 shadow-xs' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    📖 Luyện tập tự do
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                title="Đóng (hoặc ấn phím ESC)"
                className="p-2.5 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Subheader / Status Bar */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
            {mode === 'exam' ? (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span>Thời gian còn:</span>
                <span className={`font-mono text-base font-black ${timeLeft < 300 ? 'text-rose-600 animate-bounce' : 'text-indigo-700'}`}>
                  {timeDisplay}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chế độ Luyện tập: Thong thả làm bài & xem ngay lời giải</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
            <span>Tiến độ: <b className="text-indigo-700 font-bold">{answeredCount}/{totalQuestions}</b> câu</span>
            {flaggedCount > 0 && (
              <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Flag className="w-3 h-3 fill-amber-500 text-amber-500" />
                <b>{flaggedCount}</b> câu xem lại
              </span>
            )}
            <span className="hidden sm:inline">• Độ khó: <b className="text-indigo-600">{exam.difficulty}</b></span>
          </div>
        </div>

        {/* Main Content Area (2-column layout on Desktop: Questions + Palette) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Question Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
            {/* Score & Medal banner after submission */}
            {scoreResult && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl animate-in fade-in space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-block text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md">
                      Kết quả thi chính thức
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                      <Trophy className="w-7 h-7 text-amber-300 shrink-0" />
                      <span>{scoreResult.medal}</span>
                    </h4>
                    <p className="text-xs text-emerald-100">
                      Thí sinh: <b>{currentUser.fullName}</b> • Bài thi đã được lưu vào hệ thống dữ liệu đám mây.
                    </p>
                  </div>

                  <div className="text-right sm:border-l sm:border-white/20 sm:pl-6">
                    <div className="text-4xl font-extrabold text-white">
                      {scoreResult.score10} <span className="text-lg font-normal text-emerald-200">/ 10</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-100 mt-0.5">
                      Đúng {scoreResult.correctCount}/{totalQuestions} câu ({(scoreResult.correctCount / totalQuestions * 100).toFixed(0)}%)
                    </div>
                  </div>
                </div>

                {/* 5-Topic Competency Breakdown */}
                <div className="pt-4 border-t border-white/20 space-y-2.5">
                  <div className="text-xs font-bold text-emerald-100 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-amber-300" />
                    <span>Phân tích năng lực chuyên đề (Topic Competency Breakdown):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(scoreResult.categoryStats).map(([cat, stat]) => {
                      const pct = Math.round((stat.correct / stat.total) * 100);
                      return (
                        <div key={cat} className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-white truncate max-w-[180px]">{cat}</span>
                            <span className="font-mono font-bold text-amber-300">{stat.correct}/{stat.total} ({pct}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Questions List */}
            {exam.questions.map((q, idx) => {
              const isAnswered = (answers[q.id] || '').trim().length > 0;
              const isFlagged = flagged.has(q.id);
              const isRevealed = revealedSolutions.has(q.id);
              const studentAns = (answers[q.id] || '').trim();
              const isCorrectAns = studentAns.toLowerCase().replace(/[\s\.,]/g, '') === q.correctAnswer.toLowerCase().replace(/[\s\.,]/g, '');

              return (
                <div
                  id={`question-item-${q.id}`}
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                    isSubmitted
                      ? isCorrectAns
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-rose-300 bg-rose-50/30'
                      : isFlagged
                        ? 'border-amber-300 bg-amber-50/20 shadow-sm'
                        : isAnswered
                          ? 'border-indigo-200 bg-white shadow-xs'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-white'
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-lg">
                        Câu hỏi #{idx + 1}
                      </span>
                      {q.partTitle && (
                        <span className="text-xs font-semibold text-slate-500 hidden md:inline truncate max-w-[280px]">
                          {q.partTitle}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {q.category}
                      </span>

                      {!isSubmitted && (
                        <button
                          type="button"
                          onClick={() => toggleFlag(q.id)}
                          title={isFlagged ? 'Bỏ đánh dấu xem lại' : 'Đánh dấu cần xem lại'}
                          className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                            isFlagged
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50 border-slate-200'
                          }`}
                        >
                          <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                          <span className="hidden sm:inline">{isFlagged ? 'Đã ghim cờ' : 'Đánh dấu'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bilingual Question View: English Bold + Vietnamese Italic Not Bold */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                    <BilingualView text={q.question} />
                  </div>

                  {/* Keywords */}
                  {q.keywords && (
                    <div className="text-xs text-slate-500 italic bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 flex items-center gap-1.5">
                      <span className="not-italic font-bold text-amber-700">💡 Từ khóa:</span>
                      <span>{q.keywords}</span>
                    </div>
                  )}

                  {/* Student Answer Input Box */}
                  <div className="pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Đáp án của {currentUser.nickname}:
                      </label>

                      {/* In practice mode: Check answer immediately */}
                      {mode === 'practice' && !isSubmitted && (
                        <button
                          type="button"
                          onClick={() => toggleRevealSolution(q.id)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isRevealed ? 'Ẩn lời giải' : 'Kiểm tra & Xem lời giải'}</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        disabled={isSubmitted}
                        value={answers[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Gõ đáp án của con vào đây..."
                        className={`px-4 py-2.5 rounded-xl border text-sm font-bold w-full max-w-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                          isSubmitted
                            ? isCorrectAns
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : 'border-rose-400 bg-rose-50 text-rose-900'
                            : 'border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      />

                      {/* Result feedback */}
                      {isSubmitted && (
                        <div className="text-xs font-bold flex items-center gap-2">
                          {isCorrectAns ? (
                            <span className="text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-emerald-200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đúng hoàn toàn! (+1 điểm)
                            </span>
                          ) : (
                            <span className="text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-rose-200">
                              <X className="w-4 h-4 text-rose-600" />
                              <span>Đáp án đúng: <b className="text-emerald-800 underline">{q.correctAnswer}</b></span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Practice Mode Solution Accordion */}
                  {(isRevealed || isSubmitted) && (
                    <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-3 animate-in fade-in">
                      <div className="text-xs font-bold text-indigo-950 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span>Hướng dẫn giải chi tiết từng bước:</span>
                        </span>
                        <span className="text-indigo-700">Đáp số chuẩn: <b>{q.correctAnswer}</b></span>
                      </div>

                      {q.solutionSteps && q.solutionSteps.length > 0 && (
                        <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-700 space-y-1.5 pl-1 leading-relaxed">
                          {q.solutionSteps.map((step, sIdx) => (
                            <li key={sIdx}>
                              <MathView text={step.replace(/^Bước \d+:\s*/, '')} />
                            </li>
                          ))}
                        </ol>
                      )}

                      {q.tips && (
                        <div className="text-xs font-semibold text-emerald-900 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                          <span>💡 Mẹo giải nhanh:</span>
                          <span className="font-normal italic"><MathView text={q.tips} /></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Question Palette (Ma trận số câu hỏi 1..30) */}
          <aside className="w-72 border-l border-slate-200 bg-slate-50/90 p-5 flex flex-col justify-between hidden lg:flex shrink-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Bảng ma trận câu hỏi
                </h4>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                  {totalQuestions} câu
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 shrink-0" />
                  <span>Đã làm</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shrink-0" />
                  <span>Ghim cờ</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 shrink-0" />
                  <span>Chưa làm</span>
                </div>
              </div>

              {/* Grid of question buttons */}
              <div className="grid grid-cols-5 gap-2 max-h-[46vh] overflow-y-auto p-1">
                {exam.questions.map((q, idx) => {
                  const isAns = (answers[q.id] || '').trim().length > 0;
                  const isFlag = flagged.has(q.id);
                  const isCorrect = isSubmitted && (answers[q.id] || '').trim().toLowerCase().replace(/[\s\.,]/g, '') === q.correctAnswer.toLowerCase().replace(/[\s\.,]/g, '');
                  const isWrong = isSubmitted && !isCorrect;

                  let btnStyle = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100';
                  if (isSubmitted) {
                    if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-700 shadow-xs';
                    else btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-xs';
                  } else if (isFlag) {
                    btnStyle = 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300 font-bold';
                  } else if (isAns) {
                    btnStyle = 'bg-indigo-600 text-white border-indigo-700 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => scrollToQuestion(q.id)}
                      className={`h-9 rounded-xl border text-xs font-bold flex items-center justify-center transition-all active:scale-95 relative ${btnStyle}`}
                      title={`Nhảy tới Câu #${idx + 1}`}
                    >
                      {idx + 1}
                      {isFlag && !isSubmitted && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions inside Sidebar */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Nộp Bài Thi</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hoàn Tất & Xem Điểm</span>
                </button>
              )}

              <p className="text-[11px] text-center text-slate-400">
                Ấn <b>ESC</b> bất kỳ lúc nào để thoát ra
              </p>
            </div>
          </aside>
        </div>

        {/* Mobile Floating Footer Submit Bar */}
        <div className="lg:hidden p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-bold text-slate-600">
            Đã làm: <b className="text-indigo-700">{answeredCount}/{totalQuestions}</b>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-slate-100"
            >
              Thoát (ESC)
            </button>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-md active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nộp bài</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hoàn tất</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
