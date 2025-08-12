import Title from "antd/es/typography/Title";
import TabsContent from "./tab-columns";
import CustomButton from "@/app/components/common/custom-button";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Flex } from "antd";

export default function ControlTimeDataContent() {
  const router = useRouter();

  return (
    <div>
      <Title level={4}>Kontrol Kesehatan Berkala</Title>
      <Flex justify="end">
        <CustomButton
          title="Tambah Pesan"
          icon={<PlusOutlined />}
          onClick={() =>
            router.push(
              "/petugas-lapangan/dashboard/regular-health-checks/create"
            )
          }
        />
      </Flex>

      <TabsContent />
    </div>
  );
}
