/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, News } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface NewsDataModel extends News {}

export interface NewsPayloadCreateModel
  extends Prisma.NewsUncheckedCreateInput {}

export interface NewsPayloadUpdateModel
  extends Omit<Prisma.NewsUncheckedUpdateInput, GeneralOmitModel> {}

export interface NewsFormModel extends Omit<NewsDataModel, GeneralOmitModel> {}
