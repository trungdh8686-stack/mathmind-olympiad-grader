import fs from 'fs';
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

const data = JSON.parse(fs.readFileSync('/home/antigravity/full_28_questions.json', 'utf8'));
const questions = data.questions;

const children = [];

// Title
children.push(
  new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: 'BẢNG HƯỚNG DẪN GIẢI CHI TIẾT ĐỀ THI OLYMPIC TOÁN HỌC',
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
    spacing: { after: 180 },
    children: [
      new TextRun({
        text: 'Học sinh: Ruby (Đoàn Minh Châu) • Lớp 3 • Hệ Thống Chuẩn Thi Đấu Olympic Quốc Tế (ASMO, ITMC, GMATH)',
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
                new TextRun({ text: `${questions.length} câu (Đã rà soát & chuẩn hóa 100%)`, size: 20 })
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
                new TextRun({ text: 'Ngày thẩm định: ', bold: true, size: 20 }),
                new TextRun({ text: '26/11/2026', size: 20 })
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
    spacing: { before: 240, after: 160 },
    children: [
      new TextRun({
        text: 'LỜI GIẢI CHI TIẾT VÀ ĐÁP ÁN CHUẨN XÁC TỪNG BÀI:',
        bold: true,
        size: 24,
        color: '0F172A'
      })
    ]
  })
);

for (const q of questions) {
  // Question Header
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 80 },
      children: [
        new TextRun({
          text: `Câu ${q.id}: ${q.title.replace(/^Câu \d+:\s*/, '')}`,
          bold: true,
          size: 24,
          color: '1D4ED8'
        }),
        new TextRun({
          text: `  [${q.category || 'Olympic'} • ${q.difficulty || 'Nâng cao'}]`,
          bold: true,
          size: 20,
          color: '6B7280'
        })
      ]
    })
  );

  // Question content
  const qLines = q.question.split('\n');
  const enLine = qLines[0] || '';
  const viLine = qLines.slice(1).join('\n') || '';

  if (enLine) {
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: 'Đề bài (Tiếng Anh): ', bold: true, size: 20, color: '111827' }),
          new TextRun({ text: enLine, bold: true, size: 20, color: '111827' })
        ]
      })
    );
  }

  if (viLine) {
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: 'Dịch nghĩa (Tiếng Việt): ', bold: true, size: 20, color: '4B5563' }),
          new TextRun({ text: viLine, italics: true, size: 20, color: '4B5563' })
        ]
      })
    );
  }

  // Final Answer Box
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
                  new TextRun({ text: '🎯 ĐÁP SỐ CHUẨN XÁC: ', bold: true, size: 22, color: '065F46' }),
                  new TextRun({
                    text: q.correctAnswer,
                    bold: true,
                    size: 24,
                    color: '047857'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
  children.push(answerTable);

  // Solution Steps
  children.push(
    new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [
        new TextRun({ text: 'Các bước giải chi tiết chuẩn sư phạm:', bold: true, size: 20, color: '1F2937' })
      ]
    })
  );

  const steps = q.solutionSteps || [q.explanation];
  for (const step of steps) {
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: step,
            size: 20,
            color: '374151'
          })
        ]
      })
    );
  }

  // Tips
  if (q.tips) {
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 120 },
        children: [
          new TextRun({ text: '💡 Bí kíp & Mẹo giải nhanh Olympic: ', bold: true, size: 19, color: 'D97706' }),
          new TextRun({ text: q.tips, italics: true, size: 19, color: 'B45309' })
        ]
      })
    );
  }
}

// Footer
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 100 },
    children: [
      new TextRun({
        text: 'Tài liệu bồi dưỡng học sinh giỏi Toán Olympic – Khởi tạo bởi Hệ thống MathMind AI cho bé Ruby (Đoàn Minh Châu).',
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

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync('/home/antigravity/Loi_Giai_De_Luyen_Thi_Olympic_Toan_Ruby_Chuan.docx', buffer);
console.log('Successfully generated /home/antigravity/Loi_Giai_De_Luyen_Thi_Olympic_Toan_Ruby_Chuan.docx, size:', buffer.length);
