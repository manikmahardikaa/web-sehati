import { Card, Row, Col } from "antd";

import { usePatient } from "@/app/hooks/petugas-lapangan/patient";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import TabsColumn from "./tabs-column";
import { useMedicationHistories } from "@/app/hooks/petugas-lapangan/medical-history";
import { useControllHistories } from "@/app/hooks/petugas-lapangan/controll-history";

interface StatusItem {
  status: boolean;
  [key: string]: boolean;
}

export default function PatientDataDetailContent() {
  const query = useParams();
  const user_id = query.id as string;

  const { data: medicationHistory } = useMedicationHistories({
    queryString: `patient_id=${user_id}`,
  });

  const { data: controllHistory } = useControllHistories({
    queryString: `patient_id=${user_id}`,
  });

  const { data: detailPatient, fetchLoading } = usePatient({ id: user_id });

  if (fetchLoading || !detailPatient) {
    return <div>Loading...</div>;
  }

  const { name, no_whatsapp, street, birth_date, year_of_diagnosis } =
    detailPatient;

  const countStatus = (arr: StatusItem[] | undefined, key = "status") => {
    if (!arr) return { true: 0, false: 0 };
    return arr.reduce(
      (acc, item) => {
        if (item[key]) acc.true += 1;
        else acc.false += 1;
        return acc;
      },
      { true: 0, false: 0 }
    );
  };

  const controllStatusCount = countStatus(
    controllHistory?.map((item) => ({ status: item.status })) ?? []
  );
  const medicationStatusCount = countStatus(
    medicationHistory?.map((item) => ({ status: item.status })) ?? []
  );

  return (
    <div style={{ padding: 16, background: "#FAFAFA" }}>
      {/* Atas */}
      <Row gutter={16} style={{ marginBottom: 32 }}>
        <Col xs={24} md={16}>
          <Card>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Informasi
            </div>
            <table style={{ width: "100%", background: "#fff" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontWeight: 500,
                      padding: 8,
                      background: "#ffe6ea",
                      width: 160,
                    }}
                  >
                    Nama Pasien
                  </td>
                  <td style={{ padding: 8 }}>{name}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: 500,
                      padding: 8,
                      background: "#ffe6ea",
                    }}
                  >
                    No Whatsapp
                  </td>
                  <td style={{ padding: 8 }}>{no_whatsapp}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: 500,
                      padding: 8,
                      background: "#ffe6ea",
                    }}
                  >
                    Alamat
                  </td>
                  <td style={{ padding: 8 }}>{street}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: 500,
                      padding: 8,
                      background: "#ffe6ea",
                    }}
                  >
                    Tanggal Lahir
                  </td>
                  <td style={{ padding: 8 }}>
                    {birth_date
                      ? dayjs(birth_date).format("DD MMMM YYYY")
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: 500,
                      padding: 8,
                      background: "#ffe6ea",
                    }}
                  >
                    Tahun Diagnosa
                  </td>
                  <td style={{ padding: 8 }}>{year_of_diagnosis || "-"}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Col>
        <Col xs={24} md={8} style={{ height: "100%" }}>
          <Row gutter={16} style={{ height: "100%" }}>
            <Col span={24} style={{ height: "50%" }}>
              <Card
                style={{
                  marginBottom: 16,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "#222", fontWeight: 600 }}>
                  Total Kontrol
                </div>
                <div
                  style={{ fontSize: 36, fontWeight: 700, color: "#C30010" }}
                >
                  {(controllHistory && controllHistory.length) || 0}
                </div>
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: "#16a34a", fontWeight: 500 }}>
                    Selesai: {controllStatusCount.true}
                  </span>{" "}
                  |{" "}
                  <span style={{ color: "#d93025", fontWeight: 500 }}>
                    Pending: {controllStatusCount.false}
                  </span>
                </div>
              </Card>
            </Col>
            <Col span={24} style={{ height: "50%" }}>
              <Card
                style={{
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "#222", fontWeight: 600 }}>
                  Total Pengambilan Obat
                </div>
                <div
                  style={{ fontSize: 36, fontWeight: 700, color: "#C30010" }}
                >
                  {(medicationHistory && medicationHistory.length) || 0}
                </div>
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: "#16a34a", fontWeight: 500 }}>
                    Selesai: {medicationStatusCount.true}
                  </span>{" "}
                  |{" "}
                  <span style={{ color: "#d93025", fontWeight: 500 }}>
                    Pending: {medicationStatusCount.false}
                  </span>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Bawah */}
      <Card style={{ width: "100%", borderRadius: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <Title level={4} style={{ margin: 0 }}>
                Jadwal Kontrol
              </Title>
            </span>
          </div>
        </div>
        <TabsColumn user_id={user_id} />
      </Card>
    </div>
  );
}
