import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles mirip dengan gambar
const styles = StyleSheet.create({
  page: { padding: 24, fontFamily: "Helvetica" },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e2bcbc",
    borderRadius: 7,
    overflow: "hidden",
  },
  tableRow: { flexDirection: "row" },
  tableHeader: {
    backgroundColor: "#f6eaea",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  cell: {
    borderRight: "1px solid #e1cfcf",
    borderBottom: "1px solid #e1cfcf",
    padding: 7,
    fontSize: 11,
    textAlign: "center",
    flexGrow: 1,
    flexBasis: 0,
  },
  headerCell: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    color: "#c30010",
    backgroundColor: "#f6eaea",
    fontSize: 11.5,
    padding: 7,
  },
  firstCell: {
    borderLeft: "1px solid #e1cfcf",
  },
  lastCell: {
    borderRight: "1px solid #e1cfcf",
  },
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
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.headerCell, styles.firstCell]}>
              Petugas Lapangan
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>Nama Pasien</Text>
            <Text style={styles.cell}>Total Jadwal Kontrol</Text>
            <Text style={styles.cell}>Total Kontrol Terlaksana</Text>
            <Text style={styles.cell}>Total Jadwal Pengambilan Obat</Text>
            <Text style={styles.cell}>Total Pengambilan Obat Terlaksana</Text>
            <Text style={[styles.cell, styles.headerCell, styles.lastCell]}>
              Persentase Kepatuhan (%)
            </Text>
          </View>
          {/* Table Rows */}
          {data.map((row, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={[styles.cell, styles.firstCell]}>{row.officer}</Text>
              <Text style={styles.cell}>{row.patientName}</Text>
              <Text style={styles.cell}>{row.jadwalKontrol}</Text>
              <Text style={styles.cell}>{row.kontrolTerlaksana}</Text>
              <Text style={styles.cell}>{row.jadwalObat}</Text>
              <Text style={styles.cell}>{row.obatTerlaksana}</Text>
              <Text style={[styles.cell, styles.lastCell]}>
                {row.compliance}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
