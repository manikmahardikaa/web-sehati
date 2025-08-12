import dayjs from "dayjs";
import { PatientDataModel } from "../models/petugas-kesehatan/patient";
import maskName from "./mask-name";

export type ComplianceRow = {
  officer: string;
  patientName: string;
  jadwalKontrol: number;
  kontrolTerlaksana: number;
  jadwalObat: number;
  obatTerlaksana: number;
  compliance: string;
};

export function getComplianceReportRows(
  patients: PatientDataModel[] = []
): ComplianceRow[] {
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  return patients.map((p) => {
    // Petugas lapangan
    const officer = p.petugas_lapangan?.authority?.name || "Tidak Diketahui";
    // Masked name
    const patientName = maskName(p.name);

    // Jadwal kontrol dan pengambilan obat: total history bulan berjalan
    const jadwalKontrol =
      p.controllHistory?.filter(
        (h) =>
          dayjs(h.date).month() === currentMonth &&
          dayjs(h.date).year() === currentYear
      ).length ?? 0;

    // Kontrol terlaksana: status===true di bulan berjalan
    const kontrolTerlaksana =
      p.controllHistory?.filter(
        (h) =>
          h.status === true &&
          dayjs(h.date).month() === currentMonth &&
          dayjs(h.date).year() === currentYear
      ).length ?? 0;

    // Jadwal pengambilan obat: total history bulan berjalan
    const jadwalObat =
      p.medicationHistory?.filter(
        (h) =>
          dayjs(h.date).month() === currentMonth &&
          dayjs(h.date).year() === currentYear
      ).length ?? 0;

    // Pengambilan obat terlaksana: status===true di bulan berjalan
    const obatTerlaksana =
      p.medicationHistory?.filter(
        (h) =>
          h.status === true &&
          dayjs(h.date).month() === currentMonth &&
          dayjs(h.date).year() === currentYear
      ).length ?? 0;

    // Persentase kepatuhan = min dari dua persentase, dibulatkan, contoh:
    // (total kontrol terlaksana / jadwal kontrol), (total obat terlaksana / jadwal obat)
    // Pilih terendah, kecuali salah satu jadwal = 0, maka 0%
    let persentase = 0;
    if (jadwalKontrol > 0 && jadwalObat > 0) {
      const a = kontrolTerlaksana / jadwalKontrol;
      const b = obatTerlaksana / jadwalObat;
      persentase = Math.round(Math.min(a, b) * 100);
    } else if (jadwalKontrol > 0) {
      persentase = Math.round((kontrolTerlaksana / jadwalKontrol) * 100);
    } else if (jadwalObat > 0) {
      persentase = Math.round((obatTerlaksana / jadwalObat) * 100);
    }

    return {
      officer,
      patientName,
      jadwalKontrol,
      kontrolTerlaksana,
      jadwalObat,
      obatTerlaksana,
      compliance: `${persentase}%`,
    };
  });
}
