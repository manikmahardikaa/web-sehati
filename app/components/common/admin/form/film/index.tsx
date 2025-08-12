import { useState } from "react";
import type {
  FilmDataModel,
  FilmPayloadCreateModel,
} from "@/app/models/admin/film";
import MetadataStep from "./step-1";
import SurveyStep from "./step-2";
import { FormInstance } from "antd";

function timeStringToSeconds(time: string): number {
  const parts = time.split(":").map(Number).reverse();
  let seconds = 0;
  if (parts.length > 0) seconds += parts[0];
  if (parts.length > 1) seconds += parts[1] * 60;
  if (parts.length > 2) seconds += parts[2] * 3600;
  return seconds;
}

interface SurveyQuestion {
  question: string;
  options: { value: string; correct?: boolean }[];
  time: string;
}

export default function FilmStepper({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  form: FormInstance<FilmDataModel>;
  initialValues?: FilmDataModel;
  onFinish: (values: FilmPayloadCreateModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  type: "create" | "update";
}) {
  const [current, setCurrent] = useState(0);
  const [filmData, setFilmData] = useState<FilmDataModel | null>(null);
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([]);

  return (
    <>
      {current === 0 && (
        <MetadataStep
          onFinish={async (values) => {
            setFilmData(values);
            setCurrent(1);
          }}
          form={form}
          initialValues={initialValues}
        />
      )}
      {current === 1 && filmData && (
        <SurveyStep
          videoUrl={filmData.video_url}
          videoTitle={filmData.name}
          thumbnail={filmData.thumbnail_url}
          questions={surveyQuestions}
          onQuestionsChange={setSurveyQuestions}
          onBack={() => setCurrent(0)}
          loading={type === "create" ? loadingCreate : loadingUpdate}
          onFinish={async () => {
            const payload: FilmPayloadCreateModel = {
              name: filmData.name,
              video_url: filmData.video_url,
              description: filmData.description,
              is_published: filmData.is_published,
              thumbnail_url: filmData.thumbnail_url,
              surveys: {
                create: surveyQuestions.map((q) => ({
                  question: q.question,
                  time: timeStringToSeconds(q.time),
                  options: {
                    create: q.options.map((opt) => ({
                      text: opt.value,
                      isCorrect: !!opt.correct,
                    })),
                  },
                })),
              },
            };


            await onFinish(payload);
          }}
        />
      )}
    </>
  );
}
