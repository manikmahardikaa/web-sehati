import CustomButton from "@/app/components/common/custom-button";
import SearchBar from "@/app/components/common/search-bar";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Form, Table } from "antd";
import Title from "antd/es/typography/Title";
import { PsikologiColumns } from "./columns";
import {
  usePsikologi,
  usePsikologis,
} from "@/app/hooks/petugas-kesehatan/psikologi";
import {
  PsikologiDataModel,
  PsikologiPayloadCreateModel,
} from "@/app/models/petugas-kesehatan/psikologi";
import { useState, useCallback, useMemo } from "react";
import PsikologiModal from "@/app/components/common/petugas-kesehatan/modal/psikologi";

export default function PsikologiDataContent() {
  const [form] = Form.useForm<PsikologiDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [selectedPsikologi, setSelectedPsikologi] =
    useState<PsikologiDataModel | null>(null);
      const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch data dan mutation hooks
  const {
    data: psikologiData = [],
    onCreate: createPsikologi,
    onCreateLoading: createPsikologiLoading,
    onDelete: deletePsikologi,
  } = usePsikologis({});

  const { onUpdate: updatePsikologi, onUpdateLoading: updatePsikologiLoading } =
    usePsikologi({
      id: selectedPsikologi?.id ?? "",
    });

  // Handle buka modal edit
  const handleEdit = useCallback(
    (id: string) => {
      const toEdit = psikologiData.find((c) => c.id === id);
      if (toEdit) {
        form.setFieldsValue(toEdit);
        setSelectedPsikologi(toEdit);
        setModalType("update");
        setModalOpen(true);
      }
    },
    [psikologiData, form]
  );

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredPsikologi = psikologiData.filter((psikolog) =>
    psikolog.name.toLowerCase().includes(searchKeyword)
  );

  // Columns memoized supaya tidak re-render terus
  const columns = useMemo(
    () =>
      PsikologiColumns({
        onDelete: (id: string) => deletePsikologi(id),
        onEdit: handleEdit,
      }),
    [deletePsikologi, handleEdit]
  );

  // Handle create/update submit
  const handleFinish = useCallback(
    async (values: PsikologiPayloadCreateModel) => {
      if (modalType === "create") {
        await createPsikologi(values);
      } else if (selectedPsikologi?.id) {
        await updatePsikologi({ id: selectedPsikologi.id, payload: values });
      }
      form.resetFields();
      setSelectedPsikologi(null);
      setModalOpen(false);
      setModalType("create");
    },
    [
      modalType,
      selectedPsikologi,
      createPsikologi,
      updatePsikologi,
      form,
      setModalOpen,
    ]
  );

  // Handle tambah data
  const handleAdd = useCallback(() => {
    form.resetFields();
    setModalType("create");
    setSelectedPsikologi(null);
    setModalOpen(true);
  }, [form]);

  // Handle tutup modal
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    form.resetFields();
    setSelectedPsikologi(null);
    setModalType("create");
  }, [form]);

  return (
    <div>
      <Title level={4}>Data Psikologi</Title>
      <div style={{ marginBottom: 24 }}>
        <Flex justify="space-between">
          <SearchBar onSearch={handleSearch} />
          <CustomButton
            icon={<PlusOutlined />}
            title="Tambah Data Psikologi"
            onClick={handleAdd}
          />
        </Flex>
      </div>
      <Table columns={columns} dataSource={filteredPsikologi} rowKey="id" />
      <PsikologiModal
        open={modalOpen}
        onClose={handleCloseModal}
        handleFinish={handleFinish}
        loadingCreate={createPsikologiLoading}
        loadingUpdate={updatePsikologiLoading}
        form={form}
        type={modalType}
        initialValues={selectedPsikologi ?? undefined}
      />
    </div>
  );
}
