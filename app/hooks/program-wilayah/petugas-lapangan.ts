import { UserDataModel } from "@/app/models/admin/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "/api/program-wilayah/dashboard/petugas-lapangan";
const queryKey = "petugas-lapangan";

export const usePetugasLapangans = ({
  queryString,
}: {
  queryString?: string;
}) => {
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as UserDataModel[];
    },
  });

  return {
    data,
    fetchLoading,
  };
};
