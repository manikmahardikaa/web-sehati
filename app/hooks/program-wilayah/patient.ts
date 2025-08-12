
import { PatientDataModel } from "@/app/models/program-wilayah/patient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "/api/program-wilayah/dashboard/patient";
const entity = "patient";
const queryKey = "patients";

export const usePatients = ({ queryString }: { queryString?: string }) => {
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [queryKey, queryString],
    queryFn: async () => {
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
      const result = await axios.get(url);
      return result.data.result as PatientDataModel[];
    },
  });

  return {
    data,
    fetchLoading,
  };
};


export const usePatient = ({ id }: { id: string }) => {
  const { data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      return result.data.result as PatientDataModel;
    },
    enabled: Boolean(id),
  });

  return {
    data,
    fetchLoading,
  };
};
