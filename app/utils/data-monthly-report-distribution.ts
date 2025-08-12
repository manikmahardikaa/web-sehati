import dayjs from "dayjs";
import { PatientDataModel } from "../models/petugas-kesehatan/patient";

export type ReportRow = {
  wilayah: string;
  subWilayah: string;
  jumlah: number;
  kontrol: string;
  obat: string;
  cekBulanan: string;
  cek3Bulanan: string;
};

export function getReportData(patients: PatientDataModel[] = []): ReportRow[] {
  // Map: subWilayah.id → { wilayah, subWilayah, patients }
  const subWilayahMap = new Map<
    string,
    { wilayah: string; subWilayah: string; patients: PatientDataModel[] }
  >();
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  for (const patient of patients) {
    const wilayah =
      patient.petugas_lapangan?.authority?.region?.name || "Wilayah Tidak Diketahui";
    const subWilayah =
      patient.petugas_lapangan?.subregion?.name ||
      "Sub Wilayah Tidak Diketahui";
    const subWilayahId = patient.petugas_lapangan?.subregion?.id || subWilayah;

    // Gabungkan berdasarkan id subWilayah
    if (!subWilayahMap.has(subWilayahId)) {
      subWilayahMap.set(subWilayahId, {
        wilayah,
        subWilayah,
        patients: [],
      });
    }
    subWilayahMap.get(subWilayahId)!.patients.push(patient);
  }

  return Array.from(subWilayahMap.values()).map(
    ({ wilayah, subWilayah, patients }) => {
      const total = patients.length;

      const kontrol = patients.filter((p) =>
        p.controllHistory?.some(
          (h) =>
            h.status === true &&
            dayjs(h.date).month() === currentMonth &&
            dayjs(h.date).year() === currentYear
        )
      ).length;

      const obat = patients.filter((p) =>
        p.medicationHistory?.some(
          (h) =>
            h.status === true &&
            dayjs(h.date).month() === currentMonth &&
            dayjs(h.date).year() === currentYear
        )
      ).length;

      // Replace with actual logic if available
      const cekBulanan = kontrol;
      const cek3Bulanan = kontrol;

      return {
        wilayah,
        subWilayah,
        jumlah: total,
        kontrol: total ? `${Math.round((kontrol / total) * 100)}%` : "0%",
        obat: total ? `${Math.round((obat / total) * 100)}%` : "0%",
        cekBulanan: total ? `${Math.round((cekBulanan / total) * 100)}%` : "0%",
        cek3Bulanan: total
          ? `${Math.round((cek3Bulanan / total) * 100)}%`
          : "0%",
      };
    }
  );
}
