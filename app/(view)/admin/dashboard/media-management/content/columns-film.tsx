import ActionTable from "@/app/components/common/action-table";
import { FilmDataModel } from "@/app/models/admin/film";

import { TableProps } from "antd";

export const FilmColumns = ({
  onDelete,
  onEdit,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}): TableProps<FilmDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: FilmDataModel, index: number) => index + 1,
    },
    {
      title: "Judul Film Pendek",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "is_published",
      key: "is_published",
      render: (text) => {
        return (
          <span
            style={{
              backgroundColor: text ? "#28C76F" : "#1E1E1E",
              color: "#fff",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              display: "inline-block",
              fontWeight: 500,
            }}
          >
            {text ? "Publish" : "Draft"}
          </span>
        );
      },
    },
    {
      title: "Aksi",
      key: "actions",
      render: (record: FilmDataModel) => (
        <ActionTable
          title="Film Pendek"
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
