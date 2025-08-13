import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Custom styles for professional table layout
const styles = StyleSheet.create({
  page: { padding: 28, fontFamily: "Helvetica" },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
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
  tableHeader: {
    backgroundColor: "#f6eaea", // Soft red-pink
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
  },
  firstCell: {
    borderLeft: "1px solid #e1cfcf",
  },
  lastCell: {
    borderRight: "1px solid #e1cfcf",
  },
});

type RowData = {
  wilayah: string;
  subWilayah: string;
  jumlah: number;
  kontrol: string;
  obat: string;
  cekBulanan: string;
  cek3Bulanan: string;
};

export default function MonthlyPatientReportPDF({
  title,
  data,
}: {
  title: string;
  data: RowData[];
}) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.headerCell, styles.firstCell]}>
              Wilayah
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.firstCell]}>
              Sub Wilayah
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>Jumlah Pasien</Text>
            <Text style={[styles.cell, styles.headerCell]}>
              Sudah Melakukan Kontrol (%)
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>
              Sudah Mengambil Obat (%)
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>
              Sudah Melakukan Cek Bulanan (%)
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.lastCell]}>
              Sudah Melakukan Cek 3 Bulanan (%)
            </Text>
          </View>
          {/* Table Rows */}
          {data.map((row, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={[styles.cell, styles.firstCell]}>{row.wilayah}</Text>
              <Text style={[styles.cell, styles.firstCell]}>{row.subWilayah}</Text>
              <Text style={styles.cell}>{row.jumlah}</Text>
              <Text style={styles.cell}>{row.kontrol}</Text>
              <Text style={styles.cell}>{row.obat}</Text>
              <Text style={styles.cell}>{row.cekBulanan}</Text>
              <Text style={[styles.cell, styles.lastCell]}>
                {row.cek3Bulanan}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
