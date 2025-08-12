"use client";
import { useState } from "react";
import { Button, Col, Form, Row, Select, message, Space } from "antd";
import dynamic from "next/dynamic";
import { WaBlastPsikologiPayloadCreateModel } from "@/app/models/program-wilayah/psikologi-blast";
import { usePsikologis } from "@/app/hooks/petugas-kesehatan/psikologi";
import SupaPdfUploader from "@/app/utils/pdf-uploader";
import { usePsikologiBlasts } from "@/app/hooks/program-wilayah/psikologi-blast";
import { htmlToWhatsAppMarkdown } from "@/app/utils/html-to-whatsapp-markdown";

// Dynamic import agar ReactQuill hanya di client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FormPsikologiBlast() {
  const [form] = Form.useForm();
  const [messageValue, setMessageValue] = useState("");
  const [selectedNoWa, setSelectedNoWa] = useState<string | null>(null);

  // Data psikolog
  const { data: psikologList } = usePsikologis({});
  const { onCreate: createWaBlastPsikologi, onCreateLoading } =
    usePsikologiBlasts({});

  // Handler jika SupaPdfUploader mengembalikan url file

  // Sync message dari Quill ke Form untuk validasi antd
  const handleMessageChange = (val: string) => {
    setMessageValue(val);
    form.setFieldsValue({ message: val });
  };

  // Form submit
  const onFinish = async (values: WaBlastPsikologiPayloadCreateModel) => {
    if (!selectedNoWa) {
      message.error("Nomor WhatsApp psikolog belum dipilih!");
      return;
    }
    try {
        const formattedMessage = htmlToWhatsAppMarkdown(messageValue);
      await createWaBlastPsikologi({
        ...values,
        message: formattedMessage,
        phone_numbers: selectedNoWa, // WAJIB: field phone_numbers diisi nomor WA (string)
      });
      message.success("Pesan berhasil dikirim!");
      form.resetFields();
      setMessageValue("");
      setSelectedNoWa(null);
    } catch (err: unknown) {
      message.error(
        `Gagal mengirim pesan! ${
          typeof err === "object" && err && "message" in err
            ? (err as { message?: string }).message
            : ""
        }`
      );
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: "36px 24px 32px 24px",
        maxWidth: 1320,
        margin: "32px auto",
        minHeight: 450,
        boxShadow: "0 8px 32px #00000010",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{}}
      >
        <Row gutter={32} wrap align="top">
          <Col span={11}>
            <Form.Item
              label={
                <span style={{ fontWeight: 600, fontSize: 20 }}>
                  Pilih Psikolog
                </span>
              }
              name="psikologi_id"
              rules={[{ required: true, message: "Pilih psikolog!" }]}
              style={{ marginBottom: 26 }}
            >
              <Select
                placeholder="Pilih psikolog"
                onChange={(value) => {
                  const selected = psikologList?.find((p) => p.id === value);
                  setSelectedNoWa(selected?.no_whatsapp ?? null);
                  // Set hidden field jika ingin pakai di Form.Item'\
                  form.setFieldsValue({
                    no_whatsapp: selected?.no_whatsapp ?? "",
                  });
                }}
              >
                {psikologList?.map((psikolog) => (
                  <Select.Option key={psikolog.id} value={psikolog.id}>
                    {psikolog.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* HIDDEN FIELD jika ingin tetap tersimpan di values */}
            {/* <Form.Item name="phone_numbers" hidden>
              <input />
            </Form.Item> */}

            <Form.Item
              label={
                <span style={{ fontWeight: 600, fontSize: 20 }}>
                  Unggah Laporan
                </span>
              }
              name="report_url"
              valuePropName="file"
              style={{ marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Unggah file laporan terlebih dahulu!",
                },
              ]}
            >
              <SupaPdfUploader bucket="web-sehati" folder="pdf" />
            </Form.Item>
          </Col>

          <Col span={13}>
            <Form.Item
              label={
                <span style={{ fontWeight: 600, fontSize: 20 }}>
                  Tulis Pesan
                </span>
              }
              name="message"
              rules={[{ required: true, message: "Pesan wajib diisi!" }]}
              style={{ marginBottom: 0 }}
            >
              <ReactQuill
                value={messageValue}
                onChange={handleMessageChange}
                style={{
                  height: 185,
                  background: "#fff",
                  borderRadius: 8,
                  marginBottom: 0,
                  border: "1px solid #eee",
                }}
                placeholder="Tulis pesan kepada psikolog..."
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" style={{ marginTop: 50 }}>
          <Space size={24}>
            <Button
              size="large"
              style={{
                borderColor: "#C30010",
                color: "#C30010",
                background: "#fff",
                width: 124,
                fontWeight: 600,
                fontSize: 17,
              }}
              htmlType="button"
              onClick={() => {
                form.resetFields();
                setMessageValue("");
                setSelectedNoWa(null);
              }}
              disabled={onCreateLoading}
            >
              Batal
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                backgroundColor: "#C30010",
                borderColor: "#C30010",
                width: 124,
                fontWeight: 600,
                fontSize: 17,
              }}
              loading={onCreateLoading}
            >
              Kirim
            </Button>
          </Space>
        </Row>
      </Form>
    </div>
  );
}
