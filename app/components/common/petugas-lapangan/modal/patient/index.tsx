import {
  PatientDataModel,
  PatientPayloadCreateModel,
} from "@/app/models/petugas-lapangan/patient";
import { FormInstance, Modal } from "antd";
import FormPatient from "../../form/patient";

export default function PatientModal({
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
  handleFinish: (values: PatientPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<PatientDataModel>;
  type: "create" | "update";
  initialValues?: PatientDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Pasien" : "Edit Pasien"}
      footer={null}
      onCancel={onClose}
    >
      <FormPatient
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
