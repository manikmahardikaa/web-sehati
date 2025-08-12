import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";
import maskName from "@/app/utils/mask-name";

// === COLORS ===
const C_RED = "#c30010";
const C_RED_SOFT = "#f6eaea";
const C_BORDER = "#e1cfcf";
const C_TEXT = "#1b1b1b";
const C_ROW_ALT = "#fcfcfd";

// ==== Styles ====
const styles = StyleSheet.create({
  page: { padding: 28, fontFamily: "Helvetica", color: C_TEXT },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 14,
    letterSpacing: 0.2,
  },

  // Header info (Wilayah / Tanggal)
  infoRow: { marginBottom: 8, flexDirection: "row" },
  label: { width: 120, fontSize: 13, fontWeight: 500 },
  value: { fontSize: 13 },

  // Table shell
  tableWrap: {
    borderRadius: 10,
    border: `1px solid ${C_BORDER}`,
    overflow: "hidden",
    marginTop: 10,
  },

  headRow: {
    flexDirection: "row",
    backgroundColor: C_RED_SOFT,
    borderBottom: `1px solid ${C_BORDER}`,
  },
  headCell: {
    padding: 8,
    fontSize: 10.5, // header compact
    lineHeight: 1.1,
    textAlign: "center",
    fontWeight: 700,
    borderRight: `1px solid ${C_BORDER}`,
  },
  headCellFirstTwo: { color: C_RED },
  headCellLast: { borderRight: "none" },

  bodyRow: {
    flexDirection: "row",
    minHeight: 26,
    alignItems: "center",
    borderBottom: `1px solid ${C_BORDER}`,
  },
  bodyRowAlt: { backgroundColor: C_ROW_ALT },

  cell: {
    padding: 7,
    fontSize: 11,
    textAlign: "center",
    borderRight: `1px solid ${C_BORDER}`,
    overflow: "hidden", // guardrail against bleed
  },
  cellLast: { borderRight: "none" },

  // === Fixed widths (use the SAME widths on header & body) ===
  wNo: { width: 28 },
  wNama: { width: 135 },
  wWa: { width: 120 }, // +4 to help long numbers
  wYear: { width: 58 },
  wSubRegion: { width: 98 },
  wStaffName: { width: 92 },
  wDate: { width: 96 }, // +4 to help dates
  wStatus: { width: 130 }, // -4 to compensate
  wDoneAt: { width: 140 }, // -4 to compensate

  // text helpers
  textTight: { fontSize: 10, lineHeight: 1.1 },
  breakAll: { wordBreak: "break-all" }, // force break for digits/long tokens

  statusDone: { color: "#177245", fontWeight: 700 },
  statusPending: { color: C_RED, fontWeight: 700 },
});

// Label status khusus “pengambilan obat”
function statusLabel(status: boolean) {
  return status ? "Sudah Mengambil Obat" : "Belum Mengambil Obat";
}

// === Types ===
export interface PatientMedicationReport {
  name: string;
  no_whatsapp: string;
  sub_region?: string;
  staff_name?: string;
  year_of_diagnosis: number;
  medicationHistory: {
    id: string;
    date: string; // jadwal pengambilan
    status: boolean; // true jika terlaksana
    updatedAt?: string; // tanggal realisasi
  }[];
}

type Props = {
  month: number; // 1-12
  year: number;
  region: string;
  printDate: string; // e.g. "8 August 2025"
  data: PatientMedicationReport[];
};

