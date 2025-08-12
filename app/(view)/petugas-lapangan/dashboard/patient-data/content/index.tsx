import { usePatient, usePatients } from "@/app/hooks/petugas-lapangan/patient";
import {
  PatientDataModel,
  PatientPayloadCreateModel,
} from "@/app/models/petugas-lapangan/patient";
import { Flex, Form, Table } from "antd";
import { useCallback, useMemo, useState } from "react";
import { PatientColumns } from "./columns";
import Title from "antd/es/typography/Title";
import SearchBar from "@/app/components/common/search-bar";
import CustomButton from "@/app/components/common/custom-button";
import { PlusOutlined } from "@ant-design/icons";
import PatientModal from "@/app/components/common/petugas-lapangan/modal/patient";
import { useAuth } from "@/app/utils/useAuth";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function PatientDataContent() {
  const [form] = Form.useForm<PatientDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [selectedPatient, setSelectedPatient] =
    useState<PatientDataModel | null>(null);

  const [searchKeyword, setSearchKeyword] = useState("");

  const router = useRouter();

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const {
    data: patients = [],
    onCreate: createPatient,
    onCreateLoading: createPatientLoading,
    onDelete: deletePatient,
  } = usePatients({});

  const filteredPatient = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchKeyword)
  );
  const { onUpdate: updatePatient, onUpdateLoading: updatePatientLoading } =
    usePatient({ id: selectedPatient?.id ?? "" });

  const { user_id } = useAuth();

  const handleEdit = useCallback(
    (id: string) => {
      const toEdit = patients.find((c) => c.id === id);
      if (toEdit) {
        form.setFieldsValue(toEdit);
        setSelectedPatient(toEdit);
        setModalType("update");
        setModalOpen(true);
      }
      console.log(toEdit);
    },
    [patients, form]
  );

  const handleDetail = useCallback(
    (id: string) => {
      router.push(`/petugas-lapangan/dashboard/patient-data/${id}`);
    },
    [router]
  );

  const columns = useMemo(
    () =>
      PatientColumns({
        onDelete: deletePatient,
        onEdit: handleEdit,
        onDetail: handleDetail,
      }),
    [deletePatient, handleEdit, handleDetail] // Tambahkan handleDetail di depedency array
  );

  const handleFinish = useCallback(
    async (values: PatientPayloadCreateModel) => {
      const payload = {
        ...values,
        petugas_lapangan_id: user_id ?? "",
        birth_date: values.birth_date
          ? dayjs(values.birth_date).toDate().toISOString()
          : "",
      };
      if (modalType === "create") {
        await createPatient(payload);
      } else if (selectedPatient?.id) {
        await updatePatient({ id: selectedPatient.id, payload: payload });
      }
      form.resetFields();
      setSelectedPatient(null);
      setModalOpen(false);
      setModalType("create");
    },
    [
      modalType,
      selectedPatient,
      createPatient,
      updatePatient,
      form,
      setModalOpen,
      user_id,
    ]
  );

  const handleAdd = useCallback(() => {
    form.resetFields();
    setModalType("create");
    setSelectedPatient(null);
    setModalOpen(true);
  }, [form]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    form.resetFields();
    setSelectedPatient(null);
    setModalType("create");
  }, [form]);
  return (
    <div>
      <Title level={4}>Data Pasien</Title>
      <div style={{ marginBottom: 24 }}>
        <Flex justify="space-between">
          <SearchBar onSearch={handleSearch} />
          <CustomButton
            icon={<PlusOutlined />}
            title="Tambah Data Pasien"
            onClick={handleAdd}
          />
        </Flex>
      </div>
      <Table columns={columns} dataSource={filteredPatient} rowKey="id" />
      <PatientModal
        open={modalOpen}
        onClose={handleCloseModal}
        handleFinish={handleFinish}
        loadingCreate={createPatientLoading}
        loadingUpdate={updatePatientLoading}
        form={form}
        type={modalType}
        initialValues={selectedPatient!}
      />
    </div>
  );
}
