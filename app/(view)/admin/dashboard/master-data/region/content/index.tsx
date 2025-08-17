import CustomButton from "@/app/components/common/custom-button";
import SearchBar from "@/app/components/common/search-bar";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Form, Table } from "antd";
import Title from "antd/es/typography/Title";
import { RegionColumns } from "./columns";
import { useRegion, useRegions } from "@/app/hooks/admin/region";
import { RegionDataModel, RegionFormModel, RegionPayloadUpdateModel } from "@/app/models/admin/region";
import { useState } from "react";
import RegionModal from "@/app/components/common/admin/modal/region";

export default function RegionManagementContent() {
  const [form] = Form.useForm<RegionDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<RegionDataModel | null>(
    null
  );

  const {
    data: regions = [],
    onCreate: createRegion,
    onCreateLoading: createLoading,
    onDelete: deleteRegion,
  } = useRegions({});

  const { onUpdate: updateRegion, onUpdateLoading: updateLoading } = useRegion({
    id: selectedRegion?.id ?? "",
  });

  const handleEdit = (id: string) => {
    const toEdit = regions.find((c) => c.id === id);
    if (toEdit) {
      form.setFieldsValue(toEdit);
      setSelectedRegion(toEdit);
      setModalType("update");
      setModalOpen(true);
    }
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(searchKeyword)
  );

  const handleFinish = async (values: RegionFormModel) => {
    if (modalType === "create") {
      await createRegion(values);
    } else if (selectedRegion?.id) {
      const existingIds = selectedRegion.subregions?.map((s) => s.id) ?? [];
      const updatedIds =
        values.subregions?.map((s) => s.id).filter(Boolean) ?? [];

      const deletedIds = existingIds.filter((id) => !updatedIds.includes(id));

      const payload: RegionPayloadUpdateModel = {
        name: values.name,
        subregions: {
          deleteMany:
            deletedIds.length > 0 ? { id: { in: deletedIds } } : undefined,
          upsert: values.subregions?.map((subregion) => ({
            where: { id: subregion.id ?? "" },
            update: { name: subregion.name },
            create: { name: subregion.name },
          })),
        },
      };

      await updateRegion({ id: selectedRegion.id, payload });
    }

    form.resetFields();
    setSelectedRegion(null);
    setModalOpen(false);
    setModalType("create");
  };

  const columns = RegionColumns({
    onEdit: handleEdit,
    onDelete: (id) => deleteRegion(id),
  });

  return (
    <div>
      <div>
        <Title level={3}>Manajemen Wilayah</Title>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Flex justify="space-between">
          <SearchBar onSearch={handleSearch} />
          <CustomButton
            title="Tambah Wilayah"
            onClick={() => {
              form.resetFields();
              setSelectedRegion(null);
              setModalType("create");
              setModalOpen(true);
            }}
            icon={<PlusOutlined />}
          />
        </Flex>
      </div>

      <div>
        <Table columns={columns} dataSource={filteredRegions} />
      </div>
      <div>
        <RegionModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            form.resetFields();
            setSelectedRegion(null);
            setModalType("create");
          }}
          form={form}
          type={modalType}
          handleFinish={handleFinish}
          loadingCreate={createLoading}
          loadingUpdate={updateLoading}
        />
      </div>
    </div>
  );
}
