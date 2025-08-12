import CustomButton from "@/app/components/common/custom-button";
import SearchBar from "@/app/components/common/search-bar";
import { useDepartement, useDepartements } from "@/app/hooks/admin/departement";
import { DepartementDataModel } from "@/app/models/admin/departement";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Form, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { DepartementColumns } from "./columns";
import DepartmentModal from "@/app/components/common/admin/modal/departement";

export default function DepartementContent() {
  const [form] = Form.useForm<DepartementDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDepartement, setSelectedDepartement] =
    useState<DepartementDataModel | null>(null);

  const {
    data: departements = [],
    onCreate: createDepartement,
    onCreateLoading: createLoading,
    onDelete: deleteDepartement,
  } = useDepartements({});

  const { onUpdate: updateDepartement, onUpdateLoading: updateLoading } =
    useDepartement({
      id: selectedDepartement?.id ?? "",
    });

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredDepartements = departements.filter((departement) =>
    departement.name.toLowerCase().includes(searchKeyword)
  );

  const handleEdit = (id: string) => {
    const toEdit = departements.find((c) => c.id === id);
    if (toEdit) {
      form.setFieldsValue(toEdit);
      setSelectedDepartement(toEdit);
      setModalType("update");
      setModalOpen(true);
    }
  };

  const columns = DepartementColumns({
    onEdit: handleEdit,
    onDelete: (id) => deleteDepartement(id),
  });

  const handleFinish = async (values: DepartementDataModel) => {
    if (modalType === "create") {
      await createDepartement(values);
    } else if (selectedDepartement?.id) {
      await updateDepartement({ id: selectedDepartement.id, payload: values });
    }
    form.resetFields();
    setSelectedDepartement(null);
    setModalOpen(false);
    setModalType("create");
  };

  return (
    <div>
      <div>
        <Title level={4}>Manajemen Jabatan</Title>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Flex justify="space-between">
          <SearchBar onSearch={handleSearch} />
          <CustomButton
            title="Tambah Jabatan"
            onClick={() => {
              form.resetFields();
              setSelectedDepartement(null);
              setModalType("create");
              setModalOpen(true);
            }}
            icon={<PlusOutlined />}
          />
        </Flex>
      </div>
      <div>
        <Table columns={columns} dataSource={filteredDepartements} />
      </div>
      <div>
        <DepartmentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            form.resetFields();
            setSelectedDepartement(null);
            setModalType("create");
          }}
          form={form}
          type={modalType}
          initialValues={selectedDepartement ?? undefined}
          handleFinish={handleFinish}
          loadingCreate={createLoading}
          loadingUpdate={updateLoading}
        />
      </div>
    </div>
  );
}
