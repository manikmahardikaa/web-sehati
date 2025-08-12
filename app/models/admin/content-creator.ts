/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, ContentCreator } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface ContentCreatorDataModel extends ContentCreator {}

export interface ContentCreatorPayloadCreateModel
  extends Prisma.ContentCreatorUncheckedCreateInput {}

export interface ContentCreatorPayloadUpdateModel
  extends Omit<Prisma.ContentCreatorUncheckedUpdateInput, GeneralOmitModel> {}

export interface ContentCreatorFormModel extends Omit<ContentCreatorDataModel, GeneralOmitModel> {}
