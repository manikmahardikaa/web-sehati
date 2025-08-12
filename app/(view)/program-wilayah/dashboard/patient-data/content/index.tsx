import React, { useState } from "react";
import SearchBar from "@/app/components/common/search-bar";
import { Flex, Table } from "antd";
import Title from "antd/es/typography/Title";
import { PatientColumns } from "./columns";
import { usePatients } from "@/app/hooks/program-wilayah/patient";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

import { PatientDataModel } from "@/app/models/program-wilayah/patient";
import { PatientDetailPDF } from "@/app/components/common/petugas-lapangan/file-pdf/patient-detail-pdf";

export default function PatientDataContent() {
  const router = useRouter();
  const { data } = usePatients({});

  const [searchKeyword, setSearchKeyword] = useState("");

  const getDetail = (id: string) => {
    router.push(`/program-wilayah/dashboard/patient-data/${id}`);
  };


  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredPatient = (data || []).filter((patient) =>
    patient.name.toLowerCase().includes(searchKeyword)
  );

 
  const handleDownloadPdf = async (patient: PatientDataModel) => {
    const blob = await pdf(
      <PatientDetailPDF detailPatient={patient} />
    ).toBlob();
    saveAs(blob, `Detail_Pasien_${patient.name || "Pasien"}.pdf`);
  };

  const columns = PatientColumns({
    onDetail: (id: string) => getDetail(id),
    onDownload: (patient: PatientDataModel) => handleDownloadPdf(patient),
  });

  return (
    <>
      <div>
        <Title level={4}>Data Pasien</Title>
      </div>
      <div>
        <Flex justify="start" style={{ marginBottom: 16 }}>
          <SearchBar onSearch={handleSearch} />
        </Flex>
      </div>
      <Table columns={columns} dataSource={filteredPatient} rowKey={"id"} />
    </>
  );
}
