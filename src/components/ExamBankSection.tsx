import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Clock, Award, Play, Filter, Download, ChevronRight, CheckCircle2, Search, Target } from 'lucide-react';
import { EXAM_BANK, ExamPaper } from '../data/examBank';
import { EducationLevel, User } from '../types/auth';

interface ExamBankSectionProps {
  currentUser: User;
  onSelectExam: (exam: ExamPaper) => void;
}

export const ExamBankSection: React.FC<ExamBankSectionProps> = ({
  currentUser,
  onSelectExam
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [onlyForStudent, setOnlyForStudent] = useState<boolean>(false);

  // Determine which exams are specifically tailored for current user
  const isRecommendedForUser = (e: ExamPaper) => {
    if (currentUser.id === 'user_ruby' && (e.program === 'ASMO' || e.program === 'IKMC')) return true;
    if (currentUser.id === 'user_lisa' && e.program === 'ITMC') return true;
    if (currentUser.id === 'user_tony' && e.program === 'GMATH') return true;
    if (currentUser.id === 'user_chip' && e.program === 'CHUYEN_THPT') return true;
    return false;
  };

  const filteredExams = useMemo(() => {
    return EXAM_BANK.filter(e => {
      if (onlyForStudent && !isRecommendedForUser(e)) return false;
      if (selectedLevel !== 'all' && e.level !== selectedLevel) return false;
      if (selectedProgram !== 'all' && e.program !== selectedProgram) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          e.title.toLowerCase().includes(q) ||
          e.program.toLowerCase().includes(q) ||
          e.grade.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [selectedLevel, selectedProgram, searchQuery, onlyForStudent, currentUser]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 md:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Kho Đề Thi & Giả Lập Thi Thử Quốc Tế
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {EXAM_BANK.length} Bộ Đề Chuẩn Thể Lệ
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              100% Song ngữ Anh – Việt • Đầy đủ số câu & thời gian theo thể lệ thật: ITMC (30 câu), ASMO (25 câu), IKMC (24 câu), GMATH (20 câu), Chuyên Toán (5 bài lớn)
            </p>
          </div>
        </div>

        {/* Search bar & Tailored toggle */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm kỳ thi, khối lớp..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => setOnlyForStudent(!onlyForStudent)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              onlyForStudent
                ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Đề phù hợp với {currentUser.nickname}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs / Quick selection */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-1">Lọc nhanh:</span>
        <button
          onClick={() => { setSelectedProgram('all'); setSelectedLevel('all'); setOnlyForStudent(false); }}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedProgram === 'all' && selectedLevel === 'all' && !onlyForStudent
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Tất cả đề thi
        </button>
        <button
          onClick={() => setSelectedProgram('ITMC')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedProgram === 'ITMC' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          ITMC (Lớp 6 - Lisa)
        </button>
        <button
          onClick={() => setSelectedProgram('ASMO')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedProgram === 'ASMO' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          ASMO (Lớp 3 - Ruby)
        </button>
        <button
          onClick={() => setSelectedProgram('IKMC')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedProgram === 'IKMC' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Kangaroo IKMC (Lớp 3–4)
        </button>
        <button
          onClick={() => setSelectedProgram('GMATH')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedProgram === 'GMATH' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          GMATH (Lớp 1 - Tony)
        </button>
        <button
          onClick={() => setSelectedProgram('CHUYEN_THPT')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedProgram === 'CHUYEN_THPT' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Chuyên Toán (Lớp 10 - Chip)
        </button>
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredExams.map((exam) => {
          const isRec = isRecommendedForUser(exam);

          return (
            <div
              key={exam.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 group relative ${
                isRec
                  ? 'border-indigo-300 bg-gradient-to-b from-indigo-50/40 to-white shadow-xs hover:shadow-md hover:border-indigo-400'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Badge row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {exam.program} {exam.year}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {exam.grade}
                    </span>
                  </div>

                  {isRec && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3" />
                      <span>Đề cho {currentUser.nickname}</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {exam.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {exam.description}
                </p>

                {/* Meta stats */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200/80">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{exam.durationMinutes} phút</span>
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-slate-700">{exam.questionCount} câu hỏi</span>
                  <span>•</span>
                  <span className="text-indigo-600 font-bold">{exam.difficulty}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectExam(exam)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Vào Thi Trực Tuyến Ngay</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
