import React, { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface WatermarkEditorProps {
  imageFile: File;
  qrCodeUrl: string;
  onReset: () => void;
}

export const WatermarkEditor: React.FC<WatermarkEditorProps> = ({
  imageFile,
  qrCodeUrl,
  onReset,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  // State for QR code
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [size, setSize] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startResizePos, setStartResizePos] = useState({ x: 0, y: 0 });
  const [startResizeSize, setStartResizeSize] = useState(100);

  // Load image
  useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setStartResizePos({ x: e.clientX, y: e.clientY });
    setStartResizeSize(size);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // Boundaries check (optional, but good UX)
        if (containerRef.current) {
          // const container = containerRef.current.getBoundingClientRect();
          // Simple clamp? Or allow partial off-screen?
          // Let's allow it to move freely within container
        }

        setPosition({ x: newX, y: newY });
      }

      if (isResizing) {
        const deltaX = e.clientX - startResizePos.x;
        const newSize = Math.max(50, startResizeSize + deltaX); // Min size 50px
        setSize(newSize);
      }
    },
    [isDragging, isResizing, dragOffset, startResizePos, startResizeSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleDownload = async () => {
    if (!containerRef.current) return;

    try {
      const canvas = await html2canvas(containerRef.current, {
        useCORS: true, // Important for QR if from external URL
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `qr-campaign-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download image.');
    }
  };

  if (!imageUrl) return <div>Loading image...</div>;

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <div className="flex gap-2 mb-4">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
        >
          Change Image
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-lg"
        >
          Download Image
        </button>
      </div>

      <div className="border border-slate-200 shadow-xl rounded-lg overflow-hidden bg-slate-50 inline-block relative">
        <div
          ref={containerRef}
          className="relative inline-block"
          style={{ lineHeight: 0 }}
        >
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-h-[70vh] w-auto h-auto object-contain select-none"
            draggable={false}
          />

          <div
            ref={qrRef}
            className="absolute cursor-move select-none group"
            style={{
              left: position.x,
              top: position.y,
              width: size,
              height: size,
              zIndex: 10,
            }}
            onMouseDown={handleMouseDown}
          >
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="w-full h-full select-none pointer-events-none"
              crossOrigin="anonymous" // Important for html2canvas
            />

            {/* Outline on hover/interaction */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 group-active:border-blue-500 pointer-events-none rounded-sm transition-colors" />

            {/* Resize handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity"
              onMouseDown={handleResizeMouseDown}
              style={{ transform: 'translate(50%, 50%)' }}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-2">
        Drag to move the QR code. Drag the blue dot to resize.
      </p>
    </div>
  );
};
