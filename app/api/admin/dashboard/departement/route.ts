
import { DepartementPayloadCreateModel } from "@/app/models/admin/departement";
import {
  CREATE_DEPARTEMENT,
  GET_DEPARTEMENTS,
} from "@/app/providers/admin/departement";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await GET_DEPARTEMENTS();
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
    const payload: DepartementPayloadCreateModel = await req.json();

    const data = await CREATE_DEPARTEMENT(payload);

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
