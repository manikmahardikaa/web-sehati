import ActionTable from "@/app/components/common/action-table";
import { PatientDataModel } from "@/app/models/petugas-kesehatan/patient";

import { TableProps } from "antd";

export const PatientColumns = ({
  onDetail,
  onDownload,
}: {
  onDetail: (id: string) => void;
  onDownload: (patient: PatientDataModel) => void;
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
      render: (text: string) => {
        if (!text) return "-";
        return text
          .split(" ")
          .map((word) => word[0] + "*".repeat(word.length - 1))
          .join(" ");
      },
    },
    {
      title: "Alamat",
      dataIndex: "street",
      key: "street",
      render: (text: string) => {
        if (!text) return "-";
        return text
          .split(" ")
          .map((word) => word[0] + "*".repeat(word.length - 1))
          .join(" ");
      },
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "birth_date",
      key: "birth_date",
      render: (text: string) => {
        if (!text) return "-";
        return text
          .split(" ")
          .map((word) => word[0] + "*".repeat(word.length - 1))
          .join(" ");
      },
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
      title: "Wilayah",
      key: "district",
      render: (record: PatientDataModel) => {
        return record.petugas_lapangan.authority?.region?.name;
      },
    },
    {
      title: "Petugas Lapangan",
      key: "name",
      render: (record: PatientDataModel) => {
        return record.petugas_lapangan.name;
      },
    },
    {
      title: "Progam Wilayah",
      key: "name",
      render: (record: PatientDataModel) => {
        return record.petugas_lapangan.authority?.name;
      }
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
};
