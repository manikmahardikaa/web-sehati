import { useDepartements } from "@/app/hooks/admin/departement";
import { ContactDataModel, ContactFormModel } from "@/app/models/admin/contact";
import { Button, Form, Input, FormInstance, Select } from "antd";

export default function FormContact({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: ContactFormModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: ContactFormModel;
  form: FormInstance<ContactDataModel>;
  type: "create" | "update";
}) {
  const { data: departements } = useDepartements({});

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Nama Kontak"
        rules={[{ required: true, message: "Nama tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan nama" size="large" />
      </Form.Item>

      <Form.Item
        name="departement_id"
        label="Jabatan"
        rules={[{ required: true, message: "Jabatan tidak boleh kosong!" }]}
      >
        <Select placeholder="Pilih jabatan">
          {departements?.map((dept) => (
            <Select.Option key={dept.id} value={dept.id}>
              {dept.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="no_whatsapp"
        label="No Whatsapp"
        rules={[{ required: true, message: "No Whatsapp tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan no whatsapp" size="large" />
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
