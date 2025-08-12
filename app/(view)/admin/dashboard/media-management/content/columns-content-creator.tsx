import ActionTable from "@/app/components/common/action-table";
import { ContentCreatorDataModel } from "@/app/models/admin/content-creator";

import { TableProps } from "antd";

export const ContentCreatorColumns = ({
  onDelete,
  onEdit,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}): TableProps<ContentCreatorDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: ContentCreatorDataModel, index: number) =>
        index + 1,
    },
    {
      title: "Konten Kreator",
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
      render: (record: ContentCreatorDataModel) => (
        <ActionTable
          title="Konten Kreator"
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
