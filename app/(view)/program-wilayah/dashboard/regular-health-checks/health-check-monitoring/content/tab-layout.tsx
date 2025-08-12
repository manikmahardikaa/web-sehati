import { Flex, Table, Tabs, TabsProps } from "antd";

import { useHealthCheckMonitorings } from "@/app/hooks/program-wilayah/health-check-monitoring";
import { HealthCheckMonitoringOneMonthColumns } from "./columns-one-month";
import { HealthCheckMonitoringThreeMonthColumns } from "./columns-three-month";
import SearchBar from "@/app/components/common/search-bar";
import { useState } from "react";

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
