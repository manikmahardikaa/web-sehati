import ActionTable from "@/app/components/common/action-table";
import { RegionDataModel } from "@/app/models/admin/region";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Collapse, TableProps, Typography } from "antd";

const { Panel } = Collapse;
const { Text } = Typography;

export const RegionColumns = ({
  onDelete,
  onEdit,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}): TableProps<RegionDataModel>["columns"] => {
  return [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: string, __: RegionDataModel, index: number) => index + 1,
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Sub Wilayah",
      dataIndex: "sub_region",
      key: "sub_region",
      render: (_: string, record: RegionDataModel) =>
        record.subregions && record.subregions.length > 0 ? (
          <Collapse
            ghost
            expandIconPosition="end"
            size="small"
            style={{ backgroundColor: "#f9f9f9", borderRadius: 8 }}
          >
            <Panel
              header={
                <Text strong>
                  <EnvironmentOutlined style={{ marginRight: 8 }} />
                  {`Sub Wilayah (${record.subregions.length})`}
                </Text>
              }
              key={record.id}
            >
              <ul style={{ listStyleType: "disc", paddingLeft: 20, margin: 0 }}>
                {record.subregions.map((sub) => (
                  <li key={sub.id}>
                    <Text>{sub.name}</Text>
                  </li>
                ))}
              </ul>
            </Panel>
          </Collapse>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
    {
      title: "Aksi",
      key: "actions",
      render: (record: RegionDataModel) => (
        <ActionTable
          title="Wilayah"
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
