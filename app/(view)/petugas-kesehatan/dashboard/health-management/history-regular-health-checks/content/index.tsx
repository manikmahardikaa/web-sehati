import { Typography } from "antd";
import TabContent from "./tab-layout";

const { Title, Paragraph } = Typography;

export default function HistoryRegularHealthChecksPage() {
  return (
    <div>
      <Title level={4} style={{ marginBottom: 8 }}>
        Riwayat Cek Berkala
      </Title>

      <Paragraph style={{ marginBottom: 24, fontSize: 16, color: "#333" }}>
        Anda dapat mengecek riwayat kontrol dan riwayat pengambilan obat pasien untuk
        periode 1 bulan maupun 3 bulan.
      </Paragraph>

      <TabContent />
    </div>
  );
}
