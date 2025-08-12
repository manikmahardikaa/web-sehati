import dayjs from "dayjs";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import { TableProps } from "antd";
import { HealthCheckMonitoringDataModel } from "@/app/models/petugas-kesehatan/health-check-monitoring";
import maskName from "@/app/utils/mask-name";

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.locale("id");

function latestDate(dates: string[]): dayjs.Dayjs | null {
  if (!dates?.length) return null;
  return dates
    .map((d) => dayjs.utc(d))
    .sort((a, b) => b.valueOf() - a.valueOf())[0];
}
const human = (d: dayjs.Dayjs | null) =>
  d ? d.local().format("DD MMMM YYYY") : "-";

export const HealthCheckMonitoringThreeMonthColumns =
  (): TableProps<HealthCheckMonitoringDataModel>["columns"] => {
    // Jendela 3 bulan terakhir: dari awal bulan -2 sampai akhir bulan ini
    const start = dayjs().subtract(2, "month").startOf("month");
    const end = dayjs().endOf("month");

    return [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
        render: (_: string, __: HealthCheckMonitoringDataModel, i) => i + 1,
      },
      {
        title: "Nama Pasien",
        dataIndex: "name",
        key: "name",
        render: (n) => maskName(String(n)),
      },
      { title: "No WhatsApp", dataIndex: "no_whatsapp", key: "no_whatsapp" },
      {
        title: "Petugas Lapangan",
        key: "petugas_lapangan",
        render: (_: string, r) => r.petugas_lapangan?.name ?? "-",
      },
      {
        title: "Program Wilayah",
        key: "program_wilayah",
        render: (_: string, r) => r.petugas_lapangan.authority.name ?? "-",
      },

      // STATUS: Hijau hanya jika KEDUANYA ada dalam jendela 3 bulan
      {
        title: "Status",
        key: "status",
        render: (_: string, r) => {
          const kontrolInWindow = (r.controllHistory ?? [])
            .map((h) => dayjs.utc(h.date))
            .some((d) => d.isBetween(start, end, "day", "[]"));

          const obatInWindow = (r.medicationHistory ?? [])
            .map((h) => dayjs.utc(h.date))
            .some((d) => d.isBetween(start, end, "day", "[]"));

          const ok = kontrolInWindow && obatInWindow;

          return ok ? (
            <span style={{ color: "#52c41a", fontWeight: 600 }}>
              Sudah Dilakukan
            </span>
          ) : (
            <span style={{ color: "#C30010", fontWeight: 600 }}>
              Belum Dilakukan
            </span>
          );
        },
      },

      // Ringkasan terakhir (apapun bulannya) supaya tetap informatif
      {
        title: "Aktivitas Terakhir",
        key: "last_activity_3mo",
        render: (_: string, r) => {
          const lastKontrol = latestDate(
            (r.controllHistory ?? []).map((h) =>
              dayjs(h.date).format("YYYY-MM-DD")
            )
          );
          const lastObat = latestDate(
            (r.medicationHistory ?? []).map((h) =>
              dayjs(h.date).format("YYYY-MM-DD")
            )
          );
          return `Kontrol tgl ${human(
            lastKontrol
          )}, Pengambilan Obat tgl ${human(lastObat)}`;
        },
      },
    ];
  };
