import dayjs from "dayjs";
import "dayjs/locale/id";
import { TableProps } from "antd";
import { WaBlastADSDataModel } from "@/app/models/program-wilayah/ads-blast";

export const ADSBlastColumns =
  (): TableProps<WaBlastADSDataModel>["columns"] => {
    return [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        render: (_: string, __: WaBlastADSDataModel, index: number) =>
          index + 1,
      },
      {
        title: "Nama Pasien",
        key: "name",
        render: (_: string, record: WaBlastADSDataModel) => record.patient.name,
      },
      {
        title: "WhatApp",
        dataIndex: "phone_numbers",
        key: "phone_numbers",
        render: (phone: string | string[]) => {
          let numbers: string[] = [];
          if (Array.isArray(phone)) {
            numbers = phone;
          } else if (typeof phone === "string") {
            try {
              numbers = JSON.parse(phone);
            } catch {
              numbers = [phone];
            }
          }
          return numbers.join(", ");
        },
      },
      {
        title: "Petugas Lapangan",
        key: "petugas_lapangan",
        render: (_: string, record: WaBlastADSDataModel) =>
          record.petugas_lapangan.name,
      },
      {
        title: "Tanggal Reminder",
        dataIndex: "schedule_at",
        key: "schedule_at",
        align: "center",
        render: (date: string | null) =>
          date ? (
            <span
              style={{
                display: "inline-block",
                color: "#888",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.1 }}>
                {dayjs(date).locale("id").format("D MMMM YYYY")}
              </span>
              <br />
              <span style={{ fontSize: 16, fontWeight: 400 }}>
                {dayjs(date).format("HH.mm")}{" "}
                <span style={{ fontSize: 16 }}>WITA</span>
              </span>
            </span>
          ) : (
            "-"
          ),
      },
      {
        title: "Status Reminder",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Tanggal Terkirim",
        dataIndex: "sent_at",
        key: "sent_at",
        render: (date: string | null) =>
          date ? dayjs(date).locale("id").format("D MMMM YYYY") : "-",
      },
    ];
  };
