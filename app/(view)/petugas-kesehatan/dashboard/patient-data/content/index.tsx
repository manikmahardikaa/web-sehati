import { usePatients } from "@/app/hooks/petugas-kesehatan/patient";
import { PatientColumns } from "./columns";
import { Flex, Table } from "antd";
import { PatientDataModel } from "@/app/models/petugas-kesehatan/patient";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useState } from "react";
import { PatientDetailPDF } from "@/app/components/common/petugas-kesehatan/file-pdf/patient-detail-pdf";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import SearchBar from "@/app/components/common/search-bar";

export default function Content() {
  const router = useRouter();
  const { data } = usePatients({});
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleDownloadPdf = async (patient: PatientDataModel) => {
    const blob = await pdf(
      <PatientDetailPDF detailPatient={patient} />
    ).toBlob();
    saveAs(blob, `Detail_Pasien_${patient.name || "Pasien"}.pdf`);
  };

  const getDetail = (id: string) => {
    router.push(`/petugas-kesehatan/dashboard/patient-data/${id}`);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredPatient = (data || []).filter((patient) =>
    patient.name.toLowerCase().includes(searchKeyword)
  );

  const columns = PatientColumns({
    onDetail: (id: string) => getDetail(id),
    onDownload: (patient: PatientDataModel) => handleDownloadPdf(patient),
  });
  return (
    <div>
      <Flex justify="space-between" style={{ marginBottom: 16 }}>
        <Title level={4}>Data Pasien</Title>
        <SearchBar onSearch={handleSearch} />
      </Flex>
      <Table columns={columns} dataSource={filteredPatient} rowKey="id" />
    </div>
  );
}
