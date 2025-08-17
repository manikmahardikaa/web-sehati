import { DepartementDataModel } from "@/app/models/admin/departement";
import { Button, Form, Input, FormInstance } from "antd";

export default function FormDepartement({
  form,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: DepartementDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<DepartementDataModel>;
  type: "create" | "update";
}) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        name="name"
        label="Nama Jabatan"
        rules={[
          { required: true, message: "Nama jabatan tidak boleh kosong!" },
        ]}
      >
        <Input placeholder="Masukkan nama jabatan" size="large" />
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
