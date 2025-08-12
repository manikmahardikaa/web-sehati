import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import MainNotification from "../../components/common/notifications";
import {
  ContactDataModel,
  ContactPayloadCreateModel,
  ContactPayloadUpdateModel,
} from "@/app/models/admin/contact";

const baseUrl = "/api/admin/dashboard/contact";
const entity = "contact";
const queryKey = "contacts";

export const useContacts = ({ queryString }: { queryString?: string }) => {
  const queryClient = useQueryClient();

  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: ["contacts", queryString],
    queryFn: async () => {
      const url = queryString
        ? `/api/admin/dashboard/contact?${queryString}`
        : `/api/admin/dashboard/contact`;
      const result = await axios.get(url);
      return result.data.result as ContactDataModel[];
    },
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: async (payload: ContactPayloadCreateModel) =>
      axios.post("/api/admin/dashboard/contact", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      MainNotification({
        type: "success",
        entity: "contact",
        action: "created",
      });
    },
    onError: () => {
      MainNotification({ type: "error", entity: "contact", action: "created" });
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`/api/admin/dashboard/contact/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      MainNotification({
        type: "success",
        entity: "contact",
        action: "deleted",
      });
    },
    onError: () => {
      MainNotification({ type: "error", entity: "contact", action: "deleted" });
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

export const useContact = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Query data Contact berdasarkan ID
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as ContactDataModel;
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
      payload: ContactPayloadUpdateModel;
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
