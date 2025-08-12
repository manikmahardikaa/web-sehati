"use client";
import React from "react";
import { Card, Row, Col, Typography, Statistic } from "antd";
import dynamic from "next/dynamic";
import { UsergroupAddOutlined, CalendarOutlined } from "@ant-design/icons";
import { usePatients } from "@/app/hooks/petugas-lapangan/patient";
import dayjs from "dayjs";
import { ControllHistoryDataModel } from "@/app/models/petugas-lapangan/controll-history";
import { MedicationHistoryDataModel } from "@/app/models/petugas-lapangan/medical-history";

// ⬇️ fix dynamic import for ApexChart
const ReactApexChart = dynamic(
  () => import("react-apexcharts").then((mod) => mod.default),
  { ssr: false }
);

const { Title, Text } = Typography;

export default function DashboardContent() {
  const { data: patientData } = usePatients({});
  console.log(patientData);

  const today = dayjs().format("YYYY-MM-DD");
  let kontrolTerjadwal = 0;
  if (patientData) {
    patientData.forEach((p) => {
      // Cari di ControlHistory yang date hari ini
      if (Array.isArray(p.controllHistory)) {
        kontrolTerjadwal += p.controllHistory.filter(
          (h: ControllHistoryDataModel) =>
            dayjs(h.date).format("YYYY-MM-DD") === today
        ).length;
      }
      // Cari di MedicationHistory yang date hari ini
      if (Array.isArray(p.medicationHistory)) {
        kontrolTerjadwal += p.medicationHistory.filter(
          (h: MedicationHistoryDataModel) =>
            dayjs(h.date).format("YYYY-MM-DD") === today
        ).length;
      }
    });
  }

  const totalPasien = patientData?.length;
  const belumDiatur = patientData
    ? patientData.filter(
        (p) =>
          (!p.controllHistory || p.controllHistory.length === 0) &&
          (!p.medicationHistory || p.medicationHistory.length === 0)
      ).length
    : 0;

  const barOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "40%" } },
    colors: ["#C30010"],
    dataLabels: { enabled: false },
    xaxis: { categories: ["Laki-laki", "Perempuan"] },
    yaxis: {
      labels: { style: { fontSize: 14 } },
      title: { text: "Jumlah Pasien" },
    },
    grid: { yaxis: { lines: { show: false } } },
  };
  const genderCount = { LAKI_LAKI: 0, PEREMPUAN: 0 };
  if (patientData) {
    patientData.forEach((p) => {
      if (p.gender === "LAKI_LAKI") genderCount["LAKI_LAKI"] += 1;
      else if (p.gender === "PEREMPUAN") genderCount["PEREMPUAN"] += 1;
    });
  }
  const barSeries = [
    {
      name: "Jumlah Pasien",
      data: [genderCount["LAKI_LAKI"], genderCount["PEREMPUAN"]],
    },
  ];

  const pieOptions = {
    labels: ["Sudah Kontrol", "Belum Kontrol"],
    colors: ["#7ED957", "#C30010"],
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
    tooltip: { y: { formatter: (val: number) => `${val} pasien` } },
  };

  let sudahKontrol = 0;
  let belumKontrol = 0;
  if (patientData) {
    patientData.forEach((p) => {
      const kontrol =
        (Array.isArray(p.controllHistory) &&
          p.controllHistory.some((h) => h.status === true)) &&
        (Array.isArray(p.medicationHistory) &&
          p.medicationHistory.some((h) => h.status === true));

      if (kontrol) {
        sudahKontrol += 1;
      } else {
        belumKontrol += 1;
      }
    });
  }
  const pieSeries = [sudahKontrol, belumKontrol];

  return (
    <div style={{ minHeight: "100vh", padding: 32 }}>
      <Title level={4} style={{ fontWeight: 700, marginBottom: 28 }}>
        Selamat Datang Petugas Lapangan
      </Title>
      {/* Card summary */}
      <Row gutter={24} style={{ marginBottom: 26 }}>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 12px #f6d4da30",
              minHeight: 95,
            }}
          >
            <Row align="middle" gutter={14}>
              <Col>
                <UsergroupAddOutlined
                  style={{
                    fontSize: 36,
                    color: "#C30010",
                    background: "#fff4f5",
                    borderRadius: 16,
                    padding: 8,
                  }}
                />
              </Col>
              <Col flex="auto">
                <Statistic
                  title={<Text style={{ fontSize: 16 }}>Total Pasien</Text>}
                  value={totalPasien}
                  valueStyle={{ color: "#222", fontWeight: 600 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 12px #f6d4da30",
              minHeight: 95,
            }}
          >
            <Row align="middle" gutter={14}>
              <Col>
                <CalendarOutlined
                  style={{
                    fontSize: 36,
                    color: "#C30010",
                    background: "#fff4f5",
                    borderRadius: 16,
                    padding: 8,
                  }}
                />
              </Col>
              <Col flex="auto">
                <Statistic
                  title={
                    <Text style={{ fontSize: 16 }}>
                      Kontrol Terjadwal Hari Ini
                    </Text>
                  }
                  value={kontrolTerjadwal}
                  valueStyle={{ color: "#222", fontWeight: 600 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 12px #f6d4da30",
              minHeight: 95,
            }}
          >
            <Row align="middle" gutter={14}>
              <Col>
                <CalendarOutlined
                  style={{
                    fontSize: 36,
                    color: "#C30010",
                    background: "#fff4f5",
                    borderRadius: 16,
                    padding: 8,
                  }}
                />
              </Col>
              <Col flex="auto">
                <Statistic
                  title={
                    <Text style={{ fontSize: 16 }}>
                      Jadwal Kontrol Belum Diatur
                    </Text>
                  }
                  value={belumDiatur}
                  valueStyle={{ color: "#222", fontWeight: 600 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* CHART */}
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 12px #f6d4da30",
              marginBottom: 24,
            }}
            bodyStyle={{ padding: "22px 18px 6px 18px" }}
          >
            <Title level={5} style={{ fontWeight: 600, marginBottom: 8 }}>
              Jumlah Pasien Laki-laki dan Perempuan (Per Hari Ini)
            </Title>
            {/* ✅ Pastikan ReactApexChart tidak undefined */}
            <ReactApexChart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={250}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 12px #f6d4da30",
              marginBottom: 24,
            }}
            bodyStyle={{ padding: "22px 18px 6px 18px" }}
          >
            <Title level={5} style={{ fontWeight: 600, marginBottom: 8 }}>
              Jumlah Pasien Sudah Kontrol dan Belum Kontrol (Per hari ini)
            </Title>
            <ReactApexChart
              options={pieOptions}
              series={pieSeries}
              type="pie"
              height={250}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
