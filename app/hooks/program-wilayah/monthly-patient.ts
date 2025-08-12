import { MonthlyPatientCount } from "@/app/models/program-wilayah/monthly-patient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "/api/program-wilayah/dashboard/monthly-patient";
const queryKey = "monthly-patients";

export const useMonthlyPatients = ({
  queryString,
}: {
  queryString?: string;
}) => {
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as MonthlyPatientCount[];
    },
  });

  return {
    data,
    fetchLoading,
  };
};
