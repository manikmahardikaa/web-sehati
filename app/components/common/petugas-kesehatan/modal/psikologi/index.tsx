import { Modal } from "antd";

import { FormInstance } from "antd";
import FormPsikologi from "../../form/psikologi";
import {
  PsikologiDataModel,
  PsikologiPayloadCreateModel,
} from "@/app/models/petugas-kesehatan/psikologi";

export default function PsikologiModal({
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
  handleFinish: (values: PsikologiPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<PsikologiDataModel>;
  type: "create" | "update";
  initialValues?: PsikologiDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Kontak" : "Edit Kontak"}
      footer={null}
      onCancel={onClose}
    >
      <FormPsikologi
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