export const PatientMedicationPDFDoc: React.FC<Props> = ({
  month,
  year,
  region,
  printDate,
  data,
}) => {
  const monthName = dayjs()
    .month(month - 1)
    .locale("id")
    .format("MMMM");

  // Flatten rows but visually “merge” identity columns
  const rows: {
    p: PatientMedicationReport;
    i: number;
    ch: PatientMedicationReport["medicationHistory"][number];
    ci: number;
  }[] = [];
  data.forEach((p, i) =>
    (p.medicationHistory || []).forEach((ch, ci) => rows.push({ p, i, ch, ci }))
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Laporan Riwayat Pengambilan Obat Pasien Bulan {monthName} {year}
        </Text>

        {/* Info */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Wilayah :</Text>
          <Text style={styles.value}>{region}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tanggal Cetak :</Text>
          <Text style={styles.value}>{printDate}</Text>
        </View>

        {/* Table */}
        <View style={styles.tableWrap}>
          {/* Header */}
          <View style={styles.headRow}>
            <Text
              style={[styles.headCell, styles.wNo, styles.headCellFirstTwo]}
            >
              No
            </Text>
            <Text
              style={[styles.headCell, styles.wNama, styles.headCellFirstTwo]}
            >
              Nama Pasien
            </Text>
            <Text style={[styles.headCell, styles.wWa]}>No. WhatsApp</Text>
            <Text style={[styles.headCell, styles.wYear]}>Tahun Diagnosa</Text>
            <Text style={[styles.headCell, styles.wSubRegion]}>
              Sub Wilayah
            </Text>
            <Text style={[styles.headCell, styles.wStaffName]}>
              Nama Petugas
            </Text>
            <Text style={[styles.headCell, styles.wDate]}>
              Jadwal Pengambilan Obat
            </Text>
            <Text style={[styles.headCell, styles.wStatus]}>
              Status Pengambilan Obat
            </Text>
            <Text
              style={[styles.headCell, styles.wDoneAt, styles.headCellLast]}
            >
              Tanggal Pengambilan Obat
            </Text>
          </View>

          {/* Body */}
          {rows.length === 0 ? (
            <View style={styles.bodyRow}>
              <Text
                style={[
                  styles.cell,
                  styles.cellLast,
                  { textAlign: "left", paddingLeft: 12, width: 659 },
                ]}
              >
                Tidak ada data pada bulan ini.
              </Text>
            </View>
          ) : (
            rows.map(({ p, i, ch, ci }, r) => {
              const isAlt = r % 2 === 1;
              return (
                <View
                  key={ch.id || `${i}-${ci}`}
                  style={[styles.bodyRow, isAlt ? styles.bodyRowAlt : {}]}
                >
                  {/* identity columns (filled only for the first row of each patient) */}
                  {ci === 0 ? (
                    <>
                      <Text style={[styles.cell, styles.wNo]}>{i + 1}</Text>
                      <Text
                        style={[
                          styles.cell,
                          styles.wNama,
                          { textAlign: "left" },
                        ]}
                      >
                        {maskName(p.name)}
                      </Text>
                      <Text
                        style={[
                          styles.cell,
                          styles.wWa,
                          styles.textTight,
                          styles.breakAll, // ← prevent overflow for digits
                        ]}
                      >
                        {p.no_whatsapp}
                      </Text>
                      <Text
                        style={[styles.cell, styles.wYear, styles.textTight]}
                      >
                        {p.year_of_diagnosis}
                      </Text>
                      <Text style={[styles.cell, styles.wSubRegion]}>
                        {p.sub_region}
                      </Text>
                      <Text style={[styles.cell, styles.wStaffName]}>
                        {p.staff_name}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={[styles.cell, styles.wNo]} />
                      <Text style={[styles.cell, styles.wNama]} />
                      <Text style={[styles.cell, styles.wWa]} />
                      <Text style={[styles.cell, styles.wYear]} />
                      <Text style={[styles.cell, styles.wSubRegion]} />
                      <Text style={[styles.cell, styles.wStaffName]} />
                    </>
                  )}

                  {/* Jadwal (also break-all) */}
                  <Text
                    style={[
                      styles.cell,
                      styles.wDate,
                      styles.textTight,
                      styles.breakAll, // ← dates won’t spill
                    ]}
                  >
                    {ch.date ? dayjs(ch.date).format("DD-MM-YYYY") : "-"}
                  </Text>

                  {/* Status */}
                  <Text
                    style={[
                      styles.cell,
                      styles.wStatus,
                      ch.status ? styles.statusDone : styles.statusPending,
                    ]}
                  >
                    {statusLabel(!!ch.status)}
                  </Text>

                  {/* Realisasi */}
                  <Text
                    style={[
                      styles.cell,
                      styles.wDoneAt,
                      styles.cellLast,
                      styles.textTight,
                      styles.breakAll,
                    ]}
                  >
                    {ch.status && ch.updatedAt
                      ? dayjs(ch.updatedAt).format("DD-MM-YYYY, HH.mm")
                      : "-"}
                  </Text>
                </View>
              );
            })
          )}
        </View>
      </Page>
    </Document>
  );
};
