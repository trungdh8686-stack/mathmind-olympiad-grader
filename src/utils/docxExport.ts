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
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: item.correctAnswer, bold: true, size: 20 })]
                })
              ]
            }),
            new TableCell({
              width: { size: 4000, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: item.statusText, color: statusColor, bold: item.status === 'wrong', size: 20 })]
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
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: summary.title,
          bold: true,
          size: 32,
          color: '1E3A8A'
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: summary.subtitle,
          italics: true,
          size: 22,
          color: '4B5563'
        })
      ]
    })
  );

  // Each Part
  for (const part of parts) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        children: [
          new TextRun({
            text: part.title,
            bold: true,
            size: 26,
            color: '1F2937'
          })
        ]
      }),
      createSectionTable(part.items)
    );
  }

  // Section: Giải thích ngắn các câu cần sửa
  const wrongQuestions = questions.filter(q => q.status === 'wrong');
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

  // Note
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
