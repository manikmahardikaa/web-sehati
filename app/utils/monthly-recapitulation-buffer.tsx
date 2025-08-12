import { renderToBuffer } from "@react-pdf/renderer";

import dayjs from "dayjs";
import { PatientDataModel } from "../models/petugas-kesehatan/patient";

import ComplianceReportPDF from "./monthly-report-recaputaltion";
import {
  ComplianceRow,
  getComplianceReportRows,
} from "./data-monthly-report-recapitulation";

// patients: PatientDataModel[]
export async function generateMonthlyReportBuffer(
  patients: PatientDataModel[]
) {
  const monthName = dayjs().format("MMMM");
  const year = dayjs().format("YYYY");
  const title = `Laporan Rekapitulasi Pasien Per Wilayah Bulan ${monthName} Tahun ${year}`;
  const reportData: ComplianceRow[] = getComplianceReportRows(patients);

  const pdfBuffer = await renderToBuffer(
    <ComplianceReportPDF title={title} data={reportData} />
  );
  return pdfBuffer;
}
