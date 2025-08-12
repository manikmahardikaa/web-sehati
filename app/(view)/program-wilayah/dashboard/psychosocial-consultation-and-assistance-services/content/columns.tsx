import dayjs from "dayjs";
import "dayjs/locale/id";
import { TableProps } from "antd";
import { WaBlastPsikologiDataModel } from "@/app/models/program-wilayah/psikologi-blast";
import Link from "next/link";
import { FilePdfOutlined } from "@ant-design/icons";

export const PsikologiBlastColumns =
  (): TableProps<WaBlastPsikologiDataModel>["columns"] => [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: WaBlastPsikologiDataModel, index: number) =>
        index + 1,
      align: "center",
    },
    {
      title: "Nama Psikolog",
      key: "name",
      render: (_: string, record: WaBlastPsikologiDataModel) =>
        record.psikologi.name,
    },
    {
      title: "Laporan",
      dataIndex: "report_url",
      key: "report_url",
      align: "center",
      render: (_: string, record: WaBlastPsikologiDataModel) => (
        <Link href={record.report_url} target="_blank" rel="noreferrer">
          <FilePdfOutlined style={{ fontSize: 24, color: "#c30010" }} />
        </Link>
      ),
    },
    {
      title: "Pesan",
      key: "message",
      dataIndex: "message",
    },
    {
      title: "Tanggal Terkirim",
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
