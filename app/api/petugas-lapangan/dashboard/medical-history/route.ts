import { MedicationHistoryPayloadCreateModel } from "@/app/models/petugas-lapangan/medical-history";
import {
  CREATE_MEDICAL_HISTORY,
  GET_MEDICAL_HISTORIES,
} from "@/app/providers/petugas-lapangan/medical-history";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const patient_id = searchParams.get("patient_id");
    const data = await GET_MEDICAL_HISTORIES({
      user_id: patient_id!,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Successfully get users!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get users",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const payload: MedicationHistoryPayloadCreateModel = await req.json();

    const data = await CREATE_MEDICAL_HISTORY(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully registered!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
