import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import MainNotification from "../../components/common/notifications";
import {
  ContentCreatorDataModel,
  ContentCreatorPayloadCreateModel,
} from "@/app/models/admin/content-creator";

const baseUrl = "/api/admin/dashboard/content-creator";
const entity = "content-creator";
const queryKey = "content-creators";

export const useContentCreators = ({
  queryString,
}: {
  queryString?: string;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: ["content-creators", queryString],
    queryFn: async () => {
      const url = queryString
        ? `/api/admin/dashboard/content-creator?${queryString}`
        : `/api/admin/dashboard/content-creator`;
      const result = await axios.get(url);
      return result.data.result as ContentCreatorDataModel[];
    },
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: ContentCreatorPayloadCreateModel) =>
      axios.post("/api/admin/dashboard/content-creator", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-creators"] });
      MainNotification({
        type: "success",
        entity: "content-creator",
        action: "created",
      });
    },
    onError: () => {
      MainNotification({
        type: "error",
        entity: "content-creator",
        action: "created",
      });
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`/api/admin/dashboard/content-creator/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-creators"] });
      MainNotification({
        type: "success",
        entity: "content-creator",
        action: "deleted",
      });
    },
    onError: () => {
      MainNotification({
        type: "error",
        entity: "content-creator",
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

export const useContentCreator = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Query data Contact berdasarkan ID
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as ContentCreatorDataModel;
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
      payload: ContentCreatorPayloadCreateModel;
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
