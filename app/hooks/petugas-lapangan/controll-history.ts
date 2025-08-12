import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import MainNotification from "../../components/common/notifications";
import {
  ControllHistoryDataModel,
  ControllHistoryPayloadCreateModel,
  ControllHistoryPayloadUpdateModel,
} from "@/app/models/petugas-lapangan/controll-history";

const baseUrl = "/api/petugas-lapangan/dashboard/controll-history";
const entity = "controll-history";
const queryKey = "controll-historys";

export const useControllHistories = ({
  queryString,
}: {
  queryString?: string;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as ControllHistoryDataModel[];
    },
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: ControllHistoryPayloadCreateModel) =>
      axios.post(baseUrl, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      MainNotification({ type: "success", entity, action: "created" });
    },
    onError: () => {
      MainNotification({ type: "error", entity, action: "created" });
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
    onCreate,
    onCreateLoading,
    onDelete,
    onDeleteLoading,
  };
};

export const useControllHistory = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Query data berdasarkan ID
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as ControllHistoryDataModel;
    },
    enabled: !!id,
  });

  // Mutasi untuk update
  const { mutateAsync: onUpdate, isPending: onUpdateLoading } = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ControllHistoryPayloadUpdateModel;
    }) => axios.put(`${baseUrl}/${id}`, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.invalidateQueries({ queryKey: [entity, variables.id] });
      MainNotification({ type: "success", entity, action: "updated" });
    },
    onError: () => {
      MainNotification({ type: "error", entity, action: "updated" });
    },
  });

  const { mutateAsync: onUpdateStatus, isPending: onUpdateStatusLoading } =
    useMutation({
      mutationFn: async ({ id, status }: { id: string; status: boolean }) => {
        return axios.patch(`${baseUrl}/${id}`, { status });
        // Kalau endpoint khusus status:
        // return axios.patch(`${baseUrl}/${id}/status`, { status });
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        queryClient.invalidateQueries({ queryKey: [entity, variables.id] });
        MainNotification({
          type: "success",
          entity,
          action: "updated status",
        });
      },
      onError: () => {
        MainNotification({ type: "error", entity, action: "updated status" });
      },
    });

  return {
    data,
    fetchLoading,
    onUpdate,
    onUpdateLoading,
    onUpdateStatus,
    onUpdateStatusLoading,
  };
};
