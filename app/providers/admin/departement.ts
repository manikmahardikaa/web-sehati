import {
  DepartementPayloadCreateModel,
  DepartementPayloadUpdateModel,
} from "@/app/models/admin/departement";
import { db } from "@/lib/prisma";

export const GET_DEPARTEMENTS = async () => {
  const result = await db.departement.findMany();
  return result;
};
export const CREATE_DEPARTEMENT = async (
  payload: DepartementPayloadCreateModel
) => {
  const result = await db.departement.create({
    data: payload,
  });

  return result;
};

export const UPDATE_DEPARTEMENT = async (
  id: string,
  payload: DepartementPayloadUpdateModel
) => {
  const result = await db.departement.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_DEPARTEMENT = async (id: string) => {
  const result = await db.departement.delete({
    where: {
      id,
    },
  });
  return result;
};
