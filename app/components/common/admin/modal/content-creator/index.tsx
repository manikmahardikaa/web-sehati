import { FormInstance, Modal } from "antd";
import { ContentCreatorDataModel } from "@/app/models/admin/content-creator";
import FormContentCreator from "../../form/content-creator";

export default function ContentCreatorModal({
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
  handleFinish: (values: ContentCreatorDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<ContentCreatorDataModel>;
  type: "create" | "update";
  initialValues?: ContentCreatorDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Buku Saku" : "Edit Buku Saku"}
      footer={null}
      onCancel={onClose}
      width={1000}
    >
      <FormContentCreator
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
