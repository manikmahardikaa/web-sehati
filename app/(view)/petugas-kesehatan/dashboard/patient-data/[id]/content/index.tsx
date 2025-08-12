import { usePatient } from "@/app/hooks/petugas-kesehatan/patient";
import { useParams } from "next/navigation";
import { Card, Table, Row, Col, Typography, Tag, Divider } from "antd";
import dayjs from "dayjs";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
import maskName from "@/app/utils/mask-name";

const { Title, Text } = Typography;

function formatTanggal(dateStr?: string | null) {
  if (!dateStr) return "-";
  return dayjs(dateStr).format("DD-MM-YYYY");
}

export default function PatienDetailDataContent() {
  const query = useParams();
  const user_id = query.id as string;
  const { data: detailPatient, fetchLoading } = usePatient({ id: user_id });

  if (fetchLoading || !detailPatient) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>Loading</p>
      </div>
    );
  }

  const controllHistory = detailPatient.controllHistory || [];
  const medicationHistory = detailPatient.medicationHistory || [];

  // Table columns (more compact)
  const controlColumns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center" as const,
      width: 38,
      render: (
        _: ControllHistoryDataModel,
        __: ControllHistoryDataModel,
        idx: number
      ) => idx + 1,
    },
    {
      title: "Tanggal Kontrol",
      dataIndex: "date",
      align: "center" as const,
      render: (date: string) => formatTanggal(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center" as const,
      render: (status: boolean) =>
        status ? (
          <Tag
            color="success"
            style={{ fontWeight: 500, borderRadius: 5, padding: "2px 8px" }}
          >
            Sudah melakukan kontrol
          </Tag>
        ) : (
          <Tag
            color="warning"
            style={{ fontWeight: 500, borderRadius: 5, padding: "2px 8px" }}
          >
            Belum melakukan kontrol
          </Tag>
        ),
    },
  ];

  const medicationColumns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center" as const,
      width: 38,
      render: (
        _: MedicationHistoryDataModel,
        __: MedicationHistoryDataModel,
        idx: number
      ) => idx + 1,
    },
    {
      title: "Tanggal Kontrol",
      dataIndex: "date",
      align: "center" as const,
      render: (date: string) => formatTanggal(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center" as const,
      render: (status: boolean) =>
        status ? (
          <Tag
            color="success"
            style={{ fontWeight: 500, borderRadius: 5, padding: "2px 8px" }}
          >
            Sudah mengambil obat
          </Tag>
        ) : (
          <Tag
            color="warning"
            style={{ fontWeight: 500, borderRadius: 5, padding: "2px 8px" }}
          >
            Belum mengambil obat
          </Tag>
        ),
    },
  ];

  const InfoField = ({
    label,
    value,
    last,
  }: {
    label: string;
    value: React.ReactNode;
    last?: boolean;
  }) => (
    <Row
      style={{
        padding: last ? "10px 0 0 0" : "10px 0",
        borderBottom: last ? "none" : "1px solid #f6f6f6",
        alignItems: "flex-start",
        fontSize: 14,
      }}
    >
      <Col span={8}>
        <Text style={{ color: "#b73b50", fontWeight: 500 }}>{label}</Text>
      </Col>
      <Col span={16}>
        <Text style={{ fontWeight: 400 }}>{value}</Text>
      </Col>
    </Row>
  );

  return (
    <div
      style={{
        maxWidth: 1050,
        margin: "0 auto",
        padding: "20px 0 30px 0",
        minHeight: "100vh",
      }}
    >
      <Title
        level={3}
        style={{
          textAlign: "center",
          fontWeight: 700,
          marginBottom: 20,
          marginTop: 16,
          letterSpacing: "0.01em",
          fontSize: 28,
        }}
      >
        Informasi Detail Pasien
      </Title>

      <Card
        style={{
          borderRadius: 14,
          marginBottom: 30,
          boxShadow: "0 2px 8px rgba(195,0,16,0.04)",
          padding: "0 10px",
          background: "#fff",
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div
          style={{
            background: "#fae6e8",
            borderRadius: "12px 12px 0 0",
            borderBottom: "1px solid #f6f6f6",
          }}
        >
          <Row>
            <Col span={8}>
              <div
                style={{
                  padding: "10px 0 10px 16px",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Informasi
              </div>
            </Col>
            <Col span={16}>
              <div
                style={{
                  padding: "10px 0 10px 8px",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Detail
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ padding: "2px 14px 10px 14px", background: "#fff" }}>
          <InfoField
            label="Nama Lengkap"
            value={maskName(detailPatient.name || "-")}
          />
          <InfoField
            label="Alamat"
            value={maskName(detailPatient.street || "-")}
          />
          <InfoField
            label="Tanggal Lahir"
            value={
              maskName(formatTanggal(detailPatient.birth_date.toString())) ||
              "-"
            }
          />
          <InfoField
            label="No. WhatsApp"
            value={detailPatient.no_whatsapp || "-"}
          />
          <InfoField
            label="Tahun Diagnosa"
            value={detailPatient.year_of_diagnosis || "-"}
          />
          <InfoField
            label="Jenis Kelamin"
            value={
              detailPatient.gender === "LAKI_LAKI"
                ? "Laki-laki"
                : detailPatient.gender === "PEREMPUAN"
                ? "Perempuan"
                : "-"
            }
          />
          <InfoField
            label="Wilayah"
            value={
              detailPatient.petugas_lapangan.authority?.region?.name || "-"
            }
          />
          <InfoField
            label="Nama Petugas"
            value={detailPatient.petugas_lapangan.authority?.name || "-"}
            last
          />
        </div>
      </Card>
      <Divider />

      {/* Table */}
      <Row gutter={18}>
        <Col xs={24} md={12}>
          <Title
            level={5}
            style={{ marginBottom: 8, fontWeight: 600, textAlign: "center" }}
          >
            Jadwal Kontrol
          </Title>
          <Card
            style={{
              borderRadius: 12,
              minHeight: 180,
              boxShadow: "0 2px 8px rgba(195,0,16,0.05)",
              border: "1.5px solid #fae6e8",
              background: "#fff",
            }}
            bodyStyle={{ padding: "0 0 4px 0" }}
          >
            <Table
              dataSource={controllHistory}
              columns={controlColumns}
              pagination={false}
              bordered={false}
              rowKey="id"
              size="small"
              style={{
                borderRadius: 8,
                background: "transparent",
                fontSize: 13,
              }}
              scroll={{ x: true }}
              locale={{ emptyText: "Belum ada data kontrol" }}
              summary={() => null}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} style={{ marginTop: 0 }}>
          <Title
            level={5}
            style={{ marginBottom: 8, fontWeight: 600, textAlign: "center" }}
          >
            Jadwal Pengambilan Obat
          </Title>
          <Card
            style={{
              borderRadius: 12,
              minHeight: 180,
              boxShadow: "0 2px 8px rgba(195,0,16,0.05)",
              border: "1.5px solid #fae6e8",
              background: "#fff",
            }}
            bodyStyle={{ padding: "0 0 4px 0" }}
          >
            <Table
              dataSource={medicationHistory}
              columns={medicationColumns}
              pagination={false}
              bordered={false}
              rowKey="id"
              size="small"
              style={{
                borderRadius: 8,
                background: "transparent",
                fontSize: 13,
              }}
              scroll={{ x: true }}
              locale={{ emptyText: "Belum ada data pengambilan obat" }}
              summary={() => null}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
