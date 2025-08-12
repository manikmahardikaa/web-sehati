/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Patient, Prisma, User, WaBlastADS } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface WaBlastADSDataModel extends WaBlastADS {
  patient: Patient;
  petugas_lapangan: User;
}

export interface WaBlastADSPayloadCreateModel
  extends Prisma.WaBlastADSUncheckedCreateInput {}

export interface WaBlastADSPayloadUpdateModel
  extends Omit<Prisma.WaBlastADSUncheckedUpdateInput, GeneralOmitModel> {}

export interface WaBlastADSFormModel
  extends Omit<WaBlastADSDataModel, GeneralOmitModel> {}
