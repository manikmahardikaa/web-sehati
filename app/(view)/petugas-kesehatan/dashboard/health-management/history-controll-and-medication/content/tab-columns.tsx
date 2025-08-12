import { Tabs, TabsProps } from "antd";
import ExpandableHistoryTable from "./columns";
import SearchBar from "@/app/components/common/search-bar";
import CustomButton from "@/app/components/common/custom-button";

import React, { useState } from "react";
import DownloadReportControlModal from "@/app/components/common/petugas-kesehatan/modal/history-control-and-medication/control";
import DownloadReportMedicationModal from "@/app/components/common/petugas-kesehatan/modal/history-control-and-medication/medication";
import { usePatients } from "@/app/hooks/petugas-kesehatan/patient";

export default function TabColumns() {
  const [showDownload, setShowDownload] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: patients = [] } = usePatients({});

  // const { user_name } = useAuth();
  // const namaPetugas = user_name ? user_name : "Petugas Lapangan";

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredPatient = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchKeyword)
  );

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Riwayat Kontrol Berkala",
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <SearchBar onSearch={handleSearch} />
            <div style={{ display: "flex", gap: 12 }}>
              <CustomButton
                title="Unduh Laporan"
                onClick={() => setShowDownload(true)}
              />
            </div>
          </div>
          <ExpandableHistoryTable type="controll" patients={filteredPatient} />
          <DownloadReportControlModal
            open={showDownload}
            onCancel={() => setShowDownload(false)}
            loading={false}
            patients={patients}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Riwayat Pengambilan Obat",
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <SearchBar onSearch={handleSearch} />
            <div style={{ display: "flex", gap: 12 }}>
              <CustomButton
                title="Unduh Laporan"
                onClick={() => setShowDownload(true)}
              />
            </div>
          </div>
          <ExpandableHistoryTable
            type="medication"
            patients={filteredPatient}
          />
          <DownloadReportMedicationModal
            open={showDownload}
            onCancel={() => setShowDownload(false)}
            loading={false}
            patients={patients}
          />
        </>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
