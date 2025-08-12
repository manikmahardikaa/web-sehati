import {
  PocketBookPayloadCreateModel,
  PocketBookPayloadUpdateModel,
} from "@/app/models/admin/pocket-book";
import { db } from "@/lib/prisma";

export const GET_POCKET_BOOKS = async () => {
  const result = await db.pocketBook.findMany();
  return result;
};

export const GET_POCKET_BOOK = async (id: string) => {
  const result = await db.pocketBook.findUnique({
    where: {
      id,
    },
  });
  return result;
}
export const CREATE_POCKET_BOOK = async (
  payload: PocketBookPayloadCreateModel
) => {
  const result = await db.pocketBook.create({
    data: payload,
  });

  return result;
};

export const UPDATE_POCKET_BOOK = async (
  id: string,
  payload: PocketBookPayloadUpdateModel
) => {
  const result = await db.pocketBook.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_POCKET_BOOK = async (id: string) => {
  const result = await db.pocketBook.delete({
    where: {
      id,
    },
  });
  return result;
};
