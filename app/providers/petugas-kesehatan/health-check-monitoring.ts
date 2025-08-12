import db from "@/lib/prisma";

export const GET_HEALTH_CHECK_MONITORINGS = async () => {
  const result = await db.patient.findMany({
    include: {
      petugas_lapangan: {
        include: {
          authority: true,
        },
      },
      controllHistory: true,
      medicationHistory: true,
    },
  });
  return result;
};
