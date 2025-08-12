import { FormInstance, Modal } from "antd";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
import FormControllHistory from "../../form/controll-history";

export default function ControllHistoryModal({
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
  handleFinish: (values: ControllHistoryDataModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<ControllHistoryDataModel>;
  type: "create" | "update";
  initialValues?: ControllHistoryDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Data" : "Edit Data"}
      footer={null}
      onCancel={onClose}
    >
      <FormControllHistory
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
