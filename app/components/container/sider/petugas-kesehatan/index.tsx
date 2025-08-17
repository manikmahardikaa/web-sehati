import { SidebarMenuPetugasKesehatan } from "@/app/data/petugas-kesehatan/sidebar-data";
import { Divider, Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SiderPetugasKesehatan = ({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}) => {
  const sidebarMenu = SidebarMenuPetugasKesehatan();
  const pathname = usePathname();
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
      onCollapse={onCollapse}
      // style={{
      //   backgroundColor: "#fff", // dark sidebar
      // }}
      width={300}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        overflow: "auto",
        backgroundColor: "#fff",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo Area */}
      <div
        style={{
          height: collapsed ? 30 : 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 8,
          margin: 16,
          cursor: "pointer",
          transition: "all 0.3s ease",
          padding: 0,
        }}
      >
        <Image
          src={
            collapsed
              ? "/assets/images/logo-collapsed.png"
              : "/assets/images/logo.png"
          }
          alt="Logo"
          preview={false}
          width={collapsed ? 80 : 120}
          height={collapsed ? 80 : 120}
          style={{
            objectFit: "contain",
            transition: "all 0.3s ease",
            // hapus margin/marginLeft
            display: "block",
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
