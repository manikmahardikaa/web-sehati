import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button } from "antd";
import dayjs from "dayjs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PatientMedicationPDFDoc } from "../../../file-pdf/medication/medication-control";
import { PatientDataModel } from "@/app/models/program-wilayah/patient";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function DownloadReportMedicationModal({
  open,
  onCancel,
  patients = [],
  namaPetugas = "",
}: {
  open: boolean;
  onCancel: () => void;
  loading: boolean;
  patients?: PatientDataModel[];
  namaPetugas?: string;
}) {
  const defaultMonth = dayjs().month() + 1;
  const defaultYear = dayjs().year();
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [fileType, setFileType] = useState("pdf");

  // ambil value dari form
  // const values = form.getFieldsValue();
  // const selectedMonth = values.bulan || defaultMonth;
  // const selectedYear = values.tahun || defaultYear;
  // const fileType = values.fileType || "pdf";
  const fileName = `Laporan-Kontrol-Pasien-${
    months[selectedMonth - 1]
  }-${selectedYear}.pdf`;
  const tanggalCetak = dayjs().format("D MMMM YYYY");

  // FILTERING di Modal:
  const filteredPatients = (patients || [])
    .map((p) => ({
      name: p.name,
      no_whatsapp: p.no_whatsapp,
      year_of_diagnosis: p.year_of_diagnosis,
      petugas_lapangan_name: p.petugas_lapangan.name,
      sub_district_name: p.petugas_lapangan.subregion.name,
      // PENTING: gunakan 'controlHistory'
      medicationHistory: (p.medicationHistory || [])
        .filter((c) => {
          const d = dayjs(c.date);
          return d.year() === selectedYear && d.month() + 1 === selectedMonth;
        })
        .map((c) => ({
          id: c.id,
          date:
            typeof c.date === "string"
              ? c.date
              : dayjs(c.date).format("YYYY-MM-DD"),
          status: c.status,
          updatedAt: c.updatedAt
            ? typeof c.updatedAt === "string"
              ? c.updatedAt
              : dayjs(c.updatedAt).toISOString()
            : undefined,
        })),
    }))
    .filter((p) => p.medicationHistory.length > 0);

  useEffect(() => {
    console.log(filteredPatients);
  }, [filteredPatients]);

  return (
    <Modal open={open} onCancel={onCancel} footer={null} title="Unduh Laporan">
      <Form
        layout="vertical"
        initialValues={{
          bulan: defaultMonth,
          tahun: defaultYear,
          fileType: "pdf",
        }}
        onValuesChange={(changed) => {
          if (changed.bulan) setSelectedMonth(changed.bulan);
          if (changed.tahun) setSelectedYear(changed.tahun);
          if (changed.fileType) setFileType(changed.fileType);
        }}
      >
        <Form.Item label="Bulan" name="bulan" required>
          <Select
            options={months.map((m, i) => ({ label: m, value: i + 1 }))}
          />
        </Form.Item>
        <Form.Item label="Tahun" name="tahun" required>
          <Select
            options={Array.from({ length: 6 }).map((_, i) => {
              const year = dayjs().year() - i;
              return { label: year, value: year };
            })}
          />
        </Form.Item>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          {filteredPatients.length > 0 ? (
            <PDFDownloadLink
              key={`pdf-${selectedMonth}-${selectedYear}-${fileType}`} // Trigger rerender
              document={
                <PatientMedicationPDFDoc
                  month={selectedMonth}
                  year={selectedYear}
                  staffName={filteredPatients[0].petugas_lapangan_name}
                  subDistrictName={filteredPatients[0].sub_district_name}
                  printDate={tanggalCetak}
                  data={filteredPatients}
                />
              }
              fileName={fileName}
            >
              {({ loading: loadingPdf }) => (
                <Button
                  type="primary"
                  style={{
                    background: "#D7262F",
                    border: "none",
                    width: 300,
                    fontSize: 20,
                    fontWeight: 600,
                    height: 44,
                    margin: "0 auto",
                    display: "block",
                  }}
                  loading={loadingPdf}
                >
                  {loadingPdf ? "Menyiapkan..." : "Unduh Laporan Kontrol"}
                </Button>
              )}
            </PDFDownloadLink>
          ) : (
            <p style={{ color: "red" }}>Tidak ada data untuk bulan/tahun ini</p>
          )}
        </div>
      </Form>
    </Modal>
  );
}
