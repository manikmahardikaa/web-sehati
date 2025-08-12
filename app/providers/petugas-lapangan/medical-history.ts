import {
  MedicationHistoryPayloadCreateModel,
  MedicationHistoryPayloadUpdateModel,
} from "@/app/models/petugas-lapangan/medical-history";
import { db } from "@/lib/prisma";
import dayjs from "dayjs";



export const GET_MEDICAL_HISTORIES = async ({
  user_id,
}: {
  user_id?: string;
}) => {
  const args = user_id ? { where: { patient_id: user_id } } : undefined;

  const result = await db.medicationHistory.findMany(args);
  return result;
};
export const CREATE_MEDICAL_HISTORY = async (
  payload: MedicationHistoryPayloadCreateModel
) => {
  const result = await db.medicationHistory.create({
    data: payload,
  });

  return result;
};

export const UPDATE_MEDICAL_HISTORY = async (
  id: string,
  payload: MedicationHistoryPayloadUpdateModel
) => {
  const result = await db.medicationHistory.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const UPDATE_MEDICAL_HISTORY_STATUS = async (
  id: string,
  status: boolean
) => {
  const result = await db.medicationHistory.update({
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

export const DELETE_MEDICAL_HISTORY = async (id: string) => {
  const result = await db.medicationHistory.delete({
    where: {
      id,
    },
  });
  return result;
};
