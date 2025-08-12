import { NewsDataModel } from "@/app/models/petugas-kesehatan/news";
import stripHtml from "@/app/utils/strip-html";
import { Card, Image, Typography } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export default function CardNews({ news }: { news: NewsDataModel }) {
  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: "0 2px 18px 0 rgba(0,0,0,0.07)",
        padding: 0,
        border: "none",
      }}
      bodyStyle={{ padding: 0 }}
    >
      {/* Thumbnail */}
      <Image
        src={news.thumbnail_url}
        alt={news.name}
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <div style={{ padding: "22px 24px 20px 24px" }}>
        {/* Judul */}
        <Title level={4} style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>
          {news.name}
        </Title>
        {/* Tanggal */}
        <Text
          type="secondary"
          style={{ display: "block", fontSize: 14, margin: "6px 0 9px 0" }}
        >
          {dayjs(news.createdAt).format("DD MMMM YYYY")}
        </Text>
        {/* Ringkasan */}
        <div
          style={{
            fontSize: 15,
            color: "#262626",
            marginBottom: 4,
            minHeight: 44,
            lineHeight: 1.5,
          }}
        >
          {stripHtml(news.body).slice(0, 96)}...
        </div>
        {/* Baca Selengkapnya */}
        <span
          style={{
            color: "#d41c1c",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            fontStyle: "italic",
          }}
        >
          baca selengkapnya
        </span>
      </div>
    </Card>
  );
}

// Helper untuk strip html tag dari body berita

