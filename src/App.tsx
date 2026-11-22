import React, { useState, useMemo } from 'react';
import {
  INITIAL_QUESTIONS,
  INITIAL_SUMMARY,
  MathQuestion,
  TestSummary
} from './data/mockData';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { DropZoneSection } from './components/DropZoneSection';
import { QuestionFilters } from './components/QuestionFilters';
import { QuestionCard } from './components/QuestionCard';
import { UploadModal } from './components/UploadModal';
import { ImageViewerModal } from './components/ImageViewerModal';
import { SettingsModal } from './components/SettingsModal';
import { exportTestToDocx } from './utils/docxExport';
import { LayoutGrid, Table as TableIcon, FileDown, CheckCircle, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [summary, setSummary] = useState<TestSummary>(INITIAL_SUMMARY);
  const [questions, setQuestions] = useState<MathQuestion[]>(INITIAL_QUESTIONS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'id' | 'wrong_first'>('id');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // When Ruby fixes a wrong question in practice mode
  const handleFixedQuestion = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              status: 'correct',
              statusText: 'Đã sửa đúng! 🎉'
            }
          : q
      )
    );

    setSummary((prev) => {
      const newCorrect = prev.correctCount + 1;
      const newWrong = Math.max(0, prev.wrongCount - 1);
      return {
        ...prev,
        correctCount: newCorrect,
        wrongCount: newWrong,
        score10: Number(((newCorrect / prev.totalQuestions) * 10).toFixed(1)),
        accuracyRate: Number(((newCorrect / prev.totalQuestions) * 100).toFixed(1))
      };
    });
  };

  const handleExportDocx = async () => {
    try {
      setExportNotice('Đang xuất file Word (.docx)...');
      await exportTestToDocx(summary, questions, `Dap_an_Luyen_Toan_${summary.studentName.replace(/\s+/g, '_')}.docx`);
      setExportNotice('Đã tải xuống file Word thành công! 🎉');
      setTimeout(() => setExportNotice(null), 3000);
    } catch (err) {
      console.error(err);
      setExportNotice('Có lỗi khi tạo file Word. Vui lòng thử lại.');
      setTimeout(() => setExportNotice(null), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        // Status filter
        if (activeFilter === 'wrong' && q.status !== 'wrong') return false;
        if (activeFilter === 'correct' && q.status !== 'correct') return false;
        if (activeFilter === 'need_verify' && q.status !== 'need_verify') return false;
        if (activeFilter === 'unanswered' && q.status !== 'unanswered') return false;

        // Category filter
        if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;

        // Search query
        if (searchQuery.trim()) {
          const qText = `${q.id} ${q.title} ${q.question} ${q.keywords} ${q.explanation} ${q.category}`.toLowerCase();
          const query = searchQuery.toLowerCase().trim();
          if (!qText.includes(query)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'wrong_first') {
          if (a.status === 'wrong' && b.status !== 'wrong') return -1;
          if (b.status === 'wrong' && a.status !== 'wrong') return 1;
        }
        return a.id - b.id;
      });
  }, [questions, activeFilter, selectedCategory, searchQuery, sortBy]);

  // Grouped questions by Part for Word Table View
  const partsGroup = useMemo(() => {
    return [
      { title: 'Câu 1–14 (Dãy số, Phép tính, Phép toán @)', items: questions.filter(q => q.id >= 1 && q.id <= 14) },
      { title: 'Câu 15–29 (Dãy số cách đều, Đổi xu, Số liên tiếp)', items: questions.filter(q => q.id >= 15 && q.id <= 29) },
      { title: 'Câu 30–46 (Chu vi diện tích, Lịch 2020, Đếm chữ số 8)', items: questions.filter(q => q.id >= 30 && q.id <= 46) },
      { title: 'Câu 47–57 (Cắt ghép hình vuông, Dirichlet, Ngũ giác)', items: questions.filter(q => q.id >= 47 && q.id <= 57) },
      { title: 'Câu 58–63 (Đổi tiền USD, Thang hỏng, Bốc thăm bi)', items: questions.filter(q => q.id >= 58 && q.id <= 63) }
    ];
  }, [questions]);

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900 pb-16">
      {/* Header */}
      <Header
        summary={summary}
        onOpenUpload={() => setIsUploadOpen(true)}
        onExportDocx={handleExportDocx}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenImageViewer={() => setIsImageViewerOpen(true)}
        onPrint={handlePrint}
      />

      {/* Floating Export Notice Banner */}
      {exportNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom duration-200">
          <FileDown className="w-4 h-4 text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        {/* Dashboard Overview Component */}
        <DashboardOverview
          summary={summary}
          questions={questions}
          activeFilter={activeFilter}
          onSelectFilter={(f) => setActiveFilter(f)}
        />

        {/* Prominent Drag & Drop Zone on Home Page for any week's homework */}
        <DropZoneSection
          onGradingComplete={(res) => {
            setQuestions(res.questions);
            setSummary(res.summary);
          }}
        />

        {/* Question View Header & Switcher */}
        <div id="question-section" className="scroll-mt-24 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Hướng Dẫn Giải Chi Tiết Từng Câu</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                {filteredQuestions.length} câu
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Đối chiếu đáp án của Ruby, giải thích phương pháp giải chuẩn SGK cho tất cả các câu (đúng & sai)
            </p>
          </div>

          {/* Toggle between Card View and Table View */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Dạng Thẻ Chi Tiết</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Bảng Chuẩn File Word</span>
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <QuestionFilters
          questions={questions}
          activeFilter={activeFilter}
          onFilterChange={(f) => setActiveFilter(f)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          selectedCategory={selectedCategory}
          onCategoryChange={(c) => setSelectedCategory(c)}
          sortBy={sortBy}
          onSortChange={(s) => setSortBy(s)}
        />

        {/* View Mode 1: Cards */}
        {viewMode === 'cards' && (
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-800">Không tìm thấy câu hỏi phù hợp</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Ruby hãy thử đổi bộ lọc hoặc tìm kiếm từ khóa khác nhé!
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Xem lại tất cả câu hỏi
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    onFixed={handleFixedQuestion}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Table format exactly like Word document */}
        {viewMode === 'table' && (
          <div className="space-y-6">
            {partsGroup.map((group, pIdx) => (
              <div key={pIdx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900">{group.title}</h4>
                  <span className="text-xs font-semibold text-slate-500">{group.items.length} câu</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100/70 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-6 w-20 text-center">Câu</th>
                        <th className="py-3 px-6">Chuyên Đề</th>
                        <th className="py-3 px-6 text-center">Đáp Án Ruby Ghi</th>
                        <th className="py-3 px-6 text-center">Đáp Án Đúng</th>
                        <th className="py-3 px-6 text-center">Nhận Xét</th>
                        <th className="py-3 px-6">Hướng Dẫn / Giải Thích</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {group.items.map((item) => {
                        let statusBadge = (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            <CheckCircle className="w-3.5 h-3.5" /> Đúng theo ảnh
                          </span>
                        );
                        if (item.status === 'wrong') {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                              <AlertCircle className="w-3.5 h-3.5" /> Sai / cần sửa
                            </span>
                          );
                        } else if (item.status === 'need_verify') {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                              Cần xác minh
                            </span>
                          );
                        } else if (item.status === 'unanswered') {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                              Chưa làm
                            </span>
                          );
                        }

                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              item.status === 'wrong' ? 'bg-rose-50/20' : ''
                            }`}
                          >
                            <td className="py-3 px-6 text-center font-bold text-slate-900">
                              #{item.id}
                            </td>
                            <td className="py-3 px-6 text-xs text-slate-600 font-medium">
                              {item.category}
                            </td>
                            <td className="py-3 px-6 text-center text-sm font-semibold">
                              <span className={item.status === 'wrong' ? 'text-rose-600 line-through' : 'text-slate-800'}>
                                {item.studentAnswer}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center text-sm font-bold text-emerald-700">
                              {item.correctAnswer}
                            </td>
                            <td className="py-3 px-6 text-center">
                              {statusBadge}
                            </td>
                            <td className="py-3 px-6 text-xs text-slate-600 max-w-xs truncate font-medium">
                              {item.explanation}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onGradingComplete={(res) => {
          setQuestions(res.questions);
          setSummary(res.summary);
        }}
      />

      <ImageViewerModal
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        summary={summary}
        onUpdateSummary={(updated) => setSummary((prev) => ({ ...prev, ...updated }))}
      />
    </div>
  );
};
