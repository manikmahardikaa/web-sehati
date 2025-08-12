"use client";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { Image } from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

interface FlipBookProps {
  name: string;
  url: string;
}

export default function FlipBook({ url, name }: FlipBookProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  // Simpan ref untuk setiap canvas
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    // clear images saat url berubah
    setImages([]);
    canvasRefs.current = [];
  }, [url]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Saat canvas PDF di-render, convert ke image
  const handleRenderSuccess = (pageIndex: number) => {
    const canvas = canvasRefs.current[pageIndex];
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      setImages((prev) => {
        const newArr = [...prev];
        newArr[pageIndex] = imgData;
        return newArr;
      });
    }
  };

  return (
    <div
      style={{
        minHeight: 700,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
      }}
    >
      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 28,
          marginBottom: 12,
        }}
      >
        {name}
      </h2>

      {/* Render semua halaman PDF, hidden, untuk ambil canvas */}
      <div style={{ display: "none" }}>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`hidden_page_${index + 1}`}
              pageNumber={index + 1}
              width={600}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              canvasRef={(ref) => (canvasRefs.current[index] = ref)}
              onRenderSuccess={() => handleRenderSuccess(index)}
            />
          ))}
        </Document>
      </div>

      {/* Render Flipbook */}
      <HTMLFlipBook
        className="flip-book"
        size="fixed"
        width={600}
        height={900}
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        showCover={true}
        startPage={0}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={0.5}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        style={{
          background: "white",
          borderRadius: 16,
          padding: 0,
          boxShadow: "none",
        }}
      >
        {images.map((imgSrc, idx) =>
          imgSrc ? (
            <div
              key={idx}
              style={{
                width: 600,
                height: 800,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={imgSrc}
                alt={`Page ${idx + 1}`}
                preview={false}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          ) : (
            <div
              key={idx}
              style={{
                width: 600,
                height: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#bbb" }}>Loading page {idx + 1}...</span>
            </div>
          )
        )}
      </HTMLFlipBook>
      <p
        style={{
          marginTop: 24,
          color: "#555",
          fontSize: 16,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Geser halaman ke kanan/kiri untuk membalik halaman
      </p>
    </div>
  );
}
