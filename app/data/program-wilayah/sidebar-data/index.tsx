import {
  HomeFilled,
  TeamOutlined,
  MessageOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  BarChartOutlined,
  FormOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { useRouter } from "next/navigation";

export const SidebarMenuProgramWilayah = (): MenuProps["items"] => {
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

  return [
    {
      key: "/program-wilayah/dashboard/home",
      label: sidebarLabel("Beranda"),
      icon: <HomeFilled style={{ fontSize: 18 }} />,
      onClick: () => router.push("/program-wilayah/dashboard/home"),
    },
    {
      key: "/program-wilayah/dashboard/patient-data",
      label: sidebarLabel("Data Pasien"),
      icon: <TeamOutlined style={{ fontSize: 18 }} />,
      onClick: () => router.push("/program-wilayah/dashboard/patient-data"),
    },
    {
      key: "/program-wilayah/dashboard/psychosocial-consultation-and-assistance-services",
      label: sidebarLabel("Layanan Konsultasi & Pendampingan Psikososial"),
      icon: <MessageOutlined style={{ fontSize: 18 }} />,
      onClick: () =>
        router.push(
          "/program-wilayah/dashboard/psychosocial-consultation-and-assistance-services"
        ),
    },
    {
      key: "/program-wilayah/dashboard/medication-adherence-support",
      label: sidebarLabel("Dukungan Kepatuhan Pengobatan (ADS)"),
      icon: <MedicineBoxOutlined style={{ fontSize: 18 }} />,
      onClick: () =>
        router.push("/program-wilayah/dashboard/medication-adherence-support"),
    },
    {
      key: "/program-wilayah/dashboard/regurlar-health-checks",
      label: sidebarLabel("Kontrol Kesehatan Berkala"),
      icon: <ScheduleOutlined style={{ fontSize: 18 }} />,
      children: [
        {
          key: "/program-wilayah/dashboard/regular-health-checks/patient-control-management",
          label: sidebarLabel("Manajemen Kontrol Pasien"),
          icon: <SolutionOutlined style={{ fontSize: 16 }} />,
          onClick: () =>
            router.push(
              "/program-wilayah/dashboard/regular-health-checks/patient-control-management"
            ),
        },
        {
          key: "/program-wilayah/dashboard/regular-health-checks/health-check-monitoring",
          label: sidebarLabel("Monitoring Kontrol Kesehatan"),
          icon: <BarChartOutlined style={{ fontSize: 16 }} />,
          onClick: () =>
            router.push(
              "/program-wilayah/dashboard/regular-health-checks/health-check-monitoring"
            ),
        },
      ],
    },
    {
      key: "/program-wilayah/dashboard/survei",
      label: sidebarLabel("Survei"),
      icon: <FormOutlined style={{ fontSize: 18 }} />,
      onClick: () => router.push("/program-wilayah/dashboard/survei"),
    },
    {
      key: "/program-wilayah/dashboard/history-controll-and-medication",
      label: sidebarLabel("Riwayat Kontrol dan Obat"),
      icon: <HistoryOutlined style={{ fontSize: 18 }} />,
      onClick: () =>
        router.push(
          "/program-wilayah/dashboard/history-controll-and-medication"
        ),
    },
  ];
};
