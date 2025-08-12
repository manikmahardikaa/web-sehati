import { HistoryDate } from "@/app/models/petugas-lapangan/date-schedule-blast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "/api/petugas-lapangan/dashboard/date-schedule-blast";

const queryKey = "date-schedule-blasts";

export const useDateScheduleBlasts = ({
  queryString,
}: {
  queryString?: string;
}) => {
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as HistoryDate[];
    },
  });

  return {
    data,
    fetchLoading,
  };
};
