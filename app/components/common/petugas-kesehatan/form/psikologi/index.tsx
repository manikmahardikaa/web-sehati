import {
  PsikologiDataModel,
  PsikologiPayloadCreateModel,
} from "@/app/models/petugas-kesehatan/psikologi";
import SupaImageUploader from "@/app/utils/image-uploader";
import { Button, Form, Input, FormInstance, Select } from "antd";

export default function FormPsikologi({
  form,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: PsikologiPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: PsikologiDataModel;
  form: FormInstance<PsikologiDataModel>;
  type: "create" | "update";
}) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item name="image_url" label="Pilih Foto">
        <SupaImageUploader
          bucket="web-sehati"
          folder="photos"
          label="Upload Foto"
          previewStyle={{
            width: 240,
            maxHeight: 140,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </Form.Item>

      <Form.Item
        name="name"
        label="Nama Psikolog"
        rules={[
          { required: true, message: "Nama psikolog tidak boleh kosong!" },
        ]}
      >
        <Input placeholder="Masukkan nama psikolog" size="large" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Jenis Kelamin"
        rules={[
          { required: true, message: "Jenis kelamin tidak boleh kosong!" },
        ]}
      >
        <Select>
          <Select.Option value="LAKI_LAKI">Laki-laki</Select.Option>
          <Select.Option value="PEREMPUAN">Perempuan</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="no_whatsapp"
        label="No WhatsApp"
        rules={[{ required: true, message: "No WhatsApp tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan no WhatsApp" size="large" />
      </Form.Item>

      <Form.Item
        name="region"
        label="Wilayah"
        rules={[{ required: true, message: "Wilayah tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan wilayah" size="large" />
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
