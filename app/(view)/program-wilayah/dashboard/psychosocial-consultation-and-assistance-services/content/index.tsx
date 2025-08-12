import CustomButton from "@/app/components/common/custom-button";
import { MessageOutlined } from "@ant-design/icons";
import { Flex, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { PsikologiBlastColumns } from "./columns";
import { usePsikologiBlasts } from "@/app/hooks/program-wilayah/psikologi-blast";

export default function PsychosocialContent() {
  const router = useRouter();

  const columns = PsikologiBlastColumns();
  const { data } = usePsikologiBlasts({});
  return (
    <div>
      <Title level={4}>Layanan Konsultasi dan Bantuan Psikosial</Title>
      <p style={{ marginBottom: 16, color: "#555" }}>
        {" "}
        Kirim laporan pasien ke psikolog melalui WhatsApp. Anda dapat memantau
        riwayat pengiriman di sini.
      </p>
      <Flex justify="end" style={{ marginBottom: 16 }}>
        <CustomButton
          title="Hubungi Psikolog"
          icon={<MessageOutlined />}
          onClick={() =>
            router.push(
              "/program-wilayah/dashboard/psychosocial-consultation-and-assistance-services/create"
            )
          }
        />
      </Flex>

      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
}
