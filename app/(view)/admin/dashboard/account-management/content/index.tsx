import Title from "antd/es/typography/Title";
import { TabsUser } from "./tabs-colums";
import { useUsers } from "@/app/hooks/admin/user";

export default function ManagementAccountContent() {
  const { data: userData } = useUsers({});

  return (
    <div>
      <div>
        <Title level={4}>Manajemen Akun Pengguna</Title>
      </div>
      <div>
        <TabsUser data={userData ?? []} />
      </div>
    </div>
  );
}
