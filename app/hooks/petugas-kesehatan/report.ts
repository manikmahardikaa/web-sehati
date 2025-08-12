import MainNotification from "@/app/components/common/notifications";
import { ReportDataModel } from "@/app/models/petugas-kesehatan/report";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "/api/petugas-kesehatan/dashboard/report";
const entity = "report";
const queryKey = "reports";

export const useReports = ({ queryString }: { queryString?: string }) => {
  const queryClient = useQueryClient();
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as ReportDataModel[];
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: async (id: string) => axios.delete(`${baseUrl}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      MainNotification({ type: "success", entity, action: "deleted" });
    },
    onError: () => {
      MainNotification({ type: "error", entity, action: "deleted" });
    },
  });

  return {
    data,
    fetchLoading,
    onDelete,
    onDeleteLoading,
  };
};
