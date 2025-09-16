"use client";

import { Button, Card, Typography, Space, Grid } from "antd";
import { BuildOutlined, HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Content() {
  const screens = Grid.useBreakpoint();

  return (
    <div
      style={{
        minHeight: "72vh",
        display: "grid",
        placeItems: "center",
        padding: screens.md ? "56px 24px" : "32px 16px",
        background:
          "linear-gradient(180deg, #ffffff 55%, rgba(212,28,28,0.08) 100%)",
      }}
    >
      <Card
        bordered={false}
        style={{
          maxWidth: 880,
          width: "100%",
          borderRadius: 24,
          boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
        }}
        bodyStyle={{
          padding: screens.md ? "56px 56px 40px" : "32px 20px",
          textAlign: "center",
        }}
      >
        {/* Ilustrasi */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            marginInline: "auto",
            marginBottom: 20,
            display: "grid",
            placeItems: "center",
            background: "rgba(212,28,28,0.12)",
          }}
        >
          <BuildOutlined style={{ fontSize: 48, color: "#d41c1c" }} />
        </div>

        {/* Judul */}
        <Title
          level={1}
          style={{
            margin: 0,
            marginBottom: 12,
            fontSize: screens.md ? 44 : 32,
            lineHeight: 1.15,
          }}
        >
          Sedang Dalam Pengembangan
        </Title>

        {/* Deskripsi */}
        <div style={{ marginInline: "auto", maxWidth: 680 }}>
          <Text
            type="secondary"
            style={{
              display: "block",
              fontSize: screens.md ? 18 : 16,
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            Halaman <strong>Layanan Konsultasi dan Pendampingan Sosial</strong> sedang kami siapkan. Kami sedang
            memoles beberapa bagian agar pengalaman Anda lebih baik. Silakan
            kembali lagi nanti.
          </Text>
        </div>

        {/* Tombol Aksi */}
        <Space size="large" wrap style={{ marginTop: 8 }}>
          <Link href="/" passHref>
            <Button
              type="primary"
              icon={<HomeOutlined />}
              style={{
                height: 44,
                paddingInline: 18,
                borderRadius: 999,
                background: "#d41c1c",
                borderColor: "#d41c1c",
                fontWeight: 600,
              }}
            >
              Kembali ke Beranda
            </Button>
          </Link>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => window.location.reload()}
            style={{
              height: 44,
              paddingInline: 18,
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Muat Ulang
          </Button>
        </Space>

        {/* Bantuan */}
      </Card>
    </div>
  );
}
