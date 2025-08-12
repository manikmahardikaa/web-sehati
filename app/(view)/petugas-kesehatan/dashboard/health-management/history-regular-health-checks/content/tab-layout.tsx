import { useHealthCheckMonitorings } from "@/app/hooks/petugas-kesehatan/health-check-monitoring";
import { Flex, Table, Tabs, TabsProps } from "antd";
import { HealthCheckMonitoringOneMonthColumns } from "./columns-one-month";
import { HealthCheckMonitoringThreeMonthColumns } from "./columns-three-month";
import { useState } from "react";
import SearchBar from "@/app/components/common/search-bar";

export default function TabContent() {
  const columnsOneMonth = HealthCheckMonitoringOneMonthColumns();
    const [searchKeyword, setSearchKeyword] = useState("");

  const columnsThreeMonth = HealthCheckMonitoringThreeMonthColumns();

  const { data } = useHealthCheckMonitorings({});

   const handleSearch = (keyword: string) => {
     setSearchKeyword(keyword.trim().toLowerCase());
   };

   const filteredPatient = (data || []).filter((patient) =>
     patient.name.toLowerCase().includes(searchKeyword)
   );

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "1 Bulanan",
      children: (
        <>
          <Flex justify="end">
            <SearchBar onSearch={handleSearch} />
          </Flex>
          <Table columns={columnsOneMonth} dataSource={filteredPatient} />
        </>
      ),
    },
    {
      key: "2",
      label: "3 Bulanan",
      children: (
        <>
          <Flex justify="end">
            <SearchBar onSearch={handleSearch} />
          </Flex>
          <Table columns={columnsThreeMonth} dataSource={filteredPatient} />,
        </>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
