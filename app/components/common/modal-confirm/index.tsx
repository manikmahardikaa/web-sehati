import { Modal } from "antd";

export default function ModalConfirm({
  title,
  description,
  actions,
  onOk,
  onCancel,
}: {
  title: string;
  description: string;
  actions: string;
  onOk?: () => void;
  onCancel?: () => void;
}) {
  const modalConfig = Modal.confirm({
    title: "Anda yakin?",
    content: (
      <p>
        Apakah Anda yakin ingin melanjutkan <b>{actions.toUpperCase()}</b> untuk{" "}
        <b>{title.toUpperCase()}</b>: <b>{description}</b>? Tindakan ini tidak
        dapat dibatalkan. Apakah Anda ingin tetap melanjutkan?
      </p>
    ),
    onOk: onOk,
    onCancel: onCancel,
  });

  return modalConfig;
}
