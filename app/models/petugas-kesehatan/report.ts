/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Report } from "@prisma/client";

export interface ReportDataModel extends Report {}

export interface ReportPayloadCreateModel
  extends Prisma.ReportUncheckedCreateInput {}
