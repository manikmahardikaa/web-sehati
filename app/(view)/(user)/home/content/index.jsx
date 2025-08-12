import CardNews from "@/app/components/common/user/card/card-news";
import CardNewsTrending from "@/app/components/common/user/card/card-trending";
import CustomCard from "@/app/components/common/user/card/custom-card";
import VideoCarousel from "@/app/components/common/user/carousel-video";
import { useFilms } from "@/app/hooks/admin/film";
import { useNewies } from "@/app/hooks/petugas-kesehatan/news";
import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Divider } from "antd";

const { Title, Text } = Typography;

export default function DashboardContent() {
  const { data: filmData } = useFilms({});
  const { data: newsData } = useNewies({});

  // Penanganan data kosong/null
  const newsArray = Array.isArray(newsData) ? newsData : [];
  const latestNews = newsArray[0];
  const trendingNews = newsArray.slice(1, 4);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff 60%, #fceaea 100%)",
        padding: "40px 0 60px",
      }}
    >
      {/* Section: Carousel */}
      <section style={{ maxWidth: 900, margin: "0 auto", marginBottom: 56 }}>
        <div
          style={{
            borderRadius: 18,
            boxShadow: "0 2px 32px 0 rgba(180, 30, 30, 0.11)",
            background: "#fff",
            padding: 18,
          }}
        >
          <VideoCarousel filmData={filmData} />
        </div>
      </section>

      {/* Section: Akses Layanan */}
      <section>
        <Title
          level={3}
          style={{
            textAlign: "center",
            margin: "0 0 38px 0",
            fontWeight: 800,
            letterSpacing: 0.5,
            color: "#111",
          }}
        >
          Akses Layanan{" "}
          <span style={{ color: "#d41c1c", letterSpacing: 1 }}>SEHATI</span>
        </Title>

        <Row
          gutter={[40, 40]}
          justify="center"
          style={{ marginTop: 8, marginBottom: 40 }}
        >
          <Col
            xs={22}
            sm={11}
            md={8}
            lg={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CustomCard
              title={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    fontWeight: 600,
                    fontSize: 17,
                  }}
                >
                  Layanan Konsultasi
                  <br />
                  dan Pendampingan Sosial
                </span>
              }
              icon={
                <UserOutlined
                  style={{
                    fontSize: 40,
                    color: "#d41c1c",
                    background: "rgba(212,28,28,0.10)",
                    borderRadius: 20,
                    padding: 10,
                  }}
                />
              }
              titleButton="Lihat Selengkapnya"
              onClick={() => alert("Klik Lihat Selengkapnya!")}
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 24px 0 rgba(180,30,30,0.07)",
                minWidth: 260,
                transition: "transform .2s",
                cursor: "pointer",
              }}
            />
          </Col>
          <Col
            xs={22}
            sm={11}
            md={8}
            lg={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CustomCard
              title={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    fontWeight: 600,
                    fontSize: 17,
                  }}
                >
                  MEDIA
                </span>
              }
              icon={
                <ContainerOutlined
                  style={{
                    fontSize: 40,
                    color: "#d41c1c",
                    background: "rgba(212,28,28,0.10)",
                    borderRadius: 20,
                    padding: 10,
                  }}
                />
              }
              titleButton="Lihat Selengkapnya"
              onClick={() => alert("Klik Lihat Selengkapnya!")}
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 24px 0 rgba(180,30,30,0.07)",
                minWidth: 260,
                transition: "transform .2s",
                cursor: "pointer",
              }}
            />
          </Col>
        </Row>
      </section>

      <Divider style={{ borderColor: "#f2bdbd", margin: "40px 0 28px" }} />

      {/* Section: Berita */}
      <section style={{ maxWidth: 1250, margin: "0 auto" }}>
        <Row gutter={36}>
          {/* Berita Terbaru */}
          <Col xs={24} md={15}>
            <Title level={4} style={{ fontWeight: 700, marginBottom: 18 }}>
              Berita Terbaru
            </Title>
            {latestNews ? (
              <CardNews news={latestNews} />
            ) : (
              <Text type="secondary">Belum ada berita terbaru.</Text>
            )}
          </Col>
          {/* Trending */}
          <Col xs={24} md={9}>
            <Title level={4} style={{ fontWeight: 700, marginBottom: 18 }}>
              Berita Trending
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {trendingNews.length > 0 ? (
                trendingNews.map((item) => (
                  <CardNewsTrending key={item.id} news={item} />
                ))
              ) : (
                <Text type="secondary">Belum ada berita trending.</Text>
              )}
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
}
