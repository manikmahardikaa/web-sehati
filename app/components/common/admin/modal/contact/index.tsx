import { Modal } from "antd";

import { FormInstance } from "antd";
import FormContact from "../../form/contact";
import { ContactDataModel, ContactFormModel } from "@/app/models/admin/contact";

export default function ContactModal({
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
  handleFinish: (values: ContactFormModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<ContactDataModel>;
  type: "create" | "update";
  initialValues?: ContactFormModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Kontak" : "Edit Kontak"}
      footer={null}
      onCancel={onClose}
    >
      <FormContact
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
