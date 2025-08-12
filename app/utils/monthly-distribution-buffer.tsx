import { renderToBuffer } from "@react-pdf/renderer";
import MonthlyPatientReportPDF from "./monthly-report-distribution";
import dayjs from "dayjs";
import { PatientDataModel } from "../models/petugas-kesehatan/patient";
import { getReportData, ReportRow } from "./data-monthly-report-distribution";

// patients: PatientDataModel[]
export async function generateMonthlyReportBuffer(
  patients: PatientDataModel[]
) {
  const monthName = dayjs().format("MMMM");
  const year = dayjs().format("YYYY");
  const title = `Laporan Distribusi Pasien Per Wilayah Bulan ${monthName} Tahun ${year}`;
  const reportData: ReportRow[] = getReportData(patients);

  const pdfBuffer = await renderToBuffer(
    <MonthlyPatientReportPDF title={title} data={reportData} />
  );
  return pdfBuffer;
}
