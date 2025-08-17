import { Flex, Form, Table, Tabs, TabsProps } from "antd";
import { MedicalHistoryColumns } from "./colums-drug";
import { ControllHistoryColumns } from "./columns-controll";
import {
  ControllHistoryDataModel,
  ControllHistoryPayloadCreateModel,
} from "@/app/models/petugas-lapangan/controll-history";
import {
  MedicationHistoryDataModel,
  MedicationHistoryPayloadCreateModel,
} from "@/app/models/petugas-lapangan/medical-history";
import { useState } from "react";
import CustomButton from "@/app/components/common/custom-button";
import { PlusOutlined } from "@ant-design/icons";
import ControllHistoryModal from "@/app/components/common/petugas-lapangan/modal/controll-history";
import MedicalHistoryModal from "@/app/components/common/petugas-lapangan/modal/medical-history";
import {
  useMedicationHistories,
  useMedicationHistory,
} from "@/app/hooks/petugas-lapangan/medical-history";
import {
  useControllHistories,
  useControllHistory,
} from "@/app/hooks/petugas-lapangan/controll-history";

export default function TabsColumn({ user_id }: { user_id: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTypeHistory, setSelectedTypeHistory] = useState<string>("");
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [formControllHistory] = Form.useForm<ControllHistoryDataModel>();
  const [formMedicalHistory] = Form.useForm<MedicationHistoryDataModel>();
  const [selectedControllHistory, setSelectedControllHistory] =
    useState<ControllHistoryDataModel | null>(null);
  const [selectedMedicalHistory, setSelectedMedicalHistory] =
    useState<MedicationHistoryDataModel | null>(null);

  const {
    data: medicationHistory,
    onCreate: createMedicalHistory,
    onCreateLoading: loadingCreateMedicalHistory,
    onDelete: deleteMedicalHistory,
  } = useMedicationHistories({
    queryString: `patient_id=${user_id}`,
  });

  const {
    onUpdate: updateMedicalHistory,
    onUpdateLoading: loadingUpdateMedicalHistory,
    onUpdateStatus: updateMedicalHistoryStatus,
  } = useMedicationHistory({
    id: selectedMedicalHistory?.id || "",
  });

  const {
    data: controllHistory,
    onCreate: createControllHistory,
    onCreateLoading: loadingCreateControllHistory,
    onDelete: deleteControllHistory,
  } = useControllHistories({
    queryString: `patient_id=${user_id}`,
  });

  const {
    onUpdate: updateControllHistory,
    onUpdateLoading: loadingUpdateControllHistory,
    onUpdateStatus: updateControllHistoryStatus,
  } = useControllHistory({
    id: selectedControllHistory?.id || "",
  });

  const openModalWithTypeHistory = (typeHistory: string) => {
    setSelectedTypeHistory(typeHistory);
    setModalType("create");
    setModalOpen(true);

    if (typeHistory === "controll-history") {
      setSelectedControllHistory(null);
      formControllHistory.resetFields();
    } else if (typeHistory === "medical-history") {
      setSelectedMedicalHistory(null);
      formMedicalHistory.resetFields();
    }
  };

  // const handleEditControllHistory = (id: string) => {
  //   console.log(id);
  //   const toEdit = controllHistory!.find((c) => c.id === id);
  //   if (toEdit) {
  //     setSelectedTypeHistory("controll-history");
  //     formControllHistory.setFieldsValue(toEdit);
  //     setSelectedControllHistory(toEdit);
  //     setModalType("update");
  //     setModalOpen(true);
  //     console.log(toEdit);
  //   }
  // };

  // const handleEditMedicalHistory = (id: string) => {
  //   console.log(id);
  //   const toEdit = medicationHistory!.find((c) => c.id === id);
  //   if (toEdit) {
  //     setSelectedTypeHistory("medical-history");
  //     formMedicalHistory.setFieldsValue(toEdit);
  //     setSelectedMedicalHistory(toEdit);
  //     setModalType("update");
  //     setModalOpen(true);
  //     console.log(toEdit);
  //   }
  // };

  const columnsDrug = MedicalHistoryColumns({
    onDelete: (id) => {
      deleteMedicalHistory(id);
    },
    onUpdateStatus: (id, currentStatus) => {
      updateMedicalHistoryStatus({ id, status: !currentStatus });
    },
  });

  const columnsControll = ControllHistoryColumns({
    onDelete: (id) => {
      deleteControllHistory(id);
    },
    onUpdateStatus: (id, currentStatus) => {
      updateControllHistoryStatus({ id, status: !currentStatus });
    },
  });

  const handleFinishControll = async (
    values: ControllHistoryPayloadCreateModel
  ) => {
    if (modalType === "create") {
      const payload = {
        ...values,
        patient_id: user_id,
      };

      await createControllHistory(payload);
    } else if (selectedControllHistory?.id) {
      const payload = {
        ...values,
        patient_id: user_id,
      };
      await updateControllHistory({ id: selectedControllHistory.id, payload });
    }
    formControllHistory.resetFields();
    setModalType("create");
    setModalOpen(false);
  };

  const handleFinishMedicalHistory = async (
    values: MedicationHistoryPayloadCreateModel
  ) => {
    if (modalType === "create") {
      const payload = {
        ...values,
        patient_id: user_id,
      };

      await createMedicalHistory(payload);
    } else if (selectedMedicalHistory?.id) {
      const payload = {
        ...values,
        patient_id: user_id,
      };
      await updateMedicalHistory({
        id: selectedMedicalHistory?.id,
        payload,
      });
    }
    formMedicalHistory.resetFields();
    setModalType("create");
    setModalOpen(false);
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ fontWeight: 700, color: "#C30010" }}>
          Riwayat Kontrol
        </span>
      ),
      children: (
        <div style={{ width: "100%" }}>
          <Flex justify="end" style={{ marginBottom: 16 }}>
            <CustomButton
              title="Tambah Kontrol"
              icon={<PlusOutlined />}
              onClick={() => openModalWithTypeHistory("controll-history")}
            />
          </Flex>
          <Table
            columns={columnsControll}
            dataSource={controllHistory}
            pagination={false}
            rowKey="id"
            bordered
            style={{ width: "100%" }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: <span style={{ fontWeight: 700 }}>Riwayat Pengambilan Obat</span>,
      children: (
        <div style={{ width: "100%" }}>
          <Flex justify="end" style={{ marginBottom: 16 }}>
            <CustomButton
              title="Tambah Pengambilan Obat"
              icon={<PlusOutlined />}
              onClick={() => openModalWithTypeHistory("medical-history")}
            />
          </Flex>
          <Table
            columns={columnsDrug}
            dataSource={medicationHistory}
            pagination={false}
            rowKey="id"
            bordered
            style={{ width: "100%" }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={tabItems} />
      {selectedTypeHistory === "controll-history" ? (
        <ControllHistoryModal
          key={modalType + (selectedControllHistory?.id || "create")}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedTypeHistory("");
            setModalType("create");
            formControllHistory.resetFields();
          }}
          form={formControllHistory}
          type={modalType}
          handleFinish={handleFinishControll}
          initialValues={selectedControllHistory || undefined}
          loadingCreate={loadingCreateControllHistory}
          loadingUpdate={loadingUpdateControllHistory}
        />
      ) : selectedTypeHistory === "medical-history" ? (
        <MedicalHistoryModal
          key={modalType + (selectedMedicalHistory?.id || "create")}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedTypeHistory("");
            setModalType("create");
            formMedicalHistory.resetFields();
          }}
          form={formMedicalHistory}
          type={modalType}
          handleFinish={handleFinishMedicalHistory}
          initialValues={selectedMedicalHistory || undefined}
          loadingCreate={loadingCreateMedicalHistory}
          loadingUpdate={loadingUpdateMedicalHistory}
        />
      ) : null}
    </>
  );
}
