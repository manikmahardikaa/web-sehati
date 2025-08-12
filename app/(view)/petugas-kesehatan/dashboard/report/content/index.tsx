import Title from "antd/es/typography/Title";
import TabLayout from "./tabs-layout";
import { usePatients } from "@/app/hooks/petugas-kesehatan/patient";

export default function Content() {
  const { data } = usePatients({});
  console.log(data);
  return (
    <div>
      <Title level={4}>Report</Title>
      <TabLayout />
    </div>
  );
}
