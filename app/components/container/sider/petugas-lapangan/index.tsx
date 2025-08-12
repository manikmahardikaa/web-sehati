import { SidebarMenuPeutugasLapangan } from "@/app/data/petugas-lapangan/sidebar-data";
import { Divider, Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SiderPetugasLapangan = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const sidebarMenu = SidebarMenuPeutugasLapangan();
  const pathname = usePathname();
  const router = useRouter();
  const [selectActiveKey, setActiveKey] = useState<string>("");

  useEffect(() => {
    const path = pathname
      .split("/")
      .filter((_item, index) => index < 4)
      .join("/");
    setActiveKey(path);
  }, [pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      // style={{
      //   backgroundColor: "#fff", // dark sidebar
      // }}
      width={300}
    >
      {/* Logo Area */}
      <div
        style={{
          height: 64,
          margin: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 8,
          padding: 8,
          transition: "all 0.3s ease",
        }}
        onClick={() => router.push("/")}
      >
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          preview={false}
          width={collapsed ? 32 : "auto"}
          height={collapsed ? 32 : "auto"}
          style={{
            height: 32,
            transition: "all 0.3s ease",
            objectFit: "contain",
            marginLeft: collapsed ? 0 : 8,
          }}
        />
      </div>

      <Divider />

      {/* Menu Area */}
      <Menu
        items={sidebarMenu}
        selectedKeys={[selectActiveKey]}
        mode="inline"
        style={{
          borderRight: 0,
          backgroundColor: "#fff",
        }}
      />
    </Sider>
  );
};
