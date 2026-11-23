import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Clock, Award, Play, Filter, Download, ChevronRight, CheckCircle2 } from 'lucide-react';
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
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredExams = useMemo(() => {
    return EXAM_BANK.filter(e => {
      if (selectedLevel !== 'all' && e.level !== selectedLevel) return false;
      if (selectedProgram !== 'all' && e.program !== selectedProgram) return false;
      if (selectedYear !== 'all' && e.year.toString() !== selectedYear) return false;
      return true;
    });
  }, [selectedLevel, selectedProgram, selectedYear]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Kho Đề Thi & Luyện Tập Trực Tuyến Đa Cấp
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {EXAM_BANK.length} Bộ Đề Tuyển Chọn
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Đề thi cập nhật 2024 – 2026: ASMO, ITMC, GMATH, SASMO, AMO, Kangaroo, Chuyên Toán & GDPT Mới
            </p>
          </div>
        </div>

        {/* Quick Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tất cả cấp học</option>
            <option value="primary">Tiểu học (Lớp 1 – 5)</option>
            <option value="secondary">THCS (Lớp 6 – 9)</option>
            <option value="high_school">THPT (Lớp 10 – 12)</option>
          </select>

          {/* Program Filter */}
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tất cả kỳ thi</option>
            <option value="ASMO">ASMO (Quốc tế)</option>
            <option value="ITMC">ITMC (Đông Nam Á)</option>
            <option value="GMATH">GMATH (Tiếng Anh)</option>
            <option value="IKMC">Kangaroo (IKMC)</option>
            <option value="CHUYEN_THPT">Chuyên Toán / VMO</option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tất cả các năm</option>
            <option value="2026">Năm 2026 (Mới nhất)</option>
            <option value="2025">Năm 2025</option>
            <option value="2024">Năm 2024</option>
          </select>
        </div>
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Badge row */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  {exam.program} {exam.year}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {exam.grade}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {exam.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {exam.description}
              </p>

              {/* Meta stats */}
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200/80">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exam.durationMinutes} phút</span>
                </span>
                <span>•</span>
                <span>{exam.questionCount} câu hỏi</span>
                <span>•</span>
                <span className="text-indigo-600 font-semibold">{exam.difficulty}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onSelectExam(exam)}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Luyện Thi Online Ngay</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
