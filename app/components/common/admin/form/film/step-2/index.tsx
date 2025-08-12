"use client";
import { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Space,
  Input,
  Form,
  Tooltip,
  Image,
  Radio,
  Steps,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface SurveyQuestion {
  question: string;
  options: { value: string; correct?: boolean }[];
  time: string;
}

interface SurveyStepProps {
  videoUrl: string;
  videoTitle?: string;
  thumbnail?: string;
  questions: SurveyQuestion[];
  onQuestionsChange: (questions: SurveyQuestion[]) => void;
  onBack: () => void;
  onFinish: (values: {
    video_url: string;
    name: string;
    thumbnail_url: string;
    survey: {
      question: string;
      time: number;
      options: { text: string; isCorrect: boolean }[];
    }[];
  }) => Promise<void>;
  loading?: boolean;
}

export default function SurveyStep({
  videoUrl,
  videoTitle,
  thumbnail,
  questions,
  onQuestionsChange,
  onBack,
  onFinish,
  loading,
}: SurveyStepProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form] = Form.useForm();

  // Extract Youtube embed url
  const youtubeEmbedUrl = (() => {
    if (!videoUrl) return "";
    const match = videoUrl.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_\-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  })();

  function timeStringToSeconds(time: string): number {
    const parts = time.split(":").map(Number).reverse();
    let seconds = 0;
    if (parts.length > 0) seconds += parts[0];
    if (parts.length > 1) seconds += parts[1] * 60;
    if (parts.length > 2) seconds += parts[2] * 3600;
    return seconds;
  }

  // Saat tambah/edit, radio jawaban benar diatur sesuai kebutuhan
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Ambil index jawaban benar, fallback ke 0 jika undefined
      const correctIdx = values.correctAnswer ?? 0;

      const newQuestion: SurveyQuestion = {
        question: values.question,
        time: values.time,
        options: values.options.map((val: string, idx: number) => ({
          value: val,
          correct: idx === correctIdx,
        })),
      };

      const newQuestions = [...questions];
      if (editingIndex !== null) {
        newQuestions[editingIndex] = newQuestion;
      } else {
        newQuestions.push(newQuestion);
      }
      onQuestionsChange(newQuestions);
      form.resetFields();
      // Set radio ke default index 0 setelah reset (penting!)
      form.setFieldsValue({ correctAnswer: 0 });
      setEditingIndex(null);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  // Edit mode: isi field & jawaban benar sesuai soal
  const handleEdit = (idx: number) => {
    const q = questions[idx];
    setEditingIndex(idx);
    form.setFieldsValue({
      question: q.question,
      time: q.time,
      options: q.options.map((o) => o.value),
      correctAnswer: q.options.findIndex((o) => o.correct) ?? 0,
    });
  };

  const handleDelete = (idx: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(idx, 1);
    onQuestionsChange(newQuestions);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ correctAnswer: 0 }}
      style={{
        borderRadius: 16,
        padding: "36px 32px",
        minHeight: "100vh",
        margin: "0 auto",
        maxWidth: 1250,
      }}
      onFinish={handleSave}
    >
      <Steps
        current={1}
        style={{
          marginBottom: 38,
          marginLeft: 16,
          padding: 16,
          borderRadius: 8,
        }}
        items={[{ title: "Detail" }, { title: "Tambahkan Survei" }]}
      />

      <Row gutter={[40, 40]} align="top" style={{ marginBottom: 32 }}>
        {/* Kolom kiri: Video & Form */}
        <Col xs={24} md={16}>
            {/* Video Preview */}
            {youtubeEmbedUrl ? (
              <iframe
                width="100%"
                height="320"
                src={youtubeEmbedUrl}
                title="Video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  background: "#222",
                  borderRadius: "12px 12px 0 0",
                  minHeight: 320,
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 320,
                  background: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <span>Preview Video</span>
              </div>
            )}
            {thumbnail && (
              <Image
                src={thumbnail}
                alt="Thumbnail"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 320,
                  objectFit: "cover",
                  opacity: 0.3,
                  pointerEvents: "none",
                  borderRadius: "12px 12px 0 0",
                }}
                preview={false}
              />
            )}
            <div
              style={{
                padding: "18px 20px",
                color: "#fff",
                background: "rgba(0,0,0,0.44)",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <Title level={4} style={{ margin: 0, color: "#fff" }}>
                {videoTitle || "JUDUL VIDEO"}
              </Title>
            </div>
  

          {/* Form Tambah/Edit Pertanyaan */}
          <Card
            style={{
              marginBottom: 0,
              borderRadius: 16,
              marginTop: 24,
              boxShadow: "0 1px 8px 0 rgba(0,0,0,0.04)",
              background: "#fafbfc",
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Row gutter={18}>
              <Col span={24}>
                <Form.Item
                  name="time"
                  label="Waktu Terkait Video (misal 05:23)"
                  rules={[
                    { required: true, message: "Wajib isi waktu" },
                    {
                      pattern: /^(\d{1,2}:)?[0-5]?\d:[0-5]\d$/,
                      message: "Format waktu mm:ss (atau hh:mm:ss)",
                    },
                  ]}
                  style={{ marginBottom: 18 }}
                >
                  <Input placeholder="05:23" style={{ maxWidth: 140 }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="question"
                  label="Pertanyaan"
                  rules={[
                    { required: true, message: "Pertanyaan wajib diisi" },
                  ]}
                  style={{ marginBottom: 18 }}
                >
                  <TextArea rows={2} placeholder="Masukkan pertanyaan" />
                </Form.Item>
              </Col>
            </Row>
            <Form.List name="options" initialValue={["", ""]}>
              {(fields, { add, remove }) => (
                <>
                  <Form.Item
                    label="Pilih jawaban benar"
                    name="correctAnswer"
                    rules={[{ required: true, message: "Pilih jawaban benar" }]}
                    style={{ marginBottom: 12 }}
                  >
                    <Radio.Group style={{ gap: 10 }}>
                      {fields.map((field, idx) => (
                        <Space
                          key={field.key}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Form.Item
                            {...field}
                            name={[field.name]}
                            rules={[{ required: true, message: "Isi opsi" }]}
                            style={{ margin: 0 }}
                          >
                            <Input placeholder={`Pilihan ${idx + 1}`} />
                          </Form.Item>
                          <Radio value={idx} />
                          {fields.length > 1 && (
                            <Button
                              danger
                              size="small"
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                            />
                          )}
                        </Space>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{
                      width: "100%",
                      marginBottom: 8,
                    }}
                  >
                    Tambah pilihan jawaban lain
                  </Button>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  {editingIndex !== null
                    ? "Simpan Perubahan"
                    : "Tambah Pertanyaan"}
                </Button>
                {editingIndex !== null && (
                  <Button
                    onClick={() => {
                      setEditingIndex(null);
                      form.resetFields();
                      form.setFieldsValue({ correctAnswer: 0 });
                    }}
                  >
                    Batal Edit
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Card>
        </Col>
        {/* Kolom kanan: List Pertanyaan */}
        <Col xs={24} md={8}>
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "20px 14px 16px 14px",
              minHeight: 350,
              border: "1.5px solid #ececec",
              boxShadow: "0 1px 8px 0 rgba(0,0,0,0.04)",
            }}
          >
            <Title
              level={5}
              style={{ color: "#C30010", margin: 0, marginBottom: 8 }}
            >
              Daftar Pertanyaan
            </Title>
            <Divider style={{ margin: "14px 0 18px 0" }} />
            {questions.length === 0 ? (
              <Paragraph type="secondary" style={{ margin: 0 }}>
                Belum ada pertanyaan ditambahkan.
              </Paragraph>
            ) : (
              questions.map((q, idx) => (
                <Card
                  key={idx}
                  size="small"
                  style={{
                    marginBottom: 10,
                    border: "1.5px solid #f0f0f0",
                    borderRadius: 10,
                    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.03)",
                    background: "#fafbfc",
                  }}
                  bodyStyle={{ padding: 14 }}
                >
                  <Space>
                    <b style={{ fontFamily: "monospace" }}>{q.time}</b>
                    <span
                      style={{
                        background: "#C30010",
                        color: "#fff",
                        borderRadius: 4,
                        padding: "0 8px",
                        fontSize: 12,
                        letterSpacing: 0.2,
                      }}
                    >
                      Pilihan Ganda
                    </span>
                  </Space>
                  <div style={{ marginTop: 7 }}>
                    <div style={{ fontWeight: 500, marginBottom: 2 }}>
                      {q.question}
                    </div>
                    <ol type="A" style={{ marginLeft: 18, marginTop: 0 }}>
                      {q.options.map((o, i) => (
                        <li
                          key={i}
                          style={
                            o.correct
                              ? {
                                  fontWeight: 700,
                                  color: "#1890ff",
                                  marginBottom: 2,
                                }
                              : { marginBottom: 2 }
                          }
                        >
                          {o.value} {o.correct ? <>(✓)</> : null}
                        </li>
                      ))}
                    </ol>
                    <Space style={{ marginTop: 2 }}>
                      <Tooltip title="Edit">
                        <Button
                          size="small"
                          icon={<EditOutlined />}
                          onClick={() => handleEdit(idx)}
                        />
                      </Tooltip>
                      <Tooltip title="Hapus">
                        <Button
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(idx)}
                        />
                      </Tooltip>
                    </Space>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Col>
      </Row>

      {/* Tombol navigasi */}
      <Form.Item style={{ marginTop: 30, textAlign: "right" }}>
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button onClick={onBack}>Kembali</Button>
          <Button
            type="primary"
            onClick={() =>
              onFinish({
                video_url: videoUrl,
                name: videoTitle || "",
                thumbnail_url: thumbnail || "",
                survey: questions.map((q) => ({
                  question: q.question,
                  time: timeStringToSeconds(q.time),
                  options: q.options.map((o) => ({
                    text: o.value,
                    isCorrect: !!o.correct,
                  })),
                })),
              })
            }
            loading={loading}
            style={{
              backgroundColor: "#C30010",
              borderColor: "#C30010",
            }}
          >
            Selesai
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
