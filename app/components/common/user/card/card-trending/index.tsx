"use client";

import { NewsDataModel } from "@/app/models/petugas-kesehatan/news";
import { Card, Typography, Row, Col, Image } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");
const { Text } = Typography;

export default function CardNewsTrending({
  news,
  onOpen,
}: {
  news: NewsDataModel;
  onOpen?: (newsId: string) => void;
}) {
  const handleOpen = () => onOpen?.(news.id);

  return (
    <Card
      hoverable
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.07)",
        border: "none",
        padding: 0,
        marginBottom: 18,
        minHeight: 88,
        background: "#fff",
        cursor: onOpen ? "pointer" : "default",
      }}
      bodyStyle={{ padding: 0 }}
      onClick={handleOpen}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : -1}
      onKeyDown={(e) => {
        if (onOpen && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      <Row gutter={16} align="middle" wrap={false}>
        <Col flex="86px">
          <Image
            src={news.thumbnail_url}
            alt={news.name}
            preview={false}
            style={{
              width: 86,
              height: 64,
              objectFit: "cover",
              borderRadius: 8,
              margin: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          />
        </Col>
        <Col flex="auto">
          <div style={{ paddingRight: 10 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                marginBottom: 4,
                color: "#181818",
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              {news.name}
            </div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {dayjs(news.createdAt).format("DD MMMM YYYY")}
            </Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
