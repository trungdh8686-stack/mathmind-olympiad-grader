import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const samplePages = [
  { page: 1, title: 'Trang 1: Câu 1 – 14 (Dãy số, Phép tính, Phép toán @)', src: '/samples/page1.jpg' },
  { page: 2, title: 'Trang 2: Câu 15 – 29 (Dãy cấp số cộng, Số liên tiếp, Đổi xu)', src: '/samples/page2.jpg' },
  { page: 3, title: 'Trang 3: Câu 30 – 46 (Chu vi diện tích, Lịch 2020, Chữ số 8)', src: '/samples/page3.jpg' },
  { page: 4, title: 'Trang 4: Câu 47 – 57 (Cắt ghép hình vuông, Dirichlet, Ngũ giác)', src: '/samples/page4.jpg' },
  { page: 5, title: 'Trang 5: Câu 58 – 63 (Đổi tiền USD, Thang hỏng, Bốc bi)', src: '/samples/page5.jpg' },
];

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{current.title}</h3>
              <p className="text-xs text-slate-500">
                Trang {currentIndex + 1} / {samplePages.length} • Bản scan bài làm gốc của con
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-600 min-w-10 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              title="Xoay hình ảnh"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Container with Zoom & Pan */}
        <div className="flex-1 overflow-auto bg-slate-950/90 flex items-center justify-center relative p-4">
          <img
            src={current.src}
            alt={current.title}
            className="transition-transform duration-200 max-h-full object-contain rounded-lg shadow-lg"
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
            }}
          />

          {/* Prev / Next buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Selector at bottom */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto">
          {samplePages.map((page, idx) => (
            <button
              key={page.page}
              onClick={() => {
                setCurrentIndex(idx);
                setZoomLevel(1);
                setRotation(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentIndex === idx
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Trang {page.page} (Câu {page.page === 1 ? '1-14' : page.page === 2 ? '15-29' : page.page === 3 ? '30-46' : page.page === 4 ? '47-57' : '58-63'})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
