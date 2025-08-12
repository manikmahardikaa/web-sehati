/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, WaBlastSchedule } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface WaBlastScheduleDataModel extends WaBlastSchedule {}

export interface WaBlastSchedulePayloadCreateModel
  extends Prisma.WaBlastScheduleUncheckedCreateInput {}

export interface WaBlastSchedulePayloadUpdateModel
  extends Omit<Prisma.WaBlastScheduleUncheckedUpdateInput, GeneralOmitModel> {}

export interface WaBlastScheduleFormModel
  extends Omit<WaBlastScheduleDataModel, GeneralOmitModel> {}
