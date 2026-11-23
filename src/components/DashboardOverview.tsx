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
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { MathQuestion, TestSummary } from '../data/mockData';
import { UserProgressStats } from '../services/sessionService';
import { Upload, Calendar, Play } from 'lucide-react';

interface DashboardOverviewProps {
  summary: TestSummary;
  questions: MathQuestion[];
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  userStats?: UserProgressStats;
  onOpenHistory?: () => void;
  onUploadNew?: () => void;
  onStartPractice?: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  summary,
  questions,
  activeFilter,
  onSelectFilter,
  userStats,
  onOpenHistory,
  onUploadNew,
  onStartPractice
}) => {
  const handleCardClick = (filter: string) => {
    onSelectFilter(filter);
    setTimeout(() => {
      document.getElementById('question-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Category calculations
  const categoryStats: Record<string, { total: number; correct: number; wrong: number }> = {};
  questions.forEach(q => {
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

  if (questions.length === 0) {
    return (
      <div className="space-y-6">
        {/* Empty State Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-indigo-950/10">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-blue-100 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Không Gian Học Tập Thông Minh</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  <BookOpen className="w-3 h-3" />
                  <span>Dữ Liệu Độc Lập</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Chào mừng {summary.studentName}! 🚀
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
                Hiện tại con chưa có bài tập nào được nạp vào hệ thống. Dữ liệu của con được lưu trữ độc lập hoàn toàn. Con có thể bắt đầu bằng cách tải ảnh bài làm lên để AI chấm điểm hoặc thử sức làm đề thi trực tuyến ngay dưới đây!
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              {onUploadNew && (
                <button
                  onClick={onUploadNew}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Chấm Bài Mới</span>
                </button>
              )}
              {onStartPractice && (
                <button
                  onClick={onStartPractice}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm border border-white/30 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Luyện Thi Ngay</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Informational Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <Upload className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 text-base">1. Kéo thả & Chấm điểm ảnh bài tập</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tải lên 1 hoặc nhiều ảnh chụp phiếu bài tập trên lớp của con. AI Gemini Pro sẽ tự động nhận diện chữ viết tay, so khớp đáp án chuẩn và phân tích lỗi sai chi tiết từng bước.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 text-base">2. Kho Đề Thi & Luyện Thi Trực Tuyến</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Khám phá kho đề thi Olympic Quốc tế ASMO, ITMC, GMATH, Kangaroo và Chuyên Toán. Con làm bài trực tuyến có đồng hồ đếm ngược và xem điểm số ngay lập tức!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Statistics Bar (Điểm trung bình qua các lần chấm) */}
      {userStats && userStats.totalSessions > 0 && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-base sm:text-lg">Theo Dõi Tiến Độ & Điểm Trung Bình</h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  {userStats.totalSessions} Phiên Đã Chấm
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Điểm số trung bình và lịch sử đối chiếu qua các lần đưa bài vào kiểm tra
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="text-center sm:text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase">Điểm Trung Bình</div>
              <div className="text-2xl font-black text-amber-300">{userStats.averageScore} <span className="text-xs text-slate-400 font-normal">/ 10</span></div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase">Điểm Cao Nhất</div>
              <div className="text-2xl font-black text-emerald-400">{userStats.highestScore} <span className="text-xs text-slate-400 font-normal">/ 10</span></div>
            </div>
            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer ml-auto md:ml-0"
              >
                <Clock className="w-4 h-4" />
                <span>Lịch Sử Chấm ({userStats.totalSessions})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Banner / Student Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-indigo-950/10">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-blue-100 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Báo Cáo Thành Tích Học Tập</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                <BookOpen className="w-3 h-3" />
                <span>{summary.testDate}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Chúc mừng {summary.studentName}! 🎉
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              Con đã xuất sắc hoàn thành <strong className="text-white font-bold">{summary.totalQuestions - summary.unansweredCount}/{summary.totalQuestions} câu hỏi</strong> trong bộ đề rèn luyện tư duy Olympic. Hãy bấm vào các thẻ bên dưới để xem hướng dẫn giải chi tiết chuẩn SGK và thử giải lại 17 câu thử thách nhé!
            </p>
          </div>

          {/* Quick Score Badge */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl shrink-0 self-start md:self-auto">
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

      {/* 4 Interactive Status Metric Cards - Click scrolls to question list */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Correct */}
        <button
          onClick={() => handleCardClick('correct')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden cursor-pointer ${
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
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{summary.correctCount} câu</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 flex items-center justify-between">
            <span>Đúng theo ảnh</span>
            <span className="text-emerald-600 text-xs font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>

        {/* Wrong / Need Review */}
        <button
          onClick={() => handleCardClick('wrong')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden cursor-pointer ${
            activeFilter === 'wrong'
              ? 'bg-rose-50 border-rose-400 shadow-md ring-2 ring-rose-500/20'
              : 'bg-white border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
              <XCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 animate-pulse">
              Ưu tiên sửa
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">{summary.wrongCount} câu</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 flex items-center justify-between">
            <span>Sai / cần sửa</span>
            <span className="text-rose-600 text-xs font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>

        {/* Need Verification */}
        <button
          onClick={() => handleCardClick('need_verify')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden cursor-pointer ${
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
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{summary.verifyCount} câu</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 flex items-center justify-between">
            <span>Cần xác minh</span>
            <span className="text-amber-600 text-xs font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>

        {/* Unanswered */}
        <button
          onClick={() => handleCardClick('unanswered')}
          className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group overflow-hidden cursor-pointer ${
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
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{summary.unansweredCount} câu</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 flex items-center justify-between">
            <span>Chưa làm bài</span>
            <span className="text-purple-600 text-xs font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>
      </div>

      {/* Skills Radar & Teacher Review */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Phân Tích Năng Lực Theo Chuyên Đề
                </h3>
                <p className="text-xs text-slate-500">
                  Tỷ lệ làm đúng trên từng nhóm kiến thức Toán học Olympic
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
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
                    <span className="text-slate-900 font-bold whitespace-nowrap">{stat.correct}/{stat.total} câu ({pct}%)</span>
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

        {/* Pedagogical Advice for Ruby (1 col) */}
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 rounded-3xl p-6 sm:p-7 border border-indigo-100/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <span>Lời Khuyên Sư Phạm Cho Ruby</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed">
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-xs">
                <strong className="text-emerald-700 font-bold block mb-1">🌟 Điểm mạnh của Ruby:</strong>
                Con phản xạ tính toán rất tốt với các bài toán dãy số cơ bản, bài toán tuổi và phép toán quy ước mới.
              </div>
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-xs">
                <strong className="text-rose-700 font-bold block mb-1">⚠️ 3 Bẫy tư duy Ruby lưu ý:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                  <li><strong>Năm nhuận:</strong> Năm 2020 chia hết cho 4 nên tháng 2 có 29 ngày (Câu 35).</li>
                  <li><strong>Đếm chữ số 8:</strong> Nhớ đếm cả hàng chục 80–89 và trừ số 88 (Câu 42).</li>
                  <li><strong>Cắt ghép hình:</strong> Khi chia hình, chu vi các hình nhỏ tăng lên rất nhiều (Câu 47).</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleCardClick('wrong')}
            className="w-full mt-3 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Bắt đầu ôn lại 17 câu sai</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
