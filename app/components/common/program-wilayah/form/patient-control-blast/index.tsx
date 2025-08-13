import { useMemo, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Typography,
  DatePicker,
  message as antdMessage,
  Tag,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { htmlToWhatsAppMarkdown } from "@/app/utils/html-to-whatsapp-markdown";
import TextArea from "antd/es/input/TextArea";
import utc from "dayjs/plugin/utc";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";
import { PatientDataModel } from "@/app/models/program-wilayah/patient";
import { usePatientControlBlasts } from "@/app/hooks/program-wilayah/patient-control-blast";
import { WaBlastPatientControlPayloadCreateModel } from "@/app/models/program-wilayah/patient-control-blast";
dayjs.extend(utc);

const { Title } = Typography;

interface FormPatientControlBlast {
  patients: PatientDataModel[];
  onSuccess?: () => void;
}

type FormFields = {
  subject: string;
  scheduled_at?: Dayjs | null;
  message: string;
};

export default function FormPatientControlBlast({
  patients,
  onSuccess,
}: FormPatientControlBlast) {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [form] = Form.useForm<FormFields>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { onCreate: createWaBlast, onCreateLoading: loading } = usePatientControlBlasts(
    {}
  );

  const h3MedicationMap = useMemo(() => {
    const map = new Map<string, PatientDataModel[]>();
    patients.forEach((patient) => {
      patient.controllHistory.forEach((med: MedicationHistoryDataModel) => {
        // Ambil H-3
        const date = dayjs.utc(med.date).format("YYYY-MM-DD");
        if (!map.has(date)) map.set(date, []);
        map.get(date)!.push(patient);
      });
    });
    return map;
  }, [patients]);

  // Tanggal yang ada event H-3 medication
  const medicationEventDates = new Set(h3MedicationMap.keys());

  // Handler pilih tanggal
  const handleDateSelect = (dateObj: Dayjs | null) => {
    setSelectedDate(dateObj ? dateObj.format("YYYY-MM-DD") : null);
    setSelectedPatients([]); // Reset selection ketika ganti tanggal
  };

  // Data pasien pada tanggal terpilih
  const patientsOnSelectedDate: PatientDataModel[] =
    (selectedDate && h3MedicationMap.get(selectedDate)) || [];

  // Pilih satu pasien (toggle select)
  const handleSelect = (id: string) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Pilih semua pasien di tanggal tsb
  const handleSelectAll = () => {
    setSelectedPatients((prev) =>
      prev.length === patientsOnSelectedDate.length
        ? []
        : patientsOnSelectedDate.map((p) => p.id)
    );
  };

  // Submit handler
  const handleSubmit = async (fields: FormFields) => {
    if (selectedPatients.length === 0 || !fields.message) {
      antdMessage.error("Pilih pasien & isi pesan!");
      return;
    }

    try {
      const selectedPatientObjs = patientsOnSelectedDate.filter((p) =>
        selectedPatients.includes(p.id)
      );
      const phone_numbers = selectedPatientObjs.map((p) => p.no_whatsapp);
      const formattedMessage = htmlToWhatsAppMarkdown(fields.message);

      const payload: WaBlastPatientControlPayloadCreateModel = {
        phone_numbers: JSON.stringify(phone_numbers),
        message: formattedMessage,
        subject: fields.subject,
        scheduled_at: fields.scheduled_at ? fields.scheduled_at.toDate() : null,
        status: "PENDING",
        count_contact: selectedPatientObjs.length,
      };

      await createWaBlast(payload);
      setSelectedPatients([]);
      form.resetFields();
      onSuccess?.();
      antdMessage.success("Pesan berhasil dijadwalkan!");
    } catch (err) {
      console.error(err);
      antdMessage.error("Terjadi kesalahan saat menjadwalkan pesan.");
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      style={{ background: "#FAFAFA", padding: 24, borderRadius: 12 }}
      initialValues={{ subject: "", scheduled_at: null, message: "" }}
    >
      <Row gutter={32}>
        {/* Kiri: Pilih Pasien */}
        <Col span={12}>
          <Title level={5}>
            Pilih Pasien 
          </Title>
          {/* Date Picker */}
          <DatePicker
            style={{ marginBottom: 12 }}
            dateRender={(current) => {
              const tgl = current.format("YYYY-MM-DD");
              const isMedH3 = medicationEventDates.has(tgl);
              return (
                <div
                  style={{
                    position: "relative",
                    borderRadius: "50%",
                    width: 34,
                    height: 34,
                    margin: "auto",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: isMedH3 ? "2px solid #4BCB4B" : undefined,
                    transition: "border .2s",
                  }}
                >
                  <span>{current.date()}</span>
                  {isMedH3 && (
                    <span
                      style={{
                        position: "absolute",
                        right: 3,
                        bottom: 3,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#4BCB4B",
                        border: "1px solid #fff",
                        display: "inline-block",
                      }}
                    />
                  )}
                </div>
              );
            }}
            value={selectedDate ? dayjs(selectedDate) : null}
            allowClear
            onChange={handleDateSelect}
          />

          {/* TOMBOL PILIH SEMUA */}
          <Button
            size="small"
            type={
              selectedPatients.length === patientsOnSelectedDate.length
                ? "default"
                : "primary"
            }
            onClick={handleSelectAll}
            style={{
              marginBottom: 10,
              borderColor: "#C30010",
              color:
                selectedPatients.length === patientsOnSelectedDate.length
                  ? "#C30010"
                  : "#fff",
              background:
                selectedPatients.length === patientsOnSelectedDate.length
                  ? "#fff"
                  : "#C30010",
              fontWeight: 600,
              borderRadius: 6,
            }}
            icon={<CheckOutlined />}
            disabled={patientsOnSelectedDate.length === 0}
          >
            {selectedPatients.length === patientsOnSelectedDate.length
              ? "Batal Pilih Semua"
              : "Pilih Semua"}
          </Button>

          {/* LIST PASIEN */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #E0E0E0",
              borderRadius: 6,
              minHeight: 200,
              maxHeight: 400,
              overflowY: "auto",
              padding: 4,
            }}
          >
            {!selectedDate || patientsOnSelectedDate.length === 0 ? (
              <div style={{ color: "#aaa", padding: 16 }}>
                Tidak ada pasien pada tanggal ini.
              </div>
            ) : (
              patientsOnSelectedDate.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "10px 12px",
                    margin: "4px 0",
                    borderRadius: 5,
                    border: selectedPatients.includes(p.id)
                      ? "1.5px solid #C30010"
                      : "1px solid #E0E0E0",
                    background: selectedPatients.includes(p.id)
                      ? "#FFF2F3"
                      : "#fff",
                    justifyContent: "space-between",
                    fontWeight: selectedPatients.includes(p.id) ? 600 : 400,
                    color: selectedPatients.includes(p.id)
                      ? "#C30010"
                      : undefined,
                    transition: "all 0.1s",
                  }}
                >
                  <span>
                    {p.name}
                    <Tag color="green" style={{ marginLeft: 8 }}>
                      Jadwal Kontrol
                    </Tag>
                  </span>
                  {selectedPatients.includes(p.id) && (
                    <CheckOutlined style={{ color: "#52c41a", fontSize: 18 }} />
                  )}
                </div>
              ))
            )}
          </div>
        </Col>

        {/* Kanan: Tulis Pesan & Jadwalkan */}
        <Col span={12}>
          <Title level={5}>Tulis Pesan & Jadwalkan</Title>
          <Form.Item
            label="Jadwalkan Tanggal & Jam"
            name="scheduled_at"
            style={{ marginBottom: 4 }}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              placeholder="Pilih tanggal & jam (opsional)"
              suffixIcon={<ClockCircleOutlined />}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              allowClear
            />
          </Form.Item>
          <span style={{ color: "#888", fontSize: 12 }}>
            *Jika tidak diisi, pesan akan dikirim segera setelah penjadwalan.
          </span>
          <Form.Item
            name="subject"
            label="Subject"
            style={{ marginBottom: 16, marginTop: 16 }}
            rules={[{ required: true, message: "Subject wajib diisi!" }]}
          >
            <TextArea placeholder="Tulis subject" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Pesan"
            style={{ marginBottom: 16 }}
            rules={[{ required: true, message: "Pesan wajib diisi!" }]}
          >
            <ReactQuill
              theme="snow"
              style={{
                height: 140,
                marginBottom: 0,
                background: "#fff",
                borderRadius: 6,
              }}
              placeholder="Tulis pesan untuk pasien..."
              onChange={(value) => form.setFieldValue("message", value)}
              value={form.getFieldValue("message")}
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 60,
            }}
          >
            <Button
              style={{
                borderColor: "#C30010",
                color: "#C30010",
                background: "#fff",
                width: 120,
              }}
              onClick={() => {
                setSelectedPatients([]);
                form.resetFields();
              }}
              size="large"
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#C30010",
                borderColor: "#C30010",
                width: 120,
              }}
              size="large"
              disabled={selectedPatients.length === 0 || loading}
              loading={loading}
            >
              Jadwalkan
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
