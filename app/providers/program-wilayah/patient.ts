import db from "@/lib/prisma";

export const GET_PATIENTS = async ({ user_id }: { user_id: string }) => {
  const result = await db.patient.findMany({
    where: {
      petugas_lapangan: {
        authority_id: user_id,
      },
    },
    include: {
      controllHistory: true,
      medicationHistory: true,
      petugas_lapangan: {
        include: {
          subregion: true,
        },
      },
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

export const GET_MONTHLY_PATIENTS = async ({
  user_id,
  year,
}: {
  user_id: string;
  year: number;
}) => {
  // 1. Ambil semua pasien untuk authority_id (user_id) & tahun diagnosis yang diinginkan
  const patients = await db.patient.findMany({
    where: {
      petugas_lapangan: {
        authority_id: user_id,
      },
      createdAt: {
        gte: new Date(`${year}-01-01T00:00:00.000Z`),
        lte: new Date(`${year}-12-31T23:59:59.999Z`),
      },
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  // 2. Hitung jumlah per bulan (1-12)
  const counts: { month: number; count: number }[] = Array.from(
    { length: 12 },
    (_, i) => ({
      month: i + 1,
      count: 0,
    })
  );

  for (const p of patients) {
    const month = new Date(p.createdAt).getMonth(); // getMonth 0-based (0 = Jan)
    counts[month].count++;
  }

  return counts;
};
