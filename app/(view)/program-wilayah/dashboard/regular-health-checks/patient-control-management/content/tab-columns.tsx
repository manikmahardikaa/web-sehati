import { usePatientControlBlasts } from "@/app/hooks/program-wilayah/patient-control-blast";
import { WaBlastPatientControlColumns } from "./columns";
import { Table, Tabs, TabsProps } from "antd";

export default function TabContent() {
  const { data = [] } = usePatientControlBlasts({});
  const blastWithSchedule = data.filter(
    (status) => status.status === "PENDING"
  );

  const blastWithDelivered = data.filter(
    (status) => status.status === "DELIVERED"
  );

  const columns = WaBlastPatientControlColumns();

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Semua",
      children: <Table columns={columns} dataSource={data} />,
    },
    {
      key: "2",
      label: "Belum Terkirim",
      children: <Table columns={columns} dataSource={blastWithSchedule} />,
    },
    {
      key: "3",
      label: "Terkirim",
      children: <Table columns={columns} dataSource={blastWithDelivered} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
