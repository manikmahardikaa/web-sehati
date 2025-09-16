import { Avatar, Dropdown, Layout, Typography, Menu, Modal } from "antd";
import { MainBreadcrumb } from "@/app/components/common/breadcrumb";
import { SiderProgramWilayah } from "../../sider/program-wilayah";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import getInitials from "@/app/utils/username-helper";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Header, Content, Footer } = Layout;

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

const showConfirmLogout = async () => {
  Modal.confirm({
    title: "Logout",
    content: "Apakah anda yakin ingin logout?",
    okText: "Logout",
    okType: "danger",
    onOk: async () => {
      await signOut({ callbackUrl: "/login" });
    },
  });
};



export default function ProgramWilayahLayout({
  children,
  username,
  userProfilePic,
}: {
  children: React.ReactNode;
  username: string;
  userProfilePic?: string;
}) {
  const router = useRouter();
   const [collapsed, setCollapsed] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={showConfirmLogout}
      >
        Logout
      </Menu.Item>
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => router.push("/program-wilayah/dashboard/profile")}
      >
        Profile
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <SiderProgramWilayah collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout style={{ ...innerLayoutStyle, marginLeft: collapsed ? 80 : 300 }}>
        <Header style={headerStyle}>
          {/* Tambahkan elemen header di sini jika perlu */}
          <div style={{ padding: 24, flex: 1 }}>
            <MainBreadcrumb />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              minWidth: 240,
              justifyContent: "flex-end",
            }}
          >
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <Avatar
                  size={50}
                  src={userProfilePic || undefined} // undefined kalau kosong, biar pakai fallback
                  style={{
                    border: "2px solid #1890ff",
                    background: "#e6f7ff",
                    color: "#1890ff",
                    fontWeight: 700,
                    fontSize: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!userProfilePic && getInitials(username)}
                </Avatar>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginRight: 15,
                  }}
                >
                  <Typography.Text strong style={{ fontSize: 15 }}>
                    {username}
                  </Typography.Text>
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: 14, marginTop: 0 }}
                  >
                    Pemegang Program Wilayah
                  </Typography.Text>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={contentStyle}>
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center", background: "#fff" }}>
          {/* Tambahkan isi footer di sini jika perlu */}
        </Footer>
      </Layout>
    </Layout>
  );
}
