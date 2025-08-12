import { GET_MONTHLY_PATIENTS } from "@/app/providers/program-wilayah/patient";
import { authenticateRequest } from "@/app/utils/authUtils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await authenticateRequest();
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  if (user instanceof NextResponse) {
    return user;
  }
  try {
    const data = await GET_MONTHLY_PATIENTS({
      user_id: user.id,
      year: Number(year!),
    });
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
