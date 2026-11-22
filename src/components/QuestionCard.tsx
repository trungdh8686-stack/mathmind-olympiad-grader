import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  Lightbulb,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathQuestion } from '../data/mockData';
import { MathView } from './MathView';

interface QuestionCardProps {
  question: MathQuestion;
  onFixed?: (questionId: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onFixed }) => {
  // Wrong questions start expanded; correct questions can be expanded with 1 click
  const [isExpanded, setIsExpanded] = useState<boolean>(question.status === 'wrong');
  const [retryInput, setRetryInput] = useState<string>('');
  const [isFixedLocally, setIsFixedLocally] = useState<boolean>(false);
  const [retryFeedback, setRetryFeedback] = useState<'success' | 'incorrect' | null>(null);

  // Normalize string for checking answers (e.g. "420 cm²" -> "420", "Thứ Ba" -> "thứ ba")
  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!retryInput.trim()) return;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[.,\s]/g, '')
        .replace(/cm²|cm2|cm|cặp|usd|\$|tờ/g, '');

    const inputClean = normalize(retryInput);
    const correctClean = normalize(question.correctAnswer);

    if (inputClean === correctClean || correctClean.includes(inputClean) || inputClean.includes(correctClean)) {
      setIsFixedLocally(true);
      setRetryFeedback('success');
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (err) {
        console.log(err);
      }
      if (onFixed) {
        onFixed(question.id);
      }
    } else {
      setRetryFeedback('incorrect');
    }
  };

  const isWrong = question.status === 'wrong' && !isFixedLocally;
  const isCorrect = question.status === 'correct' || isFixedLocally;
  const isVerify = question.status === 'need_verify' && !isFixedLocally;
  const isUnanswered = question.status === 'unanswered' && !isFixedLocally;

  let cardBorder = 'border-slate-200 hover:border-slate-300';

  if (isCorrect) {
    cardBorder = 'border-emerald-200 bg-white hover:border-emerald-300';
  } else if (isWrong) {
    cardBorder = 'border-rose-200 bg-rose-50/15 hover:border-rose-300 shadow-xs';
  } else if (isVerify) {
    cardBorder = 'border-amber-200 bg-amber-50/15 hover:border-amber-300';
  } else if (isUnanswered) {
    cardBorder = 'border-purple-200 bg-purple-50/15 hover:border-purple-300';
  }

  return (
    <div className={`rounded-3xl border transition-all duration-200 p-5 sm:p-6 bg-white ${cardBorder}`}>
      {/* Top row: Number, Title, Badges */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">
            #{question.id < 10 ? `0${question.id}` : question.id}
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap">
                {question.partTitle}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap">
                {question.category}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 whitespace-nowrap">
                {question.difficulty}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              <MathView text={question.title} />
            </h4>
          </div>
        </div>

        {/* Status Indicator Badge */}
        <div className="flex items-center gap-2 shrink-0">
          {isCorrect && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isFixedLocally ? 'Ruby đã sửa đúng! 🎉' : 'Đúng theo ảnh'}</span>
            </div>
          )}
          {isWrong && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-rose-100 text-rose-800 border border-rose-200 whitespace-nowrap animate-pulse">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Sai / cần sửa</span>
            </div>
          )}
          {isVerify && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Cần xác minh</span>
            </div>
          )}
          {isUnanswered && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-purple-100 text-purple-800 border border-purple-200 whitespace-nowrap">
              <Clock className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Chưa làm</span>
            </div>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div className="py-4 space-y-2">
        <div className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
          <MathView text={question.question} />
        </div>
        {question.keywords && (
          <div className="text-xs text-slate-500 font-medium px-1 flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-600 whitespace-nowrap">Từ khóa song ngữ:</span>
            <span>{question.keywords}</span>
          </div>
        )}
      </div>

      {/* Answer Comparison Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 pb-4">
        {/* Student's answer */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isWrong ? 'bg-rose-50/70 border-rose-200' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đáp án Ruby ghi</div>
            <div className={`text-lg sm:text-xl font-extrabold mt-0.5 ${
              isWrong ? 'text-rose-600 line-through' : 'text-slate-800'
            }`}>
              {question.studentAnswer}
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0">
            {isWrong ? (
              <XCircle className="w-5 h-5 text-rose-500" />
            ) : isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <HelpCircle className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>

        {/* Correct answer */}
        <div className="p-4 rounded-2xl border bg-emerald-50/70 border-emerald-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Đáp án đúng chuẩn</div>
            <div className="text-lg sm:text-xl font-extrabold text-emerald-800 mt-0.5">
              {question.correctAnswer}
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Check className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Student mistake callout (if wrong) */}
      {question.studentMistake && (
        <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-rose-200/70 text-rose-800 shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <strong className="font-bold block text-rose-950">Phân tích sai sót của con:</strong>
            <p className="mt-0.5 leading-relaxed">{question.studentMistake}</p>
          </div>
        </div>
      )}

      {/* Interactive Retry Mode for wrong questions */}
      {question.status === 'wrong' && (
        <div className="mb-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-900">
              <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Ruby thử giải lại câu này nhé!</span>
            </div>
            {isFixedLocally && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                Xuất sắc! Con đã sửa đúng! 🌟
              </span>
            )}
          </div>

          <form onSubmit={checkAnswer} className="flex gap-2">
            <input
              type="text"
              value={retryInput}
              onChange={e => {
                setRetryInput(e.target.value);
                setRetryFeedback(null);
              }}
              placeholder={`Nhập đáp án con tính lại (Gợi ý: ${question.correctAnswer.slice(0, 1)}...)`}
              className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Kiểm tra
            </button>
          </form>

          {retryFeedback === 'incorrect' && (
            <p className="text-xs text-rose-600 font-medium">
              Chưa chính xác rồi Ruby ơi, con xem các bước giải chi tiết phía dưới để tính lại nhé! 💪
            </p>
          )}
        </div>
      )}

      {/* Accordion Toggle for Detailed Solution (Available for ALL questions: both correct and wrong!) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between pt-3 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors border-t border-slate-100 cursor-pointer"
      >
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>{isExpanded ? 'Thu gọn hướng dẫn giải' : 'Xem hướng dẫn giải chi tiết chuẩn phương pháp SGK & Olympic'}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
      </button>

      {/* Detailed Solution Steps */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Các bước giải chi tiết chuẩn phương pháp sư phạm:
            </div>
            <div className="space-y-2 pl-3 border-l-2 border-indigo-300">
              {question.solutionSteps && question.solutionSteps.length > 0 ? (
                question.solutionSteps.map((step, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    <MathView text={step} />
                  </div>
                ))
              ) : (
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <p>Đáp số chính xác: <strong className="text-emerald-700">{question.correctAnswer}</strong>.</p>
                  <p className="text-slate-500 mt-1">{question.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Golden Tips */}
          {question.tips && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-950">Ghi nhớ & Mẹo giải nhanh: </strong>
                <span className="leading-relaxed"><MathView text={question.tips} /></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
