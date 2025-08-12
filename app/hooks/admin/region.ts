import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import MainNotification from "../../components/common/notifications";
import {
  RegionDataModel,
  RegionPayloadCreateModel,
  RegionPayloadUpdateModel,
} from "@/app/models/admin/region";

const baseUrl = "/api/admin/dashboard/region";
const entity = "region";
const queryKey = "regions";

export const useRegions = ({ queryString }: { queryString?: string }) => {
  const queryClient = useQueryClient();

  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: ["regions", queryString],
    queryFn: async () => {
      const url = queryString
        ? `/api/admin/dashboard/region?${queryString}`
        : `/api/admin/dashboard/region`;
      const result = await axios.get(url);
      return result.data.result as RegionDataModel[];
    },
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: RegionPayloadCreateModel) =>
      axios.post("/api/admin/dashboard/region", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      MainNotification({
        type: "success",
        entity: "region",
        action: "created",
      });
    },
    onError: () => {
      MainNotification({ type: "error", entity: "region", action: "created" });
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`/api/admin/dashboard/region/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      MainNotification({
        type: "success",
        entity: "region",
        action: "deleted",
      });
    },
    onError: () => {
      MainNotification({ type: "error", entity: "region", action: "deleted" });
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

export const useRegion = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Query data Region berdasarkan ID
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as RegionDataModel;
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
      payload: RegionPayloadUpdateModel;
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
