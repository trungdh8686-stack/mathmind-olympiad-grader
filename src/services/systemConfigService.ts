import { getSupabase } from './supabaseClient';

export interface GlobalSystemConfig {
  openaiApiKey: string;
  geminiApiKey: string;
  activeEngine: 'chatgpt' | 'gemini';
  updatedAt: string;
}

// In-memory cached configuration
let cachedConfig: GlobalSystemConfig = {
  openaiApiKey: (import.meta as any).env?.VITE_OPENAI_API_KEY || '',
  geminiApiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY || '',
  activeEngine: 'chatgpt',
  updatedAt: new Date().toISOString()
};

let isInitialized = false;

export const systemConfigService = {
  /**
   * Khởi tạo và nạp cấu hình tập trung từ Supabase Cloud Database.
   * Chạy tự động khi ứng dụng khởi động trên bất kỳ trình duyệt nào (ở nhà, ở cty, di động).
   */
  async init(): Promise<GlobalSystemConfig> {
    if (isInitialized) return cachedConfig;

    try {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase
          .from('exam_sessions')
          .select('summary')
          .eq('id', 'system_global_config')
          .single();

        if (data && data.summary && !error) {
          const s = data.summary as any;
          if (s.openai_api_key) {
            cachedConfig.openaiApiKey = s.openai_api_key.trim();
          }
          if (s.gemini_api_key) {
            cachedConfig.geminiApiKey = s.gemini_api_key.trim();
          }
          if (s.active_engine) {
            cachedConfig.activeEngine = s.active_engine;
          }
        }
      }
    } catch (e) {
      console.warn('Lỗi nạp cấu hình hệ thống từ Cloud, sử dụng fallback cấu hình mặc định:', e);
    }

    isInitialized = true;
    return cachedConfig;
  },

  getOpenAiKey(): string {
    return cachedConfig.openaiApiKey || (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
  },

  getGeminiKey(): string {
    return cachedConfig.geminiApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  },

  getActiveEngine(): 'chatgpt' | 'gemini' {
    return cachedConfig.activeEngine || 'chatgpt';
  },

  /**
   * Cập nhật API key dùng chung lên Cloud Supabase để toàn bộ thiết bị (mobile, PC, cty, ở nhà) cùng sử dụng.
   */
  async updateGlobalKeys(params: {
    openaiApiKey?: string;
    geminiApiKey?: string;
    activeEngine?: 'chatgpt' | 'gemini';
  }): Promise<boolean> {
    if (params.openaiApiKey !== undefined) cachedConfig.openaiApiKey = params.openaiApiKey.trim();
    if (params.geminiApiKey !== undefined) cachedConfig.geminiApiKey = params.geminiApiKey.trim();
    if (params.activeEngine !== undefined) cachedConfig.activeEngine = params.activeEngine;
    cachedConfig.updatedAt = new Date().toISOString();

    try {
      const supabase = getSupabase();
      if (!supabase) return false;

      const { error } = await supabase.from('exam_sessions').upsert({
        id: 'system_global_config',
        user_id: 'system',
        student_name: 'System Global Config',
        title: 'HỆ THỐNG CẤU HÌNH API TOÀN CẦU',
        subtitle: 'Lưu trữ tập trung API Keys cho toàn bộ thiết bị (Mobile, PC, Cơ quan, Tại nhà)',
        date: new Date().toLocaleDateString('vi-VN'),
        timestamp: Date.now(),
        score_10: 10,
        accuracy_rate: 100,
        total_questions: 0,
        correct_count: 0,
        wrong_count: 0,
        verify_count: 0,
        unanswered_count: 0,
        source_images_count: 0,
        questions: [],
        summary: {
          openai_api_key: cachedConfig.openaiApiKey,
          gemini_api_key: cachedConfig.geminiApiKey,
          active_engine: cachedConfig.activeEngine
        },
        updated_at: new Date().toISOString()
      });

      return !error;
    } catch (e) {
      console.warn('Lỗi lưu cấu hình lên Supabase:', e);
      return false;
    }
  }
};
