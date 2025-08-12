/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import { Card, Row, Col, Typography } from "antd";
import {
  UserOutlined,
  UserSwitchOutlined,
  FileTextOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { usePatients } from "@/app/hooks/petugas-kesehatan/patient";
import { usePsikologis } from "@/app/hooks/petugas-kesehatan/psikologi";
import { useNewies } from "@/app/hooks/petugas-kesehatan/news";
import { useReports } from "@/app/hooks/petugas-kesehatan/report";
import ChartLegend from "@/app/components/common/chart-legend";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const { Title } = Typography;

export default function DashboardContent() {
  const { data: patientData } = usePatients({});
  const { data: psikologData } = usePsikologis({});
  const { data: newsData } = useNewies({});
  const { data: reportData } = useReports({});

  const patients = patientData ?? [];

  // ========= BAR CHART (Jumlah Pasien 2024 - 2025 per Sub Wilayah) =========
  const subwilayahList = Array.from(
    new Set(
      patients.map(
        (p) => p.petugas_lapangan?.subregion?.name || "Tanpa Sub Wilayah"
      )
    )
  );

  const countBy = (year: number, subwilayah: string) =>
    patients.filter(
      (p) =>
        p.year_of_diagnosis === year &&
        (p.petugas_lapangan?.subregion?.name || "Tanpa Sub Wilayah") ===
          subwilayah
    ).length;

  const barSeries = [
    {
      name: "2024",
      data: subwilayahList.map((sw) => countBy(2024, sw)),
    },
    {
      name: "2025",
      data: subwilayahList.map((sw) => countBy(2025, sw)),
    },
  ];

  const barOptions: any = {
    chart: { type: "bar", toolbar: { show: true } },
    colors: ["#e44a4a", "#6e1616"],
    plotOptions: {
      bar: { horizontal: false, borderRadius: 6, columnWidth: "40%" },
    },
    dataLabels: { enabled: false },
    legend: { show: true, position: "top" },
    xaxis: { categories: subwilayahList, labels: { rotate: -30 } },
    yaxis: { title: { text: "Jumlah Pasien" } },
    tooltip: { enabled: true },
  };

  // ================== PIE CHART (Tahun Diagnosa) ==================
  const yearCountMap = patients.reduce<Record<string, number>>((acc, p) => {
    const y = String(p.year_of_diagnosis ?? "Tidak diketahui");
    acc[y] = (acc[y] ?? 0) + 1;
    return acc;
  }, {});

  // Sort label by year (desc) when numeric; others go last
  const pieLabels = Object.keys(yearCountMap).sort((a, b) => {
    const na = Number(a),
      nb = Number(b);
    if (Number.isNaN(na) || Number.isNaN(nb)) return a.localeCompare(b);
    return nb - na;
  });

  const pieSeries = pieLabels.map((y) => yearCountMap[y]);
  const totalPatients = pieSeries.reduce((s, n) => s + n, 0);

  const pieOptions: any = {
    chart: { type: "pie" },
    labels: pieLabels,
    colors: ["#6e1616", "#d41c1c", "#e44a4a", "#b03e3e", "#eaa2a2", "#ffd6d6"],
    legend: { show: false },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px" },
      formatter: (_val: number, opts: any) =>
        `${opts.w.globals.series[opts.seriesIndex]}`,
    },
    tooltip: {
      y: { formatter: (val: number) => `${val} pasien` },
    },
  };

  // const legendData = pieLabels.map((label, i) => ({
  //   label,
  //   value: pieSeries[i],
  //   percent:
  //     totalPatients > 0
  //       ? `${Math.round((pieSeries[i] / totalPatients) * 100)}%`
  //       : "0%",
  // }));

  const statCards = [
    {
      icon: <UserOutlined style={{ fontSize: 28, color: "#d41c1c" }} />,
      title: "Total Pasien",
      value: patients.length,
    },
    {
      icon: <UserSwitchOutlined style={{ fontSize: 28, color: "#d41c1c" }} />,
      title: "Total Psikolog",
      value: psikologData?.length ?? 0,
    },
    {
      icon: <FileTextOutlined style={{ fontSize: 28, color: "#d41c1c" }} />,
      title: "Total Berita",
      value: newsData?.length ?? 0,
    },
    {
      icon: <FileDoneOutlined style={{ fontSize: 28, color: "#d41c1c" }} />,
      title: "Total Laporan",
      value: reportData?.length ?? 0,
    },
  ];

  const pieColors = [
    "#6e1616",
    "#d41c1c",
    "#e44a4a",
    "#b03e3e",
    "#eaa2a2",
    "#ffd6d6",
  ];

  const legendData = pieLabels.map((label, i) => ({
    label,
    value: pieSeries[i],
  }));

  return (
    <div style={{ padding: 16, minHeight: "100vh" }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Selamat Datang Petugas Kesehatan
      </Title>

      {/* Stat cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 16 }}>
        {statCards.map((card, idx) => (
          <Col key={idx} xs={24} sm={12} md={6}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
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
              <div style={{ borderRadius: 10, padding: 11, marginRight: 12 }}>
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

      {/* Charts */}
      <Row gutter={[24, 24]} style={{ marginTop: 6 }}>
        <Col xs={24} md={14}>
          <Card
            style={{
              borderRadius: 18,
              boxShadow: "0 2px 12px rgba(180,30,30,0.10)",
              background: "#fff",
              minHeight: 370,
            }}
            bodyStyle={{ padding: 22 }}
          >
            <Title
              level={5}
              style={{ margin: 0, marginBottom: 12, color: "#191919" }}
            >
              Jumlah Pasien 2024 - 2025
            </Title>
            <ReactApexChart
              type="bar"
              width="100%"
              height={290}
              options={barOptions}
              series={barSeries}
            />
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card
            style={{
              borderRadius: 18,
              boxShadow: "0 2px 12px rgba(180,30,30,0.10)",
              background: "#fff",
              minHeight: 370,
            }}
            bodyStyle={{ padding: 22 }}
          >
            <Title
              level={5}
              style={{ margin: 0, marginBottom: 12, color: "#191919" }}
            >
              Tahun Diagnosa
            </Title>
            <ReactApexChart
              type="pie"
              width="100%"
              height={240}
              options={pieOptions}
              series={pieSeries}
            />
            <ChartLegend
              data={legendData}
              colors={pieColors}
              total={totalPatients}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
