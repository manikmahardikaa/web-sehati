import { NewsDataModel, NewsPayloadCreateModel } from "@/app/models/petugas-kesehatan/news";
import { Modal } from "antd";

import { FormInstance } from "antd";
import FormNews from "../../form/news";


export default function NewsModal({
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
  handleFinish: (values: NewsPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<NewsDataModel>;
  type: "create" | "update";
  initialValues?: NewsDataModel;
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Berita" : "Edit Berita"}
      footer={null}
      onCancel={onClose}
    >
      <FormNews
        onFinish={handleFinish}
        loadingCreate={loadingCreate}
        loadingUpdate={loadingUpdate}
        form={form}
        type={type}
      />
    </Modal>
  );
}
