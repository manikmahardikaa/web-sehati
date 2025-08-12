import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";
import {
  UserPayloadCreateModel,
  UserPayloadUpdateModel,
} from "@/app/models/admin/user";

export const GET_USERS = async () => {
  const result = await db.user.findMany({
    include: {
      region: true,
      subregion: true,
      authority: true,
    },
  });
  return result;
};

export const GET_USER = async (id: string) => {
  const result = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      region: true,
      subregion: true,
      authority: true,
    },
  });
  return result;
};
export const CREATE_USER = async (payload: UserPayloadCreateModel) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await db.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return result;
};

export const UPDATE_USER = async (
  id: string,
  payload: UserPayloadUpdateModel
) => {
  const result = await db.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_USER = async (id: string) => {
  const result = await db.user.delete({
    where: {
      id,
    },
  });
  return result;
};
