/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo } from "react";
import { Card, Row, Col, Typography, Statistic, Select } from "antd";
import dynamic from "next/dynamic";
import {
  UsergroupAddOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import {
  usePatients,
} from "@/app/hooks/program-wilayah/patient";
import { PatientDataModel } from "@/app/models/program-wilayah/patient";
import { usePsikologiBlasts } from "@/app/hooks/program-wilayah/psikologi-blast";
import { usePetugasLapangans } from "@/app/hooks/program-wilayah/petugas-lapangan";
import { useMonthlyPatients } from "@/app/hooks/program-wilayah/monthly-patient";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const { Title, Text } = Typography;
const { Option } = Select;

// Helper untuk tahun select
const getYearList = (min = 2021, max = new Date().getFullYear()) => {
  const years = [];
  for (let y = max; y >= min; y--) years.push(y);
  return years;
};

export default function DashboardContent() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  // Fetch patients per bulan, update sesuai tahun yang dipilih
  const { data: monthlyPatients } = useMonthlyPatients({
    queryString: `year=${selectedYear}`,
  });

  const { data: consultationData } = usePsikologiBlasts({});

  // Fetch seluruh pasien
  const { data: patientsData } = usePatients({});

  const { data: petugasLapanganData } = usePetugasLapangans({});

  // Data summary
  const jumlahPasien = patientsData?.length || 0;
  const jumlahPetugas = petugasLapanganData?.length || 0;
  const jumlahKonsultasi = consultationData?.length || 0;

  // Line chart: jumlah pasien per bulan
  const lineData = useMemo(() => {
    // Saat loading atau error, tetap return 12 data (isi 0)
    if (!monthlyPatients || monthlyPatients.length < 12)
      return Array(12).fill(0);

    // Pastikan array urut bulan 1-12
    const ordered = Array(12)
      .fill(0)
      .map((_, idx) => {
        const found = monthlyPatients.find((item) => item.month === idx + 1);
        return found?.count || 0;
      });
    return ordered;
  }, [monthlyPatients]);

  // Line chart options — TANPA chart.type atau kunci literal
  const lineOptions: ApexOptions = {
    chart: { toolbar: { show: false } }, // <-- hapus "type" di sini
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "Januari",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ags",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      labels: { style: { fontSize: "12px" } }, // fontSize string agar kompatibel
    },
    yaxis: {
      title: { text: "Jumlah Pasien" },
      labels: { style: { fontSize: "12px" } },
    },
    colors: ["#C30010"],
    fill: { type: "solid", opacity: 0.35 },
    stroke: { curve: "smooth", width: 2 },
    grid: { yaxis: { lines: { show: false } } },
    tooltip: { y: { formatter: (val: number) => `${val} pasien` } },
  };

  const lineSeries = [
    {
      name: "Pasien",
      data: lineData,
    },
  ];

  // Donut chart: pasien berdasarkan tahun diagnosis
  const donutData = useMemo(() => {
    if (!patientsData) return { labels: [], series: [] };
    const yearCount: Record<number, number> = {};
    patientsData.forEach((p: PatientDataModel) => {
      yearCount[p.year_of_diagnosis] =
        (yearCount[p.year_of_diagnosis] || 0) + 1;
    });
    const sortedYears = Object.keys(yearCount).sort();
    return {
      labels: sortedYears,
      series: sortedYears.map((y) => yearCount[Number(y)]),
    };
  }, [patientsData]);

  // Donut chart options — boleh tanpa chart.type, atau kunci literal
  const donutOptions: ApexOptions = {
    // chart: { type: "donut" as const }, // opsional; bisa dihapus karena prop type sudah "donut"
    labels: donutData.labels,
    colors: ["#F55C47", "#FFDDCC", "#B83B5E", "#C30010", "#7ED957", "#6A0572"],
    legend: { position: "bottom" },
    dataLabels: {
      enabled: true,
      formatter: (_val: number, opts: any) =>
        donutData.series[opts.seriesIndex],
    },
    plotOptions: {
      pie: {
        donut: {
          labels: { show: true, total: { show: true, label: "Total" } },
        },
      },
    },
    tooltip: { y: { formatter: (val: number) => `${val} pasien` } },
  };

  return (
    <div style={{ minHeight: "100vh", padding: 32 }}>
      <Title level={3} style={{ fontWeight: 700, marginBottom: 28 }}>
        Selamat Datang Pemegang Program Wilayah
      </Title>
      {/* Summary Cards */}
      <Row gutter={24} style={{ marginBottom: 22 }}>
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
                    fontSize: 32,
                    color: "#C30010",
                    background: "#fff4f5",
                    borderRadius: 16,
                    padding: 8,
                  }}
                />
              </Col>
              <Col flex="auto">
                <Statistic
                  title={<Text style={{ fontSize: 16 }}>Jumlah Pasien</Text>}
                  value={jumlahPasien}
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
                <UserOutlined
                  style={{
                    fontSize: 32,
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
                      Jumlah Petugas Lapangan
                    </Text>
                  }
                  value={jumlahPetugas}
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
                <SolutionOutlined
                  style={{
                    fontSize: 32,
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
                    <Text style={{ fontSize: 16 }}>Jumlah Konsultasi</Text>
                  }
                  value={jumlahKonsultasi}
                  valueStyle={{ color: "#222", fontWeight: 600 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 12px #f6d4da30",
              marginBottom: 24,
            }}
            bodyStyle={{ padding: "22px 18px 6px 18px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Title level={5} style={{ fontWeight: 600, marginBottom: 0 }}>
                Jumlah Pasien Tahun {selectedYear}
              </Title>
              <Select
                style={{ width: 120 }}
                value={selectedYear}
                onChange={setSelectedYear}
              >
                {getYearList(2021).map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
            {lineData && lineData.length > 0 && (
              <ReactApexChart
                options={lineOptions}
                series={lineSeries}
                type="area"
                height={260}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
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
              Jumlah Pasien berdasarkan Tahun Diagnosis
            </Title>
            {donutData.series && donutData.series.length > 0 && (
              <ReactApexChart
                options={donutOptions}
                series={donutData.series}
                type="donut"
                height={260}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
