import { DatabaseFilled, HomeFilled } from "@ant-design/icons";
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
        // optional: overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160,
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
      onClick: () => {
        router.push("/home");
      },
    },
    {
      key: "/social-consultation-and-assistance-services",
      label: menuLabel("Layanan Konsultasi dan Pendampingan Sosial"),
      icon: <DatabaseFilled />,
      onClick: () => {
        router.push("/social-consultation-and-assistance-services");
      },
    },
    {
      key: "/survei",
      label: menuLabel("Survei ODHIV"),
      icon: <DatabaseFilled />,
      onClick: () => {
        router.push("/survei");
      },
    },
    {
      key: "/media",
      label: menuLabel("Media"), //"Media",
      icon: <DatabaseFilled />,
      onClick: () => {
        router.push("/media");
      },
    },
    {
      key: "/contact",
      label: menuLabel("Kontak"), //"Kontak",
      icon: <DatabaseFilled />,
      onClick: () => {
        router.push("/contact");
      },
    },
  ];

  return sidebarMenu;
};
