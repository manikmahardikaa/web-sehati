import ActionTable from "@/app/components/common/action-table";
import { ReportDataModel } from "@/app/models/petugas-kesehatan/report";
import { FilePdfOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import "dayjs/locale/id";
import Link from "next/link";
export const ReportColumns = ({
  onDelete,
}: {
  onDelete: (id: string) => void;
}): TableProps<ReportDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: ReportDataModel, index: number) => index + 1,
    },
    {
      title: "Nama",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Laporan",
      dataIndex: "report_url",
      key: "report_url",
      align: "center",
      render: (_: string, record: ReportDataModel) => (
        <Link href={record.report_url} target="_blank" rel="noreferrer">
          <FilePdfOutlined style={{ fontSize: 24, color: "#c30010" }} />
        </Link>
      ),
    },
    {
      title: "Aksi",
      key: "actions",
      render: (record: ReportDataModel) => (
        <ActionTable
          title="Laporan"
          description={record.name ? record.name : ""}
          actions="delete"
          type="report"
          id={record.id}
          onDelete={() => {
            onDelete(record.id);
          }}
        />
      ),
    },
  ];
};
