/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, MedicationHistory } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface MedicationHistoryDataModel extends MedicationHistory {}

export interface MedicationHistoryPayloadCreateModel
  extends Prisma.MedicationHistoryUncheckedCreateInput {}

export interface MedicationHistoryPayloadUpdateModel
  extends Omit<Prisma.MedicationHistoryUncheckedUpdateInput, GeneralOmitModel> {}

export interface MedicationHistoryFormModel
  extends Omit<MedicationHistoryDataModel, GeneralOmitModel> {}
