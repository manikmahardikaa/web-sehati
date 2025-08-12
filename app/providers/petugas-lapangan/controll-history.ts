import {
  ControllHistoryPayloadCreateModel,
  ControllHistoryPayloadUpdateModel,
} from "@/app/models/petugas-lapangan/controll-history";
import { db } from "@/lib/prisma";
import dayjs from "dayjs";

export const GET_CONTROLL_HISTORIES = async ({
  user_id,
}: {
  user_id?: string;
}) => {
  const args = user_id ? { where: { patient_id: user_id } } : undefined;
  const result = await db.controllHistory.findMany(args);
  return result;
};
export const CREATE_CONTROLL_HISTORY = async (
  payload: ControllHistoryPayloadCreateModel
) => {
  const result = await db.controllHistory.create({
    data: payload,
  });

  return result;
};

export const UPDATE_CONTROLL_HISTORY = async (
  id: string,
  payload: ControllHistoryPayloadUpdateModel
) => {
  const result = await db.controllHistory.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const UPDATE_CONTROLL_HISTORY_STATUS = async (
  id: string,
  status: boolean
) => {
  const result = await db.controllHistory.update({
    where: {
      id,
    },
    data: {
      status,
      updatedAt: dayjs().toDate(),
    },
  });
  return result;
};

export const DELETE_CONTROLL_HISTORY = async (id: string) => {
  const result = await db.controllHistory.delete({
    where: {
      id,
    },
  });
  return result;
};
