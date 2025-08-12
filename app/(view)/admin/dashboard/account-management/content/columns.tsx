import ActionTable from "@/app/components/common/action-table";
import { UserDataModel } from "@/app/models/admin/user";
import { Role } from "@prisma/client";
import { TableProps } from "antd";

export const UserColumns = ({
  onDelete,
  onEdit,
  role,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  role?: Role;
}): TableProps<UserDataModel>["columns"] => {
  const columns: TableProps<UserDataModel>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: UserDataModel, index: number) => index + 1,
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "No. WhatsApp",
      dataIndex: "no_whatsapp",
      key: "no_whatsapp",
    },
  ];

  if (role !== Role.PETUGAS_KESEHATAN) {
    columns.push({
      title: "Wilayah",
      key: "region",
      render: (record: UserDataModel) => {
        if (record.role === "PROGRAM_WILAYAH") {
          return record.region?.name ?? "-";
        } else if (record.role === "PETUGAS_LAPANGAN") {
          return record.subregion?.name ?? "-";
        } else {
          return "-";
        }
      },
    });
  }

  if (role === Role.PETUGAS_LAPANGAN) {
    columns.push({
      title: "Penanggung Jawab Wilayah",
      key: "penanggung_jawab",
      render: (record: UserDataModel) => {
        if (record.role === "PETUGAS_LAPANGAN") {
          return record.authority?.user?.name ?? "-";
        } else {
          return "-";
        }
      },
    });
  }

  columns.push({
    title: "Aksi",
    key: "actions",
    render: (record: UserDataModel) => (
      <ActionTable
        title="User"
        description={record.name || ""}
        actions="delete"
        id={record.id}
        onEdit={() => onEdit(record.id)}
        onDelete={() => onDelete(record.id)}
      />
    ),
  });

  return columns;
};
