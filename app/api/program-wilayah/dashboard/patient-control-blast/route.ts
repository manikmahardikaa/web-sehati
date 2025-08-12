import { WaBlastPatientControlPayloadCreateModel } from "@/app/models/program-wilayah/patient-control-blast";
import {
  CREATE_CONTROL_PATIENT_BLAST,
  GET_CONTROL_PATIENT_BLASTS,
} from "@/app/providers/program-wilayah/patient-control-blast";

import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await GET_CONTROL_PATIENT_BLASTS();
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
    const payload: WaBlastPatientControlPayloadCreateModel = await req.json();

    const data = await CREATE_CONTROL_PATIENT_BLAST(payload);

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
