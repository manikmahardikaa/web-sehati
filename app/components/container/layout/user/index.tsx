import { Layout } from "antd";
import { Fragment, useState } from "react";
import { SiderUser } from "../../sider/user";
import { Content, Header } from "antd/es/layout/layout";
import { MainBreadcrumb } from "@/app/components/common/breadcrumb";

const headerStyle = {
  background: "#fff",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const contentStyle = {
  margin: "24px 16px",
  padding: 24,
  height: "auto",
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const innerLayoutStyle = {
  background: "#f5f5f5",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderUser collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout
          style={{ ...innerLayoutStyle, marginLeft: collapsed ? 80 : 300 }}
        >
          <Header style={headerStyle}>
            {/* Tambahkan elemen header di sini jika perlu */}
            <div style={{ padding: 24 }}>
              <MainBreadcrumb />
            </div>
          </Header>
          <Content style={contentStyle}>
            <div style={{ maxWidth: "100%", overflowX: "auto" }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
