"use client";
import { useUser } from "@/app/hooks/admin/user";
import { useAuth } from "@/app/utils/useAuth";
import {
  Card,
  Button,
  Input,
  Form,
  Row,
  Col,
  Typography,
  Avatar,
  Skeleton,
} from "antd";
import { useEffect } from "react";
import getInitials from "@/app/utils/username-helper";
import { UserDataModel } from "@/app/models/admin/user";

const { Title } = Typography;

export default function ProfileEditContent() {
  const { user_id } = useAuth();
  const {
    data: userData,
    onUpdate: updateUser,
    onUpdateLoading: updateUserLoading,
  } = useUser({ id: user_id! });
  const [form] = Form.useForm();

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
        no_whatsapp: userData.no_whatsapp,
        password: "",
      });
    }
  }, [userData, form]);

  const handleFinish = async (values: UserDataModel) => {
    await updateUser({ id: user_id!, payload: values });
  };

  return (
    <div style={{ maxWidth: 960, margin: "40px auto", padding: 16 }}>
      <Row gutter={32}>
        {/* Kolom kiri: Foto profil */}
        <Col xs={24} md={7}>
          <Card
            style={{
              borderRadius: 14,
              textAlign: "center",
              padding: "20px 0 30px 0",
              boxShadow: "0 1px 8px rgba(180,30,30,0.08)",
              minHeight: 315,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ marginBottom: 14 }}>
              <div
                style={{ position: "relative", width: 90, margin: "20px auto" }}
              >
                <Avatar
                  size={90}
                  style={{
                    border: "2px solid #1890ff",
                    background: "#e6f7ff",
                    color: "#1890ff",
                    fontWeight: 700,
                    fontSize: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {userData ? (
                    getInitials(userData.name)
                  ) : (
                    <Skeleton.Avatar active />
                  )}
                </Avatar>
              </div>
            </div>
          </Card>
        </Col>

        {/* Kolom kanan: Informasi akun */}
        <Col xs={24} md={17}>
          <Card
            style={{
              borderRadius: 14,
              minHeight: 315,
              boxShadow: "0 1px 8px rgba(180,30,30,0.08)",
            }}
            bodyStyle={{ padding: "32px 32px 24px 32px" }}
          >
            <Title level={5} style={{ marginBottom: 16, color: "#1c1c1c" }}>
              INFORMASI AKUN
            </Title>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: userData?.name,
                email: userData?.email,
                no_whatsapp: userData?.no_whatsapp,
                password: "",
              }}
              onFinish={handleFinish}
            >
              <Row gutter={14}>
                <Col xs={24} md={24}>
                  <Form.Item
                    name="name"
                    label="Nama Lengkap"
                    rules={[
                      {
                        required: true,
                        message: "Nama lengkap tidak boleh kosong",
                      },
                    ]}
                  >
                    <Input size="large" style={{ borderColor: "#d41c1c" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Email wajib diisi" }]}
                  >
                    <Input size="large" style={{ borderColor: "#d41c1c" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="no_whatsapp"
                    label="WhatsApp"
                    rules={[
                      { required: true, message: "No WhatsApp wajib diisi" },
                    ]}
                  >
                    <Input size="large" style={{ borderColor: "#d41c1c" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="password" label="Kata Sandi">
                    <Input.Password
                      size="large"
                      style={{ borderColor: "#d41c1c" }}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  style={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      loading={updateUserLoading}
                      style={{
                        background: "#d41c1c",
                        borderColor: "#d41c1c",
                        borderRadius: 7,
                        fontWeight: 600,
                        minWidth: 170,
                        marginTop: 8,
                      }}
                    >
                      Edit Informasi Akun
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
