import CustomButton from "@/app/components/common/custom-button";
import { PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import TabContent from "./tab-columns";

import { Typography } from "antd";
const { Paragraph } = Typography;

export default function PatientControlContent() {
  const router = useRouter();
  return (
    <div>
      <Title level={4}>Kontrol Kesehatan Berkala</Title>
      <Paragraph>
        Anda dapat mengirim pesan kontrol kesehatan berkala untuk pasien
      </Paragraph>
      <Flex justify="end">
        <CustomButton
          title="Tambah Pesan"
          icon={<PlusOutlined />}
          onClick={() =>
            router.push(
              "/program-wilayah/dashboard/regular-health-checks/patient-control-management/create"
            )
          }
        />
      </Flex>

      <TabContent />
    </div>
  );
}
