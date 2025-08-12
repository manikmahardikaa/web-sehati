/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Psikologi, WaBlastPsikologi } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface WaBlastPsikologiDataModel extends WaBlastPsikologi {
  psikologi: Psikologi;
}

export interface WaBlastPsikologiPayloadCreateModel
  extends Prisma.WaBlastPsikologiUncheckedCreateInput {}

export interface WaBlastPsikologiPayloadUpdateModel
  extends Omit<Prisma.WaBlastPsikologiUncheckedUpdateInput, GeneralOmitModel> {}

export interface WaBlastPsikologiFormModel
  extends Omit<WaBlastPsikologiDataModel, GeneralOmitModel> {}
