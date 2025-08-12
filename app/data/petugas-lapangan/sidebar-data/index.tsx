import {
  HomeFilled,
  TeamOutlined,
  ScheduleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { useRouter } from "next/navigation";

const menuLabel = (text: string) => (
  <span
    style={{
      whiteSpace: "normal",
      display: "inline-block",
      lineHeight: 1.35,
      fontSize: 15,
      fontWeight: 500,
      marginLeft: 4,
    }}
  >
    {text}
  </span>
);

export const SidebarMenuPeutugasLapangan = (): MenuProps["items"] => {
  const router = useRouter();
  return [
    {
      key: "/petugas-lapangan/dashboard/home",
      label: menuLabel("Beranda"),
      icon: <HomeFilled  />,
      onClick: () => router.push("/petugas-lapangan/dashboard/home"),
    },
    {
      key: "/petugas-lapangan/dashboard/patient-data",
      label: menuLabel("Data Pasien"),
      icon: <TeamOutlined style={{ fontSize: 18, verticalAlign: "middle" }} />,
      onClick: () => router.push("/petugas-lapangan/dashboard/patient-data"),
    },
    {
      key: "/petugas-lapangan/dashboard/regular-health-checks",
      label: menuLabel("Kontrol Kesehatan Berkala"),
      icon: (
        <ScheduleOutlined style={{ fontSize: 18, verticalAlign: "middle" }} />
      ),
      onClick: () =>
        router.push("/petugas-lapangan/dashboard/regular-health-checks"),
    },
    {
      key: "/petugas-lapangan/dashboard/history-controll-and-medication",
      label: menuLabel("Riwayat Kontrol dan Pengambilan Obat"),
      icon: (
        <HistoryOutlined style={{ fontSize: 18, verticalAlign: "middle" }} />
      ),
      onClick: () =>
        router.push(
          "/petugas-lapangan/dashboard/history-controll-and-medication"
        ),
    },
  ];
};
