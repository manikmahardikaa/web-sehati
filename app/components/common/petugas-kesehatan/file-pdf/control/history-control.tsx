import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";
import maskName from "@/app/utils/mask-name";

// ==== Colors ====
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
// function statusLabel(status: boolean) {
//   return status ? "Sudah Mengambil Obat" : "Belum Mengambil Obat";
// }

// ==== Types ====
export interface PatientControlReport {
  patient_id: string
  name: string;
  no_whatsapp: string;
  sub_region?: string;
  staff_name?: string;
  year_of_diagnosis: number;
  controlHistory: {
    id: string;
    date: string; // jadwal kontrol
    status: boolean; // true jika terlaksana
    updatedAt?: string; // tanggal realisasi
  }[];
}

function makePatientKey(p: PatientControlReport): string {
  if (p.patient_id) return p.patient_id;
  return [
    p.name?.trim() ?? "",
    p.no_whatsapp?.trim() ?? "",
    String(p.year_of_diagnosis ?? ""),
    p.sub_region?.trim() ?? "",
    p.staff_name?.trim() ?? "",
  ].join("::");
}

function groupByPatient(data: PatientControlReport[]) {
  const map = new Map<
    string,
    {
      name: string;
      no_whatsapp: string;
      year_of_diagnosis: number;
      sub_region?: string;
      staff_name?: string;
      history: PatientControlReport["controlHistory"];
    }
  >();

  for (const p of data) {
    const key = makePatientKey(p);
    if (!map.has(key)) {
      map.set(key, {
        name: p.name,
        no_whatsapp: p.no_whatsapp,
        year_of_diagnosis: p.year_of_diagnosis,
        sub_region: p.sub_region,
        staff_name: p.staff_name,
        history: [],
      });
    }
    const bucket = map.get(key)!;
    // append all history rows (keep original order)
    for (const h of p.controlHistory || []) {
      bucket.history.push(h);
    }
  }

  // Optionally sort inside group by date ascending
  for (const g of map.values()) {
    g.history.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
  }

  return Array.from(map.values());
}



type Props = {
  month: number; // 1-12
  year: number;
  regionName?: string;
  printDate: string; // string yang sudah terformat (mis. "8 August 2025")
  data: PatientControlReport[];
};

// ==== Component ====
export const PatientControlPDFDoc: React.FC<Props> = ({
  month,
  year,
  regionName,
  printDate,
  data,
}) => {
  const monthName = dayjs()
    .locale("id")
    .month(month - 1)
    .format("MMMM");

    const groups = groupByPatient(data);

  const rows: {
    p: PatientControlReport;
    i: number; // index pasien
    ch: PatientControlReport["controlHistory"][number];
    ci: number; // index history per pasien
  }[] = [];
  data.forEach((p, i) =>
    (p.controlHistory || []).forEach((ch, ci) => rows.push({ p, i, ch, ci }))
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
          <Text style={styles.value}>{regionName}</Text>
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
          {groups.length === 0 ? (
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
            groups.map((g, groupIndex) =>
              g.history.map((h, idx) => {
                const isAlt = (groupIndex + idx) % 2 === 1;
                const showIdentity = idx === 0; // only first row shows merged identity cells
                return (
                  <View
                    key={h.id}
                    style={[styles.bodyRow, isAlt ? styles.bodyRowAlt : {}]}
                  >
                    {/* Merged identity cells */}
                    {showIdentity ? (
                      <>
                        <Text style={[styles.cell, styles.wNo]}>
                          {groupIndex + 1}
                        </Text>
                        <Text
                          style={[
                            styles.cell,
                            styles.wNama,
                            { textAlign: "left" },
                          ]}
                        >
                          {maskName(g.name)}
                        </Text>
                        <Text
                          style={[
                            styles.cell,
                            styles.wWa,
                            styles.textTight,
                            styles.breakAll,
                          ]}
                        >
                          {g.no_whatsapp}
                        </Text>
                        <Text
                          style={[styles.cell, styles.wYear, styles.textTight]}
                        >
                          {g.year_of_diagnosis}
                        </Text>
                        <Text style={[styles.cell, styles.wSubRegion]}>
                          {g.sub_region ?? "-"}
                        </Text>
                        <Text style={[styles.cell, styles.wStaffName]}>
                          {g.staff_name ?? "-"}
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

                    {/* Per-history cells */}
                    <Text
                      style={[
                        styles.cell,
                        styles.wDate,
                        styles.textTight,
                        styles.breakAll,
                      ]}
                    >
                      {h.date ? dayjs(h.date).format("DD-MM-YYYY") : "-"}
                    </Text>

                    <Text
                      style={[
                        styles.cell,
                        styles.wStatus,
                        h.status ? styles.statusDone : styles.statusPending,
                      ]}
                    >
                      {h.status
                        ? "Sudah Mengambil Obat"
                        : "Belum Mengambil Obat"}
                    </Text>

                    <Text
                      style={[
                        styles.cell,
                        styles.wDoneAt,
                        styles.cellLast,
                        styles.textTight,
                        styles.breakAll,
                      ]}
                    >
                      {h.status && h.updatedAt
                        ? dayjs(h.updatedAt).format("DD-MM-YYYY, HH.mm")
                        : "-"}
                    </Text>
                  </View>
                );
              })
            )
          )}
        </View>
      </Page>
    </Document>
  );
};
