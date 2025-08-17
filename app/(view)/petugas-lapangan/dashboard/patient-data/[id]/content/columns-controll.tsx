import ActionTable from "@/app/components/common/action-table";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
;

export const ControllHistoryColumns = ({
  onDelete,
  onUpdateStatus,
}: {
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, currentStatus: boolean) => void;
}): TableProps<ControllHistoryDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: ControllHistoryDataModel, index: number) =>
        index + 1,
    },
    {
      title: "Tanggal",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).locale("id").format("D MMMM YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <span>
          {status ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
        </span>
      ),
    },
    {
      title: "Aksi",
      key: "actions",
      render: (record: ControllHistoryDataModel) => (
        <ActionTable
          title="Data"
          description={record.id ? record.id : ""}
          actions="delete"
          type="detail-patient"
          id={record.id}
          onDelete={() => {
            onDelete(record.id);
          }}
          onUpdateStatus={() => {
            onUpdateStatus(record.id, record.status);
          }}
        />
      ),
    },
  ];
};
