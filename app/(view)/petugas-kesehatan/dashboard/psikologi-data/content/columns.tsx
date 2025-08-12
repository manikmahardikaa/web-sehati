import ActionTable from "@/app/components/common/action-table";
import { PsikologiDataModel } from "@/app/models/petugas-kesehatan/psikologi";
import { UserOutlined } from "@ant-design/icons";

import { Avatar, TableProps } from "antd";

export const PsikologiColumns = ({
  onDelete,
  onEdit,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}): TableProps<PsikologiDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: PsikologiDataModel, index: number) => index + 1,
    },
    {
      title: "Foto",
      dataIndex: "image_url",
      key: "image_url",
      render: (image_url: string) => (
        <Avatar
          src={image_url}
          icon={image_url ? undefined : <UserOutlined />}
          alt="image"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) =>
        gender === "LAKI_LAKI" ? "Laki-laki" : "Perempuan",
    },
    {
      title: "No WhatsApp",
      dataIndex: "no_whatsapp",
      key: "no_whatsapp",
    },
    {
      title: "Wilayah",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Aksi",
      key: "actions",
      render: (record: PsikologiDataModel) => (
        <ActionTable
          title="Psikologi"
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
