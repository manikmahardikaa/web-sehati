import FormBlastADS from "@/app/components/common/program-wilayah/form/ads-blast";
import { usePatients } from "@/app/hooks/program-wilayah/patient";

export default function CreateContent() {
  const { data = [] } = usePatients({});

  return <FormBlastADS patients={data} />;
}
