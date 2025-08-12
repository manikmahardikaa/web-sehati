
import { RegionPayloadCreateModel } from "@/app/models/admin/region";
import { CREATE_REGION, GET_REGIONS } from "@/app/providers/admin/region";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await GET_REGIONS();
    return NextResponse.json(
      {
        success: true,
        message: "Successfully get regions!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { 
        success: false,
        message: "Failed to get regions",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const payload: RegionPayloadCreateModel = await req.json();

    const data = await CREATE_REGION(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully created!",
        result: data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create region",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
