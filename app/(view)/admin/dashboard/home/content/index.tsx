"use client";
import dynamic from "next/dynamic";
import { Card, Row, Col, Typography } from "antd";
import {
  UserOutlined,
  ContactsOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useContacts } from "@/app/hooks/admin/contact";
import { useUsers } from "@/app/hooks/admin/user";
import { useFilms } from "@/app/hooks/admin/film";
import { usePocketBooks } from "@/app/hooks/admin/pocket-book";
import { useContentCreators } from "@/app/hooks/admin/content-creator";
import { Role } from "@prisma/client";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartLegend = dynamic(() => import("../../../../../components/common/chart-legend"), { ssr: false });

const { Title } = Typography;

export default function DashboardContent() {
  const { data: contactData } = useContacts({});
  const { data: userData } = useUsers({});
  const { data: filmData } = useFilms({});
  const { data: pocketBookData } = usePocketBooks({});
  const { data: contentCreatorData } = useContentCreators({});

  const sumMedia =
    (filmData?.length ?? 0) +
    (pocketBookData?.length ?? 0) +
    (contentCreatorData?.length ?? 0);

  const petugasKesehatanLength = userData?.filter(
    (user) => user.role == Role.PETUGAS_KESEHATAN
  ).length;
  const pemegangProgramWilayahLength = userData?.filter(
    (user) => user.role == Role.PROGRAM_WILAYAH
  ).length;
  const petugasLapanganLength = userData?.filter(
    (user) => user.role == Role.PROGRAM_WILAYAH
  ).length;

  const departementCounts = contactData
    ? contactData.reduce((acc: Record<string, number>, user) => {
        const dep = user.departement?.name || "Tanpa Departemen";
        acc[dep] = (acc[dep] ?? 0) + 1;
        return acc;
      }, {})
    : {};

  // Pie chart data (Contoh: replace dengan hasil API/hook kamu)
  const jenisPengguna = [
    { label: "Petugas Kesehatan", value: petugasKesehatanLength },
    { label: "Pemegang Program Wilayah", value: pemegangProgramWilayahLength },
    { label: "Petugas Layanan", value: petugasLapanganLength },
  ];
  const jenisKontak = Object.entries(departementCounts).map(
    ([label, value]) => ({
      label,
      value,
    })
  );
  const jenisMedia = [
    { label: "Film Pendek", value: filmData?.length },
    { label: "Buku Saku", value: pocketBookData?.length },
    { label: "Kontak", value: contactData?.length },
  ];

  // Pie chart options (ApexCharts)
  const pieOptions = (labels: string[]) => ({
    chart: { type: "pie" as const },
    labels,
    legend: { show: false },
    dataLabels: { enabled: true },
    stroke: { show: false },
    colors: ["#d41c1c", "#b03e3e", "#e44a4a", "#891c1c"],
  });

  const pieColors = ["#6e1616", "#d41c1c", "#e44a4a", "#b03e3e", "#891c1c"];

  // Cards
  const statCards = [
    {
      icon: <UserOutlined style={{ fontSize: 28, color: "#d41c1c" }} />,
      title: "Total Akun",
      value: userData?.length,
    },
    {
      icon: <ContactsOutlined style={{ fontSize: 28, color: "#d41c1c" }} />,
      title: "Total Kontak",
      value: contactData?.length,
    },
    {
      icon: <FileTextOutlined style={{ fontSize: 28, color: "#d41c1c" }} />,
      title: "Total Media",
      value: sumMedia,
    },
  ];

  return (
    <div style={{ padding: 10 }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Selamat Datang, Admin
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: 16 }}>
        {statCards.map((card, idx) => (
          <Col key={idx} xs={24} sm={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 18,
                boxShadow: "0 2px 12px rgba(180,30,30,0.10)",
                textAlign: "left",
                background: "#fff",
                minHeight: 85,
                display: "flex",
                alignItems: "center",
              }}
              bodyStyle={{
                display: "flex",
                alignItems: "center",
                padding: 18,
                gap: 18,
              }}
            >
              <div
                style={{
                  background: "#f6eaea",
                  borderRadius: 10,
                  padding: 11,
                  marginRight: 12,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1b1b1b",
                    marginBottom: 2,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{ fontSize: 22, fontWeight: 700, color: "#d41c1c" }}
                >
                  {card.value}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pie Chart Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: 18,
              boxShadow: "0 2px 12px rgba(180,30,30,0.10)",
              minHeight: 330,
              background: "#fff",
            }}
            bodyStyle={{ padding: 22 }}
          >
            <Title
              level={5}
              style={{ margin: 0, marginBottom: 18, color: "#1b1b1b" }}
            >
              Jenis Pengguna
            </Title>
            <ReactApexChart
              type="pie"
              width="100%"
              height={200}
              series={jenisPengguna.map((item) => Number(item.value ?? 0))}
              options={pieOptions(jenisPengguna.map((item) => item.label))}
            />
            <ChartLegend
              data={jenisPengguna}
              colors={pieColors}
              total={jenisPengguna.reduce(
                (sum, item) => sum + (item.value ?? 0),
                0
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: 18,
              boxShadow: "0 2px 12px rgba(180,30,30,0.10)",
              minHeight: 330,
              background: "#fff",
            }}
            bodyStyle={{ padding: 22 }}
          >
            <Title
              level={5}
              style={{ margin: 0, marginBottom: 18, color: "#1b1b1b" }}
            >
              Jenis Kontak
            </Title>
            <ReactApexChart
              type="pie"
              width="100%"
              height={200}
              series={jenisKontak.map((item) => item.value)}
              options={pieOptions(jenisKontak.map((item) => item.label))}
            />
            <ChartLegend
              data={jenisKontak}
              colors={pieColors}
              total={jenisKontak.reduce(
                (sum, item) => sum + (item.value ?? 0),
                0
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: 18,
              boxShadow: "0 2px 12px rgba(180,30,30,0.10)",
              minHeight: 330,
              background: "#fff",
            }}
            bodyStyle={{ padding: 22 }}
          >
            <Title
              level={5}
              style={{ margin: 0, marginBottom: 18, color: "#1b1b1b" }}
            >
              Jenis Media
            </Title>
            <ReactApexChart
              type="pie"
              width="100%"
              height={200}
              series={jenisMedia.map((item) => Number(item.value ?? 0))}
              options={pieOptions(jenisMedia.map((item) => item.label))}
            />
            <ChartLegend
              data={jenisMedia}
              colors={pieColors}
              total={jenisMedia.reduce(
                (sum, item) => sum + (item.value ?? 0),
                0
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
