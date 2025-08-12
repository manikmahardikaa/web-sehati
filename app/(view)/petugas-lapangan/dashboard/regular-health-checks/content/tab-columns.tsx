import { useWaBlasts } from "@/app/hooks/petugas-lapangan/schedule-blast";
import { Table, Tabs, TabsProps } from "antd";
import { WaBlastScheduleColumns } from "./columns";

export default function TabsContent() {
  const { data = [] } = useWaBlasts({}); 

  const blastWithSchedule = data.filter(
    (status) => status.status === "PENDING"
  );

  const blastWithDelivered = data.filter(
    (status) => status.status === "DELIVERED"
  );

  const columns = WaBlastScheduleColumns();

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
