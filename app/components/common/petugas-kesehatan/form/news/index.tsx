import {
  NewsDataModel,
  NewsPayloadCreateModel,
} from "@/app/models/petugas-kesehatan/news";
import SupaImageUploader from "@/app/utils/image-uploader";

import { Button, Form, Input, FormInstance, Checkbox } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";

export default function FormNews({
  form,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: NewsPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<NewsDataModel>;
  type: "create" | "update";
}) {
  const [body, setBody] = useState("");
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        name="name"
        label="Judul Berita"
        rules={[
          { required: true, message: "Judul berita tidak boleh kosong!" },
        ]}
      >
        <Input placeholder="Masukkan judul berita" size="large" />
      </Form.Item>

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

      <Form.Item
        label="Isi Berita"
        name="body"
        rules={[{ required: true, message: "Isi berita wajib diisi" }]}
        getValueFromEvent={(value) => value}
      >
        <ReactQuill
          value={body}
          onChange={(val) => {
            setBody(val);
            form.setFieldsValue({ body: val });
          }}
          placeholder="Isi Berita"
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={type === "create" ? loadingCreate : loadingUpdate}
          size="large"
          style={{
            width: "100%",
            backgroundColor: "#C30010",
            borderColor: "#C30010",
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
