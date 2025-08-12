import {
  DatabaseFilled,
  EnvironmentFilled,
  HomeFilled,
  UserSwitchOutlined,
  ContactsOutlined,
  FileImageOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { useRouter } from "next/navigation";

export const SidebarMenuAdmin = (): MenuProps["items"] => {
  const router = useRouter();
  const menuLabel = (text: string) => (
    <span
      style={{
        whiteSpace: "normal",
        display: "inline-block",
        lineHeight: 1.3,
        fontSize: 15,
        fontWeight: 500,
        marginLeft: 4,
        // optional: overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160,
      }}
    >
      {text}
    </span>
  );
  const sidebarMenu: MenuProps["items"] = [
    {
      key: "/admin/dashboard/home",
      label: menuLabel("Beranda"),
      icon: <HomeFilled />,
      onClick: () => {
        router.push("/admin/dashboard/home");
      },
    },
    {
      key: "/admin/dashboard/master-data",
      label: menuLabel("Master Data"),
      icon: <DatabaseFilled />, // atau <AppstoreFilled />
      children: [
        {
          key: "/admin/dashboard/master-data/region",
          icon: <EnvironmentFilled />,
          label: menuLabel("Wilayah"),
          onClick: () => router.push("/admin/dashboard/master-data/region"),
        },
        {
          key: "/admin/dashboard/master-data/departement",
          icon: <IdcardOutlined />, // <UsergroupAddOutlined /> juga bagus
          label: menuLabel("Jabatan"),
          onClick: () =>
            router.push("/admin/dashboard/master-data/departement"),
        },
      ],
    },
    {
      key: "/admin/dashboard/account-management",
      label: menuLabel("Manajemen Akun"),
      icon: <UserSwitchOutlined />, // Atau <TeamOutlined /> jika untuk banyak user
      onClick: () => {
        router.push("/admin/dashboard/account-management");
      },
    },
    {
      key: "/admin/dashboard/contact-management",
      label: menuLabel("Manajemen Kontak"),
      icon: <ContactsOutlined />, // Atau <ContactsFilled />
      onClick: () => {
        router.push("/admin/dashboard/contact-management");
      },
    },
    {
      key: "/admin/dashboard/media-management",
      label: menuLabel("Manajemen Media"),
      icon: <FileImageOutlined />, // Bisa diganti FileTextOutlined, VideoCameraOutlined, dsb
      onClick: () => {
        router.push("/admin/dashboard/media-management");
      },
    },
  ];

  return sidebarMenu;
};
