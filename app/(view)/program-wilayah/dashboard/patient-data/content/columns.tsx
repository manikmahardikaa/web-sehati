import ActionTable from "@/app/components/common/action-table";
import { PatientDataModel } from "@/app/models/program-wilayah/patient";
import { TableProps } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";

export const PatientColumns = ({
  onDetail,
  onDownload,
}: {
  onDetail: (id: string) => void;
  onDownload: (patient: PatientDataModel) => void;
}): TableProps<PatientDataModel>["columns"] => [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    render: (_: string, __: PatientDataModel, index: number) => index + 1,
  },
  {
    title: "Nama Pasien",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Alamat",
    dataIndex: "street",
    key: "street",
  },
  {
    title: "Tanggal Lahir",
    dataIndex: "birth_date",
    key: "birth_date",
    render: (date: string) => dayjs(date).format("DD MMMM YYYY"),
  },
  {
    title: "No Whatsapp",
    dataIndex: "no_whatsapp",
    key: "no_whatsapp",
  },
  {
    title: "Tahun Diagnosa",
    dataIndex: "year_of_diagnosis",
    key: "year_of_diagnosis",
  },
  {
    title: "Jenis Kelamin",
    dataIndex: "gender",
    key: "gender",
    render: (gender: string) =>
      gender === "LAKI_LAKI" ? "Laki-laki" : "Perempuan",
  },
  {
    title: "Aksi",
    key: "actions",
    render: (record: PatientDataModel) => (
      <ActionTable
        title="Berita"
        description={record.name ? record.name : ""}
        actions="delete"
        type="detail-patient-program-wilayah"
        id={record.id}
        onDetail={() => onDetail(record.id)}
        onDownload={() => onDownload(record)}
      />
    ),
  },
];
