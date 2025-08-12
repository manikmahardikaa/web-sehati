import { GET_PATIENTS } from "@/app/providers/program-wilayah/patient";
import { authenticateRequest } from "@/app/utils/authUtils";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await authenticateRequest();

  if (user instanceof NextResponse) {
    return user;
  }
  try {
    const data = await GET_PATIENTS({ user_id: user.id });
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
