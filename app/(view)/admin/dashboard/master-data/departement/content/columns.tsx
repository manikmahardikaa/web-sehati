import ActionTable from "@/app/components/common/action-table";
import { DepartementDataModel } from "@/app/models/admin/departement";

import { TableProps } from "antd";

export const DepartementColumns = ({
  onDelete,
  onEdit,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}): TableProps<DepartementDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: DepartementDataModel, index: number) => index + 1,
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Aksi",
      key: "actions",
      render: (record: DepartementDataModel) => (
        <ActionTable
          title="Jabatan"
          description={record.name ? record.name : ""}
          actions="delete"
          id={record.id}
          onEdit={() => {
            onEdit(record.id);
          }}
          onDelete={() => {
            onDelete(record.id);
          }}
        />
      ),
    },
  ];
};
