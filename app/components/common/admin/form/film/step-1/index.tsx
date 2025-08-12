// components/common/form/film.tsx
"use client";

import { Form, Input, Button, Steps, Space, Checkbox } from "antd";

import type { FormInstance } from "antd";
import type { FilmDataModel } from "@/app/models/admin/film";
import SupaImageUploader from "@/app/utils/image-uploader";

const { Step } = Steps;
const { TextArea } = Input;

interface FormFilmProps {
  form: FormInstance<FilmDataModel>;
  initialValues?: FilmDataModel;
  onFinish: (values: FilmDataModel) => Promise<void>;
}

export default function MetadataStep({
  form,
  initialValues,
  onFinish,
}: FormFilmProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      {/* step indicator */}
      <Steps current={0} style={{ marginBottom: 32 }}>
        <Step title="Detail" />
        <Step title="Tambahkan Survei" />
      </Steps>

      {/* URL video / YouTube */}
      <Form.Item
        name="video_url"
        label="Link YouTube / Video"
        rules={[
          { required: true, message: "Link video wajib diisi" },
          { type: "url", message: "Masukkan URL yang valid" },
          {
            validator(_, value) {
              if (
                !value ||
                /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/i.test(
                  value
                )
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Masukkan link YouTube yang benar")
              );
            },
          },
        ]}
      >
        <Input
          placeholder="https://www.youtube.com/watch?v=abcdefghijk"
          size="large"
        />
      </Form.Item>

      {/* Judul film */}
      <Form.Item
        name="name"
        label="Judul Film"
        rules={[{ required: true, message: "Judul film tidak boleh kosong" }]}
      >
        <Input placeholder="Masukkan judul film" size="large" />
      </Form.Item>

      {/* Deskripsi */}
      <Form.Item
        name="description"
        label="Deskripsi"
        rules={[{ required: true, message: "Deskripsi tidak boleh kosong" }]}
      >
        <TextArea
          placeholder="Deskripsikan film..."
          rows={6}
          style={{ resize: "vertical" }}
        />
      </Form.Item>

      {/* Thumbnail */}
      <Form.Item
        name="thumbnail_url"
        label="Pilih Thumbnail"
        rules={[{ required: true, message: "Thumbnail wajib diupload" }]}
      >
        <SupaImageUploader
          bucket="web-sehati"
          folder="thumbnails"
          label="Upload Thumbnail"
          previewStyle={{
            width: 240,
            maxHeight: 140,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </Form.Item>

      <Form.Item name="is_published" valuePropName="checked">
        <Checkbox>
          Publish{" "}
          <span
            style={{
              fontStyle: "italic",
              color: "#888",
            }}
          >
            * Centang jika dipublish.
          </span>
        </Checkbox>
      </Form.Item>

      {/* tombol Batal & Selanjutnya */}
      <Form.Item shouldUpdate>
        {() => (
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={() => form.resetFields()}>Batal</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#C30010",
                borderColor: "#C30010",
              }}
            >
              Selanjutnya
            </Button>
          </Space>
        )}
      </Form.Item>
    </Form>
  );
}
