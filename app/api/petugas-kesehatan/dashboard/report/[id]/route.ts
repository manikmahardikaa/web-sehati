import {
  DELETE_REPORT,
  GET_REPORT,
} from "@/app/providers/petugas-kesehatan/report";
import { deleteSupabasePdf } from "@/app/utils/delete-content-supabase";
import { NextRequest, NextResponse } from "next/server";

const BUCKET = "web-sehati";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const report = await GET_REPORT(id);
    if (report?.report_url) {
      await deleteSupabasePdf(BUCKET, report.report_url);
    }
    const data = await DELETE_REPORT(id);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully deleted!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
