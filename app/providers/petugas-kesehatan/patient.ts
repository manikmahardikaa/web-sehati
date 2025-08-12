import db from "@/lib/prisma";

export const GET_PATIENTS = async () => {
  const result = await db.patient.findMany({
    include: {
      petugas_lapangan: {
        include: {
          authority: {
            include: { region: true, subregion: true },
          },
          region: true,
          subregion: true,
        },
      },
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
      petugas_lapangan: {
        include: {
          authority: {
            include: { region: true, subregion: true },
          },
          region: true,
          subregion: true,
        },
      },
      controllHistory: true,
      medicationHistory: true,
    },
  });
  return result;
};
