import {
  FilmPayloadCreateModel,
  FilmPayloadUpdateModel,
} from "@/app/models/admin/film";
import { db } from "@/lib/prisma";

export const GET_FILMS = async () => {
  const result = await db.film.findMany({
    include: {
      surveys: {
        include: {
          options: true,
        },
      },
    },
  });
  return result;
};

export const GET_FILM = async (id: string) => {
  const result = await db.film.findUnique({
    where: {
      id,
    },
    include: {
      surveys: {
        include: {
          options: true,
        },
      },
    },
  });
  return result;
};
export const CREATE_FILM = async (payload: FilmPayloadCreateModel) => {
  const result = await db.film.create({
    data: payload,
    include: {
      surveys: {
        include: {
          options: true,
        },
      },
    },
  });

  return result;
};

export const UPDATE_FILM = async (
  id: string,
  payload: FilmPayloadUpdateModel
) => {
  // Transform payload sesuai struktur Prisma
  const transformedPayload = {
    ...payload,
    surveys: {
      update: (payload.surveys.update ?? []).map((survey) => ({
        where: { id: survey.id },
        data: {
          question: survey.question,
          time: survey.time,
          options: {
            update: (survey.options.update ?? []).map((option) => ({
              where: { id: option.id },
              data: {
                text: option.text,
                isCorrect: option.isCorrect,
              },
            })),
          },
        },
      })),
    },
  };

  // Lakukan update di Prisma
  return db.film.update({
    where: { id },
    data: transformedPayload,
    include: {
      surveys: {
        include: { options: true },
      },
    },
  });
};

export const DELETE_FILM = async (id: string) => {
  const result = await db.film.delete({
    where: {
      id,
    },
  });
  return result;
};
