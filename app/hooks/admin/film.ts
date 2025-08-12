import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import MainNotification from "../../components/common/notifications";
import { FilmDataModel, FilmPayloadCreateModel } from "@/app/models/admin/film";

const baseUrl = "/api/admin/dashboard/film";
const entity = "film";
const queryKey = "films";

export const useFilms = ({ queryString }: { queryString?: string }) => {
  const queryClient = useQueryClient();

  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: ["films", queryString],
    queryFn: async () => {
      const url = queryString
        ? `/api/admin/dashboard/film?${queryString}`
        : `/api/admin/dashboard/film`;
      const result = await axios.get(url);
      return result.data.result as FilmDataModel[];
    },
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: FilmPayloadCreateModel) =>
      axios.post("/api/admin/dashboard/film", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["films"] });
      MainNotification({
        type: "success",
        entity: "film",
        action: "created",
      });
    },
    onError: () => {
      MainNotification({
        type: "error",
        entity: "film",
        action: "created",
      });
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`/api/admin/dashboard/film/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["films"] });
      MainNotification({
        type: "success",
        entity: "film",
        action: "deleted",
      });
    },
    onError: () => {
      MainNotification({
        type: "error",
        entity: "film",
        action: "deleted",
      });
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

export const useFilm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Query data Contact berdasarkan ID
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as FilmDataModel;
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
      payload: FilmPayloadCreateModel;
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
