import { WaBlastScheduleDataModel } from "@/app/models/petugas-lapangan/schedule-blast";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { TableProps, Tag } from "antd";

export const WaBlastPatientControlColumns =
  (): TableProps<WaBlastScheduleDataModel>["columns"] => [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: WaBlastScheduleDataModel, index: number) =>
        index + 1,
      align: "center",
    },
    {
      title: "Subject & Pesan",
      dataIndex: "subject",
      key: "subject",
      render: (subject: string, record: WaBlastScheduleDataModel) => (
        <div>
          <strong>{subject}</strong>
          <br />
          <span style={{ color: "#555" }}>{record.message}</span>
        </div>
      ),
    },
    {
      title: "Kontak",
      dataIndex: "count_contact",
      key: "count_contact",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "DELIVERED"
              ? "green"
              : status === "FAILED"
              ? "red"
              : "orange"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Waktu Pengiriman",
      dataIndex: "scheduled_at",
      key: "scheduled_at",
      align: "center",
      render: (date: string | null,) =>
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
      title: "Tanggal Tercatat",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        date ? (
          <span style={{ color: "#888", textAlign: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 400 }}>
              {dayjs(date).locale("id").format("D MMMM YYYY")}
            </span>
            <br />
            <span style={{ fontSize: 16, fontWeight: 400 }}>
              {dayjs(date).format("HH.mm")} WITA
            </span>
          </span>
        ) : (
          "-"
        ),
      align: "center",
    },
  ];
