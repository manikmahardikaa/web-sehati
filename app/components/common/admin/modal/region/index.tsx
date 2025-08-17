import { RegionDataModel, RegionFormModel } from "@/app/models/admin/region";
import { Modal } from "antd";

import { FormInstance } from "antd";
import FormRegion from "../../form/region";

export default function RegionModal({
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
  handleFinish: (values: RegionFormModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<RegionDataModel>;
  type: "create" | "update";
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Kontak" : "Edit Kontak"}
      footer={null}
      onCancel={onClose}
    >
      <FormRegion
        onFinish={handleFinish}
        loadingCreate={loadingCreate}
        loadingUpdate={loadingUpdate}
        form={form}
        type={type}
      />
    </Modal>
  );
}
