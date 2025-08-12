import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 24, fontFamily: "Helvetica" },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 18,
    fontFamily: "Helvetica-Bold",
  },
  table: {
    width: "100%",
    marginTop: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e2bcbc",
    borderRadius: 7,
  },
  tableRow: { flexDirection: "row" },

  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f6eaea",
  },

  cell: {
    padding: 7,
    fontSize: 11,
    textAlign: "center",
    flexGrow: 1,
    // borders (react-pdf style)
    borderRightWidth: 1,
    borderRightColor: "#e1cfcf",
    borderBottomWidth: 1,
    borderBottomColor: "#e1cfcf",
  },

  headerCell: {
    padding: 7,
    fontSize: 11.5,
    color: "#c30010",
    fontFamily: "Helvetica-Bold",
    borderRightWidth: 1,
    borderRightColor: "#e1cfcf",
    borderBottomWidth: 1,
    borderBottomColor: "#e1cfcf",
  },

  firstCell: {
    borderLeftWidth: 1,
    borderLeftColor: "#e1cfcf",
  },
  lastCell: {
    borderRightWidth: 1,
    borderRightColor: "#e1cfcf",
  },

  // Optional: kontrol lebar relatif
  colWide: { flexGrow: 1.2 },
  colNarrow: { flexGrow: 0.8 },
});

type ComplianceRowData = {
  officer: string;
  patientName: string;
  jadwalKontrol: number;
  kontrolTerlaksana: number;
  jadwalObat: number;
  obatTerlaksana: number;
  compliance: string;
};

export default function ComplianceReportPDF({
  title,
  data,
}: {
  title: string;
  data: ComplianceRowData[];
}) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.headerCell, styles.firstCell, styles.colWide]}>
              Petugas Lapangan
            </Text>
            <Text style={[styles.headerCell, styles.colWide]}>Nama Pasien</Text>
            <Text style={[styles.headerCell, styles.colNarrow]}>
              Total Jadwal Kontrol
            </Text>
            <Text style={[styles.headerCell, styles.colNarrow]}>
              Total Kontrol Terlaksana
            </Text>
            <Text style={[styles.headerCell, styles.colNarrow]}>
              Total Jadwal Pengambilan Obat
            </Text>
            <Text style={[styles.headerCell, styles.colNarrow]}>
              Total Pengambilan Obat Terlaksana
            </Text>
            <Text
              style={[styles.headerCell, styles.lastCell, styles.colNarrow]}
            >
              Persentase Kepatuhan (%)
            </Text>
          </View>

          {/* Rows */}
          {data.map((row, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={[styles.cell, styles.firstCell, styles.colWide]}>
                {row.officer}
              </Text>
              <Text style={[styles.cell, styles.colWide]}>
                {row.patientName}
              </Text>
              <Text style={[styles.cell, styles.colNarrow]}>
                {row.jadwalKontrol}
              </Text>
              <Text style={[styles.cell, styles.colNarrow]}>
                {row.kontrolTerlaksana}
              </Text>
              <Text style={[styles.cell, styles.colNarrow]}>
                {row.jadwalObat}
              </Text>
              <Text style={[styles.cell, styles.colNarrow]}>
                {row.obatTerlaksana}
              </Text>
              <Text style={[styles.cell, styles.lastCell, styles.colNarrow]}>
                {row.compliance}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
