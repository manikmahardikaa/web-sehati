import { ControllHistoryPayloadCreateModel } from "@/app/models/petugas-lapangan/controll-history";
import {
  CREATE_CONTROLL_HISTORY,
  GET_CONTROLL_HISTORIES,
} from "@/app/providers/petugas-lapangan/controll-history";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const patient_id = searchParams.get("patient_id");
    const data = await GET_CONTROLL_HISTORIES({ user_id: patient_id! });
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
    const payload: ControllHistoryPayloadCreateModel = await req.json();

    const data = await CREATE_CONTROLL_HISTORY(payload);

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
