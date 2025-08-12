/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, PocketBook } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface PocketBookDataModel extends PocketBook {}

export interface PocketBookPayloadCreateModel
  extends Prisma.PocketBookUncheckedCreateInput {}

export interface PocketBookPayloadUpdateModel
  extends Omit<Prisma.PocketBookUncheckedUpdateInput, GeneralOmitModel> {}

export interface PocketBookFormModel
  extends Omit<PocketBookDataModel, GeneralOmitModel> {}
