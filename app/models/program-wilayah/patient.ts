/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  Prisma,
  Patient,
  MedicationHistory,
  ControllHistory,
} from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";
import dayjs from "dayjs";
import { UserDataModel } from "../admin/user";

export interface PatientDataModel extends Patient {
  petugas_lapangan: UserDataModel;
  medicationHistory: MedicationHistory[];
  controllHistory: ControllHistory[];
}

export interface PatientPayloadCreateModel
  extends Prisma.PatientUncheckedCreateInput {}

export interface PatientPayloadUpdateModel
  extends Omit<Prisma.PatientUncheckedUpdateInput, GeneralOmitModel> {}

export interface PatientFormModel
  extends Omit<PatientDataModel, GeneralOmitModel | "birth_date"> {
  birth_date?: dayjs.Dayjs;
}
