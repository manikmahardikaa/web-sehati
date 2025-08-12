import ActionTable from "@/app/components/common/action-table";
import { ContactDataModel } from "@/app/models/admin/contact";

import { TableProps } from "antd";

export const ContactColumns = ({
  onDelete,
  onEdit,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}): TableProps<ContactDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: ContactDataModel, index: number) => index + 1,
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Jabatan",
      dataIndex: "departement",
      key: "departement",
      render: (_: string, record: ContactDataModel) => record.departement.name,
    },
    {
      title: "No. WhatsApp",
      dataIndex: "no_whatsapp",
      key: "no_whatsapp",
    },
    {
      title: "Aksi",
      key: "actions",
      render: (record: ContactDataModel) => (
        <ActionTable
          title="Contact"
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
