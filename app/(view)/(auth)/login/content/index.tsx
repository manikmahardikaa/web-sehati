"use client";

import FormLogin from "@/app/components/common/form/login";
import { UserFormModel } from "@/app/models/admin/user";
import { Col, Image, notification, Row, Typography } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const { Title, Text } = Typography;

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
      notification.success({
        message: "Login berhasil!",
      });

      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      console.log(session);
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
      notification.error({
        message: "Login gagal!",
      });
    }
  };

  return (
    <div style={{ height: "100vh", background: "#fff" }}>
      <Row style={{ height: "100%" }}>
        {/* Kiri - Ilustrasi */}
        <Col
          span={12}
          style={{
            background: "linear-gradient(135deg, #D41C1C, #B31818, #B31818)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 50,
          }}
        >
          <Image
            src="/assets/images/illustration.png" // ganti sesuai lokasi gambar Anda
            alt="Illustration"
            preview={false}
            width={400}
            height={400}
          />
        </Col>

        {/* Kanan - Form Login */}
        <Col
          span={12}
          style={{
            padding: "80px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: 400, width: "100%", margin: "0 auto" }}>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <Image
                src="/assets/images/logo.png"
                alt="SEHATI"
                preview={false}
                width="100%"
                height="100%"
              />
            </div>

            <Title level={4} style={{ textAlign: "center" }}>
              Masuk ke Akun Anda
            </Title>
            <FormLogin onFinish={handleLogin} loading={loading} />

            <Text>
              Belum memiliki akun?{" "}
              <Link href="/register" style={{ color: "#C30010" }}>
                Daftar akun baru.
              </Link>
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}
