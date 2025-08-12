import Title from "antd/es/typography/Title";
import { TabContent } from "./tabs-columns";

export default function MediaManagementContent() {
  return (
    <div>
      <div>
        <Title level={4}>Manajemen Media</Title>
      </div>
      <div>
        <TabContent />
      </div>
    </div>
  );
}
