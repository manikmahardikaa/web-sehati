"use client";

import { Flex, Form, Table, Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { UserColumns } from "./columns";
import CustomButton from "@/app/components/common/custom-button";
import SearchBar from "@/app/components/common/search-bar";
import { useUser, useUsers } from "@/app/hooks/admin/user";
import { Role } from "@prisma/client";
import UserModal from "@/app/components/common/admin/modal/user";
import { UserDataModel, UserFormModel } from "@/app/models/admin/user";

interface TabsUserProps {
  data: UserDataModel[];
}

export const TabsUser = ({ data }: TabsUserProps) => {
  const [form] = Form.useForm<UserDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(
    Role.PETUGAS_KESEHATAN
  );
  const [selectedUser, setSelectedUser] = useState<UserDataModel | null>(null);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    onCreate: createUser,
    loading: createUserLoading,
    onDelete: deleteUser,
  } = useUsers({});
  const { onUpdate: updateUser, onUpdateLoading: updateUserLoading } = useUser({
    id: selectedUser?.id ?? "",
  });

  const handleFinish = async (values: UserFormModel) => {
    const payload = { ...values, role: selectedRole };

    if (modalType === "create") {
      await createUser(payload);
    } else if (selectedUser?.id) {
      await updateUser({ id: selectedUser.id, payload });
    }

    form.resetFields();
    setSelectedUser(null);
    setModalOpen(false);
    setModalType("create");
  };

  const openModalWithRole = (role: Role) => {
    setSelectedRole(role);
    setSelectedUser(null);
    setModalType("create");
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const userToEdit = data.find((user) => user.id === id);
    if (userToEdit) {
      form.setFieldsValue(userToEdit);
      setSelectedUser(userToEdit);
      setSelectedRole(userToEdit.role);
      setModalType("update");
      setModalOpen(true);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim().toLowerCase());
  };

  // const userColumns = UserColumns({
  //   onDelete: (id) => deleteUser(id),
  //   onEdit: handleEdit,
  // });

  const filterByRoleAndSearch = (role: Role) =>
    data
      .filter((user) => user.role === role)
      .filter((user) => {
        if (!searchTerm) return true;
        const name = user.name?.toLowerCase() ?? "";
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
      });

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Petugas Kesehatan",
      children: (
        <>
          <Flex justify="space-between" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={handleSearch} />
            <CustomButton
              title="Tambah Akun"
              icon={<PlusOutlined />}
              onClick={() => openModalWithRole(Role.PETUGAS_KESEHATAN)}
            />
          </Flex>
          <Table
            columns={UserColumns({
              onDelete: (id) => deleteUser(id),
              onEdit: handleEdit,
              role: Role.PETUGAS_KESEHATAN,
            })}
            dataSource={filterByRoleAndSearch(Role.PETUGAS_KESEHATAN)}
            pagination={{ pageSize: 8 }}
            rowKey="id"
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Pemegang Program Wilayah",
      children: (
        <>
          <Flex justify="space-between" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={handleSearch} />
            <CustomButton
              title="Tambah Akun"
              icon={<PlusOutlined />}
              onClick={() => openModalWithRole(Role.PROGRAM_WILAYAH)}
            />
          </Flex>
          <Table
            columns={UserColumns({
              onDelete: (id) => deleteUser(id),
              onEdit: handleEdit,
              role: Role.PROGRAM_WILAYAH,
            })}
            dataSource={filterByRoleAndSearch(Role.PROGRAM_WILAYAH)}
            pagination={{ pageSize: 8 }}
            rowKey="id"
          />
        </>
      ),
    },
    {
      key: "3",
      label: "Petugas Lapangan",
      children: (
        <>
          <Flex justify="space-between" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={handleSearch} />
            <CustomButton
              title="Tambah Akun"
              icon={<PlusOutlined />}
              onClick={() => openModalWithRole(Role.PETUGAS_LAPANGAN)}
            />
          </Flex>
          <Table
            columns={UserColumns({
              onDelete: (id) => deleteUser(id),
              onEdit: handleEdit,
              role: Role.PETUGAS_LAPANGAN,
            })}
            dataSource={filterByRoleAndSearch(Role.PETUGAS_LAPANGAN)}
            pagination={{ pageSize: 8 }}
            rowKey="id"
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={tabItems} />
      <UserModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          form.resetFields();
          setSelectedUser(null);
          setModalType("create");
        }}
        handleFinish={handleFinish}
        loadingCreate={createUserLoading}
        loadingUpdate={updateUserLoading}
        form={form}
        process={selectedRole}
        type={modalType}
        initialValues={selectedUser ?? undefined}
      />
    </>
  );
};
