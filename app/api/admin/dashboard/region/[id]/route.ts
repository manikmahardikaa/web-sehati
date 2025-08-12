import { RegionPayloadUpdateModel } from "@/app/models/admin/region";
import { DELETE_REGION, UPDATE_REGION } from "@/app/providers/admin/region";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const payload: RegionPayloadUpdateModel = await req.json();

    const data = await UPDATE_REGION(id, payload);

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

    const data = await DELETE_REGION(id);

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
