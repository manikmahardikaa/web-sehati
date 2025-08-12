import { NextResponse } from "next/server";
import dayjs from "dayjs";
import "dayjs/locale/id";

import { CREATE_REPORT } from "@/app/providers/petugas-kesehatan/report";
import { GET_PATIENTS } from "@/app/providers/petugas-kesehatan/patient";
import { uploadPdfBufferToSupabase } from "@/app/utils/buffer-uploader";
import { generateMonthlyReportBuffer } from "@/app/utils/monthly-recapitulation-buffer";

export async function POST() {
  try {
    // 1. Generate PDF buffer
    const patients = await GET_PATIENTS();
    const buffer = await generateMonthlyReportBuffer(patients);
    const month = dayjs().locale("id").format("MMMM-YYYY");
    const filename = `report-recapitulation-patient-${month}.pdf`;

    // 2. Upload ke Supabase
    const url = await uploadPdfBufferToSupabase(buffer, filename);

    // 3. Simpan ke database
    const payload = {
      name: `Laporan Rekapitulasi Pasien - ${month}`,
      type_report: "MONTHLY_RECAPITULATION_PATIENT",
      report_url: url,
    };
    await CREATE_REPORT(payload);

    return NextResponse.json({
      success: true,
      message: "Report generated & uploaded!",
      report_url: url,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate/upload report",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
