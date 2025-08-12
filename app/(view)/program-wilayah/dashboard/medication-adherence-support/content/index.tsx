import CustomButton from "@/app/components/common/custom-button";
import { MessageOutlined } from "@ant-design/icons";
import { Flex, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { ADSBlastColumns } from "./columns";
import { useAdsBlasts } from "@/app/hooks/program-wilayah/ads-blast";

export default function Content() {
  const router = useRouter();
  const columns = ADSBlastColumns();

  const { data } = useAdsBlasts({});
  return (
    <div>
      <Title level={4}>Dukungan Kepatuhan Pengobatan (ADS)</Title>
      <p style={{ marginBottom: 16, color: "#555" }}>
        Reminder pengambilan obat akan dikirim otomatis H-3 sebelum stok obat
        pasien habis. Anda dapat memantau status pengiriman di sini.
      </p>
      <Flex justify="end" style={{ marginBottom: 16 }}>
        <CustomButton
          title="Kirim Reminder"
          icon={<MessageOutlined />}
          onClick={() =>
            router.push(
              "/program-wilayah/dashboard/medication-adherence-support/create"
            )
          }
        />
      </Flex>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
}
