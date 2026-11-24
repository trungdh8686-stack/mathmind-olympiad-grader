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
  // Group questions by part
  const part1 = questions.filter(q => q.id >= 1 && q.id <= 14);
  const part2 = questions.filter(q => q.id >= 15 && q.id <= 29);
  const part3 = questions.filter(q => q.id >= 30 && q.id <= 46);
  const part4 = questions.filter(q => q.id >= 47 && q.id <= 57);
  const part5 = questions.filter(q => q.id >= 58 && q.id <= 63);

  const parts = [
    { title: 'Câu 1–14', items: part1 },
    { title: 'Câu 15–29', items: part2 },
    { title: 'Câu 30–46', items: part3 },
    { title: 'Câu 47–57', items: part4 },
    { title: 'Câu 58–63', items: part5 }
  ];

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
            width: { size: 1500, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Câu', bold: true, size: 22 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 3500, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Đáp án đúng', bold: true, size: 22 })]
              })
            ]
          }),
          new TableCell({
            width: { size: 4000, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Nhận xét', bold: true, size: 22 })]
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
              width: { size: 1500, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: String(item.id), size: 20 })]
                })
              ]
            }),
            new TableCell({
              width: { size: 3500, type: WidthType.DXA },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: item.correctAnswer, bold: true, size: 20 })]
                })
              ]
            }),
            new TableCell({
              width: { size: 4000, type: WidthType.DXA },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: item.statusText,
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
          text: summary.title,
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
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: summary.subtitle,
          italics: true,
          size: 20,
          color: '4B5563'
        })
      ]
    })
  );

  // Metadata summary
  const correctPct = ((summary.correctCount / summary.totalQuestions) * 100).toFixed(1);
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

  // Add 5 tables for 5 parts
  for (const part of parts) {
    if (part.items.length === 0) continue;

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        children: [
          new TextRun({
            text: part.title,
            bold: true,
            size: 24,
            color: '2563EB'
          })
        ]
      })
    );

    children.push(createSectionTable(part.items));
  }

  // Section: Giải thích ngắn các câu cần sửa
  const wrongQuestions = questions.filter(q => q.status === 'wrong');
  if (wrongQuestions.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 360, after: 160 },
        children: [
          new TextRun({
            text: 'Giải thích ngắn các câu cần sửa',
            bold: true,
            size: 26,
            color: 'B91C1C'
          })
        ]
      })
    );

    for (const wq of wrongQuestions) {
      children.push(
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: `Câu ${wq.id}: `, bold: true, color: 'B91C1C', size: 22 }),
            new TextRun({ text: wq.explanation, size: 22 })
          ]
        })
      );
    }
  }

  // Note
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
            new TextRun({ text: step, size: 20, color: '374151' })
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
