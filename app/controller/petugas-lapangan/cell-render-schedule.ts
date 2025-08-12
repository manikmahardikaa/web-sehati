import { GET_CONTROLL_HISTORIES } from "@/app/providers/petugas-lapangan/controll-history";
import { GET_MEDICAL_HISTORIES } from "@/app/providers/petugas-lapangan/medical-history";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
import dayjs from "dayjs";
import { HistoryDate } from "@/app/models/petugas-lapangan/date-schedule-blast";

export async function GET_ALL_HISTORY_DATES(): Promise<HistoryDate[]> {
  const medicalHistory: MedicationHistoryDataModel[] =
    await GET_MEDICAL_HISTORIES({});
  const controllHistory: ControllHistoryDataModel[] =
    await GET_CONTROLL_HISTORIES({});

  const medicalDates: HistoryDate[] = (medicalHistory || []).map((item) => ({
    date: dayjs(item.date).toISOString(),
    type: "medical",
    id: item.id,
  }));

  const controllDates: HistoryDate[] = (controllHistory || []).map((item) => ({
    date: dayjs(item.date).toISOString(),
    type: "controll",
    id: item.id,
  }));

  const allDates = [...medicalDates, ...controllDates].sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );

  return allDates;
}
