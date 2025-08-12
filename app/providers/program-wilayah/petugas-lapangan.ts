import db from "@/lib/prisma";

export const GET_PETUGAS_LAPANGANS = async ({
  user_id,
}: {
  user_id: string;
}) => {
  const result = await db.user.findMany({
    where: {
      authority_id: user_id,
    },
  });
  return result;
};
