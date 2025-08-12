import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export const authenticateRequest = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: 401, message: "Unauthorized: You must be logged in" },
      { status: 401 }
    );
  }

  return session.user;
};
