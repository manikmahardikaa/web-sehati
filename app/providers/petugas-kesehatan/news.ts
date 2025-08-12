import {
  NewsPayloadCreateModel,
  NewsPayloadUpdateModel,
} from "@/app/models/petugas-kesehatan/news";
import { db } from "@/lib/prisma";

export const GET_NEWS = async () => {
  const result = await db.news.findMany();
  return result;
};
export const CREATE_NEWS = async (payload: NewsPayloadCreateModel) => {
  const result = await db.news.create({
    data: payload,
  });

  return result;
};

export const GET_NEWS_BY_ID = async (id: string) => {
  const result = await db.news.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UPDATE_NEWS = async (
  id: string,
  payload: NewsPayloadUpdateModel
) => {
  const result = await db.news.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_NEWS = async (id: string) => {
  const result = await db.news.delete({
    where: {
      id,
    },
  });
  return result;
};
