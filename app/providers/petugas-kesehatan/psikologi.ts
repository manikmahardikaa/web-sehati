import {
  PsikologiPayloadCreateModel,
  PsikologiPayloadUpdateModel,
} from "@/app/models/petugas-kesehatan/psikologi";
import { db } from "@/lib/prisma";

export const GET_PSIKOLOGIS = async () => {
  const result = await db.psikologi.findMany();
  return result;
};
export const CREATE_PSIKOLOGI = async (
  payload: PsikologiPayloadCreateModel
) => {
  const result = await db.psikologi.create({
    data: payload,
  });

  return result;
};

export const UPDATE_PSIKOLOGI = async (
  id: string,
  payload: PsikologiPayloadUpdateModel
) => {
  const result = await db.psikologi.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_PSIKOLOGI = async (id: string) => {
  const result = await db.psikologi.delete({
    where: {
      id,
    },
  });
  return result;
};
