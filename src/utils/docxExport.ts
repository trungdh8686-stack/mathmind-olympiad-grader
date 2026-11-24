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

export async function exportTestToDocx(
  summary: TestSummary,
  questions: MathQuestion[],
  fileName = 'Dap_an_Luyen_Toan_Cuoi_Tuan_11.docx'
) {
  // Determine parts dynamically if more or fewer questions
  const total = questions.length;
  const parts: { title: string; items: MathQuestion[] }[] = [];

  if (total <= 15) {
    parts.push({ title: `Toàn bộ đề thi (${total} câu)`, items: questions });
  } else if (total <= 30) {
    parts.push({ title: 'Phần 1: Câu 1 – 15', items: questions.slice(0, 15) });
    parts.push({ title: `Phần 2: Câu 16 – ${total}`, items: questions.slice(15) });
  } else {
    // 5 parts standard
    parts.push({ title: 'Câu 1–14', items: questions.filter(q => q.id >= 1 && q.id <= 14) });
    parts.push({ title: 'Câu 15–29', items: questions.filter(q => q.id >= 15 && q.id <= 29) });
    parts.push({ title: 'Câu 30–46', items: questions.filter(q => q.id >= 30 && q.id <= 46) });
    parts.push({ title: 'Câu 47–57', items: questions.filter(q => q.id >= 47 && q.id <= 57) });
    parts.push({ title: 'Câu 58–' + total, items: questions.filter(q => q.id >= 58) });
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
            width: { size: 1200, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Câu', bold: true, size: 21 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 2600, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Đáp án con ghi', bold: true, size: 21 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 2600, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Đáp án đúng', bold: true, size: 21 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 2600, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Nhận xét', bold: true, size: 21 })]
              })
            ]
          })
        ]
      }),
      ...items.map(item => {
        let statusColor = '166534'; // Green
        if (item.status === 'wrong') statusColor = 'DC2626'; // Red
        else if (item.status === 'need_verify') statusColor = 'D97706'; // Amber
        else if (item.status === 'unanswered') statusColor = '6B7280'; // Gray

        return new TableRow({
          children: [
            new TableCell({
              width: { size: 1200, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: String(item.id), size: 20 })]
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
              width: { size: 2600, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: item.statusText || (item.status === 'wrong' ? 'Sai / cần sửa' : (item.status === 'unanswered' ? 'Chưa làm' : 'Đúng')),
                      color: statusColor,
                      bold: true,
                      size: 20
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

  // Title
  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: summary.title || 'KẾT QUẢ CHẤM ĐIỂM BÀI TẬP TOÁN',
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
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: summary.subtitle || `Tổng hợp kết quả chấm bài (${questions.length} câu)`,
          italics: true,
          size: 20,
          color: '4B5563'
        })
      ]
    })
  );

  // Metadata summary
  const correctPct = summary.totalQuestions > 0 ? ((summary.correctCount / summary.totalQuestions) * 100).toFixed(1) : '0';
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: `Học sinh: ${summary.studentName} | Lớp: ${summary.grade} | Ngày chấm: ${summary.testDate} | Điểm ước tính: ${summary.score10}/10 (${correctPct}%)`,
          bold: true,
          size: 20,
          color: '1F2937'
        })
      ]
    })
  );

  // PHẦN 1: BẢNG TỔNG HỢP ĐỐI CHIẾU
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: 'PHẦN I: BẢNG TỔNG HỢP ĐỐI CHIẾU ĐÁP ÁN',
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

  // PHẦN 2: HƯỚNG DẪN GIẢI CHI TIẾT CÁC CÂU LÀM SAI VÀ CHƯA LÀM
  const needReviewQuestions = questions.filter(
    q => q.status === 'wrong' || q.status === 'unanswered' || q.status === 'need_verify'
  );

  if (needReviewQuestions.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 380, after: 160 },
        children: [
          new TextRun({
            text: `PHẦN II: HƯỚNG DẪN CÁCH GIẢI CHI TIẾT CÁC CÂU CẦN HỌC LẠI (${needReviewQuestions.length} CÂU SAI & CHƯA LÀM)`,
            bold: true,
            size: 24,
            color: 'B91C1C'
          })
        ]
      })
    );

    children.push(
      new Paragraph({
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: 'Dưới đây là phương pháp và lời giải chi tiết từng bước cho các câu con đã làm sai hoặc chưa hoàn thành. Phụ huynh và con hãy xem kỹ từng bước để khắc phục lỗi sai nhé!',
            italics: true,
            size: 20,
            color: '4B5563'
          })
        ]
      })
    );

    for (const q of needReviewQuestions) {
      const isWrong = q.status === 'wrong';
      const statusLabel = isWrong ? 'LÀM SAI (CẦN SỬA)' : (q.status === 'unanswered' ? 'CHƯA LÀM' : 'CẦN XÁC MINH');
      const statusThemeColor = isWrong ? 'DC2626' : 'D97706';

      // Question header
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 80 },
          children: [
            new TextRun({
              text: `Câu ${q.id}: ${q.title || `Câu hỏi số ${q.id}`}`,
              bold: true,
              size: 22,
              color: statusThemeColor
            }),
            new TextRun({
              text: `  [${q.category || 'Toán học'} • ${statusLabel}]`,
              bold: true,
              size: 19,
              color: '6B7280'
            })
          ]
        })
      );

      // Question Statement
      if (q.question) {
        children.push(
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'Đề bài: ', bold: true, size: 20, color: '1F2937' }),
              new TextRun({ text: q.question, size: 20, color: '1F2937' })
            ]
          })
        );
      }

      // Comparison Box
      const compTable = new Table({
        width: { size: 9000, type: WidthType.DXA },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
          bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
          left: { style: BorderStyle.SINGLE, size: 4, color: statusThemeColor },
          right: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' }
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 4500, type: WidthType.DXA },
                shading: { type: ShadingType.CLEAR, fill: isWrong ? 'FEF2F2' : 'FFFBEB' },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: 'Đáp án con ghi: ', bold: true, size: 19 }),
                      new TextRun({
                        text: q.studentAnswer || '(Chưa làm / Để trống)',
                        bold: true,
                        size: 20,
                        color: isWrong ? 'DC2626' : '6B7280'
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
                      new TextRun({ text: '🎯 ĐÁP ÁN ĐÚNG: ', bold: true, size: 20, color: '166534' }),
                      new TextRun({ text: q.correctAnswer || 'Cần đối chiếu', bold: true, size: 22, color: '15803D' })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });
      children.push(compTable);

      // Detailed Solution Steps
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({ text: 'Hướng dẫn cách giải chi tiết:', bold: true, size: 20, color: '1D4ED8' })
          ]
        })
      );

      if (q.solutionSteps && q.solutionSteps.length > 0) {
        for (const step of q.solutionSteps) {
          children.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                new TextRun({ text: step, size: 20, color: '334155' })
              ]
            })
          );
        }
      } else if (q.explanation) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: q.explanation, size: 20, color: '334155' })
            ]
          })
        );
      } else {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `Phân tích dữ kiện đề bài theo dạng ${q.category || 'Toán học'}, áp dụng công thức chuẩn để tính ra đáp số ${q.correctAnswer}.`,
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
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({ text: '⚠️ Phân tích lỗi sai: ', bold: true, size: 19, color: 'B91C1C' }),
              new TextRun({ text: q.studentMistake, size: 19, color: '991B1B' })
            ]
          })
        );
      }

      // Pro Tips / Olympic tricks
      if (q.tips) {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 120 },
            children: [
              new TextRun({ text: '💡 Bí kíp & Mẹo tư duy nhanh: ', bold: true, size: 19, color: 'B45309' }),
              new TextRun({ text: q.tips, size: 19, color: '92400E' })
            ]
          })
        );
      }
    }
  }

  // PHẦN 3: CÁC CÂU LÀM ĐÚNG (NẾU CÓ)
  const correctQuestions = questions.filter(q => q.status === 'correct');
  if (correctQuestions.length > 0 && correctQuestions.some(q => q.explanation || (q.solutionSteps && q.solutionSteps.length > 0))) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 360, after: 140 },
        children: [
          new TextRun({
            text: `PHẦN III: LỜI GIẢI THAM KHẢO CHO CÁC CÂU CON ĐÃ LÀM ĐÚNG (${correctQuestions.length} CÂU)`,
            bold: true,
            size: 22,
            color: '15803D'
          })
        ]
      })
    );

    for (const q of correctQuestions) {
      if (!q.explanation && (!q.solutionSteps || q.solutionSteps.length === 0)) continue;

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 60 },
          children: [
            new TextRun({ text: `✓ Câu ${q.id}: `, bold: true, size: 20, color: '15803D' }),
            new TextRun({ text: `Đáp án: ${q.correctAnswer}. `, bold: true, size: 20 }),
            new TextRun({ text: (q.solutionSteps && q.solutionSteps.length > 0) ? q.solutionSteps.join(' ') : (q.explanation || ''), size: 20, color: '4B5563' })
          ]
        })
      );
    }
  }

  // Notes
  if (summary.notes) {
    children.push(
      new Paragraph({
        spacing: { before: 240, after: 120 },
        children: [
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
