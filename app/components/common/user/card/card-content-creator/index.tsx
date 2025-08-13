import { ContentCreatorDataModel } from "@/app/models/admin/content-creator";
import { Button, Card, Typography, Avatar } from "antd";
const { Text } = Typography;

export default function CardContentCreator({
  data,
  onClick,
}: {
  data: ContentCreatorDataModel; // Ganti ContentCreatorDataModel jika sudah ada tipe
  onClick: (id: string) => void;
}) {
  return (
    <Card
      hoverable
      bodyStyle={{
        padding: "28px 18px 18px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      style={{
        borderRadius: 13,
        width: 220,
        minHeight: 210,
        border: "none",
        boxShadow: "0 2px 12px rgba(180,30,30,0.07)",
        background: "#fff",
        textAlign: "center",
        transition: "box-shadow 0.16s",
      }}
    >
      {/* AVATAR */}
      <Avatar
        src={`data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="#fad233" />
      <text x="50%" y="53%" textAnchor="middle" fill="#fff" font-size="18" dy=".3em">
        ${data.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </text>
    </svg>
  `}
        alt={data.name}
        size={70}
        style={{
          background: "#fad233",
          color: "#fff",
          fontSize: 40,
          marginBottom: 10,
        }}
      />
      {/* NAME */}
      <Text
        style={{
          fontWeight: 600,
          fontSize: 17,
          color: "#222",
          marginBottom: 30,
          marginTop: 6,
          display: "block",
        }}
      >
        {data.name}
      </Text>
      {/* BUTTON */}
      <Button
        type="primary"
        size="large"
        style={{
          background: "#d41c1c",
          border: "none",
          borderRadius: 7,
          width: "100%",
          fontWeight: 600,
          fontSize: 16,
          marginTop: "auto",
        }}
        onClick={() => onClick(data.id)}
      >
        Kunjungi Profil
      </Button>
    </Card>
  );
}
