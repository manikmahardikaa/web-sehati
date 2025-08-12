import { Modal } from "antd";

import { FormInstance } from "antd";
import { DepartementDataModel } from "@/app/models/admin/departement";
import FormDepartement from "../../form/departement";

export default function DepartmentModal({
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
  handleFinish: (values: DepartementDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<DepartementDataModel>;
  type: "create" | "update";
  initialValues?: DepartementDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Kontak" : "Edit Kontak"}
      footer={null}
      onCancel={onClose}
    >
      <FormDepartement
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
