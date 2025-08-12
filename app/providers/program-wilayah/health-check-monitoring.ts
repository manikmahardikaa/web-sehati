import db from "@/lib/prisma";

export const GET_HEALTH_CHECK_MONITORINGS = async ({ user_id }: { user_id: string }) => {
  const result = await db.patient.findMany({
    where: {
      petugas_lapangan: {
        authority_id: user_id,
      },
    },
    include: {
      petugas_lapangan: true,
      controllHistory: true,
      medicationHistory: true,
    },
  });
  return result;
};
