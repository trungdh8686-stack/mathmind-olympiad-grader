import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  HeadingLevel,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType
} from 'docx';
import { saveAs } from 'file-saver';
import { MathQuestion, TestSummary } from '../data/mockData';
import { SolverSession, SolvedQuestionItem } from '../services/mathSolverService';

/**
 * Helper tách văn bản nhiều dòng thành các đoạn Paragraph độc lập trong Word
 */
function createMultilineParagraphs(
  text: string,
  options: {
    bold?: boolean;
    italics?: boolean;
    size?: number;
    color?: string;
    bullet?: boolean;
    prefix?: string;
    spacingAfter?: number;
  } = {}
): Paragraph[] {
  if (!text) return [];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  return lines.map((line, idx) => {
    const textContent = (options.prefix && idx === 0 ? options.prefix : (options.bullet ? '• ' : '')) + line;
    return new Paragraph({
      spacing: { after: options.spacingAfter ?? 50 },
      children: [
        new TextRun({
          text: textContent,
          bold: options.bold,
          italics: options.italics,
          size: options.size ?? 20,
          color: options.color ?? '334155'
        })
      ]
    });
  });
}

export async function exportTestToDocx(
  summary: TestSummary,
  questions: MathQuestion[],
  fileName = 'Dap_an_va_Loi_giai_Luyen_Toan.docx'
) {
  const total = questions.length;
  const parts: { title: string; items: MathQuestion[] }[] = [];

  if (total <= 15) {
    parts.push({ title: `Toàn bộ đề thi (${total} câu)`, items: questions });
  } else if (total <= 30) {
    parts.push({ title: 'Phần 1: Câu 1 – 15', items: questions.slice(0, 15) });
    parts.push({ title: `Phần 2: Câu 16 – ${total}`, items: questions.slice(15) });
  } else {
    // 5 parts standard for 63-question exams
    parts.push({ title: 'Phần 1: Câu 1–14', items: questions.filter(q => q.id >= 1 && q.id <= 14) });
    parts.push({ title: 'Phần 2: Câu 15–29', items: questions.filter(q => q.id >= 15 && q.id <= 29) });
    parts.push({ title: 'Phần 3: Câu 30–46', items: questions.filter(q => q.id >= 30 && q.id <= 46) });
    parts.push({ title: 'Phần 4: Câu 47–57', items: questions.filter(q => q.id >= 47 && q.id <= 57) });
    parts.push({ title: 'Phần 5: Câu 58–' + total, items: questions.filter(q => q.id >= 58) });
  }

  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' },
    left: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' },
    right: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB' },
    insideVertical: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB' }
  };

  const createSectionTable = (items: MathQuestion[]) => {
    const rows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            width: { size: 1000, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: '1E3A8A' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Câu', bold: true, size: 21, color: 'FFFFFF' })]
              })
            ]
          }),
          new TableCell({
            width: { size: 2600, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: '1E3A8A' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Đáp án con ghi', bold: true, size: 21, color: 'FFFFFF' })]
              })
            ]
          }),
          new TableCell({
            width: { size: 2600, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: '1E3A8A' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Đáp án đúng', bold: true, size: 21, color: 'FFFFFF' })]
              })
            ]
          }),
          new TableCell({
            width: { size: 2800, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: '1E3A8A' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Đánh giá & Chi tiết', bold: true, size: 21, color: 'FFFFFF' })]
              })
            ]
          })
        ]
      }),
      ...items.map(item => {
        let statusColor = '166534'; // Green
        let statusNotice = 'Đúng ✓';
        if (item.status === 'wrong') {
          statusColor = 'DC2626';
          statusNotice = 'Sai (Xem giải Phần II)';
        } else if (item.status === 'need_verify') {
          statusColor = 'D97706';
          statusNotice = 'Cần kiểm tra (Phần II)';
        } else if (item.status === 'unanswered') {
          statusColor = '6B7280';
          statusNotice = 'Chưa làm (Xem giải Phần II)';
        }

        return new TableRow({
          children: [
            new TableCell({
              width: { size: 1000, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: String(item.id), bold: true, size: 20 })]
                })
              ]
            }),
            new TableCell({
              width: { size: 2600, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: item.studentAnswer || '(Chưa làm)',
                      size: 20,
                      color: item.status === 'wrong' ? 'DC2626' : (item.status === 'unanswered' ? '9CA3AF' : '1F2937')
                    })
                  ]
                })
              ]
            }),
            new TableCell({
              width: { size: 2600, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: item.correctAnswer || '—', bold: true, size: 20, color: '15803D' })]
                })
              ]
            }),
            new TableCell({
              width: { size: 2800, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: statusNotice,
                      color: statusColor,
                      bold: true,
                      size: 19
                    })
                  ]
                })
              ]
            })
          ]
        });
      })
    ];

    return new Table({
      width: { size: 9000, type: WidthType.DXA },
      borders: tableBorder,
      rows
    });
  };

  const children: (Paragraph | Table)[] = [];

  // Main Document Title
  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: summary.title || 'KẾT QUẢ CHẤM ĐIỂM & LỜI GIẢI CHI TIẾT BÀI TOÁN',
          bold: true,
          size: 32,
          color: '1E3A8A'
        })
      ]
    })
  );

  // Subtitle
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: summary.subtitle || `Tổng hợp đề thi & Hướng dẫn phương pháp giải toàn diện (${questions.length} câu)`,
          italics: true,
          size: 20,
          color: '4B5563'
        })
      ]
    })
  );

  // Metadata Table Summary Box
  const correctPct = summary.totalQuestions > 0 ? ((summary.correctCount / summary.totalQuestions) * 100).toFixed(1) : '0';
  const metaTable = new Table({
    width: { size: 9000, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      left: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      right: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4500, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Học sinh: ', bold: true, size: 20 }),
                  new TextRun({ text: summary.studentName, bold: true, size: 20, color: '1E40AF' }),
                  new TextRun({ text: ` | Lớp: ${summary.grade}`, size: 19 })
                ]
              }),
              new Paragraph({
                spacing: { before: 40 },
                children: [
                  new TextRun({ text: 'Ngày chấm: ', bold: true, size: 20 }),
                  new TextRun({ text: summary.testDate, size: 20 })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 4500, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Điểm ước tính: ', bold: true, size: 20 }),
                  new TextRun({ text: `${summary.score10}/10 `, bold: true, size: 22, color: summary.score10 >= 7 ? '15803D' : 'DC2626' }),
                  new TextRun({ text: `(${correctPct}% chính xác)`, size: 19, italics: true })
                ]
              }),
              new Paragraph({
                spacing: { before: 40 },
                children: [
                  new TextRun({ text: `Tổng số: ${questions.length} câu `, bold: true, size: 19 }),
                  new TextRun({ text: `[Đúng: ${summary.correctCount} | Sai: ${summary.wrongCount} | Chưa làm: ${summary.unansweredCount}]`, size: 19, color: '4B5563' })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
  children.push(metaTable);

  // NOTICE BANNER BOX - Explaining the document structure so the user knows there is Part I and Part II
  children.push(
    new Paragraph({
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: '📋 HƯỚNG DẪN ĐỌC TÀI LIỆU NÀY:',
          bold: true,
          size: 21,
          color: '1E3A8A'
        })
      ]
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '• ', bold: true, size: 20, color: '2563EB' }),
        new TextRun({ text: 'PHẦN I (Ngay bên dưới): ', bold: true, size: 20 }),
        new TextRun({ text: 'Bảng tổng hợp đối chiếu nhanh đáp án con ghi và đáp án đúng để tra cứu nhanh.', size: 20 })
      ]
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: '• ', bold: true, size: 20, color: 'DC2626' }),
        new TextRun({ text: 'PHẦN II (Trang tiếp theo): ', bold: true, size: 20 }),
        new TextRun({
          text: `HƯỚNG DẪN CÁCH GIẢI CHI TIẾT TỪNG BƯỚC CHO TẤT CẢ CÁC CÂU HỎI TRONG ĐỀ THI. Phụ huynh và con kéo xuống dưới để xem chi tiết đề bài, từng bước giải sư phạm, phân tích lỗi sai và bí kíp Olympic.`,
          bold: true,
          size: 20,
          color: 'B91C1C'
        })
      ]
    })
  );

  // ==========================================
  // PHẦN 1: BẢNG TỔNG HỢP ĐỐI CHIẾU
  // ==========================================
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: 'PHẦN I: BẢNG TỔNG HỢP ĐỐI CHIẾU ĐÁP ÁN NHANH',
          bold: true,
          size: 24,
          color: '1E40AF'
        })
      ]
    })
  );

  for (const part of parts) {
    if (part.items.length === 0) continue;

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: part.title,
            bold: true,
            size: 22,
            color: '2563EB'
          })
        ]
      })
    );

    children.push(createSectionTable(part.items));
  }

  // ==========================================
  // PHẦN 2: HƯỚNG DẪN CÁCH GIẢI CHI TIẾT TỪNG BƯỚC CHO TOÀN BỘ CÁC CÂU
  // ==========================================
  const wrongOrUnanswered = questions.filter(q => q.status === 'wrong' || q.status === 'unanswered' || q.status === 'need_verify');
  const correctOnes = questions.filter(q => q.status === 'correct');

  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 160 },
      children: [
        new TextRun({
          text: `PHẦN II: HƯỚNG DẪN CÁCH GIẢI CHI TIẾT TỪNG BƯỚC TOÀN BỘ ĐỀ THI (${questions.length} CÂU)`,
          bold: true,
          size: 26,
          color: 'B91C1C'
        })
      ]
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: 'Dưới đây là đề bài gốc, đáp số chuẩn, các bước giải mẫu chuẩn sư phạm, phân tích lỗi sai và mẹo tư duy nhanh Olympic cho từng câu hỏi.',
          italics: true,
          size: 20,
          color: '4B5563'
        })
      ]
    })
  );

  // Render question detail card
  const renderQuestionDetail = (q: MathQuestion, idxInGroup: number) => {
    const isWrong = q.status === 'wrong';
    const isUnanswered = q.status === 'unanswered';
    const isCorrect = q.status === 'correct';

    let statusLabel = 'LÀM ĐÚNG ✓';
    let statusThemeColor = '166534';
    let cardFill = 'F0FDF4';

    if (isWrong) {
      statusLabel = 'LÀM SAI (CẦN SỬA & HỌC LẠI)';
      statusThemeColor = 'DC2626';
      cardFill = 'FEF2F2';
    } else if (isUnanswered) {
      statusLabel = 'CHƯA LÀM (HƯỚNG DẪN CÁCH GIẢI)';
      statusThemeColor = 'D97706';
      cardFill = 'FFFBEB';
    } else if (q.status === 'need_verify') {
      statusLabel = 'CẦN XÁC MINH HÌNH VẼ';
      statusThemeColor = 'D97706';
      cardFill = 'FFFBEB';
    }

    // Question Header
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 280, after: 80 },
        children: [
          new TextRun({
            text: `Câu ${q.id}: ${q.title || `Câu hỏi số ${q.id}`}`,
            bold: true,
            size: 24,
            color: statusThemeColor
          }),
          new TextRun({
            text: `   [${statusLabel}]`,
            bold: true,
            size: 20,
            color: statusThemeColor
          })
        ]
      })
    );

    // Question Category & Difficulty
    children.push(
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `Chuyên đề: ${q.category || 'Toán học'} • Độ khó: ${q.difficulty || 'Trung bình'}`,
            bold: true,
            size: 19,
            color: '6B7280'
          })
        ]
      })
    );

    // Problem Statement (Multi-line supported)
    if (q.question) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: 'Đề bài: ', bold: true, size: 21, color: '111827' })
          ]
        })
      );

      const qParagraphs = createMultilineParagraphs(q.question, {
        size: 20,
        color: '1F2937',
        spacingAfter: 60
      });
      children.push(...qParagraphs);
    }

    // Comparison Answer Box (Table)
    const compTable = new Table({
      width: { size: 9000, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
        left: { style: BorderStyle.SINGLE, size: 6, color: statusThemeColor },
        right: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' }
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 4500, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: cardFill },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Đáp án con ghi: ', bold: true, size: 20 }),
                    new TextRun({
                      text: q.studentAnswer || '(Chưa làm / Để trống)',
                      bold: true,
                      size: 21,
                      color: isWrong ? 'DC2626' : (isUnanswered ? '6B7280' : '15803D')
                    })
                  ]
                })
              ]
            }),
            new TableCell({
              width: { size: 4500, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: 'F0FDF4' },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: '🎯 ĐÁP ÁN ĐÚNG: ', bold: true, size: 21, color: '166534' }),
                    new TextRun({ text: q.correctAnswer || 'Cần đối chiếu', bold: true, size: 23, color: '15803D' })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
    children.push(compTable);

    // Detailed Solution Steps Header
    children.push(
      new Paragraph({
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({
            text: 'Hướng dẫn cách giải chi tiết từng bước:',
            bold: true,
            size: 21,
            color: '1D4ED8'
          })
        ]
      })
    );

    // Print step-by-step solutions
    if (q.solutionSteps && q.solutionSteps.length > 0) {
      q.solutionSteps.forEach((step, sIdx) => {
        const stepParagraphs = createMultilineParagraphs(step, {
          size: 20,
          color: '334155',
          prefix: `• Bước ${sIdx + 1}: `,
          spacingAfter: 50
        });
        children.push(...stepParagraphs);
      });
    }

    // Print explanation
    if (q.explanation) {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 40 },
          children: [
            new TextRun({ text: 'Phân tích phương pháp giải:', bold: true, size: 20, color: '0284C7' })
          ]
        })
      );
      const expParagraphs = createMultilineParagraphs(q.explanation, {
        size: 20,
        color: '334155',
        spacingAfter: 50
      });
      children.push(...expParagraphs);
    }

    // Fallback if neither step nor explanation is available
    if ((!q.solutionSteps || q.solutionSteps.length === 0) && !q.explanation) {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `Phân tích dữ kiện đề bài theo dạng toán ${q.category || 'Toán học'}, áp dụng quy tắc suy luận logic để tìm ra kết quả đúng là: ${q.correctAnswer}.`,
              italics: true,
              size: 20,
              color: '64748B'
            })
          ]
        })
      );
    }

    // Student Mistake Analysis
    if (q.studentMistake) {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 40 },
          children: [
            new TextRun({ text: '⚠️ Phân tích lỗi sai & kinh nghiệm: ', bold: true, size: 20, color: 'B91C1C' })
          ]
        })
      );
      const mistakeParagraphs = createMultilineParagraphs(q.studentMistake, {
        size: 20,
        color: '991B1B',
        spacingAfter: 50
      });
      children.push(...mistakeParagraphs);
    }

    // Pro Tips / Olympic tricks
    if (q.tips) {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 40 },
          children: [
            new TextRun({ text: '💡 Bí kíp & Mẹo tư duy nhanh Olympic: ', bold: true, size: 20, color: 'B45309' })
          ]
        })
      );
      const tipsParagraphs = createMultilineParagraphs(q.tips, {
        size: 20,
        color: '92400E',
        spacingAfter: 120
      });
      children.push(...tipsParagraphs);
    } else {
      children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
    }
  };

  // Group A: Wrong and Unanswered Questions (Highest priority)
  if (wrongOrUnanswered.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: `MỤC A: CÁC CÂU LÀM SAI VÀ CHƯA HOÀN THÀNH (${wrongOrUnanswered.length} CÂU - CẦN ÔN TẬP KỸ)`,
            bold: true,
            size: 23,
            color: 'DC2626'
          })
        ]
      })
    );

    wrongOrUnanswered.forEach((q, idx) => {
      renderQuestionDetail(q, idx);
    });
  }

  // Group B: Correct Questions
  if (correctOnes.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 360, after: 120 },
        children: [
          new TextRun({
            text: `MỤC B: LỜI GIẢI THAM KHẢO & MẸO GIẢI NHANH CHO CÁC CÂU LÀM ĐÚNG (${correctOnes.length} CÂU)`,
            bold: true,
            size: 23,
            color: '15803D'
          })
        ]
      })
    );

    correctOnes.forEach((q, idx) => {
      renderQuestionDetail(q, idx);
    });
  }

  // Final Notes
  if (summary.notes) {
    children.push(
      new Paragraph({
        spacing: { before: 280, after: 120 },
        children: [
          new TextRun({ text: '📌 LƯU Ý TỔNG KẾT: ', bold: true, size: 20, color: '1E3A8A' }),
          new TextRun({
            text: summary.notes,
            italics: true,
            size: 20,
            color: '4B5563'
          })
        ]
      })
    );
  }

  // Signature
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 100 },
      children: [
        new TextRun({
          text: `Tài liệu bồi dưỡng học sinh giỏi Toán Olympic – Khởi tạo bởi Hệ thống MathMind AI cho bé ${summary.studentName}.`,
          italics: true,
          size: 19,
          color: '6B7280'
        })
      ]
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, fileName);
}


