import { PocketBookDataModel } from "@/app/models/admin/pocket-book";
import { FormInstance, Modal } from "antd";
import FormPocketBook from "../../form/pocket-book";

export default function PocketBookModal({
  open,
  onClose,
  handleFinish,
  loadingCreate,
  loadingUpdate,
  form,
  type,
}: {
  open: boolean;
  onClose: () => void;
  handleFinish: (values: PocketBookDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<PocketBookDataModel>;
  type: "create" | "update";
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Buku Saku" : "Edit Buku Saku"}
      footer={null}
      onCancel={onClose}
      width={1000}
    >
      <FormPocketBook
        onFinish={handleFinish}
        loadingCreate={loadingCreate}
        loadingUpdate={loadingUpdate}
        form={form}
        type={type}
      />
    </Modal>
  );
}