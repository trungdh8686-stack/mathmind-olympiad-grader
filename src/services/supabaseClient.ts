import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ExamSession } from './sessionService';
import { User } from '../types/auth';

const DEFAULT_SUPABASE_URL = 'https://ltemmeniaudtyudyaape.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_2fDAvbxV0ZV4rOzkn05mXQ_Nyz1FzyM';

export const getSupabaseConfig = () => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  const localKey = localStorage.getItem('SUPABASE_ANON_KEY') || '';

  const url = envUrl || DEFAULT_SUPABASE_URL;
  const key = envKey || localKey || DEFAULT_SUPABASE_ANON_KEY;

  return { url, key, isConnected: !!key };
};

export const setSupabaseAnonKey = (key: string) => {
  localStorage.setItem('SUPABASE_ANON_KEY', key.trim());
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  const { url, key, isConnected } = getSupabaseConfig();
  if (!isConnected) return null;

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key);
    } catch (e) {
      console.error('Lỗi khởi tạo Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
};

// Database helper functions for multi-device sync
export const cloudDbService = {
  // Sync an exam session to Supabase
  async saveSession(session: ExamSession): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('exam_sessions')
        .upsert({
          id: session.id,
          user_id: session.userId,
          student_name: session.studentName,
          title: session.title,
          subtitle: session.subtitle,
          date: session.date,
          timestamp: session.timestamp,
          score_10: session.score10,
          accuracy_rate: session.accuracyRate,
          total_questions: session.totalQuestions,
          correct_count: session.correctCount,
          wrong_count: session.wrongCount,
          verify_count: session.verifyCount,
          unanswered_count: session.unansweredCount,
          source_images_count: session.sourceImagesCount,
          questions: session.questions,
          summary: session.summary,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Lỗi lưu session lên Supabase:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Lỗi kết nối Supabase:', err);
      return false;
    }
  },

  // Fetch all sessions for a user from Supabase
  async fetchUserSessions(userId: string): Promise<ExamSession[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });

      if (error || !data) {
        console.warn('Lỗi tải sessions từ Supabase:', error?.message);
        return null;
      }

      return data.map((row: any) => ({
        id: row.id,
        userId: row.user_id,
        studentName: row.student_name,
        title: row.title,
        subtitle: row.subtitle,
        date: row.date,
        timestamp: row.timestamp,
        score10: row.score_10,
        accuracyRate: row.accuracy_rate,
        totalQuestions: row.total_questions,
        correctCount: row.correct_count,
        wrongCount: row.wrong_count,
        verifyCount: row.verify_count,
        unansweredCount: row.unanswered_count,
        sourceImagesCount: row.source_images_count,
        questions: row.questions || [],
        summary: row.summary
      }));
    } catch (err) {
      console.warn('Lỗi kết nối Supabase:', err);
      return null;
    }
  }
};
