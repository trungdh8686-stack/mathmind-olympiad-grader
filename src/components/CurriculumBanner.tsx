import React, { useState } from 'react';
import { BookOpen, Globe, Award, Sparkles, Check, ChevronRight } from 'lucide-react';
import { EducationLevel, EDUCATION_LEVELS, MATH_PROGRAMS, User } from '../types/auth';

interface CurriculumBannerProps {
  user: User;
  onUpdateCurriculum: (level: EducationLevel, program: string, grade?: string) => void;
}

export const CurriculumBanner: React.FC<CurriculumBannerProps> = ({
  user,
  onUpdateCurriculum
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentLevelObj = EDUCATION_LEVELS.find(l => l.id === user.level) || EDUCATION_LEVELS[0];
  const currentProgramObj = MATH_PROGRAMS.find(p => p.id === user.targetProgram) || MATH_PROGRAMS[0];

  const handleSelectLevel = (lvl: EducationLevel) => {
    // Find first program matching level
    const matchProg = MATH_PROGRAMS.find(p => p.level === lvl) || MATH_PROGRAMS[0];
    onUpdateCurriculum(lvl, matchProg.id);
  };

  const handleSelectProgram = (progId: string) => {
    const prog = MATH_PROGRAMS.find(p => p.id === progId);
    if (prog) {
      onUpdateCurriculum(prog.level, prog.id);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-xl mb-6 border border-indigo-500/20 relative overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left summary */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
            {currentLevelObj.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Hệ Thống Toán Đa Cấp & Chuẩn Thi Đấu
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 shadow-xs">
                {currentProgramObj.badge}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black mt-0.5 flex items-center gap-2 flex-wrap">
              <span>{currentLevelObj.name} ({currentLevelObj.grades})</span>
              <span className="text-slate-400 font-normal">•</span>
              <span className="text-blue-200">{currentProgramObj.name} – {currentProgramObj.description}</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Lớp thực tế của con: <b className="text-amber-300">{user.currentGrade}</b> • Nền tảng mở quyền giải toán toàn diện mọi cấp học (Lớp 1 – 12 & Olympic Quốc tế) cho <b>{user.fullName}</b>.
            </p>
          </div>
        </div>

        {/* Right switch toggle button */}
        <div className="shrink-0 flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/20 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isExpanded ? 'Thu gọn bộ lọc' : 'Tự do đổi Cấp Học / Kỳ Thi'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded selector drawers */}
      {isExpanded && (
        <div className="mt-5 pt-5 border-t border-white/15 animate-in fade-in space-y-4">
          {/* Level Switcher */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
              1. Tự do chuyển đổi cấp học bất kỳ lúc nào:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {EDUCATION_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => handleSelectLevel(lvl.id)}
                  className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    user.level === lvl.id
                      ? 'bg-blue-600/40 border-blue-400 ring-2 ring-blue-300 text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <span className="text-2xl">{lvl.icon}</span>
                  <div>
                    <div className="text-xs font-bold">{lvl.name}</div>
                    <div className="text-[11px] text-slate-300">{lvl.grades}</div>
                  </div>
                  {user.level === lvl.id && (
                    <Check className="w-4 h-4 text-blue-300 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Program / Exam Switcher */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
              2. Chọn chương trình hoặc kỳ thi toán mục tiêu:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {MATH_PROGRAMS.map(prog => (
                <button
                  key={prog.id}
                  onClick={() => handleSelectProgram(prog.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    user.targetProgram === prog.id
                      ? 'bg-indigo-600/50 border-indigo-400 ring-2 ring-indigo-300 text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">{prog.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/20 text-white font-semibold">
                      {prog.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">
                    {prog.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
