"use client";

import FormLogin from "@/app/components/common/form/login";
import { UserFormModel } from "@/app/models/admin/user";
import { Col, Image, notification, Row, Typography } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const { Title } = Typography;

export default function LoginContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: UserFormModel) => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    setLoading(false);

    if (res?.ok) {
      notification.success({ message: "Login berhasil!" });
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      switch (session.user.role) {
        case "ADMIN":
          router.push("/admin/dashboard/home");
          break;
        case "PETUGAS_KESEHATAN":
          router.push("/petugas-kesehatan/dashboard/home");
          break;
        case "PROGRAM_WILAYAH":
          router.push("/program-wilayah/dashboard/home");
          break;
        case "PETUGAS_LAPANGAN":
          router.push("/petugas-lapangan/dashboard/home");
          break;
        default:
          router.push("/dashboard");
      }
    } else {
      notification.error({ message: "Login gagal!" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <Row style={{ minHeight: "100vh" }} gutter={0}>
        <Col
          xs={0}
          md={12}
          style={{
            background: "linear-gradient(135deg, #D41C1C, #B31818, #B31818)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
          }}
        >
          <Image
            src="/assets/images/illustration.png"
            alt="Illustration"
            preview={false}
            width={400}
            height={400}
          />
        </Col>

        {/* Kanan - Form Login */}
        <Col
          xs={24}
          md={12}
          style={{
            padding: "40px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <div style={{ maxWidth: 400, width: "100%" }}>
            <div style={{ marginBottom: 24, textAlign: "center" }}>
              <Image
                src="/assets/images/logo.png"
                alt="SEHATI"
                preview={false}
                width="100%"
                height="auto"
              />
            </div>

            <Title level={4} style={{ textAlign: "center" }}>
              Masuk ke Akun Anda
            </Title>
            <FormLogin onFinish={handleLogin} loading={loading} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
