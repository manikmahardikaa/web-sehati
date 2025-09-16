import { PocketBookDataModel } from "@/app/models/admin/pocket-book";
import { Card, Typography } from "antd";
import PdfThumbnail from "../../thumbnail-pocket-book";

const { Title, Text } = Typography;

export default function CardPocketBook({
  data,
  onClick,
}: {
  data: PocketBookDataModel; // Ganti dengan PocketBookDataModel
  onClick: (id: string) => void;
}) {
  return (
    <Card
      hoverable
      bodyStyle={{ padding: 0 }}
      style={{
        borderRadius: 13,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(180,30,30,0.08)",
        width: 250,
        minWidth: 300,
        border: "none",
        background: "#fff",
        transition: "box-shadow 0.18s",
      }}
    >
      {/* Gambar thumbnail */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/10",
          background: "#f4f4f4",
          overflow: "hidden",
        }}
      >
        <PdfThumbnail url={data.url} width={300} height={300} />
      </div>

      {/* Konten */}
      <div style={{ padding: "11px 13px 14px 13px" }}>
        <Title
          level={5}
          style={{
            color: "#d41c1c",
            fontWeight: 700,
            fontSize: 17,
            margin: 0,
            marginBottom: 6,
            textAlign: "center",
            letterSpacing: 0.1,
            lineHeight: 1.1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(data.id);
          }}
        >
          {data.name}
        </Title>
        <Text
          style={{
            fontSize: 14,
            color: "#2c2c2c",
            lineHeight: "18px",
            display: "block",
            marginBottom: 0,
            minHeight: 38,
            maxHeight: 38,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
        </Text>
      </div>
    </Card>
  );
}
