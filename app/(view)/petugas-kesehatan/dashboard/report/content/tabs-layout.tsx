import SearchBar from "@/app/components/common/search-bar";
import { useReports } from "@/app/hooks/petugas-kesehatan/report";
import { Flex, Table, Tabs, TabsProps } from "antd";
import { ReportColumns } from "./columns";

export default function TabLayout() {
  const { data, onDelete } = useReports({});

  const distributionPatientData = (data ?? []).filter(
    (item) => item.type_report === "MONTHLY_DISTRIBUTION_PATIENT"
  );
  const recapitulationPatientData = (data ?? []).filter(
    (item) => item.type_report === "MONTHLY_RECAPITULATION_PATIENT"
  );
  const columns = ReportColumns({
    onDelete: onDelete,
  });
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Laporan Distribusi Pasien",
      children: (
        <>
          <Flex justify="end">
            <SearchBar onSearch={() => {}} />
          </Flex>
          <Table
            columns={columns}
            dataSource={distributionPatientData}
            rowKey="id"
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Laporan Rekapitulasi Pasien",
      children: (
        <>
          <Flex justify="end">
            <SearchBar onSearch={() => {}} />
          </Flex>
          <Table
            columns={columns}
            dataSource={recapitulationPatientData}
            rowKey="id"
          />
        </>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
