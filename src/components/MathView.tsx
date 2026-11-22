import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathViewProps {
  text: string;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!text) {
      containerRef.current.textContent = '';
      return;
    }

    // If no math delimiters, render directly as plain text
    if (!text.includes('$')) {
      containerRef.current.textContent = text;
      return;
    }

    try {
      const parts = text.split('$');
      containerRef.current.innerHTML = '';

      parts.forEach((part, index) => {
        if (index % 2 === 1) {
          // Odd indices are math blocks
          // Check if math contains Vietnamese diacritics that might break raw KaTeX
          const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(part);
          
          const span = document.createElement('span');
          span.className = 'inline-math font-medium';

          try {
            // If it contains Vietnamese words without \text, wrap Vietnamese words inside \text{}
            let mathExpr = part.trim();
            if (hasVietnamese && !mathExpr.includes('\\text')) {
              // Wrap with text mode or display directly as styled text
              span.textContent = part;
              span.className = 'font-semibold text-slate-800';
            } else {
              katex.render(mathExpr, span, {
                throwOnError: false,
                displayMode: false,
                strict: false
              });
            }
          } catch {
            span.textContent = part;
          }
          containerRef.current?.appendChild(span);
        } else if (part) {
          // Regular text
          const textNode = document.createTextNode(part);
          containerRef.current?.appendChild(textNode);
        }
      });
    } catch {
      containerRef.current.textContent = text;
    }
  }, [text]);

  return <span ref={containerRef} className={className} />;
};
