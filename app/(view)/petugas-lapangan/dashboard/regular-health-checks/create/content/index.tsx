import FormScheduleWaBlast from "@/app/components/common/petugas-lapangan/form/control-time-data";
import { usePatients } from "@/app/hooks/petugas-lapangan/patient";

export default function CreateContent() {
  const { data = [] } = usePatients({});
 
  return <FormScheduleWaBlast patients={data} />;
}