/**
 * Xuất file Word chuẩn định dạng cho Trợ Lý Giải Toán Bằng AI
 */
export async function exportSolverSessionToDocx(
  session: SolverSession,
  fileName?: string
) {
  const actualFileName = fileName || `Loi_Giai_${session.examTitle.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_').substring(0, 40)}.docx`;

  const children: (Paragraph | Table)[] = [];

  // Main Title
  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'BẢNG HƯỚNG DẪN GIẢI CHI TIẾT BÀI TOÁN OLYMPIC',
          bold: true,
          size: 30,
          color: '1E3A8A'
        })
      ]
    })
  );

  // Subtitle
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: `Đề thi: ${session.examTitle} • ${session.gradeLevel}`,
          bold: true,
          size: 22,
          color: '2563EB'
        })
      ]
    })
  );

  // Summary metadata table
  const metaTable = new Table({
    width: { size: 9000, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
      left: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
      right: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4500, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Tổng số câu hỏi: ', bold: true, size: 20 }),
                  new TextRun({ text: `${session.totalQuestions} câu`, size: 20 })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 4500, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Thời gian giải: ', bold: true, size: 20 }),
                  new TextRun({ text: session.createdAt, size: 20 })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  children.push(metaTable);

  children.push(
    new Paragraph({
      spacing: { before: 200, after: 160 },
      children: [
        new TextRun({
          text: 'HƯỚNG DẪN GIẢI CHI TIẾT TỪNG CÂU HỎI:',
          bold: true,
          size: 24,
          color: '0F172A'
        })
      ]
    })
  );

  // Render each question
  for (const q of session.questions) {
    // Question header
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 80 },
        children: [
          new TextRun({
            text: `Câu ${q.questionNumber}: ${q.title}`,
            bold: true,
            size: 24,
            color: '1D4ED8'
          }),
          new TextRun({
            text: `  [${q.category} • ${q.difficulty}]`,
            bold: true,
            size: 20,
            color: '6B7280'
          })
        ]
      })
    );

    // Problem English
    if (q.textEn) {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Đề bài (Tiếng Anh): ', bold: true, size: 20, color: '111827' }),
            new TextRun({ text: q.textEn, bold: true, size: 20, color: '111827' })
          ]
        })
      );
    }

    // Problem Vietnamese
    if (q.textVi) {
      children.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: 'Dịch nghĩa (Tiếng Việt): ', bold: true, size: 20, color: '4B5563' }),
            new TextRun({ text: q.textVi, italics: true, size: 20, color: '4B5563' })
          ]
        })
      );
    }

    // Final Answer box
    const answerTable = new Table({
      width: { size: 9000, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: '10B981' },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: '10B981' },
        left: { style: BorderStyle.SINGLE, size: 4, color: '10B981' },
        right: { style: BorderStyle.SINGLE, size: 2, color: '10B981' }
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 9000, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: 'ECFDF5' },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: '🎯 ĐÁP SỐ CUỐI CÙNG: ', bold: true, size: 22, color: '065F46' }),
                    new TextRun({ text: q.finalAnswer, bold: true, size: 24, color: '047857' })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
    children.push(answerTable);

    // Solution steps
    children.push(
      new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [
          new TextRun({ text: 'Các bước giải chi tiết chuẩn sư phạm:', bold: true, size: 20, color: '1F2937' })
        ]
      })
    );

    for (const step of q.solutionSteps) {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: step, size: 20, color: '334155' })
          ]
        })
      );
    }

    // Pro Tips
    if (q.tips) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 60 },
          children: [
            new TextRun({ text: '💡 Bí kíp & Mẹo giải nhanh Olympic: ', bold: true, size: 20, color: 'B45309' }),
            new TextRun({ text: q.tips, size: 20, color: '92400E' })
          ]
        })
      );
    }

    // Core formulas
    if (q.coreFormulas && q.coreFormulas.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 180 },
          children: [
            new TextRun({ text: '📐 Công thức áp dụng: ', bold: true, size: 20, color: '4338CA' }),
            new TextRun({ text: q.coreFormulas.join(' • '), size: 20, color: '3730A3' })
          ]
        })
      );
    } else {
      children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
    }
  }

  // Footer Note
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 100 },
      children: [
        new TextRun({
          text: 'Tài liệu được khởi tạo tự động bởi Hệ Thống MathMind AI – Chuẩn Thi Đấu Toán Quốc Tế.',
          italics: true,
          size: 18,
          color: '6B7280'
        })
      ]
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, actualFileName);
}
