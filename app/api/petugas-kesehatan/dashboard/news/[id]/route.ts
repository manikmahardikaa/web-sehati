import { NewsPayloadUpdateModel } from "@/app/models/petugas-kesehatan/news";
import {
  DELETE_NEWS,
  GET_NEWS_BY_ID,
  UPDATE_NEWS,
} from "@/app/providers/petugas-kesehatan/news";
import { deleteSupabaseImage } from "@/app/utils/delete-content-supabase";
import { NextRequest, NextResponse } from "next/server";

const BUCKET = "web-sehati";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const payload: NewsPayloadUpdateModel = await req.json();

    const data = await UPDATE_NEWS(id, payload);

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

    const news = await GET_NEWS_BY_ID(id);
    if (news?.thumbnail_url) {
      await deleteSupabaseImage(BUCKET, news.thumbnail_url);
    }
    const data = await DELETE_NEWS(id);

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
