import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { MathQuestion } from '../data/mockData';

interface QuestionFiltersProps {
  questions: MathQuestion[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'id' | 'wrong_first';
  onSortChange: (sort: 'id' | 'wrong_first') => void;
}

export const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  questions,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}) => {
  const counts = {
    all: questions.length,
    wrong: questions.filter(q => q.status === 'wrong').length,
    correct: questions.filter(q => q.status === 'correct').length,
    need_verify: questions.filter(q => q.status === 'need_verify').length,
    unanswered: questions.filter(q => q.status === 'unanswered').length
  };

  const categories = Array.from(new Set(questions.map(q => q.category))).sort();

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Tất cả ({counts.all})
        </button>

        <button
          onClick={() => onFilterChange('wrong')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === 'wrong'
              ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-400/20'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
          }`}
        >
          <span>Cần sửa</span>
          <span className="px-1.5 py-0.5 rounded-full text-xs bg-rose-200/80 text-rose-900 font-extrabold">
            {counts.wrong}
          </span>
        </button>

        <button
          onClick={() => onFilterChange('correct')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === 'correct'
              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/20'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          <span>Đúng</span>
          <span className="px-1.5 py-0.5 rounded-full text-xs bg-emerald-200/80 text-emerald-900 font-extrabold">
            {counts.correct}
          </span>
        </button>

        <button
          onClick={() => onFilterChange('need_verify')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === 'need_verify'
              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/20'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          }`}
        >
          <span>Cần xác minh</span>
          <span className="px-1.5 py-0.5 rounded-full text-xs bg-amber-200/80 text-amber-900 font-extrabold">
            {counts.need_verify}
          </span>
        </button>

        <button
          onClick={() => onFilterChange('unanswered')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === 'unanswered'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          <span>Chưa làm</span>
          <span className="px-1.5 py-0.5 rounded-full text-xs bg-purple-200/80 text-purple-900 font-extrabold">
            {counts.unanswered}
          </span>
        </button>
      </div>

      {/* Search and Secondary Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Tìm theo số câu (VD: 6), từ khóa hoặc nội dung..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Category Select */}
        <div className="sm:col-span-4 relative">
          <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={e => onCategoryChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
          >
            <option value="all">Tất cả chuyên đề</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="sm:col-span-2 relative">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value as any)}
            className="w-full pl-8 pr-6 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
          >
            <option value="id">Thứ tự câu</option>
            <option value="wrong_first">Câu sai lên đầu</option>
          </select>
        </div>
      </div>
    </div>
  );
};
