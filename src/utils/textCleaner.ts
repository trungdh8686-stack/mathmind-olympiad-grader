/**
 * Comprehensive Math Text & Typography Sanitizer
 * Strips raw LaTeX markup ($...$, \implies, \times, etc.) and converts them
 * into clean, pedagogical Unicode text suitable for Microsoft Word (.docx) and UI display.
 */
export function cleanMathText(input: string | undefined | null): string {
  if (!input) return '';
  let s = String(input);

  // 1. Remove LaTeX dollar delimiters ($...$, $$...$$)
  s = s.replace(/\$\$/g, '').replace(/\$/g, '');

  // 2. Logic & arrows
  s = s.replace(/\\(?:implies|Rightarrow|Longrightarrow|rightarrow)/g, ' → ');
  s = s.replace(/\\(?:leftarrow|Leftarrow)/g, ' ← ');
  s = s.replace(/->/g, ' → ');

  // 3. Arithmetic & Operators
  s = s.replace(/\\times/g, ' × ');
  s = s.replace(/\\cdot/g, ' · ');
  s = s.replace(/\\div/g, ' : ');
  s = s.replace(/\\pm/g, ' ± ');
  s = s.replace(/\\approx/g, ' ≈ ');
  s = s.replace(/\\le(?:q)?/g, ' ≤ ');
  s = s.replace(/\\ge(?:q)?/g, ' ≥ ');
  s = s.replace(/\\ne(?:q)?/g, ' ≠ ');

  // 4. Fractions & Overlines & Formattings
  s = s.replace(/\\overline\{([^}]+)\}/g, '$1');
  s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2');
  s = s.replace(/\\(?:text|mathrm|mathbf|mathit|textsf)\{([^}]+)\}/g, '$1');
  s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  s = s.replace(/\\(?:ldots|dots)/g, '...');
  s = s.replace(/\\left\(|\\right\)/g, m => m.includes('(') ? '(' : ')');
  s = s.replace(/\\left\[|\\right\]/g, m => m.includes('[') ? '[' : ']');
  s = s.replace(/\\quad|\\qquad/g, ' ');
  s = s.replace(/\\([{}%#_])/g, '$1');

  // 5. Units & Powers
  s = s.replace(/\^\\circ/g, '°');
  s = s.replace(/\^2\b/g, '²');
  s = s.replace(/\^3\b/g, '³');
  s = s.replace(/cm2\b/gi, 'cm²');
  s = s.replace(/m2\b/gi, 'm²');
  s = s.replace(/dm2\b/gi, 'dm²');
  s = s.replace(/mm2\b/gi, 'mm²');
  s = s.replace(/km2\b/gi, 'km²');

  // 6. Common OCR typo corrections
  s = s.replace(/\bC4u\b/gi, 'Câu');
  s = s.replace(/\bBuse\b/gi, 'Bước');
  s = s.replace(/Câu (\d+):\s*Câu \1:\s*/g, 'Câu $1: ');

  // 7. Cleanup extra whitespace
  s = s.replace(/[ \t]+/g, ' ');
  s = s.replace(/ \n /g, '\n');

  return s.trim();
}
