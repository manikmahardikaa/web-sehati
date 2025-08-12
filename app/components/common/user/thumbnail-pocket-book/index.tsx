import { Image } from "antd";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

interface PdfThumbnailProps {
  url: string;
  width?: number;
  height?: number;
}

export default function PdfThumbnail({
  url,
  width = 180,
  height = 120,
}: PdfThumbnailProps) {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    async function render() {
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1 });
      const scale = width / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      await page.render({ canvasContext: context, viewport: scaledViewport })
        .promise;

      if (!canceled) {
        setImg(canvas.toDataURL());
      }
    }
    render();
    return () => {
      canceled = true;
    };
  }, [url, width]);

  return img ? (
    <Image
      src={img}
      alt="thumbnail pdf"
      style={{
        width,
        height,
        objectFit: "cover",
        display: "block",
        borderRadius: 0,
        background: "#f4f4f4",
      }}
    />
  ) : (
    <div
      style={{
        width,
        height,
        background: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#bbb",
        fontStyle: "italic",
        fontSize: 13,
      }}
    >
      Loading...
    </div>
  );
}
