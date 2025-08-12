import { GET_PATIENT } from "@/app/providers/program-wilayah/patient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; 
    const data = await GET_PATIENT(id);

    return NextResponse.json(
      { success: true, message: "Successfully get user!", result: data },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get user",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}