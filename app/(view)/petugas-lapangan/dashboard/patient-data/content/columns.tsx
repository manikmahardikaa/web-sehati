import ActionTable from "@/app/components/common/action-table";
import { PatientDataModel } from "@/app/models/petugas-lapangan/patient";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { TableProps } from "antd";

export const PatientColumns = ({
  onDelete,
  onEdit,
  onDetail,
}: {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onDetail: (id: string) => void;
}): TableProps<PatientDataModel>["columns"] => {
  return [
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
      title: "Tahun Diagnosa",
      dataIndex: "year_of_diagnosis",
      key: "year_of_diagnosis",
      render: (year: number) => year.toString(),
    },
    {
      title: "No WhatsApp",
      dataIndex: "no_whatsapp",
      key: "no_whatsapp",
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
          title="Pasien"
          description={record.name ? record.name : ""}
          actions="delete"
          type="patient"
          id={record.id}
          onEdit={() => {
            onEdit(record.id);
          }}
          onDelete={() => {
            onDelete(record.id);
          }}
          onDetail={() => {
            onDetail(record.id);
          }}
        />
      ),
    },
  ];
};
