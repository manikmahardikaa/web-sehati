import { RegionPayloadCreateModel, RegionPayloadUpdateModel } from "@/app/models/admin/region";
import { db } from "@/lib/prisma";


export const GET_REGIONS = async () => {
  const result = await db.region.findMany({
    include: {
      subregions: true,
    },
  });
  return result;
};
export const CREATE_REGION = async (payload: RegionPayloadCreateModel) => {
  const { subregions, ...regionData } = payload;

  return db.region.create({
    data: {
      ...regionData,
      subregions: subregions?.length
        ? {
            create: subregions.map((sub) => ({ name: sub.name })),
          }
        : undefined,
    },
  });
};

 export const UPDATE_REGION = async (
   id: string,
   payload: RegionPayloadUpdateModel
 ) => {
   const { subregions, ...regionData } = payload;

   const result = await db.region.update({
     where: { id },
     data: {
       ...regionData,
       subregions: {
         deleteMany: subregions?.deleteMany ?? undefined,
         create:
           subregions?.upsert
             ?.filter((sub) => !sub.where.id)
             .map((sub) => ({
               name: sub.create.name,
             })) ?? [],
         update:
           subregions?.upsert
             ?.filter((sub) => sub.where.id)
             .map((sub) => ({
               where: sub.where,
               data: sub.update,
             })) ?? [],
       },
     },
   });

   return result;
 };

export const DELETE_REGION = async (id: string) => {
  const result = await db.region.delete({
    where: {
      id,
    },
  });
  return result;
};
   