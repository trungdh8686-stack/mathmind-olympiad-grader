import React from 'react';
import { MathView } from './MathView';

interface BilingualViewProps {
  text: string;
  className?: string;
}

/**
 * Tách nội dung song ngữ:
 * Tiếng Anh là chính: Chữ bôi đậm, rõ ràng (font-bold text-slate-900).
 * Tiếng Việt là phụ: Dòng chữ KHÔNG bôi đậm, IN NGHIÊNG, màu sắc dịu hơn (italic font-normal text-slate-600).
 */
export const parseBilingualText = (text: string): { en: string; vi: string } => {
  if (!text) return { en: '', vi: '' };

  // Dạng 1: Đoạn tiếng Anh \n (Đoạn tiếng Việt dịch nghĩa)
  const newlineMatch = text.match(/^([\s\S]+?)\n+\s*(\([\s\S]+\))$/);
  if (newlineMatch) {
    return { en: newlineMatch[1].trim(), vi: newlineMatch[2].trim() };
  }

  // Dạng 2: Ngoặc đơn tiếng Việt ở cuối câu
  const parenMatch = text.match(/^([\s\S]+?)\s*(\([^(]+?[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ][\s\S]*?\))$/);
  if (parenMatch) {
    return { en: parenMatch[1].trim(), vi: parenMatch[2].trim() };
  }

  // Mặc định: Nếu không nhận diện được tiếng Việt riêng biệt
  return { en: text, vi: '' };
};

export const BilingualView: React.FC<BilingualViewProps> = ({ text, className = '' }) => {
  const { en, vi } = parseBilingualText(text);

  if (!vi) {
    return (
      <div className={`font-bold text-slate-900 text-sm sm:text-base leading-relaxed ${className}`}>
        <MathView text={text} />
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Tiếng Anh: Câu hỏi gốc, in đậm, tương phản cao rõ nét */}
      <div className="font-bold text-slate-900 text-sm sm:text-base leading-snug tracking-tight">
        <MathView text={en} />
      </div>

      {/* Tiếng Việt: Bản dịch hỗ trợ, KHÔNG bôi đậm, IN NGHIÊNG, có viền định vị thanh lịch */}
      <div className="font-normal italic text-slate-600 text-xs sm:text-sm leading-relaxed border-l-2 border-indigo-300 pl-3 py-1 bg-indigo-50/40 rounded-r-xl">
        <MathView text={vi} />
      </div>
    </div>
  );
};
