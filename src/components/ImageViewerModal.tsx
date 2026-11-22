import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getSamplePages = () => {
  const baseUrl = (import.meta as any).env?.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return [
    { page: 1, title: 'Trang 1: Câu 1 – 14 (Dãy số, Phép tính, Phép toán @)', src: `${cleanBase}samples/page1.jpg` },
    { page: 2, title: 'Trang 2: Câu 15 – 29 (Dãy cấp số cộng, Số liên tiếp, Đổi xu)', src: `${cleanBase}samples/page2.jpg` },
    { page: 3, title: 'Trang 3: Câu 30 – 46 (Chu vi diện tích, Lịch 2020, Chữ số 8)', src: `${cleanBase}samples/page3.jpg` },
    { page: 4, title: 'Trang 4: Câu 47 – 57 (Cắt ghép hình vuông, Dirichlet, Ngũ giác)', src: `${cleanBase}samples/page4.jpg` },
    { page: 5, title: 'Trang 5: Câu 58 – 63 (Đổi tiền USD, Thang hỏng, Bốc bi)', src: `${cleanBase}samples/page5.jpg` },
  ];
};

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const samplePages = getSamplePages();

  if (!isOpen) return null;

  const current = samplePages[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % samplePages.length);
    setZoomLevel(1);
    setRotation(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + samplePages.length) % samplePages.length);
    setZoomLevel(1);
    setRotation(0);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-md">{current.title}</h3>
              <p className="text-xs text-slate-500">
                Trang {currentIndex + 1} / {samplePages.length} • Bản chụp bài làm gốc độ nét cao của Ruby
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer"
              title="Đặt lại kích thước chuẩn"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.min(3, z + 0.2))}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Xoay hình ảnh"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Container with natural resolution */}
        <div className="flex-1 overflow-auto bg-slate-900 flex items-center justify-center relative p-4 select-none">
          <img
            src={current.src}
            alt={current.title}
            className="transition-transform duration-200 max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
            }}
            loading="eager"
          />

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg cursor-pointer"
            title="Trang trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg cursor-pointer"
            title="Trang tiếp theo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Selector at bottom */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto shrink-0">
          {samplePages.map((page, idx) => (
            <button
              key={page.page}
              onClick={() => {
                setCurrentIndex(idx);
                setZoomLevel(1);
                setRotation(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                currentIndex === idx
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Trang {page.page} ({page.page === 1 ? 'Câu 1-14' : page.page === 2 ? 'Câu 15-29' : page.page === 3 ? 'Câu 30-46' : page.page === 4 ? 'Câu 47-57' : 'Câu 58-63'})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
