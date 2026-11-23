import React, { useState, useMemo, useEffect } from 'react';
import {
  MathQuestion,
  TestSummary
} from './data/mockData';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { CurriculumBanner } from './components/CurriculumBanner';
import { DropZoneSection } from './components/DropZoneSection';
import { ExamBankSection } from './components/ExamBankSection';
import { OnlineExamModal } from './components/OnlineExamModal';
import { SessionHistoryModal } from './components/SessionHistoryModal';
import { QuestionFilters } from './components/QuestionFilters';
import { QuestionCard } from './components/QuestionCard';
import { UploadModal } from './components/UploadModal';
import { ImageViewerModal } from './components/ImageViewerModal';
import { SettingsModal } from './components/SettingsModal';
import { LoginModal } from './components/LoginModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminManagementModal } from './components/AdminManagementModal';
import { exportTestToDocx } from './utils/docxExport';
import { authService } from './services/authService';
import { sessionService, ExamSession } from './services/sessionService';
import { ExamPaper } from './data/examBank';
import { User, EducationLevel } from './types/auth';
import { LayoutGrid, Table as TableIcon, FileDown, CheckCircle, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  // Authentication & Active User State
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = authService.getCurrentUser();
    if (saved) return saved;
    const all = authService.getUsers();
    return all.find(u => u.username.toLowerCase() === 'ruby') || all[1] || all[0];
  });

  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(() => {
    return !authService.getCurrentUser() && !authService.isRemembered();
  });
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [profileInitialTab, setProfileInitialTab] = useState<'avatar' | 'password' | 'study'>('avatar');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Session & Data Isolation State
  const [sessionsVersion, setSessionsVersion] = useState<number>(0);
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>(() => {
    const latest = sessionService.getLatestSession(currentUser.id);
    return latest?.id;
  });

  const [summary, setSummary] = useState<TestSummary>(() => {
    const latest = sessionService.getLatestSession(currentUser.id);
    if (latest) return latest.summary;
    return {
      title: `Bảng Thành Tích của ${currentUser.fullName}`,
      subtitle: `Dữ liệu độc lập – Hãy tải bài tập mới hoặc luyện thi online`,
      studentName: currentUser.fullName,
      grade: `${currentUser.currentGrade} • ${currentUser.targetProgram}`,
      testDate: new Date().toLocaleDateString('vi-VN'),
      totalQuestions: 0,
      correctCount: 0,
      wrongCount: 0,
      verifyCount: 0,
      unansweredCount: 0,
      score10: 0,
      accuracyRate: 0,
      completionRate: 0,
      sourceImagesCount: 0,
      notes: `Tài khoản của ${currentUser.fullName} chưa có dữ liệu. Bắt đầu bằng cách kéo thả ảnh bài làm hoặc chọn bài thi trong Kho đề.`
    };
  });

  const [questions, setQuestions] = useState<MathQuestion[]>(() => {
    const latest = sessionService.getLatestSession(currentUser.id);
    return latest ? latest.questions : [];
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'id' | 'wrong_first'>('id');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Exam Bank & History Modals state
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Load session data when currentUser changes (Data Isolation for Ruby vs Lisa vs Tony vs Chip)
  useEffect(() => {
    const latest = sessionService.getLatestSession(currentUser.id);
    if (latest) {
      setActiveSessionId(latest.id);
      setQuestions(latest.questions);
      setSummary(latest.summary);
    } else {
      setActiveSessionId(undefined);
      setQuestions([]);
      setSummary({
        title: `Bảng Thành Tích của ${currentUser.fullName}`,
        subtitle: `Dữ liệu độc lập – Hãy tải bài tập mới hoặc luyện thi online`,
        studentName: currentUser.fullName,
        grade: `${currentUser.currentGrade} • ${currentUser.targetProgram}`,
        testDate: new Date().toLocaleDateString('vi-VN'),
        totalQuestions: 0,
        correctCount: 0,
        wrongCount: 0,
        verifyCount: 0,
        unansweredCount: 0,
        score10: 0,
        accuracyRate: 0,
        completionRate: 0,
        sourceImagesCount: 0,
        notes: `Tài khoản của ${currentUser.fullName} chưa có dữ liệu. Bắt đầu bằng cách kéo thả ảnh bài làm hoặc chọn bài thi trong Kho đề.`
      });
    }
  }, [currentUser.id]);

  // Compute student's overall multi-session statistics
  const userStats = useMemo(() => {
    return sessionService.getUserProgressStats(currentUser.id);
  }, [currentUser.id, sessionsVersion]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoginOpen(true);
  };

  const handleUpdateCurriculum = (level: EducationLevel, program: string, grade?: string) => {
    authService.updateCurriculum(currentUser.id, level, program, grade);
    const updated = {
      ...currentUser,
      level,
      targetProgram: program,
      currentGrade: grade || currentUser.currentGrade
    };
    setCurrentUser(updated);
  };

  // When student fixes a wrong question in practice retry mode
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

  const handleGradingComplete = (res: { questions: MathQuestion[]; summary: TestSummary; imagesCount?: number }) => {
    const session = sessionService.createNewSession(
      currentUser.id,
      currentUser.fullName,
      res.summary,
      res.questions,
      res.imagesCount || 5
    );
    setActiveSessionId(session.id);
    setQuestions(session.questions);
    setSummary(session.summary);
    setSessionsVersion((v) => v + 1);
  };

  const handleExamCompleted = (result: { questions: MathQuestion[]; summary: TestSummary }) => {
    const latest = sessionService.getLatestSession(currentUser.id);
    if (latest) {
      setActiveSessionId(latest.id);
      setQuestions(latest.questions);
      setSummary(latest.summary);
    } else {
      setQuestions(result.questions);
      setSummary(result.summary);
    }
    setSessionsVersion((v) => v + 1);
    setIsExamModalOpen(false);
  };

  const handleSelectSession = (session: ExamSession) => {
    setActiveSessionId(session.id);
    setQuestions(session.questions);
    setSummary(session.summary);
    setIsHistoryModalOpen(false);
  };

  const handleSessionsChanged = () => {
    setSessionsVersion((v) => v + 1);
    const latest = sessionService.getLatestSession(currentUser.id);
    if (latest) {
      setActiveSessionId(latest.id);
      setQuestions(latest.questions);
      setSummary(latest.summary);
    } else {
      setActiveSessionId(undefined);
      setQuestions([]);
      setSummary((prev) => ({
        ...prev,
        totalQuestions: 0,
        correctCount: 0,
        wrongCount: 0,
        verifyCount: 0,
        unansweredCount: 0,
        score10: 0,
        accuracyRate: 0
      }));
    }
  };

  const handleExportDocx = async () => {
    try {
      setExportNotice('Đang xuất file Word (.docx)...');
      await exportTestToDocx(
        summary,
        questions,
        `Dap_an_Luyen_Toan_${currentUser.nickname || summary.studentName.replace(/\s+/g, '_')}.docx`
      );
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
        currentUser={currentUser}
        onOpenUpload={() => setIsUploadOpen(true)}
        onExportDocx={handleExportDocx}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenImageViewer={() => setIsImageViewerOpen(true)}
        onPrint={handlePrint}
        onOpenProfile={(tab) => {
          setProfileInitialTab(tab || 'avatar');
          setIsProfileOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSwitchAccount={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
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
        {/* Multi-level & Multi-curriculum Math Selector Banner */}
        <CurriculumBanner
          user={currentUser}
          onUpdateCurriculum={handleUpdateCurriculum}
        />

        {/* Dashboard Overview Component */}
        <DashboardOverview
          summary={summary}
          questions={questions}
          activeFilter={activeFilter}
          onSelectFilter={(f) => setActiveFilter(f)}
          userStats={userStats}
          onOpenHistory={() => setIsHistoryModalOpen(true)}
          onUploadNew={() => setIsUploadOpen(true)}
          onStartPractice={() => {
            document.getElementById('exam-bank-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Kho Đề Thi & Luyện Thi Trực Tuyến Tuyển Chọn */}
        <div id="exam-bank-section" className="scroll-mt-24">
          <ExamBankSection
            currentUser={currentUser}
            onSelectExam={(exam) => {
              setSelectedExam(exam);
              setIsExamModalOpen(true);
            }}
          />
        </div>

        {/* Prominent Drag & Drop Zone on Home Page for any week's homework */}
        <DropZoneSection
          currentUser={currentUser}
          onGradingComplete={handleGradingComplete}
        />

        {/* Question View Header & Switcher (Chỉ hiển thị khi đã có dữ liệu bài làm) */}
        {questions.length > 0 && (
          <>
            <div id="question-section" className="scroll-mt-24 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Hướng Dẫn Giải Chi Tiết Từng Câu</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                {filteredQuestions.length} câu
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Đối chiếu đáp án của {currentUser.fullName}, giải thích phương pháp giải chuẩn cho tất cả các câu (đúng & sai)
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
              <LayoutGrid className="w-4 h-4" />
              <span>Dạng thẻ bài</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Bảng đối chiếu</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <QuestionFilters
          questions={questions}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Question Content View */}
        {viewMode === 'cards' ? (
          /* Cards Grid View */
          <div className="space-y-6">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-800">Không tìm thấy câu hỏi phù hợp</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc bấm &ldquo;Tất cả&rdquo; để xem toàn bộ 63 câu hỏi.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    studentName={currentUser.nickname || currentUser.fullName}
                    onFixed={handleFixedQuestion}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Table View matching original Word Document layout */
          <div className="space-y-8">
            {partsGroup.map((part, pIdx) => (
              <div key={pIdx} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">{part.title}</h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {part.items.length} câu
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/60 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                        <th className="py-3 px-6 text-center w-16">Câu</th>
                        <th className="py-3 px-6">Dạng Toán</th>
                        <th className="py-3 px-6 text-center">Đáp án con ghi</th>
                        <th className="py-3 px-6 text-center">Đáp án đúng</th>
                        <th className="py-3 px-6 text-center">Nhận xét</th>
                        <th className="py-3 px-6">Tóm tắt hướng dẫn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {part.items.map((item) => {
                        let statusBadge = (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <CheckCircle className="w-3.5 h-3.5" /> Đúng
                          </span>
                        );
                        if (item.status === 'wrong') {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                              Sai / cần sửa
                            </span>
                          );
                        } else if (item.status === 'need_verify') {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                              Cần xác minh
                            </span>
                          );
                        } else if (item.status === 'unanswered') {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              Chưa làm
                            </span>
                          );
                        }

                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              item.status === 'wrong' ? 'bg-rose-50/30' : ''
                            }`}
                          >
                            <td className="py-3 px-6 text-center font-bold text-slate-900">
                              #{item.id}
                            </td>
                            <td className="py-3 px-6 text-xs text-slate-600 font-medium">
                              {item.category}
                            </td>
                            <td className="py-3 px-6 text-center text-sm font-semibold">
                              <span className={item.status === 'wrong' ? 'text-rose-600 line-through decoration-rose-500 decoration-2 font-bold' : 'text-slate-800'}>
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
        </>
      )}
      </main>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        currentUser={currentUser}
        onGradingComplete={handleGradingComplete}
      />

      {/* Online Exam Interactive Modal */}
      <OnlineExamModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        exam={selectedExam}
        currentUser={currentUser}
        onExamCompleted={handleExamCompleted}
      />

      {/* Multi-Session History Modal */}
      <SessionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        currentUser={currentUser}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onSessionsChanged={handleSessionsChanged}
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

      {/* User & Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onLoginSuccess={handleLoginSuccess}
        onClose={() => setIsLoginOpen(false)}
        canClose={!!currentUser}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onUserUpdated={(updated) => {
          setCurrentUser(updated);
          setSummary((prev) => ({
            ...prev,
            studentName: updated.fullName,
            grade: `${updated.currentGrade} • ${updated.targetProgram}`
          }));
        }}
      />

      {currentUser.role === 'admin' && (
        <AdminManagementModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          currentUser={currentUser}
          onUsersChanged={() => {
            const active = authService.getCurrentUser();
            if (active) setCurrentUser(active);
          }}
        />
      )}
    </div>
  );
};
