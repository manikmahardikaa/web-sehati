import { MedicationHistoryPayloadUpdateModel } from "@/app/models/petugas-lapangan/medical-history";
import {
  DELETE_MEDICAL_HISTORY,
  UPDATE_MEDICAL_HISTORY,
  UPDATE_MEDICAL_HISTORY_STATUS,
} from "@/app/providers/petugas-lapangan/medical-history";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const controll = await db.medicationHistory.findUnique({
      where: { id: params.id },
    });

    if (!controll) {
      return NextResponse.json(
        { success: false, message: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, result: controll },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const payload: MedicationHistoryPayloadUpdateModel = await req.json();

    const data = await UPDATE_MEDICAL_HISTORY(id, payload);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully updated!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const body = await req.json();
    const status = body.status; // Ambil status dari objek

    // Validasi tipe data (optional)
    if (typeof status !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status value. Must be boolean.",
        },
        { status: 400 }
      );
    }

    const data = await UPDATE_MEDICAL_HISTORY_STATUS(id, status);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully updated!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const data = await DELETE_MEDICAL_HISTORY(id);

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
