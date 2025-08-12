import { Card, Typography, Avatar, Image } from "antd";
import { UserOutlined, PlayCircleFilled } from "@ant-design/icons";
import { FilmDataModel } from "@/app/models/admin/film";

const { Text } = Typography;

export default function CardFilm({
  data,
  onClick,
}: {
  data: FilmDataModel;
  onClick: (id: string) => void;
}) {
  const formatDate = (str: string) => {
    const date = new Date(str);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  // Simulasi
  const views = "100rb penonton";
  const author = data.author || "Content Creator";
  const authorAvatar = data.authorAvatar || null;

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(100,100,100,0.10)",
        width: 210,
        minWidth: 200,
        border: "none",
      }}
      hoverable
      onClick={() => onClick(data.id)}
    >
      {/* Thumbnail with overlay */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: "#f3f3f3",
        }}
      >
        <Image
          src={data.thumbnail_url}
          alt={data.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <PlayCircleFilled
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 46,
            color: "#fff",
            transform: "translate(-50%, -50%)",
            opacity: 0.95,
            textShadow: "0 2px 8px #333",
            filter: "drop-shadow(0 2px 6px #3333)",
            cursor: "pointer",
          }}
        />
        {/* Duration */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 10,
            background: "rgba(30,30,30,0.7)",
            color: "#fff",
            borderRadius: 6,
            fontSize: 13,
            padding: "1px 8px 1.5px",
            fontWeight: 600,
          }}
        >
          {data.duration || "16:25"}
        </div>
      </div>

      {/* Info Section */}
      <div style={{ padding: "10px 13px 7px 13px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          {/* Avatar */}
          <Avatar
            src={authorAvatar}
            icon={<UserOutlined />}
            size={24}
            style={{ marginTop: 1, background: "#eee" }}
          />
          {/* Judul */}
          <div style={{ flex: 1 }}>
            <Text
              strong
              style={{ fontSize: 15, lineHeight: "19px", color: "#151515" }}
              ellipsis
            >
              {data.name}
            </Text>
            <div style={{ fontSize: 13, color: "#585858" }}>{author}</div>
          </div>
        </div>
        {/* Views & Date */}
        <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
          {views} · {formatDate(data.createdAt.toString() || "")}
        </div>
      </div>
    </Card>
  );
}
