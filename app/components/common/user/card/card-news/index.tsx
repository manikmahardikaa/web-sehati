import { memo, useMemo } from "react";
import { Card, Image, Typography } from "antd";
import dayjs from "dayjs";
import stripHtml from "@/app/utils/strip-html";
import type { NewsDataModel } from "@/app/models/petugas-kesehatan/news";

const { Title, Text } = Typography;

type Props = {
  news: NewsDataModel;
  onOpen?: (newsId: string) => void;
  maxChars?: number; // optional: control excerpt length
};

function CardNews({ news, onOpen, maxChars = 120 }: Props) {
  const excerpt = useMemo(() => {
    const plain = stripHtml(news?.body ?? "");
    return plain.length > maxChars ? `${plain.slice(0, maxChars)}…` : plain;
  }, [news?.body, maxChars]);

  const handleOpen = () => onOpen?.(news.id);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const createdAt = news?.createdAt
    ? dayjs(news.createdAt).format("DD MMMM YYYY")
    : "";

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: "0 2px 18px rgba(0,0,0,0.07)",
        border: "none",
        overflow: "hidden",
      }}
      bodyStyle={{ padding: 0 }}
      hoverable
    >
      {/* Thumbnail */}
      <Image
        src={news?.thumbnail_url || "/images/placeholder-news.jpg"}
        alt={news?.name || "Thumbnail"}
        height={220}
        width="100%"
        style={{ objectFit: "cover" }}
        preview={false}
        fallback="/images/placeholder-news.jpg"
      />

      <div style={{ padding: "18px 20px 20px" }}>
        {/* Judul (clickable & keyboard-accessible) */}
        <Title
          level={4}
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: 20,
            cursor: "pointer",
          }}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={handleKey}
        >
          {news?.name ?? "-"}
        </Title>

        {/* Tanggal */}
        {createdAt && (
          <Text type="secondary" style={{ display: "block", marginTop: 6 }}>
            {createdAt}
          </Text>
        )}

        {/* Ringkasan */}
        <div
          style={{
            marginTop: 10,
            fontSize: 15,
            color: "#262626",
            lineHeight: 1.55,
            minHeight: 44,
          }}
        >
          {excerpt}
        </div>

        {/* Baca Selengkapnya (clickable) */}
        <span
          onClick={handleOpen}
          onKeyDown={handleKey}
          role="button"
          tabIndex={0}
          style={{
            display: "inline-block",
            marginTop: 6,
            color: "#d41c1c",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            fontStyle: "italic",
          }}
        >
          Baca selengkapnya
        </span>
      </div>
    </Card>
  );
}

export default memo(CardNews);
