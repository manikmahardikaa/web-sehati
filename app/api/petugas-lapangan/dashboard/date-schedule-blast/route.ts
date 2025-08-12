import { GET_ALL_HISTORY_DATES } from "@/app/controller/petugas-lapangan/cell-render-schedule";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await GET_ALL_HISTORY_DATES();
    return NextResponse.json(
      {
        success: true,
        message: "Successfully get data!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get data",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
