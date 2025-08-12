import { FilmDataModel, FilmPayloadCreateModel } from "@/app/models/admin/film";
import { Modal } from "antd";
import { FormInstance } from "antd";
import FilmStepper from "../../form/film";

export default function FilmModal({
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
  handleFinish: (values: FilmPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<FilmDataModel>;
  type: "create" | "update";
  initialValues?: FilmDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Film Pendek" : "Edit Film Pendek"}
      footer={null}
      onCancel={onClose}
      width={1000}
    >
      <FilmStepper
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
