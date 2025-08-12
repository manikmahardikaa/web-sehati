import ActionTable from "@/app/components/common/action-table";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";

export const MedicalHistoryColumns = ({
  onDelete,
  onEdit,
  onUpdateStatus,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onUpdateStatus: (id: string, currentStatus: boolean) => void;
}): TableProps<MedicationHistoryDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: MedicationHistoryDataModel, index: number) =>
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
      render: (record: MedicationHistoryDataModel) => (
        <ActionTable
          title="Psikologi"
          description={record.id ? record.id : ""}
          actions="delete"
          type="detail-patient"
          id={record.id}
          onEdit={() => {
            onEdit(record.id);
          }}
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
