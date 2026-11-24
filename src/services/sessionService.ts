import { MathQuestion, TestSummary, INITIAL_QUESTIONS, INITIAL_SUMMARY } from '../data/mockData';

export interface ExamSession {
  id: string;
  userId: string;
  studentName: string;
  title: string;
  subtitle: string;
  date: string;
  timestamp: number;
  score10: number;
  accuracyRate: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  verifyCount: number;
  unansweredCount: number;
  sourceImagesCount: number;
  questions: MathQuestion[];
  summary: TestSummary;
}

export interface UserProgressStats {
  totalSessions: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalQuestionsGraded: number;
  averageAccuracy: number;
  recentSessions: ExamSession[];
}

const STORAGE_SESSIONS_KEY = 'mathmind_exam_sessions_v3';

// Initial session only for Ruby (Tuần 11). Lisa, Tony, Chip start EMPTY.
const INITIAL_RUBY_SESSION: ExamSession = {
  id: 'session_ruby_week_11',
  userId: 'user_ruby',
  studentName: 'Ruby Đoàn Minh Châu',
  title: 'ĐỐI CHIẾU ĐÁP ÁN – LUYỆN TOÁN CUỐI TUẦN 11',
  subtitle: 'Tổng hợp từ 5 ảnh bài tập (câu 1–63). Đã phân tích lỗi sai và hướng dẫn giải chuẩn SGK.',
  date: new Date().toLocaleDateString('vi-VN'),
  timestamp: Date.now() - 3600000 * 2, // 2 hours ago
  score10: 6.8,
  accuracyRate: 60.3,
  totalQuestions: 63,
  correctCount: 38,
  wrongCount: 17,
  verifyCount: 6,
  unansweredCount: 2,
  sourceImagesCount: 5,
  questions: INITIAL_QUESTIONS,
  summary: INITIAL_SUMMARY
};

export const sessionService = {
  // Lấy toàn bộ sessions từ LocalStorage
  getAllSessions(): ExamSession[] {
    const raw = localStorage.getItem(STORAGE_SESSIONS_KEY);
    if (!raw) {
      const initial = [INITIAL_RUBY_SESSION];
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // fallback
    }
    return [INITIAL_RUBY_SESSION];
  },

  saveAllSessions(sessions: ExamSession[]): void {
    localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
  },

  // Đồng bộ đa thiết bị (PC <-> Mobile) với Supabase Cloud Database
  async syncWithCloud(userId: string): Promise<ExamSession[]> {
    try {
      const { cloudDbService } = await import('./supabaseClient');
      const cloudSessions = await cloudDbService.fetchUserSessions(userId);

      if (cloudSessions && cloudSessions.length > 0) {
        let localSessions = this.getAllSessions();
        const sessionMap = new Map<string, ExamSession>();

        // Nạp các session cục bộ trước
        localSessions.forEach(s => sessionMap.set(s.id, s));

        // Nạp và ghi đè bằng các session trên Cloud (Supabase là nguồn chuẩn giữa PC và Mobile)
        cloudSessions.forEach(s => sessionMap.set(s.id, s));

        const merged = Array.from(sessionMap.values()).sort((a, b) => b.timestamp - a.timestamp);
        this.saveAllSessions(merged);

        return merged.filter(s => s.userId === userId);
      }
    } catch (e) {
      console.warn('Đồng bộ Supabase thất bại:', e);
    }
    return this.getUserSessions(userId);
  },

  // Lấy danh sách các phiên kiểm tra của một con cụ thể
  getUserSessions(userId: string): ExamSession[] {
    const all = this.getAllSessions();
    return all
      .filter(s => s.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  },

  // Lấy phiên kiểm tra đang hoạt động (mới nhất) của con
  getLatestSession(userId: string): ExamSession | null {
    const userSessions = this.getUserSessions(userId);
    if (userSessions.length > 0) {
      return userSessions[0];
    }
    return null;
  },

  // Lưu một phiên chấm bài mới cho con
  createNewSession(
    userId: string,
    studentName: string,
    summary: TestSummary,
    questions: MathQuestion[],
    imagesCount: number = 0
  ): ExamSession {
    const all = this.getAllSessions();
    const newSession: ExamSession = {
      id: `session_${userId}_${Date.now()}`,
      userId,
      studentName,
      title: summary.title || `Phiếu Chấm Bài Ngày ${new Date().toLocaleDateString('vi-VN')}`,
      subtitle: summary.subtitle || `Tổng hợp ${questions.length} câu hỏi`,
      date: new Date().toLocaleDateString('vi-VN'),
      timestamp: Date.now(),
      score10: summary.score10,
      accuracyRate: summary.accuracyRate,
      totalQuestions: questions.length,
      correctCount: summary.correctCount,
      wrongCount: summary.wrongCount,
      verifyCount: summary.verifyCount,
      unansweredCount: summary.unansweredCount,
      sourceImagesCount: imagesCount || summary.sourceImagesCount || 0,
      questions,
      summary
    };

    all.unshift(newSession);
    this.saveAllSessions(all);

    // Đồng bộ lập tức lên Supabase Cloud Database để điện thoại / máy tính khác thấy ngay
    import('./supabaseClient')
      .then(({ cloudDbService }) => {
        cloudDbService.saveSession(newSession);
      })
      .catch((err) => {
        console.warn('Không thể gửi session lên Supabase:', err);
      });

    return newSession;
  },

  // Xóa một phiên kiểm tra (cả cục bộ và trên cloud)
  async deleteSession(sessionId: string): Promise<void> {
    let all = this.getAllSessions();
    all = all.filter(s => s.id !== sessionId);
    this.saveAllSessions(all);

    try {
      const { getSupabase } = await import('./supabaseClient');
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from('exam_sessions').delete().eq('id', sessionId);
      }
    } catch (e) {
      console.warn('Lỗi xóa session trên Supabase:', e);
    }
  },

  // Tính toán thống kê điểm trung bình & tiến độ qua các lần kiểm tra
  getUserProgressStats(userId: string): UserProgressStats {
    const sessions = this.getUserSessions(userId);

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        totalQuestionsGraded: 0,
        averageAccuracy: 0,
        recentSessions: []
      };
    }

    const scores = sessions.map(s => s.score10);
    const sumScore = scores.reduce((acc, curr) => acc + curr, 0);
    const avgScore = Number((sumScore / scores.length).toFixed(1));

    const totalQuestions = sessions.reduce((acc, curr) => acc + curr.totalQuestions, 0);
    const sumAccuracy = sessions.reduce((acc, curr) => acc + curr.accuracyRate, 0);
    const avgAccuracy = Number((sumAccuracy / sessions.length).toFixed(1));

    return {
      totalSessions: sessions.length,
      averageScore: avgScore,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      totalQuestionsGraded: totalQuestions,
      averageAccuracy: avgAccuracy,
      recentSessions: sessions.slice(0, 5)
    };
  }
};
