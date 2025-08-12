import React from "react";
import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { PatientDataModel } from "@/app/models/petugas-kesehatan/patient";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";

// Helper: label status sesuai type
const STATUS_LABEL = {
  controll: { true: "Sudah Kontrol", false: "Belum Kontrol" },
  medication: { true: "Sudah Diambil", false: "Belum Diambil" },
};

// Komponen tabel detail (kontrol/medication)
function HistoryDetailTable({
  type,
  data,
}: {
  type: "controll" | "medication";
  data: (ControllHistoryDataModel | MedicationHistoryDataModel)[];
}) {
  return (
    <div
      style={{
        boxShadow: "0 2px 8px #eee",
        borderRadius: 8,
        padding: 20,
        background: "#fff",
        maxWidth: 520,
        margin: "16px auto",
      }}
    >
      <table style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ padding: 6, fontWeight: 600 }}>
              {type === "controll"
                ? "Jadwal Kontrol"
                : "Jadwal Pengambilan Obat"}
            </th>
            <th style={{ padding: 6, fontWeight: 600 }}>
              {type === "controll"
                ? "Status Kontrol"
                : "Status Pengambilan Obat"}
            </th>
            <th style={{ padding: 6, fontWeight: 600 }}>
              {type === "controll"
                ? "Waktu Dilakukan"
                : "Waktu Pengambilan Obat"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={row.id || idx}>
                <td style={{ padding: 6 }}>
                  {dayjs(row.date).format("DD-MM-YYYY")}
                </td>
                <td style={{ padding: 6 }}>
                  <Tag
                    color={row.status ? "green" : "red"}
                    style={{
                      border: `1.5px solid ${
                        row.status ? "#50cd89" : "#f44336"
                      }`,
                      background: "#fff",
                      color: row.status ? "#50cd89" : "#f44336",
                      fontWeight: 500,
                      borderRadius: 6,
                    }}
                  >
                    {STATUS_LABEL[type][row.status ? "true" : "false"]}
                  </Tag>
                </td>
                <td style={{ padding: 6, color: "#888" }}>
                  {row.status && row.updatedAt
                    ? dayjs(row.updatedAt).format("DD-MM-YYYY HH.mm")
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Belum ada data riwayat</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function ExpandableHistoryTable({
  type = "controll",
  patients,
}: {
  type?: "controll" | "medication";
  patients: PatientDataModel[];
}) {
  // Table columns utama
  const columns = [
    {
      title: "No",
      key: "no",
      align: "center" as const,
      width: 60,
      render: (_: string, __: PatientDataModel, idx: number) => idx + 1,
    },
    {
      title: "Nama Pasien",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (text: string) => {
        if (!text) return "-";
        return text
          .split(" ")
          .map((word) => word[0] + "*".repeat(word.length - 1))
          .join(" ");
      },
    },
    {
      title: "WhatsApp",
      dataIndex: "no_whatsapp",
      key: "no_whatsapp",
      align: "center" as const,
      width: 160,
    },
    {
      title: "Tahun Diagnosa",
      dataIndex: "year_of_diagnosis",
      key: "year_of_diagnosis",
      align: "center" as const,
      width: 130,
    },
  ];

  // Expandable configuration
  return (
    <Table
      columns={columns}
      dataSource={patients}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
      // ICON DITAMPILKAN DI KOLOM WhatsApp (indeks ke-2)
      expandIconColumnIndex={4}
      expandable={{
        expandedRowRender: (record) => (
          <HistoryDetailTable
            type={type}
            data={
              type === "controll"
                ? (record.controllHistory as ControllHistoryDataModel[]) || []
                : (record.medicationHistory as MedicationHistoryDataModel[]) ||
                  []
            }
          />
        ),
        expandRowByClick: true,
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <span
              style={{
                color: "#aaa",
                marginLeft: 12,
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={(e) => onExpand(record, e)}
            >
              Lihat Detail <CaretDownOutlined />
            </span>
          ) : (
            <span
              style={{
                color: "#888",
                marginLeft: 12,
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={(e) => onExpand(record, e)}
            >
              Lihat Detail <CaretRightOutlined />
            </span>
          ),
        columnWidth: 190,
      }}
    />
  );
}
