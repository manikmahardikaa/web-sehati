import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import MainNotification from "../../components/common/notifications";
import {
  MedicationHistoryDataModel,
  MedicationHistoryPayloadCreateModel,
  MedicationHistoryPayloadUpdateModel,
} from "@/app/models/petugas-lapangan/medical-history";

const baseUrl = "/api/petugas-lapangan/dashboard/medical-history";
const entity = "medical-history";
const queryKey = "medical-historys";

// 1. Ambil list data + create + delete
export const useMedicationHistories = ({
  queryString,
}: {
  queryString?: string;
}) => {
  const queryClient = useQueryClient();

  // Get all histories (optionally filtered)
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as MedicationHistoryDataModel[];
    },
  });

  // Create
  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: MedicationHistoryPayloadCreateModel) =>
      axios.post(baseUrl, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      MainNotification({ type: "success", entity, action: "created" });
    },
    onError: () => {
      MainNotification({ type: "error", entity, action: "created" });
    },
  });

  // Delete
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

// 2. Ambil data detail + update
export const useMedicationHistory = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Get by id
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as MedicationHistoryDataModel;
    },
    enabled: !!id,
  });

  // Update (PUT)
  const { mutateAsync: onUpdate, isPending: onUpdateLoading } = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: MedicationHistoryPayloadUpdateModel;
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

