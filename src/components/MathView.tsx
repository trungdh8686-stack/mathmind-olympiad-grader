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

    // Check if text has LaTeX delimiters like $...$
    if (!text.includes('$')) {
      containerRef.current.textContent = text;
      return;
    }

    try {
      // Split by $ and alternate between normal text and math
      const parts = text.split('$');
      containerRef.current.innerHTML = '';

      parts.forEach((part, index) => {
        if (index % 2 === 1) {
          // Math expression
          const span = document.createElement('span');
          try {
            katex.render(part, span, { throwOnError: false, displayMode: false });
          } catch {
            span.textContent = `$${part}$`;
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
