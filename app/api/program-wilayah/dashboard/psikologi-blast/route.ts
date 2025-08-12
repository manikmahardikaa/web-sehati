
import { WaBlastPsikologiPayloadCreateModel } from "@/app/models/program-wilayah/psikologi-blast";
import { CREATE_BLAST_PSIKOLOG, GET_BLAST_PSIKOLOGS } from "@/app/providers/program-wilayah/psikologi-blast";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await GET_BLAST_PSIKOLOGS();
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
    const payload: WaBlastPsikologiPayloadCreateModel = await req.json();

    const data = await CREATE_BLAST_PSIKOLOG(payload);

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
