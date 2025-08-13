// PatientDataContent.tsx
import { usePatient, usePatients } from "@/app/hooks/petugas-lapangan/patient";
import {
  PatientDataModel,
  PatientFormModel,
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
  // ❗ Form khusus untuk PatientFormModel
  const [form] = Form.useForm<PatientFormModel>();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [selectedPatient, setSelectedPatient] =
    useState<PatientDataModel | null>(null);

  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (keyword: string) =>
    setSearchKeyword(keyword.trim().toLowerCase());

  const {
    data: patients = [],
    onCreate: createPatient,
    onCreateLoading: createPatientLoading,
    onDelete: deletePatient,
  } = usePatients({});

  const filteredPatient = patients.filter((patient) =>
    (patient.name ?? "").toLowerCase().includes(searchKeyword)
  );

  const { onUpdate: updatePatient, onUpdateLoading: updatePatientLoading } =
    usePatient({ id: selectedPatient?.id ?? "" });

  const { user_id } = useAuth();

  // Map DB -> Form (tanggal jadi dayjs)
  const mapDataToForm = (
    p: PatientDataModel | null
  ): PatientFormModel | undefined => {
    if (!p) return undefined;
    return {
      name: p.name ?? "",
      street: p.street ?? "",
      no_whatsapp: p.no_whatsapp ?? "",
      birth_date: p.birth_date ? dayjs(p.birth_date) : undefined,
      gender: p.gender ?? undefined,
      year_of_diagnosis: p.year_of_diagnosis ?? undefined,
      petugas_lapangan_id: p.petugas_lapangan_id ?? null,
      deletedAt: p.deletedAt ?? null,
      createdAt: p.createdAt ?? undefined,
      updatedAt: p.updatedAt ?? undefined,
      controllHistory: p.controllHistory ?? [],
      medicationHistory: p.medicationHistory ?? [],
    };
  };

  const handleEdit = useCallback(
    (id: string) => {
      const toEdit = patients.find((c) => c.id === id) ?? null;
      setSelectedPatient(toEdit);

      const formValues = mapDataToForm(toEdit);
      form.resetFields();
      if (formValues) form.setFieldsValue(formValues);

      setModalType("update");
      setModalOpen(true);
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
    [deletePatient, handleEdit, handleDetail]
  );

  // Terima payload dari Form (sudah ISO); tinggal set petugas_lapangan_id & kirim
  const handleFinish = useCallback(
    async (values: PatientPayloadCreateModel) => {
      const payload: PatientPayloadCreateModel = {
        name: values.name,
        street: values.street,
        no_whatsapp: values.no_whatsapp,
        birth_date: values.birth_date, // sudah ISO dari FormPatient
        gender: values.gender,
        year_of_diagnosis: values.year_of_diagnosis,
        petugas_lapangan_id: user_id ?? null, // pastikan null, bukan undefined
      };

      if (modalType === "create") {
        await createPatient(payload);
      } else if (selectedPatient?.id) {
        await updatePatient({ id: selectedPatient.id, payload });
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
        initialValues={mapDataToForm(selectedPatient)}
      />
    </div>
  );
}
