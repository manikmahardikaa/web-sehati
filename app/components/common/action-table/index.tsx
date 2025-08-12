import {
  CheckCircleFilled,
  DeleteFilled,
  EditFilled,
  FilePdfOutlined,
  FundOutlined,
} from "@ant-design/icons";
import { Flex, Tooltip } from "antd";
import ModalConfirm from "../modal-confirm";

export default function ActionTable({
  title,
  description,
  actions,
  onEdit,
  onDetail,
  id,
  type,
  onDelete,
  onUpdateStatus,
  onDownload,
}: {
  title: string;
  actions: string;
  description: string;
  id: string;
  type?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDetail?: (id: string) => void;
  onUpdateStatus?: () => void;
  onDownload?: (id: string) => void;
}) {
  return (
    <div>
      <Flex gap={8}>
        {type === "detail-patient" && (
          <Tooltip title="Detail">
            <span
              style={{
                backgroundColor: "#1677ff",
                padding: "8px",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={onUpdateStatus}
            >
              <CheckCircleFilled />
            </span>
          </Tooltip>
        )}
        {type !== "detail-patient-program-wilayah" && type !== "report" && (
          <>
            <Tooltip title="Edit">
              <span
                style={{
                  backgroundColor: "#1677ff",
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => onEdit && onEdit(id)}
              >
                <EditFilled />
              </span>
            </Tooltip>
            <Tooltip title="Delete">
              <span
                style={{
                  backgroundColor: "#d93025",
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <DeleteFilled
                  onClick={() => {
                    ModalConfirm({
                      title: title,
                      description: description,
                      actions: actions,
                      onOk: () => onDelete && onDelete(id),
                    });
                  }}
                />
              </span>
            </Tooltip>
          </>
        )}
        {type === "patient" && (
          <Tooltip title="Detail">
            <span
              style={{
                backgroundColor: "#1677ff",
                padding: "8px",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => onDetail && onDetail(id)}
            >
              <FundOutlined />
            </span>
          </Tooltip>
        )}
        {type === "detail-patient-program-wilayah" && (
          <>
            <Tooltip title="Detail">
              <span
                style={{
                  backgroundColor: "#1677ff",
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => onDetail && onDetail(id)}
              >
                <FundOutlined />
              </span>
            </Tooltip>
            <Tooltip title="Download">
              <span
                style={{
                  backgroundColor: "#1677ff",
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => onDownload && onDownload(id)}
              >
                <FilePdfOutlined />
              </span>
            </Tooltip>
          </>
        )}
        {type === "report" && (
          <Tooltip title="Delete">
            <span
              style={{
                backgroundColor: "#d93025",
                padding: "8px",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <DeleteFilled
                onClick={() => {
                  ModalConfirm({
                    title: title,
                    description: description,
                    actions: actions,
                    onOk: () => onDelete && onDelete(id),
                  });
                }}
              />
            </span>
          </Tooltip>
        )}
      </Flex>
    </div>
  );
}
