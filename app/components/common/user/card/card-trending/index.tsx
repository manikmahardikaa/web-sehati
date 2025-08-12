import { NewsDataModel } from "@/app/models/petugas-kesehatan/news";
import { Card, Typography, Row, Col, Image } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function CardNewsTrending({ news }: { news: NewsDataModel }) {
  return (
    <Card
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.07)",
        border: "none",
        padding: 0,
        marginBottom: 18,
        minHeight: 88,
        background: "#fff",
      }}
      bodyStyle={{ padding: 0 }}
    >
      <Row gutter={16} align="middle">
        <Col flex="86px">
          <Image
            src={news.thumbnail_url}
            alt={news.name}
            style={{
              width: 86,
              height: 64,
              objectFit: "cover",
              borderRadius: 8,
              margin: 10,
            }}
          />
        </Col>
        <Col flex="auto">
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                marginBottom: 4,
                color: "#181818",
              }}
            >
              {news.name}
            </div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {dayjs(news.createdAt).format("DD Juni YYYY")}
            </Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
