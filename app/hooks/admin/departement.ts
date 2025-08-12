import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import MainNotification from "../../components/common/notifications";
import { DepartementDataModel, DepartementPayloadCreateModel } from "@/app/models/admin/departement";


const baseUrl = "/api/admin/dashboard/departement";
const entity = "departement";
const queryKey = "departements";

export const useDepartements = ({ queryString }: { queryString?: string }) => {
  const queryClient = useQueryClient();

  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: ["departements", queryString],
    queryFn: async () => {
      const url = queryString
        ? `/api/admin/dashboard/departement?${queryString}`
        : `/api/admin/dashboard/departement`;
      const result = await axios.get(url);
      return result.data.result as DepartementDataModel[];
    },
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: DepartementPayloadCreateModel) =>
      axios.post("/api/admin/dashboard/departement", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departements"] });
      MainNotification({
        type: "success",
        entity: "departement",
        action: "created",
      });
    },
    onError: () => {
      MainNotification({ type: "error", entity: "departement", action: "created" });
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`/api/admin/dashboard/departement/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departements"] });
      MainNotification({
        type: "success",
        entity: "departement",
        action: "deleted",
      });
    },
    onError: () => {
      MainNotification({ type: "error", entity: "departement", action: "deleted" });
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

export const useDepartement = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Query data Contact berdasarkan ID
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as DepartementDataModel;
    },
    enabled: Boolean(id),
  });

  // Mutasi untuk update Contact
  const { mutateAsync: onUpdate, isPending: onUpdateLoading } = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: DepartementPayloadCreateModel;
    }) => {
      return await axios.put(`${baseUrl}/${id}`, payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.invalidateQueries({ queryKey: [entity, variables.id] });
      MainNotification({ type: "success", entity, action: "updated" });
    },
    onError: () => {
      MainNotification({ type: "error", entity, action: "updated" });
    },
  });

  return {
    data,
    fetchLoading,
    onUpdateLoading,
    onUpdate,
  };
};
