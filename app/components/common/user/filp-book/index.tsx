"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { Image } from "antd";

// Worker pdf.js – kalau kamu sudah copy ke /public/pdf.worker.js biarkan saja.
// Kalau mau pakai dari paket:
// pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

interface FlipBookProps {
  name: string;
  url: string;
}

const BOOK_W = 600;
const BOOK_H = 800;

export default function FlipBook({ url, name }: FlipBookProps) {
  const [numPages, setNumPages] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // reset saat URL berubah
  useEffect(() => {
    setImages([]);
    canvasRefs.current = [];
    setNumPages(0);
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    // siapkan buffer agar jumlah anak flipbook selalu valid
    setImages(Array.from({ length: numPages }, () => ""));
  };

  const handleRenderSuccess = (pageIndex: number) => {
    const canvas = canvasRefs.current[pageIndex];
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");
    setImages((prev) => {
      if (prev[pageIndex] === imgData) return prev;
      const next = [...prev];
      next[pageIndex] = imgData;
      return next;
    });
  };

  // Render Document off-screen (bukan display:none) supaya canvas punya dimensi
  const HiddenPdf = useMemo(
    () =>
      url ? (
        <div
          style={{
            position: "absolute",
            left: -99999,
            top: 0,
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
          aria-hidden
        >
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages }, (_, index) => (
              <Page
                key={`hidden_page_${index + 1}`}
                pageNumber={index + 1}
                width={BOOK_W} // match book width
                renderAnnotationLayer={false}
                renderTextLayer={false}
                canvasRef={(ref) => {
                  canvasRefs.current[index] = ref;
                }}
                onRenderSuccess={() => handleRenderSuccess(index)}
              />
            ))}
          </Document>
        </div>
      ) : null,
    [url, numPages]
  );

  return (
    <div
      style={{
        minHeight: BOOK_H + 140,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 12px 24px", // kecilkan padding supaya tidak terasa ada jarak
      }}
    >
      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 28,
          margin: "0 0 8px", // kecilkan jarak judul–buku
        }}
      >
        {name}
      </h2>

      {/* PDF off-screen */}
      {HiddenPdf}

      {/* Flipbook – render setelah numPages siap */}
      {numPages > 0 && (
        <HTMLFlipBook
          className="flip-book"
          size="fixed"
          width={BOOK_W}
          height={BOOK_H}
          minWidth={BOOK_W}
          maxWidth={BOOK_W}
          minHeight={BOOK_H}
          maxHeight={BOOK_H}
          showCover
          startPage={0}
          drawShadow
          flippingTime={900}
          usePortrait
          startZIndex={1}
          autoSize={false} // pastikan ukuran tetap, hindari “melompat”
          maxShadowOpacity={0.5}
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            // JANGAN beri padding di sini agar tidak ada gap internal
          }}
        >
          {Array.from({ length: numPages }, (_, idx) => {
            const imgSrc = images[idx];
            return (
              <div
                key={idx}
                style={{
                  width: BOOK_W,
                  height: BOOK_H,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                }}
              >
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={`Page ${idx + 1}`}
                    preview={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // set ke 'cover' kalau ingin “memotong” margin putih PDF
                    }}
                  />
                ) : (
                  <span style={{ color: "#bbb" }}>
                    Memuat halaman {idx + 1}…
                  </span>
                )}
              </div>
            );
          })}
        </HTMLFlipBook>
      )}

      <p
        style={{
          marginTop: 16,
          color: "#555",
          fontSize: 14,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Geser halaman ke kanan/kiri untuk membalik halaman
      </p>
    </div>
  );
}
