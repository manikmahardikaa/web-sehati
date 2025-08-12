import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";

// === COLORS ===
const BORDER_COLOR = "#b1b1b1";
const HEADER_BG = "#f8d7e7"; // Soft pink like your sample
const CELL_BG = "#fff";

// === STYLES ===
const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 11, fontFamily: "Helvetica" },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  infoRow: { marginBottom: 4, flexDirection: "row" },
  label: { width: 110, fontWeight: 600 },
  value: { fontWeight: 400 },
  table: {
    display: "table",
    width: "auto",
    marginTop: 18,
    borderRadius: 7,
    border: `1.2px solid ${BORDER_COLOR}`,
    overflow: "hidden",
  },
  tableRow: { flexDirection: "row", alignItems: "center", minHeight: 22 },
  th: {
    backgroundColor: HEADER_BG,
    border: `1px solid ${BORDER_COLOR}`,
    fontWeight: "bold",
    fontSize: 11.5,
    padding: 6,
    textAlign: "center",
    minWidth: 70,
  },
  td: {
    backgroundColor: CELL_BG,
    border: `1px solid ${BORDER_COLOR}`,
    padding: 6,
    fontSize: 11,
    textAlign: "center",
    minWidth: 70,
    wordBreak: "break-word",
  },
  tdXL: { minWidth: 120 },
  tdNo: { minWidth: 34 },
});

function getControlStatusLabel(status: boolean) {
  return status ? "Sudah Melakukan Kontrol" : "Belum Melakukan Kontrol";
}

export interface PatientMedicationReport {
  name: string;
  no_whatsapp: string;
  year_of_diagnosis: number;
  medicationHistory: {
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
  subDistrictName: string;
  printDate: string;
  data: PatientMedicationReport[];
};

export const PatientMedicationPDFDoc: React.FC<Props> = ({
  month,
  year,
  subDistrictName,
  staffName,
  printDate,
  data,
}) => {
  const monthName = dayjs()
    .month(month - 1)
    .locale("id")
    .format("MMMM");

  // Flatten data for table rows
  const flattenedRows: {
    p: PatientMedicationReport;
    i: number;
    ch: PatientMedicationReport["medicationHistory"][number];
    ci: number;
  }[] = [];
  data.forEach((p, i) =>
    (p.medicationHistory || []).forEach((ch, ci) =>
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
          <Text style={styles.label}>Wilayah :</Text>
          <Text style={styles.value}>{subDistrictName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tanggal Cetak :</Text>
          <Text style={styles.value}>{printDate}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.th, styles.tdNo]}>No</Text>
            <Text style={[styles.th, styles.tdXL]}>Nama Pasien</Text>
            <Text style={styles.th}>No. WhatsApp</Text>
            <Text style={styles.th}>Tahun Diagnosa</Text>
            <Text style={styles.th}>Jadwal Kontrol</Text>
            <Text style={styles.th}>Status Kontrol</Text>
            <Text style={styles.th}>Tanggal Kontrol</Text>
          </View>
          {flattenedRows.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={[styles.td, { flex: 7, textAlign: "left" }]}>
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
                    <Text style={[styles.td, styles.tdNo]}></Text>
                    <Text style={[styles.td, styles.tdXL]}></Text>
                    <Text style={styles.td}></Text>
                    <Text style={styles.td}></Text>
                  </>
                )}
                <Text style={styles.td}>
                  {ch.date ? dayjs(ch.date).format("DD-MM-YYYY") : "-"}
                </Text>
                <Text style={styles.td}>
                  {getControlStatusLabel(!!ch.status)}
                </Text>
                <Text style={styles.td}>
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
