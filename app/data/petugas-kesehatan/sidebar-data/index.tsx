import {
  HomeOutlined,
  SettingOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  HistoryOutlined,
  TeamOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { useRouter } from "next/navigation";

export const SidebarMenuPetugasKesehatan = (): MenuProps["items"] => {
  const router = useRouter();

  const sidebarLabel = (text: string) => (
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

  const sidebarMenu: MenuProps["items"] = [
    {
      key: "/petugas-kesehatan/dashboard/home",
      label: sidebarLabel("Beranda"),
      icon: <HomeOutlined />,
      onClick: () => router.push("/petugas-kesehatan/dashboard/home"),
    },
    {
      key: "/petugas-kesehatan/dashboard/patient-data",
      label: sidebarLabel("Data Pasien"),
      icon: <TeamOutlined />,
      onClick: () => router.push("/petugas-kesehatan/dashboard/patient-data"),
    },
    {
      key: "/petugas-kesehatan/dashboard/psikologi-data",
      label: sidebarLabel("Data Psikologi"),
      icon: <SmileOutlined />,
      onClick: () => router.push("/petugas-kesehatan/dashboard/psikologi-data"),
    },
    {
      key: "/petugas-kesehatan/dashboard/setting-news",
      label: sidebarLabel("Pengaturan Berita"),
      icon: <SettingOutlined />,
      onClick: () => router.push("/petugas-kesehatan/dashboard/setting-news"),
    },
    {
      key: "/petugas-kesehatan/dashboard/health-management",
      label: sidebarLabel("Manajemen Kesehatan"),
      icon: <MedicineBoxOutlined />,
      children: [
        {
          key: "/petugas-kesehatan/dashboard/health-management/history-controll-and-medication",
          label: sidebarLabel("Riwayat Kontrol dan Obat"),
          icon: <HistoryOutlined />,
          onClick: () =>
            router.push(
              "/petugas-kesehatan/dashboard/health-management/history-controll-and-medication"
            ),
        },
        {
          key: "/petugas-kesehatan/dashboard/health-management/history-regular-health-checks",
          label: sidebarLabel("Riwayat Cek Berkala"),
          icon: <FileTextOutlined />,
          onClick: () =>
            router.push(
              "/petugas-kesehatan/dashboard/health-management/history-regular-health-checks"
            ),
        },
      ],
    },
    {
      key: "/petugas-kesehatan/dashboard/report",
      label: sidebarLabel("Laporan"),
      icon: <FileTextOutlined />,
      onClick: () => router.push("/petugas-kesehatan/dashboard/report"),
    },
  ];

  return sidebarMenu;
};
