import { PsikologiPayloadCreateModel } from "@/app/models/petugas-kesehatan/psikologi";
import {
  CREATE_PSIKOLOGI,
  GET_PSIKOLOGIS,
} from "@/app/providers/petugas-kesehatan/psikologi";

import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await GET_PSIKOLOGIS();
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
    const payload: PsikologiPayloadCreateModel = await req.json();

    const data = await CREATE_PSIKOLOGI(payload);

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
