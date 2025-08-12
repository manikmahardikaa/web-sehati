// components/common/patient-detail-pdf.tsx
import { PatientDataModel } from "@/app/models/petugas-kesehatan/patient";
import maskName from "@/app/utils/mask-name";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

// Font.register({ family: 'Poppins', src: 'URL_FONT' }) // kalau mau custom font

interface HistoryItem {
  id: string;
  date: string;
  status: boolean;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: "center",
    color: "#C30010",
  },
  card: {
    borderRadius: 10,
    border: "1px solid #fae6e8",
    padding: 12,
    marginBottom: 22,
  },
  infoTable: {
    marginVertical: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    borderBottom: "1px solid #f1f1f1",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  infoLabel: {
    width: 120,
    color: "#C30010",
    fontWeight: 700,
    marginRight: 10,
  },
  infoValue: {
    flex: 1,
    fontWeight: 500,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 10,
    color: "#C30010",
  },
  table: {
    marginVertical: 6,
    borderRadius: 7,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#fae6e8",
    fontWeight: 700,
    fontSize: 13,
  },
  tableCell: {
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #f2f2f2",
  },
  tagGreen: {
    color: "#41a83c",
    fontWeight: 700,
    fontSize: 11,
  },
  tagOrange: {
    color: "#f89f1b",
    fontWeight: 700,
    fontSize: 11,
  },
});

function formatTanggal(dateStr?: string | null) {
  if (!dateStr) return "-";
  return dayjs(dateStr).format("DD-MM-YYYY");
}

export function PatientDetailPDF({
  detailPatient,
}: {
  detailPatient: PatientDataModel;
}) {
  const controllHistory = detailPatient.controllHistory || [];
  const medicationHistory = detailPatient.medicationHistory || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Informasi Detail Pasien</Text>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.infoTable}>
            {[
              ["Nama Lengkap", maskName(detailPatient.name || "-")],
              ["Alamat", maskName(detailPatient.street || "-")],
              [
                "Tanggal Lahir",
                maskName(formatTanggal(detailPatient.birth_date)),
              ],
              ["No. WhatsApp", detailPatient.no_whatsapp || "-"],
              ["Tahun Diagnosa", detailPatient.year_of_diagnosis || "-"],
              [
                "Jenis Kelamin",
                detailPatient.gender === "LAKI_LAKI"
                  ? "Laki-laki"
                  : detailPatient.gender === "PEREMPUAN"
                  ? "Perempuan"
                  : "-",
              ],
              [
                "Wilayah",
                detailPatient.petugas_lapangan.authority?.region?.name,
              ],
              ["Nama Petugas", detailPatient.petugas_lapangan.authority?.name],
            ].map(([label, val]) => (
              <View key={label} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{val}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Jadwal Kontrol */}
        <Text style={styles.sectionTitle}>Jadwal Kontrol</Text>
        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}>No</Text>
            <Text style={styles.tableCell}>Tanggal Kontrol</Text>
            <Text style={styles.tableCell}>Status</Text>
          </View>
          {controllHistory.length === 0 && (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                Belum ada data kontrol
              </Text>
            </View>
          )}
          {controllHistory.map((row: any, idx: number) => (
            <View style={styles.tableRow} key={row.id}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>{idx + 1}</Text>
              <Text style={styles.tableCell}>
                {formatTanggal(
                  row.date instanceof Date ? row.date.toISOString() : row.date
                )}
              </Text>
              <Text style={row.status ? styles.tagGreen : styles.tagOrange}>
                {row.status
                  ? "Sudah melakukan kontrol"
                  : "Belum melakukan kontrol"}
              </Text>
            </View>
          ))}
        </View>

        {/* Jadwal Pengambilan Obat */}
        <Text style={styles.sectionTitle}>Jadwal Pengambilan Obat</Text>
        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}>No</Text>
            <Text style={styles.tableCell}>Tanggal Kontrol</Text>
            <Text style={styles.tableCell}>Status</Text>
          </View>
          {medicationHistory.length === 0 && (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                Belum ada data pengambilan obat
              </Text>
            </View>
          )}
          {medicationHistory.map((row: any, idx: number) => (
            <View style={styles.tableRow} key={row.id}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>{idx + 1}</Text>
              <Text style={styles.tableCell}>{formatTanggal(row.date)}</Text>
              <Text style={row.status ? styles.tagGreen : styles.tagOrange}>
                {row.status ? "Sudah mengambil obat" : "Belum mengambil obat"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
