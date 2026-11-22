import React from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Award,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  Target,
  ArrowRight
} from 'lucide-react';
import { MathQuestion, TestSummary } from '../data/mockData';

interface DashboardOverviewProps {
  summary: TestSummary;
  questions: MathQuestion[];
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  summary,
  questions,
  activeFilter,
  onSelectFilter
}) => {
  // Category calculations
  const categoryStats: Record<string, { total: number; correct: number; wrong: number }> = {};
  questions.forEach(q => {
    // simplified category grouping
    let group = 'Số học & Phép tính';
    if (q.category.includes('Dãy') || q.category.includes('Quy luật')) group = 'Dãy số & Quy luật';
    else if (q.category.includes('Cấu tạo') || q.category.includes('Chữ số')) group = 'Cấu tạo số & Chữ số';
    else if (q.category.includes('Hình')) group = 'Hình học & Đo lường';
    else if (q.category.includes('Dirichlet') || q.category.includes('Tổ hợp') || q.category.includes('bậc thang')) group = 'Logic & Dirichlet';
    else if (q.category.includes('Lịch') || q.category.includes('Thời gian') || q.category.includes('tuổi')) group = 'Lịch & Bài toán tuổi';
    else if (q.category.includes('tiền') || q.category.includes('thực tế') || q.category.includes('chuyển dịch')) group = 'Toán thực tế & Đổi tiền';

    if (!categoryStats[group]) {
      categoryStats[group] = { total: 0, correct: 0, wrong: 0 };
    }
    categoryStats[group].total++;
    if (q.status === 'correct') categoryStats[group].correct++;
    if (q.status === 'wrong') categoryStats[group].wrong++;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Student Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-indigo-950/10">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-blue-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Báo Cáo Thành Tích Học Tập Cuối Tuần</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Chúc mừng {summary.studentName}! 🎉
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Con đã xuất sắc hoàn thành <strong className="text-white font-bold">{summary.totalQuestions - summary.unansweredCount}/{summary.totalQuestions} câu hỏi</strong> trong bộ đề rèn luyện tư duy Olympic Tuần 11. Cùng khám phá bảng thành tích và giải lại 17 câu thử thách nhé!
            </p>
          </div>

          {/* Quick Score Badge */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl self-start md:self-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-slate-900 shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-200 font-bold">Điểm số ước tính</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">{summary.score10}</span>
                <span className="text-lg font-semibold text-blue-200">/ 10</span>
              </div>
              <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Độ chính xác {summary.accuracyRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Status Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Correct */}
        <button
          onClick={() => onSelectFilter('correct')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden ${
            activeFilter === 'correct'
              ? 'bg-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {((summary.correctCount / summary.totalQuestions) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{summary.correctCount} câu</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center justify-between">
            <span>Đúng theo ảnh</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Wrong / Need Review */}
        <button
          onClick={() => onSelectFilter('wrong')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden ${
            activeFilter === 'wrong'
              ? 'bg-rose-50 border-rose-400 shadow-md ring-2 ring-rose-500/20'
              : 'bg-white border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
              <XCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 animate-pulse">
              Ưu tiên sửa
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-600">{summary.wrongCount} câu</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center justify-between">
            <span>Sai / cần sửa</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Need Verification */}
        <button
          onClick={() => onSelectFilter('need_verify')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden ${
            activeFilter === 'need_verify'
              ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-500/20'
              : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <HelpCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Xem lại hình
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{summary.verifyCount} câu</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center justify-between">
            <span>Cần xác minh đề/hình</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Unanswered */}
        <button
          onClick={() => onSelectFilter('unanswered')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden ${
            activeFilter === 'unanswered'
              ? 'bg-purple-50 border-purple-400 shadow-md ring-2 ring-purple-500/20'
              : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
              Chưa điền
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{summary.unansweredCount} câu</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center justify-between">
            <span>Chưa làm bài</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Skills Radar & Teacher Pedagogical Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Phân Tích Năng Lực Theo Chuyên Đề
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Tỷ lệ làm đúng trên từng nhóm kiến thức Toán học
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {Object.entries(categoryStats).map(([name, stat]) => {
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              let barColor = 'bg-blue-600';
              if (pct >= 80) barColor = 'bg-emerald-500';
              else if (pct < 50) barColor = 'bg-rose-500';
              else barColor = 'bg-amber-500';

              return (
                <div key={name} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="truncate pr-2">{name}</span>
                    <span className="text-slate-900 font-bold">{stat.correct}/{stat.total} câu ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pedagogical Advice & Encouragement (1 col) */}
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 rounded-3xl p-6 sm:p-7 border border-indigo-100/80 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <span>Lời Khuyên Sư Phạm Cho Bé</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed">
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-xs">
                <strong className="text-emerald-700 font-bold block mb-1">🌟 Điểm mạnh vượt trội:</strong>
                Con phản xạ tính toán rất tốt với các bài toán dãy số cơ bản, bài toán tuổi và phép toán quy ước mới.
              </div>
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-xs">
                <strong className="text-rose-700 font-bold block mb-1">⚠️ 3 Bẫy con cần lưu ý:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                  <li><strong>Năm nhuận:</strong> Năm 2020 chia hết cho 4 nên tháng 2 có 29 ngày (Câu 35).</li>
                  <li><strong>Đếm chữ số 8:</strong> Nhớ đếm cả hàng chục 80–89 và trừ số 88 (Câu 42).</li>
                  <li><strong>Cắt hình vuông:</strong> Khi chia hình, chu vi mới gấp nhiều lần chu vi cũ (Câu 47).</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectFilter('wrong')}
            className="w-full mt-3 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
          >
            <span>Bắt đầu ôn lại 17 câu sai</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
