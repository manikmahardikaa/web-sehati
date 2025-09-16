import {
  HomeFilled,
  SolutionOutlined,
  FormOutlined,
  PictureOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { useRouter } from "next/navigation";

export const SidebarMenuUser = (): MenuProps["items"] => {
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
      }}
    >
      {text}
    </span>
  );

  const sidebarMenu: MenuProps["items"] = [
    {
      key: "/home",
      label: menuLabel("Beranda"),
      icon: <HomeFilled />,
      onClick: () => router.push("/home"),
    },
    {
      key: "/social-consultation-and-assistance-services",
      label: menuLabel("Layanan Konsultasi dan Pendampingan Sosial"),
      icon: <SolutionOutlined />,
      onClick: () =>
        router.push("/social-consultation-and-assistance-services"),
    },
    {
      key: "/survei",
      label: menuLabel("Survei ODHIV"),
      icon: <FormOutlined />,
      onClick: () => router.push("/survei"),
    },
    {
      key: "/media",
      label: menuLabel("Media"),
      icon: <PictureOutlined />,
      onClick: () => router.push("/media"),
    },
    {
      key: "/contact",
      label: menuLabel("Kontak"),
      icon: <PhoneOutlined />,
      // icon: <MailOutlined />, // jika ingin fokus ke email
      onClick: () => router.push("/contact"),
    },
  ];

  return sidebarMenu;
};
