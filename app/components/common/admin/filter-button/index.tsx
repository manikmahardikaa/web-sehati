
import { Select } from "antd";
import { useMemo } from "react";
import { ContactDataModel } from "@/app/models/admin/contact";

interface FilterButtonProps {
  data: ContactDataModel[];
  onFilter: (department: string | undefined) => void;
}

export default function FilterContactButton({
  data,
  onFilter,
}: FilterButtonProps) {
  
  const options = useMemo(() => {
    // Buat set unik dari nama departemen saja (bisa null)
    const uniqNames = Array.from(
      new Set(data.map((item) => item.departement?.name).filter(Boolean))
    );
    return uniqNames.map((deptName) => ({
      label: deptName,
      value: deptName,
    }));
  }, [data]);

  return (
    <Select
      allowClear
      placeholder="Filter berdasarkan departemen"
      options={options}
      style={{ minWidth: 240 }}
      onChange={(value) => onFilter(value)}  // value: string | undefined
    />
  );
}