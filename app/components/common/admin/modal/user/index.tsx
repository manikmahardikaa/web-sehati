import { Modal } from "antd";

import { FormInstance } from "antd";
import FormUser from "../../form/user";
import { UserDataModel, UserFormModel } from "@/app/models/admin/user";
import { Role } from "@prisma/client";

export default function UserModal({
  open,
  onClose,
  handleFinish,
  loadingCreate,
  loadingUpdate,
  form,
  type,
  initialValues,
  process,
}: {
  open: boolean;
  onClose: () => void;
  handleFinish: (values: UserFormModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  form: FormInstance<UserDataModel>;
  type: "create" | "update";
  initialValues?: UserFormModel;
  process?: Role
}) {
  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah User" : "Edit User"}
      footer={null}
      onCancel={onClose}
    >
      <FormUser
        onFinish={handleFinish}
        loadingCreate={loadingCreate}
        loadingUpdate={loadingUpdate}
        form={form}
        type={type}
        process={process}
        initialValues={initialValues}
      />
    </Modal>
  );
}
