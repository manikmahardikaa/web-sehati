/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Prisma, Film, Survey, SurveyOption } from "@prisma/client";
import { GeneralOmitModel } from "../general-omit";

export interface SurveyWithOptions extends Survey {
  options: SurveyOption[];
}

export interface FilmDataModel extends Film {
  surveys: SurveyWithOptions[];
}

export interface FilmPayloadCreateModel
  extends Omit<Prisma.FilmUncheckedCreateInput, "surveys"> {
  surveys: {
    create: {
      question: string;
      time: number;
      options: {
        create: {
          text: string;
          isCorrect: boolean;
        }[];
      };
    }[];
  };
}

export interface FilmPayloadUpdateModel
  extends Omit<Prisma.FilmUncheckedUpdateInput, GeneralOmitModel | "surveys"> {
  surveys: {
    update: {
      id: string;
      question: string;
      time: number;
      options: {
        update: {
          id: string;
          text: string;
          isCorrect: boolean;
        }[];
      };
    }[];
  };
}

export interface FilmFormModel extends Omit<FilmDataModel, GeneralOmitModel> {
  survey: Survey[];
}
