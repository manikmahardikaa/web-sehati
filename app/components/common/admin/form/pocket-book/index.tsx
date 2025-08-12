import {
  PocketBookDataModel,
  PocketBookFormModel,
} from "@/app/models/admin/pocket-book";
import SupaPdfUploader from "@/app/utils/pdf-uploader";
import { Form, Input, Button, Checkbox } from "antd";
import { FormInstance } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

export default function FormPocketBook({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: PocketBookDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: PocketBookFormModel;
  form: FormInstance<PocketBookDataModel>;
  type: "create" | "update";
}) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialValues?.description) {
      setDescription(initialValues.description);
    }
  }, [initialValues]);

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={{
        ...initialValues,
        is_published: initialValues?.is_published ?? true,
      }}
    >
      <Form.Item
        label="Judul Buku Saku"
        name="name"
        rules={[{ required: true, message: "Judul wajib diisi" }]}
      >
        <Input placeholder="Contoh: Panduan Kebersihan Lingkungan" />
      </Form.Item>

      <Form.Item
        label="Deskripsi"
        name="description"
        rules={[{ required: true, message: "Deskripsi wajib diisi" }]}
        getValueFromEvent={(value) => value}
      >
        <ReactQuill
          value={description}
          onChange={(val) => {
            setDescription(val);
            form.setFieldsValue({ description: val });
          }}
          placeholder="Contoh: Panduan Kebersihan Lingkungan"
        />
      </Form.Item>

      <Form.Item
        label="File PDF"
        name="url"
        rules={[{ required: true, message: "File PDF wajib diupload" }]}
        valuePropName="value"
      >
        <SupaPdfUploader bucket="web-sehati" folder="pdf" />
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

      <Form.Item style={{ textAlign: "right" }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={type === "create" ? loadingCreate : loadingUpdate}
        >
          {type === "create" ? "Tambah Buku Saku" : "Simpan Perubahan"}
        </Button>
      </Form.Item>
    </Form>
  );
}
