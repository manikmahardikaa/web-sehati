/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, ControllHistory } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface ControllHistoryDataModel extends ControllHistory {}

export interface ControllHistoryPayloadCreateModel
  extends Prisma.ControllHistoryUncheckedCreateInput {}

export interface ControllHistoryPayloadUpdateModel
  extends Omit<Prisma.ControllHistoryUncheckedUpdateInput, GeneralOmitModel> {}

export interface ControllHistoryFormModel
  extends Omit<ControllHistoryDataModel, GeneralOmitModel> {}
