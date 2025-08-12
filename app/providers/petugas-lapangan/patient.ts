import {
  PatientPayloadCreateModel,
  PatientPayloadUpdateModel,
} from "@/app/models/petugas-lapangan/patient";
import { db } from "@/lib/prisma";

export const GET_PATIENTS = async ({ user_id }: { user_id: string }) => {
  const result = await db.patient.findMany({
    where: {
      petugas_lapangan_id: user_id,
    },
    include: {
      controllHistory: true,
      medicationHistory: true,
    },
  });
  return result;
};

export const GET_PATIENT = async (id: string) => {
  const result = await db.patient.findUnique({
    where: {
      id,
    },
    include: {
      controllHistory: true,
      medicationHistory: true,
    },
  });
  return result;
};
export const CREATE_PATIENT = async (payload: PatientPayloadCreateModel) => {
  const result = await db.patient.create({
    data: payload,
  });

  return result;
};

export const UPDATE_PATIENT = async (
  id: string,
  payload: PatientPayloadUpdateModel
) => {
  const result = await db.patient.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const DELETE_PATIENT = async (id: string) => {
  const result = await db.patient.delete({
    where: {
      id,
    },
  });
  return result;
};
