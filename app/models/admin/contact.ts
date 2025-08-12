/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Contact, Departement } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface ContactDataModel extends Contact {
  departement: Departement
}

export interface ContactPayloadCreateModel
  extends Prisma.ContactUncheckedCreateInput {}

export interface ContactPayloadUpdateModel
  extends Omit<Prisma.ContactUncheckedUpdateInput, GeneralOmitModel> {}

export interface ContactFormModel
  extends Omit<ContactDataModel, GeneralOmitModel> {}
