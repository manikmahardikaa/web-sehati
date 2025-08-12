import { useState } from "react";
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
import { PatientDataModel } from "@/app/models/petugas-lapangan/patient";
import { htmlToWhatsAppMarkdown } from "@/app/utils/html-to-whatsapp-markdown";
import { useWaBlasts } from "@/app/hooks/petugas-lapangan/schedule-blast";
import { WaBlastSchedulePayloadCreateModel } from "@/app/models/petugas-lapangan/schedule-blast";
import TextArea from "antd/es/input/TextArea";
import { useDateScheduleBlasts } from "@/app/hooks/petugas-lapangan/date-schedule-blast";
import utc from "dayjs/plugin/utc";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
dayjs.extend(utc);

const { Title } = Typography;

interface FormScheduleWaBlastProps {
  patients: PatientDataModel[];
  onSuccess?: () => void;
}

type FormFields = {
  subject: string;
  scheduled_at?: Dayjs | null;
  message: string;
};

export default function FormScheduleWaBlast({
  patients,
  onSuccess,
}: FormScheduleWaBlastProps) {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [form] = Form.useForm<FormFields>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { onCreate: createWaBlast, onCreateLoading: loading } = useWaBlasts({});
  const { data: date } = useDateScheduleBlasts({});

  const dateTypeMap = new Map<string, string[]>();
  (date ?? []).forEach((item) => {
    const key = dayjs.utc(item.date).format("YYYY-MM-DD");
    const prev = dateTypeMap.get(key) || [];
    dateTypeMap.set(key, [...prev, item.type]);
  });

  const dateEventMap = new Map<
    string,
    { patient: PatientDataModel; type: "medical" | "controll" }[]
  >();

  patients.forEach((patient) => {
    patient.medicationHistory.forEach((med: MedicationHistoryDataModel) => {
      const tgl = dayjs(med.date).format("YYYY-MM-DD");
      if (!dateEventMap.has(tgl)) dateEventMap.set(tgl, []);
      dateEventMap.get(tgl)!.push({ patient, type: "medical" });
    });
    patient.controllHistory.forEach((con: ControllHistoryDataModel) => {
      const tgl = dayjs(con.date).format("YYYY-MM-DD");
      if (!dateEventMap.has(tgl)) dateEventMap.set(tgl, []);
      dateEventMap.get(tgl)!.push({ patient, type: "controll" });
    });
  });

   const handleDateSelect = (dateObj: Dayjs) => {
     setSelectedDate(dateObj ? dateObj.format("YYYY-MM-DD") : null);
     setSelectedPatients([]); // opsional, jika ingin reset selection
   };

   let filteredPatients = patients;
   let patientEventTypeMap: Record<string, ("medical" | "controll")[]> = {};

   if (selectedDate) {
     const events = dateEventMap.get(selectedDate) || [];
     const ids = new Set(events.map((e) => e.patient.id));
     filteredPatients = patients.filter((p) => ids.has(p.id));
     // Buat mapping tipe untuk setiap pasien di tanggal tsb
     patientEventTypeMap = {};
     events.forEach((e) => {
       if (!patientEventTypeMap[e.patient.id])
         patientEventTypeMap[e.patient.id] = [];
       patientEventTypeMap[e.patient.id].push(e.type);
     });
   }

   // === 3. Data event yang muncul pada tanggal terpilih
  //  const selectedDateEvents = selectedDate
  //    ? dateEventMap.get(selectedDate) || []
  //    : [];

  // Pilih pasien satu per satu
  const handleSelect = (id: string) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  // Pilih semua pasien
  // const handleSelectAll = () => {
  //   setSelectedPatients((prev) =>
  //     prev.length === patients.length ? [] : patients.map((p) => p.id)
  //   );
  // };

  // Submit handler
  const handleSubmit = async (fields: FormFields) => {
    if (selectedPatients.length === 0 || !fields.message) {
      antdMessage.error("Pilih pasien & isi pesan!");
      return;
    }

    try {
      const selectedPatientObjs = patients.filter((p) =>
        selectedPatients.includes(p.id)
      );
      const phone_numbers = selectedPatientObjs.map((p) => p.no_whatsapp);
      const formattedMessage = htmlToWhatsAppMarkdown(fields.message);

      const payload: WaBlastSchedulePayloadCreateModel = {
        phone_numbers: JSON.stringify(phone_numbers),
        message: formattedMessage,
        subject: fields.subject,
        scheduled_at: fields.scheduled_at ? fields.scheduled_at.toDate() : null, // allow null
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
          <Title level={5}>Pilih Pasien</Title>
          <Form layout="vertical" form={form}>
            {/* Date Picker */}
            <DatePicker
              style={{ marginBottom: 12 }}
              dateRender={(current) => {
                const tgl = current.format("YYYY-MM-DD");
                const events = dateEventMap.get(tgl) || [];
                let bg = "";
                if (
                  events.some((e) => e.type === "medical") &&
                  events.some((e) => e.type === "controll")
                ) {
                  bg = "linear-gradient(135deg, #7ed957 50%, #ffe066 50%)";
                } else if (events.some((e) => e.type === "medical")) {
                  bg = "#7ed957";
                } else if (events.some((e) => e.type === "controll")) {
                  bg = "#ffe066";
                }
                return (
                  <div
                    style={{
                      borderRadius: "50%",
                      width: 30,
                      height: 30,
                      margin: "auto",
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: events.length ? "2px solid #C30010" : undefined,
                    }}
                  >
                    {current.date()}
                  </div>
                );
              }}
              value={selectedDate ? dayjs(selectedDate) : null}
              allowClear
              onChange={(date) => handleDateSelect(date)}
            />
          </Form>

          {/* TOMBOL PILIH SEMUA */}
          <Button
            size="small"
            type={
              selectedPatients.length === filteredPatients.length
                ? "default"
                : "primary"
            }
            onClick={() => {
              setSelectedPatients(
                selectedPatients.length === filteredPatients.length
                  ? []
                  : filteredPatients.map((p) => p.id)
              );
            }}
            style={{
              marginBottom: 10,
              borderColor: "#C30010",
              color:
                selectedPatients.length === filteredPatients.length
                  ? "#C30010"
                  : "#fff",
              background:
                selectedPatients.length === filteredPatients.length
                  ? "#fff"
                  : "#C30010",
              fontWeight: 600,
              borderRadius: 6,
            }}
            icon={<CheckOutlined />}
          >
            {selectedPatients.length === filteredPatients.length
              ? "Batal Pilih Semua"
              : "Pilih Semua"}
          </Button>

          {/* LIST PASIEN */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #E0E0E0",
              borderRadius: 6,
              minHeight: 400,
              maxHeight: 400,
              overflowY: "auto",
              padding: 4,
            }}
          >
            {filteredPatients.length === 0 ? (
              <div style={{ color: "#aaa", padding: 16 }}>
                Tidak ada pasien pada tanggal ini.
              </div>
            ) : (
              filteredPatients.map((p) => (
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
                    {/* Tambah Tag keterangan medical/kontrol jika sedang filter tanggal */}
                    {selectedDate &&
                      (patientEventTypeMap[p.id] || []).map((type, idx) => (
                        <Tag
                          key={type + idx}
                          color={type === "medical" ? "green" : "gold"}
                          style={{ marginLeft: 8 }}
                        >
                          {type === "medical" ? "Pengambilan Obat" : "Kontrol"}
                        </Tag>
                      ))}
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
            // tidak ada required
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
