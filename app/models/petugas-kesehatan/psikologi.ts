/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Psikologi } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface PsikologiDataModel extends Psikologi {}

export interface PsikologiPayloadCreateModel
  extends Prisma.PsikologiUncheckedCreateInput {}

export interface PsikologiPayloadUpdateModel
  extends Omit<Prisma.PsikologiUncheckedUpdateInput, GeneralOmitModel> {}

export interface PsikologiFormModel
  extends Omit<PsikologiDataModel, GeneralOmitModel> {}
