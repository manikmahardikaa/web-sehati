import { ContentCreatorDataModel } from "@/app/models/admin/content-creator";
import { Form, Input, Button, Checkbox } from "antd";
import { FormInstance } from "antd";

export default function FormContentCreator({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: ContentCreatorDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: ContentCreatorDataModel;
  form: FormInstance<ContentCreatorDataModel>;
  type: "create" | "update";
}) {
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
        label="Nama Konten Kreator"
        name="name"
        rules={[{ required: true, message: "Judul wajib diisi" }]}
      >
        <Input placeholder="Masukkan Nama Konten Kreator" />
      </Form.Item>

      <Form.Item
        label="Link URL"
        name="url"
        rules={[{ required: true, message: "File PDF wajib diupload" }]}
        valuePropName="value"
      >
        <Input placeholder="Masukkan Nama Konten Kreator" />
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
          {type === "create" ? "Tambah Konten Kreator" : "Simpan Perubahan"}
        </Button>
      </Form.Item>
    </Form>
  );
}
