import FormPatientControlBlast from "@/app/components/common/program-wilayah/form/patient-control-blast";
import { usePatients } from "@/app/hooks/program-wilayah/patient";

export default function CreateContent() {
  const { data = [] } = usePatients({});

  return <FormPatientControlBlast patients={data} />;
}
