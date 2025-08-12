import { FormInstance, Modal } from "antd";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";
import FormMedicalHistory from "../../form/medical-history";

export default function MedicalHistoryModal({
  open,
  onClose,
  handleFinish,
  loadingCreate,
  loadingUpdate,
  form,
  type,
  initialValues,
}: {
  open: boolean;
  onClose: () => void;
  handleFinish: (values: MedicationHistoryDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<MedicationHistoryDataModel>;
  type: "create" | "update";
  initialValues?: MedicationHistoryDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Data" : "Edit Data"}
      footer={null}
      onCancel={onClose}
    >
      <FormMedicalHistory
        onFinish={handleFinish}
        loadingCreate={loadingCreate}
        loadingUpdate={loadingUpdate}
        form={form}
        type={type}
        initialValues={initialValues}
      />
    </Modal>
  );
}
