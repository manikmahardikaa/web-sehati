// FormPatient.tsx
import {
  PatientFormModel, // ⬅️ PAKAI INI
  PatientPayloadCreateModel,
} from "@/app/models/petugas-lapangan/patient";
import { Button, Form, Input, FormInstance, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function FormPatient({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: PatientPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: PatientFormModel; // ⬅️ ubah
  form: FormInstance<PatientFormModel>; // ⬅️ ubah
  type: "create" | "update";
}) {
  useEffect(() => {
    if (initialValues) {
      // pastikan birth_date selalu dayjs di form
      const mapped: PatientFormModel = {
        ...initialValues,
        birth_date: initialValues.birth_date
          ? dayjs(initialValues.birth_date)
          : undefined,
      };
      form.setFieldsValue(mapped);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

 const handleSubmit = async (values: PatientFormModel) => {

   const payload = {
     name: values.name,
     street: values.street,
     no_whatsapp: values.no_whatsapp,
     birth_date: values.birth_date
       ? dayjs(values.birth_date).toDate().toISOString()
       : "",
     gender: values.gender,
     year_of_diagnosis: values.year_of_diagnosis,
     petugas_lapangan_id: null,
   } satisfies PatientPayloadCreateModel;

   await onFinish(payload);
 };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit} // ⬅️ pakai handler konversi
      form={form}
      // ⚠️ JANGAN kirim initialValues di sini, karena berpotensi bukan dayjs
      // initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Nama Pasien"
        rules={[{ required: true, message: "Nama pasien tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan nama pasien" size="large" />
      </Form.Item>

      <Form.Item
        name="street"
        label="Alamat"
        rules={[{ required: true, message: "Alamat tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan Alamat" size="large" />
      </Form.Item>

      <Form.Item
        name="no_whatsapp"
        label="No WhatsApp"
        rules={[{ required: true, message: "No WhatsApp tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan no WhatsApp" size="large" />
      </Form.Item>

      <Form.Item
        name="birth_date"
        label="Tanggal Lahir"
        rules={[
          { required: true, message: "Tanggal lahir tidak boleh kosong!" },
        ]}
      >
        <DatePicker
          placeholder="Pilih tanggal lahir"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="year_of_diagnosis"
        label="Tahun Diagnosa"
        rules={[
          { required: true, message: "Tahun diagnosa tidak boleh kosong!" },
        ]}
      >
        <Select placeholder="Pilih tahun diagnosa" style={{ width: "100%" }}>
          {Array.from({ length: 10 }, (_, i) => (
            <Select.Option key={i} value={dayjs().year() - i}>
              {dayjs().year() - i}
            </Select.Option>
          ))}
        </Select>
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
