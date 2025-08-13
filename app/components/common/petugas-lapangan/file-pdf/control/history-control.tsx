import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";

// === COLORS ===
const BORDER_COLOR = "#b1b1b1";
const HEADER_BG = "#f8d7e7";
const CELL_BG = "#fff";

// === STYLES ===
const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 11, fontFamily: "Helvetica" },

  title: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 14,
    letterSpacing: 0.2,
    fontFamily: "Helvetica-Bold", // gunakan font-family bold (fontWeight sering diabaikan)
  },

  infoRow: { marginBottom: 4, flexDirection: "row" },
  label: { width: 110, fontFamily: "Helvetica-Bold" },
  value: {},

  // TABLE CONTAINER (tanpa display: "table")
  table: {
    width: "100%",
    marginTop: 18,
    borderStyle: "solid",
    borderWidth: 1.2,
    borderColor: BORDER_COLOR,
    borderRadius: 7,
    overflow: "hidden",
  },

  // ROW pakai flex
  tableRow: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 22,
  },

  // HEADER CELL
  th: {
    backgroundColor: HEADER_BG,
    padding: 6,
    fontSize: 11.5,
    textAlign: "center",
    minWidth: 70,

    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: BORDER_COLOR,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,

    fontFamily: "Helvetica-Bold",
  },

  // BODY CELL
  td: {
    backgroundColor: CELL_BG,
    padding: 6,
    fontSize: 11,
    textAlign: "center",
    minWidth: 70,

    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: BORDER_COLOR,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },

  tdXL: { minWidth: 120 },
  tdNo: { minWidth: 34 },

  // Utility: hilangkan right border pada cell terakhir biar border dobel tidak nampak
  noRightBorder: {
    borderRightWidth: 0,
  },
});

function getControlStatusLabel(status: boolean) {
  return status ? "Sudah Melakukan Kontrol" : "Belum Melakukan Kontrol";
}

export interface PatientControlReport {
  name: string;
  no_whatsapp: string;
  year_of_diagnosis: number;
  controlHistory: {
    id: string;
    date: string;
    status: boolean;
    updatedAt?: string;
  }[];
}

type Props = {
  month: number; // 1-12
  year: number;
  staffName: string;
  printDate: string;
  data: PatientControlReport[];
};

export const PatientControlPDFDoc: React.FC<Props> = ({
  month,
  year,
  staffName,
  printDate,
  data,
}) => {
  const monthName = dayjs()
    .month(month - 1)
    .locale("id")
    .format("MMMM");

  // Flatten rows
  const flattenedRows: {
    p: PatientControlReport;
    i: number;
    ch: PatientControlReport["controlHistory"][number];
    ci: number;
  }[] = [];
  data.forEach((p, i) =>
    (p.controlHistory || []).forEach((ch, ci) =>
      flattenedRows.push({ p, i, ch, ci })
    )
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Laporan Riwayat Kontrol Pasien Bulan {monthName} {year}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Nama Petugas :</Text>
          <Text style={styles.value}>{staffName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tanggal Cetak :</Text>
          <Text style={styles.value}>{printDate}</Text>
        </View>

        {/* TABLE */}
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.th, styles.tdNo]}>No</Text>
            <Text style={[styles.th, styles.tdXL]}>Nama Pasien</Text>
            <Text style={styles.th}>No. WhatsApp</Text>
            <Text style={styles.th}>Tahun Diagnosa</Text>
            <Text style={styles.th}>Jadwal Kontrol</Text>
            <Text style={styles.th}>Status Kontrol</Text>
            <Text style={[styles.th, styles.noRightBorder]}>
              Tanggal Kontrol
            </Text>
          </View>

          {/* Body */}
          {flattenedRows.length === 0 ? (
            <View style={styles.tableRow}>
              <Text
                style={[
                  styles.td,
                  styles.noRightBorder,
                  { flex: 7, textAlign: "left" },
                ]}
              >
                Tidak ada data pada bulan ini.
              </Text>
            </View>
          ) : (
            flattenedRows.map(({ p, i, ch, ci }) => (
              <View style={styles.tableRow} key={ch.id || `${i}-${ci}`}>
                {ci === 0 ? (
                  <>
                    <Text style={[styles.td, styles.tdNo]}>{i + 1}</Text>
                    <Text style={[styles.td, styles.tdXL]}>{p.name}</Text>
                    <Text style={styles.td}>{p.no_whatsapp}</Text>
                    <Text style={styles.td}>{p.year_of_diagnosis}</Text>
                  </>
                ) : (
                  <>
                    <Text style={[styles.td, styles.tdNo]}>{""}</Text>
                    <Text style={[styles.td, styles.tdXL]}>{""}</Text>
                    <Text style={styles.td}>{""}</Text>
                    <Text style={styles.td}>{""}</Text>
                  </>
                )}

                <Text style={styles.td}>
                  {ch.date ? dayjs(ch.date).format("DD-MM-YYYY") : "-"}
                </Text>
                <Text style={styles.td}>
                  {getControlStatusLabel(!!ch.status)}
                </Text>
                <Text style={[styles.td, styles.noRightBorder]}>
                  {ch.status && ch.updatedAt
                    ? dayjs(ch.updatedAt).format("DD-MM-YYYY, HH.mm")
                    : "-"}
                </Text>
              </View>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
};
