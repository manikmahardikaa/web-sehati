/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Departement } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface DepartementDataModel extends Departement {}

export interface DepartementPayloadCreateModel
  extends Prisma.DepartementUncheckedCreateInput {}

export interface DepartementPayloadUpdateModel
  extends Omit<Prisma.DepartementUncheckedUpdateInput, GeneralOmitModel> {}

export interface DepartementFormModel
  extends Omit<DepartementDataModel, GeneralOmitModel> {}
