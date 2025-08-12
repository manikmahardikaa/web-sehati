import { PatientPayloadCreateModel } from "@/app/models/petugas-lapangan/patient";
import {
  CREATE_PATIENT,
  GET_PATIENTS,
} from "@/app/providers/petugas-lapangan/patient";
import { authenticateRequest } from "@/app/utils/authUtils";

import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const user = await authenticateRequest();

  if (user instanceof NextResponse) {
    return user;
  }
  try {
    const data = await GET_PATIENTS({ user_id: user.id });
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
    const payload: PatientPayloadCreateModel = await req.json();

    const data = await CREATE_PATIENT(payload);

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
