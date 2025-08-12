import { ControllHistoryPayloadUpdateModel } from "@/app/models/petugas-lapangan/controll-history";
import { DELETE_CONTROLL_HISTORY, UPDATE_CONTROLL_HISTORY, UPDATE_CONTROLL_HISTORY_STATUS } from "@/app/providers/petugas-lapangan/controll-history";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const controll = await db.controllHistory.findUnique({
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
    return NextResponse.json({
      success: false,
      message: "Failed to update user",
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const payload: ControllHistoryPayloadUpdateModel = await req.json();

    const data = await UPDATE_CONTROLL_HISTORY(id, payload);

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

    const data = await UPDATE_CONTROLL_HISTORY_STATUS(id, status);

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

    const data = await DELETE_CONTROLL_HISTORY(id);

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
