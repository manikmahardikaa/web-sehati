/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Region, Subregion, User } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface UserDataModel extends User {
  region: Region;
  subregion: Subregion;
  authority: {
    user: User;
  };
}

export interface UserPayloadCreateModel
  extends Omit<
    Prisma.UserUncheckedCreateInput,
    "region" | "subregion" | "authority"
  > {
  region_id?: string | null;
  subregion_id?: string | null;
  authority_id?: string | null;
}

export interface UserPayloadUpdateModel
  extends Omit<
    Prisma.UserUncheckedUpdateInput,
    GeneralOmitModel | "region" | "subregion" | "authority"
  > {
  region_id?: string | null;
  subregion_id?: string | null;
  authority_id?: string | null;
}

export interface UserFormModel extends Omit<UserDataModel, GeneralOmitModel> {
  region_id: string | null;
  subregion_id: string | null;
  authority_id: string | null;
}
