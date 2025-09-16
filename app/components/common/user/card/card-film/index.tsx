import { useMemo, useState } from "react";
import {
  Card,
  Typography,
  Image,
  Modal,
  Radio,
  Button,
  Space,
  Divider,
  message,
} from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { FilmDataModel } from "@/app/models/admin/film";

const { Text, Title } = Typography;

type SurveyOption = {
  id: string;
  survey_id: string;
  text: string;
  isCorrect?: boolean;
};

type SurveyItem = {
  id: string;
  film_id: string;
  question: string;
  time?: number;
  options: SurveyOption[];
};

export default function CardFilm({
  data,
  onClick,
  onSubmitSurvey,
}: {
  data: FilmDataModel & { surveys?: SurveyItem[] };
  onClick?: (id: string) => void;
  onSubmitSurvey?: (payload: {
    filmId: string;
    answers: Record<string, string>; // surveyId -> optionId
  }) => Promise<void> | void;
}) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const embedUrl = useMemo(() => parseYouTubeEmbed(data.video_url), [data.video_url]);

  const handleOpen = () => {
    setOpen(true);
    if (onClick) onClick(data.id);
  };

  const handleClose = () => {
    setOpen(false);
    setAnswers({});
  };

  const handleChange = (surveyId: string) => (e: RadioChangeEvent) => {
    setAnswers((prev) => ({ ...prev, [surveyId]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      // pastikan semua pertanyaan terjawab
      const surveys = data.surveys ?? [];
      const unanswered = surveys.filter((s) => !answers[s.id]);
      if (surveys.length > 0 && unanswered.length > 0) {
        message.warning("Please answer all questions before submitting.");
        return;
      }

      setSubmitting(true);
      await onSubmitSurvey?.({ filmId: data.id, answers });

      // tutup modal video
      setOpen(false);
      setAnswers({});

      // tampilkan modal 'Terima kasih'
      Modal.success({
        title: "Terima Kasih!",
        content: "Terima kasih telah mengikuti survei ini.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card
        bodyStyle={{ padding: 0 }}
        style={{
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(100,100,100,0.10)",
          width: 210,
          minWidth: 200,
          border: "none",
          cursor: "pointer",
        }}
        hoverable
        onClick={handleOpen}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            background: "#f3f3f3",
          }}
        >
          <Image
            src={data.thumbnail_url}
            alt={data.name}
            preview={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <PlayCircleFilled
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontSize: 46,
              color: "#fff",
              transform: "translate(-50%, -50%)",
              opacity: 0.95,
              textShadow: "0 2px 8px #333",
              filter: "drop-shadow(0 2px 6px #3333)",
            }}
          />
        </div>

        <div style={{ padding: "10px 13px 7px 13px" }}>
          <Text strong style={{ fontSize: 15, lineHeight: "19px", color: "#151515" }} ellipsis>
            {data.name}
          </Text>
        </div>
      </Card>

      <Modal
        title={data.name}
        open={open}
        onCancel={handleClose}
        footer={null}
        width={920}
        destroyOnClose
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%", // 16:9
            borderRadius: 10,
            overflow: "hidden",
            background: "#000",
          }}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={data.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          ) : (
            <div
              style={{
                color: "#fff",
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
              }}
            >
              Invalid video URL
            </div>
          )}
        </div>

        {Array.isArray(data.surveys) && data.surveys.length > 0 && (
          <>
            <Divider style={{ margin: "16px 0 12px" }} />
            <Title level={5} style={{ marginBottom: 8 }}>
              Survey Questions
            </Title>

            <Space direction="vertical" size={14} style={{ width: "100%" }}>
              {data.surveys.map((s, idx) => (
                <div
                  key={s.id}
                  style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: 10,
                    padding: 12,
                    background: "#fff",
                  }}
                >
                  <Text strong>
                    {idx + 1}. {s.question}
                  </Text>

                  <div style={{ marginTop: 8 }}>
                    <Radio.Group
                      onChange={handleChange(s.id)}
                      value={answers[s.id]}
                      style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                      {s.options.map((op) => (
                        <Radio key={op.id} value={op.id}>
                          {op.text}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <Button type="primary" onClick={handleSubmit} loading={submitting}>
                  Submit Answers
                </Button>
              </div>
            </Space>
          </>
        )}
      </Modal>
    </>
  );
}

/** Ubah URL YouTube apapun menjadi embed URL **/
function parseYouTubeEmbed(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = u.pathname.slice(1);
    } else if (host.includes("youtube.com")) {
      if (u.pathname.startsWith("/watch")) {
        videoId = u.searchParams.get("v") || "";
      } else if (u.pathname.startsWith("/shorts/")) {
        videoId = u.pathname.split("/")[2] || "";
      } else if (u.pathname.startsWith("/embed/")) {
        videoId = u.pathname.split("/")[2] || "";
      }
    }

    videoId = videoId.replace(/[^a-zA-Z0-9_\-]/g, "");
    if (!videoId) return null;

    const params = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  } catch {
    return null;
  }
}