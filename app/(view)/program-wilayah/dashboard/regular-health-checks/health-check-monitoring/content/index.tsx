import Title from "antd/es/typography/Title";
import TabContent from "./tab-layout";

export default function PatientControlContent() {
  return (
    <div>
      <Title level={4}>Manajemen Kontrol Pasien</Title>
      <TabContent />
    </div>
  );
}
