/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Patient, ControllHistory, MedicationHistory } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";
import dayjs from "dayjs";

export interface PatientDataModel extends Patient {
  controllHistory: ControllHistory[]
  medicationHistory: MedicationHistory[]
}

export interface PatientPayloadCreateModel
  extends Prisma.PatientUncheckedCreateInput {}

export interface PatientPayloadUpdateModel
  extends Omit<Prisma.PatientUncheckedUpdateInput, GeneralOmitModel> {}

export interface PatientFormModel
  extends Omit<PatientDataModel, GeneralOmitModel | "birth_date"> {
  birth_date?: dayjs.Dayjs; 
}
