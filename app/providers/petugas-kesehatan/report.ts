import { ReportPayloadCreateModel } from "@/app/models/petugas-kesehatan/report";
import db from "@/lib/prisma";

export const GET_REPORTS = async () => {
  const result = await db.report.findMany();
  return result;
};

export const GET_REPORT = async (id: string) => {
  const result = await db.report.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const CREATE_REPORT = async (payload: ReportPayloadCreateModel) => {
  const result = await db.report.create({
    data: payload,
  });

  return result;
};

export const DELETE_REPORT = async (id: string) => {
  const result = await db.report.delete({
    where: {
      id,
    },
  });
  return result;
};
