import { db } from "@/lib/prisma";
import { ContactPayloadCreateModel, ContactPayloadUpdateModel } from "../../models/admin/contact";

export const GET_USERS = async () => {
  const result = await db.contact.findMany({
    include: {
      departement: true,
    }
  });
  return result;
};
export const CREATE_USER = async (payload: ContactPayloadCreateModel) => {
  const result = await db.contact.create({
    data: payload,
  });

  return result;
};

export const UPDATE_USER = async (
  id: string,
  payload: ContactPayloadUpdateModel
) => {
  const result = await db.contact.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_USER = async (id: string) => {
  const result = await db.contact.delete({
    where: {
      id,
    },
  });
  return result;
};
