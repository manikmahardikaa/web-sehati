import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";
import { Button, Form, FormInstance, DatePicker } from "antd";

export default function FormMedicalHistory({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: MedicationHistoryDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: MedicationHistoryDataModel;
  form: FormInstance<MedicationHistoryDataModel>;
  type: "create" | "update";
}) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item
        name="date"
        label="Pilih Tanggal"
        rules={[{ required: true, message: "Tanggal harus dipilih!" }]}
      >
        <DatePicker
          placeholder="Pilih tanggal"
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
        />
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
