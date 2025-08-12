import {
  ContentCreatorPayloadCreateModel,
  ContentCreatorPayloadUpdateModel,
} from "@/app/models/admin/content-creator";
import { db } from "@/lib/prisma";

export const GET_CONTENT_CREATORS = async () => {
  const result = await db.contentCreator.findMany();
  return result;
};
export const CREATE_CONTENT_CREATOR = async (
  payload: ContentCreatorPayloadCreateModel
) => {
  const result = await db.contentCreator.create({
    data: payload,
  });

  return result;
};

export const UPDATE_CONTENT_CREATOR = async (
  id: string,
  payload: ContentCreatorPayloadUpdateModel
) => {
  const result = await db.contentCreator.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_CONTENT_CREATOR = async (id: string) => {
  const result = await db.contentCreator.delete({
    where: {
      id,
    },
  });
  return result;
};
