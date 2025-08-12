/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { PatientDataModel } from "@/app/models/program-wilayah/patient";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";

// Shared row shape yang dipakai table detail
type HistoryRow = {
  id?: string;
  date?: string | Date | null;
  status?: boolean | null;
  updatedAt?: string | Date | null;
};

const STATUS_LABEL = {
  controll: { true: "Sudah Kontrol", false: "Belum Kontrol" },
  medication: { true: "Sudah Diambil", false: "Belum Diambil" },
} as const;

function HistoryDetailTable({
  type,
  data,
}: {
  type: "controll" | "medication";
  // Selalu array, tak perlu union objek tunggal / null[]
  data: HistoryRow[];
}) {
  const rows = Array.isArray(data) ? data.filter(Boolean) : [];

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
          {rows.length > 0 ? (
            rows.map((row: HistoryRow, idx: number) => {
              const dateStr = row?.date
                ? dayjs(row.date).format("DD-MM-YYYY")
                : "-";
              const done = !!row?.status;
              const label =
                STATUS_LABEL[type][
                  done ? "true" : ("false" as "true" | "false")
                ];
              const doneAt =
                done && row?.updatedAt
                  ? dayjs(row.updatedAt).format("DD-MM-YYYY HH.mm")
                  : "-";
              return (
                <tr key={row.id ?? idx}>
                  <td style={{ padding: 6 }}>{dateStr}</td>
                  <td style={{ padding: 6 }}>
                    <Tag
                      color={done ? "green" : "red"}
                      style={{
                        border: `1.5px solid ${done ? "#50cd89" : "#f44336"}`,
                        background: "#fff",
                        color: done ? "#50cd89" : "#f44336",
                        fontWeight: 500,
                        borderRadius: 6,
                      }}
                    >
                      {label}
                    </Tag>
                  </td>
                  <td style={{ padding: 6, color: "#888" }}>{doneAt}</td>
                </tr>
              );
            })
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
  // Kolom utama, ketik dengan ColumnsType
  const columns: ColumnsType<PatientDataModel> = [
    {
      title: "No",
      key: "no",
      align: "center",
      width: 60,
      render: (_: unknown, __: PatientDataModel, idx: number) => idx + 1,
    },
    {
      title: "Nama Pasien",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (name: string) => <b>{name}</b>,
    },
    {
      title: "WhatsApp",
      dataIndex: "no_whatsapp",
      key: "no_whatsapp",
      align: "center",
      width: 160,
    },
    {
      title: "Tahun Diagnosa",
      dataIndex: "year_of_diagnosis",
      key: "year_of_diagnosis",
      align: "center",
      width: 130,
    },
  ];

  return (
    <Table<PatientDataModel>
      columns={columns}
      dataSource={patients}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
      // Kamu ingin icon di kolom WhatsApp (index 2)
      expandIconColumnIndex={2}
      expandable={{
        expandedRowRender: (record) => (
          <HistoryDetailTable
            type={type}
            data={
              (type === "controll"
                ? (record.controllHistory as
                    | ControllHistoryDataModel[]
                    | undefined)
                : (record.medicationHistory as
                    | MedicationHistoryDataModel[]
                    | undefined)
              )?.map((r) => ({
                id: (r as any).id,
                date: (r as any).date,
                status: (r as any).status,
                updatedAt: (r as any).updatedAt,
              })) ?? []
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
