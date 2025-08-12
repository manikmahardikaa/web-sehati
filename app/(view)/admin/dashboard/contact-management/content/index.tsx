"use client";

import { Flex, Form, Table, Typography } from "antd";
import { useState, useMemo } from "react";
import { PlusOutlined } from "@ant-design/icons";

import SearchBar from "@/app/components/common/search-bar";
import CustomButton from "@/app/components/common/custom-button";
import FilterContactButton from "@/app/components/common/admin/filter-button";
import ContactModal from "@/app/components/common/admin/modal/contact";
import { ContactColumns } from "./columns";
import { ContactDataModel, ContactFormModel } from "@/app/models/admin/contact";
import { useContacts, useContact } from "@/app/hooks/admin/contact";

const { Title } = Typography;

export default function ContactManagementContent() {
  const [form] = Form.useForm<ContactDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [selectedContact, setSelectedContact] =
    useState<ContactDataModel | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(undefined);

  const {
    data: contacts = [],
    onCreate: createContact,
    onCreateLoading: createLoading,
    onDelete: deleteContact,
  } = useContacts({});

  const { onUpdate, onUpdateLoading: updateLoading } = useContact({
    id: selectedContact?.id ?? "",
  });

  // Edit handler
  const handleEdit = (id: string) => {
    const toEdit = contacts.find((c) => c.id === id);
    if (toEdit) {
      form.setFieldsValue(toEdit);
      setSelectedContact(toEdit);
      setModalType("update");
      setModalOpen(true);
    }
  };

  const columns = ContactColumns({
    onEdit: handleEdit,
    onDelete: deleteContact,
  });

  // Submit modal
  const handleFinish = async (values: ContactFormModel) => {
    if (modalType === "create") {
      await createContact(values);
    } else if (selectedContact) {
      await onUpdate({ id: selectedContact.id, payload: values });
    }
    form.resetFields();
    setSelectedContact(null);
    setModalOpen(false);
    setModalType("create");
  };

  // Search & filter handlers
  const handleSearch = (val: string) => setSearchTerm(val.trim().toLowerCase());
  const handleFilter = (dept?: string) => setSelectedDepartment(dept);

  // Filter data berdasarkan search + departemen tunggal
  const filteredContacts = useMemo(() => {
    return contacts
      .filter((c) => {
        if (!searchTerm) return true;
        const name = c.name?.toLowerCase() ?? "";
        return name.includes(searchTerm) 
      })
      .filter((c) => {
        if (!selectedDepartment) return true;
        return c.departement.name === selectedDepartment;
      });
  }, [contacts, searchTerm, selectedDepartment]);

  return (
    <>
      <Title level={4}>Manajemen Kontak</Title>

      <Flex justify="space-between" style={{ marginBottom: 16 }}>
        <SearchBar onSearch={handleSearch} />
        <Flex gap={10}>
          <CustomButton
            title="Tambah Kontak"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setSelectedContact(null);
              setModalType("create");
              setModalOpen(true);
            }}
          />
          <FilterContactButton data={contacts} onFilter={handleFilter} />
        </Flex>
      </Flex>

      <Table
        columns={columns}
        dataSource={filteredContacts}
        pagination={{ pageSize: 8 }}
        rowKey="id"
      />

      <ContactModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          form.resetFields();
          setSelectedContact(null);
          setModalType("create");
        }}
        form={form}
        type={modalType}
        initialValues={selectedContact ?? undefined}
        handleFinish={handleFinish}
        loadingCreate={createLoading}
        loadingUpdate={updateLoading}
      />
    </>
  );
}
