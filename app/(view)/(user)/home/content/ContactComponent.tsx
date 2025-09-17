"use client";

import React from "react";
import { Row, Col, Card, Typography, Space } from "antd";

const { Title, Text } = Typography;

/* ---------- Types ---------- */
export type WaContact = {
  label?: string; // default: "WhatsApp"
  phone: string; // contoh: "+62 879 6547 1234"
  onClick?: () => void; // aksi saat klik kartu
};

export type ContactInfoProps = {
  leftTitle?: string; // default: "Kontak Kader Sehati"
  rightTitle?: string; // default: "Kontak Pemegang Program Wilayah"
  leftContacts: WaContact[];
  rightContacts: WaContact[];
  onSeeMore?: () => void; // aksi tombol "Lihat Selengkapnya"
};

/* ---------- Small WhatsApp Icon (inline SVG) ---------- */
const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <span
    aria-hidden
    style={{
      display: "inline-flex",
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      background: "#25D366",
      boxShadow: "0 4px 10px rgba(0,0,0,.15)",
    }}
  >
    <svg
      viewBox="0 0 32 32"
      width={size - 6}
      height={size - 6}
      fill="#fff"
      role="img"
    >
      <path d="M19.1 17.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.8.2-.9 1-1.1 1.1-.4.2-.7.1c-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.5.2-.7s.3-.4.4-.6c.1-.2.1-.4 0-.6-.1-.2-.8-2-1.1-2.6-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.3 3.4 1.4 3.6c.2.2 2.5 3.8 6.1 5.2.9.4 1.6.6 2.1.8.9.3 1.8.3 2.4.2.7-.1 2.1-.9 2.4-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z" />
      <path d="M26.7 5.3C24.2 2.8 20.8 1.4 17.1 1.4 9.7 1.4 3.7 7.4 3.7 14.9c0 2.3.6 4.4 1.8 6.3L3 29l7.9-2.5c1.8 1 3.9 1.5 6 1.5 7.4 0 13.4-6 13.4-13.4 0-3.6-1.4-7-3.9-9.3zm-9.6 21.9c-2 .0-3.9-.5-5.6-1.5l-.4-.2-4.7 1.5 1.5-4.6-.3-.5c-1.1-1.7-1.7-3.7-1.7-5.7 0-5.9 4.8-10.7 10.7-10.7 2.9 0 5.6 1.1 7.6 3.2 2 2.1 3.1 4.8 3.1 7.6-.1 5.9-4.9 10.9-10.6 10.9z" />
    </svg>
  </span>
);

/* ---------- Item Card ---------- */
const WaCard: React.FC<WaContact> = ({
  label = "WhatsApp",
  phone,
  onClick,
}) => (
  <Card
    onClick={onClick}
    hoverable
    style={{
      background: "rgba(255,255,255,.14)",
      border: "1px solid rgba(255,255,255,.22)",
      borderRadius: 12,
      padding: 12,
      backdropFilter: "blur(2px)",
    }}
    bodyStyle={{ padding: 12 }}
  >
    <Space align="center">
      <WhatsAppIcon />
      <div style={{ lineHeight: 1.1 }}>
        <Text style={{ color: "#fff", fontWeight: 700 }}>{label}</Text>
        <br />
        <Text style={{ color: "#ffecec" }}>{phone}</Text>
      </div>
    </Space>
  </Card>
);

/* ---------- Main Component ---------- */
const ContactInfo: React.FC<ContactInfoProps> = ({
  leftTitle, 
  rightTitle, 
  leftContacts,
  rightContacts,
}) => {
  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        borderRadius: 14,
        padding: 24,
        boxShadow: "0 16px 40px rgba(180,30,30,.18)",
        background:
          "linear-gradient(180deg, #b01010 0%, #d11d1d 52%, #e43a3a 100%)",
        position: "relative",
      }}
    >
      <Title
        level={3}
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: 800,
          margin: "0 0 18px",
          letterSpacing: 0.3,
        }}
      >
        Informasi Kontak
      </Title>

      <Row gutter={[24, 24]} align="top" justify="center">
        {/* Left column */}
        <Col xs={24} md={11}>
          <div
            style={{
              color: "#ffecec",
              textAlign: "center",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {leftTitle}
          </div>
          <Space direction="vertical" style={{ width: "100%" }} size={12}>
            {leftContacts.map((c, idx) => (
              <WaCard key={`${c.phone}-${idx}`} {...c} />
            ))}
          </Space>
        </Col>

        {/* Vertical divider */}
        <Col
          xs={0}
          md={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: 1,
              height: "100%",
              background: "rgba(255,255,255,.35)",
              margin: "0 auto",
            }}
          />
        </Col>

        {/* Right column */}
        <Col xs={24} md={11}>
          <div
            style={{
              color: "#ffecec",
              textAlign: "center",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {rightTitle}
          </div>
          <Space direction="vertical" style={{ width: "100%" }} size={12}>
            {rightContacts.map((c, idx) => (
              <WaCard key={`${c.phone}-${idx}`} {...c} />
            ))}
          </Space>
        </Col>
      </Row>

      <div style={{ textAlign: "center", marginTop: 20 }}>
      </div>
    </div>
  );
};

export default ContactInfo;
