/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, WaBlastPatientControl } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface WaBlastPatientControlDataModel extends WaBlastPatientControl {}

export interface WaBlastPatientControlPayloadCreateModel
  extends Prisma.WaBlastPatientControlUncheckedCreateInput {}

export interface WaBlastPatientControlPayloadUpdateModel
  extends Omit<
    Prisma.WaBlastPatientControlUncheckedUpdateInput,
    GeneralOmitModel
  > {}

export interface WaBlastPatientControlFormModel
  extends Omit<WaBlastPatientControlDataModel, GeneralOmitModel> {}
