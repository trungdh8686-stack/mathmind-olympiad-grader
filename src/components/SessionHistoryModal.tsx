import React from 'react';
import { X, Calendar, Award, CheckCircle2, ChevronRight, Trash2, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { ExamSession, sessionService } from '../services/sessionService';
import { User } from '../types/auth';

interface SessionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSelectSession: (session: ExamSession) => void;
  activeSessionId?: string;
  onSessionsChanged: () => void;
}

export const SessionHistoryModal: React.FC<SessionHistoryModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectSession,
  activeSessionId,
  onSessionsChanged
}) => {
  if (!isOpen) return null;

  const sessions = sessionService.getUserSessions(currentUser.id);
  const stats = sessionService.getUserProgressStats(currentUser.id);

  const handleDelete = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (confirm('Sếp có chắc chắn muốn xóa phiên chấm điểm này không?')) {
      sessionService.deleteSession(sessionId);
      onSessionsChanged();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">Lịch Sử Các Phiên Chấm Bài</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-500/30 text-indigo-300">
                  {currentUser.nickname}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Tra cứu lại tất cả các lần con đã đưa bài tập vào chấm điểm và đối chiếu tiến độ.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Progress Summary Cards */}
          {sessions.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center">
                <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Tổng số lần chấm</div>
                <div className="text-xl sm:text-2xl font-black text-indigo-950 mt-0.5">{stats.totalSessions}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Điểm trung bình</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-0.5">{stats.averageScore} <span className="text-xs">/ 10</span></div>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
                <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Độ chính xác TB</div>
                <div className="text-xl sm:text-2xl font-black text-amber-950 mt-0.5">{stats.averageAccuracy}%</div>
              </div>
            </div>
          )}

          {/* Session List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Danh sách các lần kiểm tra ({sessions.length}):
            </h4>

            {sessions.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <div className="font-bold text-slate-700 text-sm">Chưa có phiên chấm điểm nào</div>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Tài khoản của {currentUser.nickname} chưa tải lên bài tập nào. Hãy kéo thả ảnh bài làm lên hoặc làm bài luyện thi trực tuyến để AI chấm điểm lần đầu nhé!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {sessions.map((sess) => {
                  const isActive = sess.id === activeSessionId;
                  return (
                    <div
                      key={sess.id}
                      onClick={() => {
                        onSelectSession(sess);
                        onClose();
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 truncate">
                            {sess.title}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-600 text-white">
                              Đang xem
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 truncate">
                          {sess.subtitle}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {sess.date}
                          </span>
                          <span>•</span>
                          <span>{sess.totalQuestions} câu hỏi</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">Đúng {sess.correctCount}</span>
                          <span>•</span>
                          <span className="text-rose-500 font-semibold">Sai {sess.wrongCount}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-xl font-black text-slate-900">
                            {sess.score10} <span className="text-xs text-slate-400">/10</span>
                          </div>
                          <div className="text-[10px] text-emerald-600 font-bold">
                            {sess.accuracyRate}%
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, sess.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Xóa phiên kiểm tra này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
