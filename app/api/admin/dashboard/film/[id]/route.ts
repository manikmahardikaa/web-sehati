import { FilmPayloadUpdateModel } from "@/app/models/admin/film";
import { DELETE_FILM, GET_FILM, UPDATE_FILM } from "@/app/providers/admin/film";
import { deleteSupabaseImage } from "@/app/utils/delete-content-supabase";
import { NextRequest, NextResponse } from "next/server";

const BUCKET = "web-sehati";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const payload: FilmPayloadUpdateModel = await req.json();

    const data = await UPDATE_FILM(id, payload);

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
        message: "Failed to update film",
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

    const film = await GET_FILM(id);
    if (film?.thumbnail_url) {
      await deleteSupabaseImage(BUCKET, film.thumbnail_url);
    }

    const data = await DELETE_FILM(id);

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
