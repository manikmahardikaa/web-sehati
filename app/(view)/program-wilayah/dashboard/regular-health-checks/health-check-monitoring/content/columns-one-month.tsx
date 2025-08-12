import dayjs from "dayjs";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import { TableProps } from "antd";
import { HealthCheckMonitoringDataModel } from "@/app/models/program-wilayah/health-check-monitoring";
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.locale("id");

function latestDate(dates: string[]): dayjs.Dayjs | null {
  if (!dates?.length) return null;
  return dates
    .map((d) => dayjs.utc(d))
    .sort((a, b) => b.valueOf() - a.valueOf())[0];
}

function formatDateHuman(d: dayjs.Dayjs | null): string {
  return d ? d.local().format("DD MMMM YYYY") : "-";
}

export const HealthCheckMonitoringOneMonthColumns =
  (): TableProps<HealthCheckMonitoringDataModel>["columns"] => {
    const start = dayjs().startOf("month");
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
      },
      { title: "No WhatsApp", dataIndex: "no_whatsapp", key: "no_whatsapp" },
      {
        title: "Petugas Lapangan",
        key: "petugas_lapangan",
        render: (_: string, r) => r.petugas_lapangan?.name ?? "-",
      },

      // STATUS: hijau hanya bila KEDUANYA ada di bulan berjalan
      {
        title: "Status",
        key: "status",
        render: (_: string, r) => {
          const controlThisMonth = (r.controllHistory ?? [])
            .map((h) => dayjs.utc(h.date))
            .some((d) => d.isBetween(start, end, "day", "[]"));

          const medicationThisMonth = (r.medicationHistory ?? [])
            .map((h) => dayjs.utc(h.date))
            .some((d) => d.isBetween(start, end, "day", "[]"));

          const completed = controlThisMonth && medicationThisMonth;

          return completed ? (
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

      // Aktivitas Terakhir: tampilkan terakhir kontrol & obat (apapun bulannya)
      {
        title: "Aktivitas Terakhir",
        key: "last_activity",
        render: (_: string, r) => {
          const lastKontrol = latestDate(
            (r.controllHistory ?? []).map((h) => dayjs(h.date).format())
          );
          const lastObat = latestDate(
            (r.medicationHistory ?? []).map((h) => dayjs(h.date).format())
          );

          return `Kontrol tgl ${formatDateHuman(
            lastKontrol
          )}, Pengambilan Obat tgl ${formatDateHuman(lastObat)}`;
        },
      },
    ];
  };
