import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import MainNotification from "../../components/common/notifications";
import {
  PocketBookDataModel,
  PocketBookPayloadCreateModel,
} from "@/app/models/admin/pocket-book";

const baseUrl = "/api/admin/dashboard/pocket-book";
const entity = "pocket-book";
const queryKey = "pocket-books";

export const usePocketBooks = ({ queryString }: { queryString?: string }) => {
  const queryClient = useQueryClient();

  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: ["pocket-books", queryString],
    queryFn: async () => {
      const url = queryString
        ? `/api/admin/dashboard/pocket-book?${queryString}`
        : `/api/admin/dashboard/pocket-book`;
      const result = await axios.get(url);
      return result.data.result as PocketBookDataModel[];
    },
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: PocketBookPayloadCreateModel) =>
      axios.post("/api/admin/dashboard/pocket-book", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["films"] });
      MainNotification({
        type: "success",
        entity: "pocket-book",
        action: "created",
      });
    },
    onError: () => {
      MainNotification({
        type: "error",
        entity: "pocket-book",
        action: "created",
      });
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`/api/admin/dashboard/pocket-book/${id}`),
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

export const usePocketBook = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Query data Contact berdasarkan ID
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as PocketBookDataModel;
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
      payload: PocketBookPayloadCreateModel;
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
