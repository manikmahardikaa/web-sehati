"use client";

import { useMemo, useState } from "react";
import { Row, Col, Typography, Divider, Modal, Image } from "antd";
import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import CardNews from "@/app/components/common/user/card/card-news";
import CardNewsTrending from "@/app/components/common/user/card/card-trending";
import CustomCard from "@/app/components/common/user/card/custom-card";
import VideoCarousel from "@/app/components/common/user/carousel-video";

import { useFilms } from "@/app/hooks/admin/film";
import { useNewies } from "@/app/hooks/petugas-kesehatan/news";
import { useContacts } from "@/app/hooks/admin/contact";
import { ContactDataModel } from "@/app/models/admin/contact";
import ContactInfo from "./ContactComponent";

const { Title, Text } = Typography;

type ContactResponse =
  | { success?: boolean; message?: string; result?: ContactDataModel[] }
  | ContactDataModel[]
  | undefined
  | null;

const DEPT_LEFT = "Kader Sehati";
const DEPT_RIGHT = "Petugas Lapangan";

function toWaLink(raw?: string): string {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}
function extractContacts(data: ContactResponse): ContactDataModel[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.result)) return data.result;
  return [];
}

export default function DashboardContent() {
  const { data: filmData = [] } = useFilms({});
  const { data: newsData } = useNewies({});
  const { data: contactData } = useContacts({});
  const router = useRouter();

  // ---------- NEWS ----------
  const newsArray = useMemo(
    () => (Array.isArray(newsData) ? newsData : []),
    [newsData]
  );
  const latestNews = newsArray[0];
  const trendingNews = newsArray.slice(1, 4);

  // Modal state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedNews = useMemo(
    () => newsArray.find((n) => n.id === selectedId),
    [newsArray, selectedId]
  );
  const closeModal = () => setSelectedId(null);

  // ---------- CONTACTS ----------
  const contactsArray = useMemo(
    () => extractContacts(contactData as ContactResponse),
    [contactData]
  );
  const leftContacts = useMemo(
    () =>
      contactsArray
        .filter((c) => c?.departement?.name === DEPT_LEFT)
        .map((c) => ({
          label: c?.name || "WhatsApp",
          phone: c?.no_whatsapp || "-",
          onClick: () => {
            const url = toWaLink(c?.no_whatsapp);
            if (url) window.open(url, "_blank");
          },
        })),
    [contactsArray]
  );
  const rightContacts = useMemo(
    () =>
      contactsArray
        .filter((c) => c?.departement?.name === DEPT_RIGHT)
        .map((c) => ({
          label: c?.name || "WhatsApp",
          phone: c?.no_whatsapp || "-",
          onClick: () => {
            const url = toWaLink(c?.no_whatsapp);
            if (url) window.open(url, "_blank");
          },
        })),
    [contactsArray]
  );

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
            style={{
              display: "flex",
              justifyContent: "center",
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 2px 24px 0 rgba(180,30,30,0.07)",
              minWidth: 260,
              cursor: "pointer",
            }}
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
              onClick={() =>
                router.push("/social-consultation-and-assistance-services")
              }
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
                <span style={{ fontWeight: 600, fontSize: 17 }}>Media</span>
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
              onClick={() => router.push("/media")}
            />
          </Col>
        </Row>
      </section>

      <Divider style={{ borderColor: "#f2bdbd", margin: "40px 0 28px" }} />

      {/* Section: Berita */}
      <section style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Row gutter={36}>
          <Col xs={24} md={15}>
            <Title level={4} style={{ fontWeight: 700, marginBottom: 18 }}>
              Berita Terbaru
            </Title>
            {latestNews ? (
              <CardNews news={latestNews} onOpen={setSelectedId} />
            ) : (
              <Text type="secondary">Belum ada berita terbaru.</Text>
            )}
          </Col>

          <Col xs={24} md={9}>
            <Title level={4} style={{ fontWeight: 700, marginBottom: 18 }}>
              Berita Trending
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {trendingNews.length > 0 ? (
                trendingNews.map((item) => (
                  <CardNewsTrending
                    key={item.id}
                    news={item}
                    onOpen={setSelectedId}
                  />
                ))
              ) : (
                <Text type="secondary">Belum ada berita trending.</Text>
              )}
            </div>
          </Col>
        </Row>
      </section>

      {/* Contact */}
      <div style={{ marginTop: 40 }}>
        <ContactInfo
          leftContacts={leftContacts}
          rightContacts={rightContacts}
        />
      </div>

      {/* -------- Modal Detail Berita -------- */}
      <Modal
        open={!!selectedNews}
        onCancel={closeModal}
        footer={null}
        width={900}
        title={selectedNews?.name}
        destroyOnClose
      >
        {selectedNews && (
          <div>
            <Image
              src={selectedNews.thumbnail_url}
              alt={selectedNews.name}
              preview={false}
              style={{
                width: "100%",
                height: 360,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 12 }}
            >
              {new Date(selectedNews.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
            {/* body HTML dari API */}
            <div
              style={{ lineHeight: 1.7, fontSize: 15 }}
              // Pastikan konten sudah dibersihkan dari server jika perlu.
              dangerouslySetInnerHTML={{ __html: selectedNews.body }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
