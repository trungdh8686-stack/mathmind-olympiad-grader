import React, { useState, useEffect } from 'react';
import { X, Clock, Award, CheckCircle2, AlertCircle, Sparkles, Send, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamPaper } from '../data/examBank';
import { MathQuestion, TestSummary } from '../data/mockData';
import { User } from '../types/auth';
import { sessionService } from '../services/sessionService';

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
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60); // seconds
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{ score10: number; correctCount: number; wrongCount: number } | null>(null);

  useEffect(() => {
    if (exam) {
      setTimeLeft(exam.durationMinutes * 60);
      setAnswers({});
      setIsSubmitted(false);
      setScoreResult(null);
    }
  }, [exam]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isSubmitted || timeLeft <= 0) return;
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
  }, [isOpen, isSubmitted, timeLeft]);

  if (!isOpen || !exam) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleInputChange = (qId: number, val: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;

    let correctCount = 0;
    let wrongCount = 0;

    const evaluatedQuestions: MathQuestion[] = exam.questions.map(q => {
      const studentAns = (answers[q.id] || '').trim();
      const isCorrect = studentAns.toLowerCase() === q.correctAnswer.toLowerCase() ||
        studentAns.replace(/\s+/g, '') === q.correctAnswer.replace(/\s+/g, '');

      if (isCorrect) correctCount++;
      else wrongCount++;

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
      notes: `Bài luyện thi trực tuyến hoàn thành bởi ${currentUser.fullName} vào ${new Date().toLocaleTimeString('vi-VN')}.`
    };

    // Save session to user's history
    sessionService.createNewSession(currentUser.id, currentUser.fullName, summary, evaluatedQuestions, 0);

    setScoreResult({ score10, correctCount, wrongCount });
    setIsSubmitted(true);

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onExamCompleted({ questions: evaluatedQuestions, summary });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  {exam.program} {exam.year}
                </span>
                <span className="text-xs font-semibold text-blue-200">
                  {exam.round}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black mt-0.5">{exam.title}</h3>
              <p className="text-xs text-blue-100">
                Thí sinh: <b>{currentUser.fullName}</b> ({currentUser.currentGrade})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Clock className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>Thời gian còn lại:</span>
            <span className={`font-mono text-base font-black ${timeLeft < 300 ? 'text-rose-600' : 'text-indigo-700'}`}>
              {timeDisplay}
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Số câu: <b>{exam.questions.length}</b> • Độ khó: <b className="text-indigo-600">{exam.difficulty}</b>
          </div>
        </div>

        {/* Question List Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {scoreResult && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg animate-in fade-in flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                  <span>Hoàn thành bài thi xuất sắc!</span>
                </h4>
                <p className="text-xs text-emerald-100 mt-1">
                  Đã tự động chấm điểm và lưu vào lịch sử tiến độ của {currentUser.fullName}.
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold">{scoreResult.score10} <span className="text-lg">/ 10</span></div>
                <div className="text-xs font-semibold text-emerald-100">Đúng {scoreResult.correctCount}/{exam.questions.length} câu</div>
              </div>
            </div>
          )}

          {exam.questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-lg">
                  Câu hỏi #{idx + 1}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {q.category}
                </span>
              </div>

              <div className="font-bold text-sm sm:text-base text-slate-900 leading-relaxed">
                {q.question}
              </div>

              {q.keywords && (
                <div className="text-xs text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                  💡 Từ khóa: {q.keywords}
                </div>
              )}

              {/* Student Input */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đáp án của {currentUser.nickname}:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="Gõ đáp án của con vào đây..."
                    className={`px-4 py-2 rounded-xl border text-sm font-bold w-full max-w-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                      isSubmitted
                        ? answers[q.id]?.trim().toLowerCase() === q.correctAnswer.toLowerCase()
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                          : 'border-rose-400 bg-rose-50 text-rose-900'
                        : 'border-slate-300 bg-white'
                    }`}
                  />

                  {isSubmitted && (
                    <div className="text-xs font-bold flex items-center gap-2">
                      {answers[q.id]?.trim().toLowerCase() === q.correctAnswer.toLowerCase() ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác!
                        </span>
                      ) : (
                        <span className="text-rose-600">
                          Đáp án đúng: <b className="text-emerald-700">{q.correctAnswer}</b>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-xs sm:text-sm font-bold hover:bg-slate-100"
            >
              {isSubmitted ? 'Đóng và xem phân tích' : 'Hủy bài thi'}
            </button>

            {!isSubmitted ? (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Nộp Bài Thi Ngay</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Xem Hướng Dẫn Giải Chi Tiết</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
