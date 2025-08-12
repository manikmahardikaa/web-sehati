/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Region, Subregion } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface RegionDataModel extends Region {
  subregions: Subregion[];
}

export interface RegionPayloadCreateModel
  extends Omit<Prisma.RegionUncheckedCreateInput, "subregions"> {
  subregions?: { name: string }[];
}

export interface RegionPayloadUpdateModel
  extends Omit<Prisma.RegionUpdateInput, GeneralOmitModel> {
  subregions?: {
    upsert?: {
      where: { id: string };
      update: { name?: string };
      create: { name: string };
    }[];
    deleteMany?: { id: { in: string[] } };
  };
}

export interface RegionFormModel {
  name: string;
  subregions?: {
    id?: string;
    name: string;
  }[];
}
