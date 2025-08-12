import { HealthCheckMonitoringDataModel } from "@/app/models/program-wilayah/health-check-monitoring";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "/api/program-wilayah/dashboard/health-check-monitoring";
const queryKey = "health-check-monitoring";

export const useHealthCheckMonitorings = ({
  queryString,
}: {
  queryString?: string;
}) => {
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as HealthCheckMonitoringDataModel[];
    },
  });

  return {
    data,
    fetchLoading,
  };
};
