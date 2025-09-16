"use client";

import { useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Typography,
  Pagination,
  Grid,
  Tabs,
} from "antd";
import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useContacts } from "@/app/hooks/admin/contact";
import { ContactDataModel } from "@/app/models/admin/contact";

const { Text } = Typography;

/* ---------------- types & helpers ---------------- */
type ApiContact = ContactDataModel;

type ContactItem = { id: string; name: string; phone: string };

function toWaLink(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  const normalized = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits.startsWith("62")
    ? digits
    : digits;
  return `https://wa.me/${normalized}`;
}

const WaLogo = () => (
  <svg width="120" height="28" viewBox="0 0 256 256">
    <path
      d="M128 30c-54.2 0-98 41.6-98 92.9 0 18.3 5.5 35.4 15.2 49.7L36 230l58.5-18.1c10 3 20.6 4.6 31.5 4.6 54.2 0 98-41.6 98-92.9C224.1 71.6 182.2 30 128 30z"
      fill="#25D366"
    />
    <path
      d="M95.1 89.3c-2.1-4.7-4.3-4.8-6.3-4.9-1.6-.1-3.4-.1-5.2-.1-1.8 0-4.6.7-7 3.4-2.4 2.7-9.2 9-9.2 21.9s9.4 25.4 10.7 27.1c1.3 1.7 18.2 29.1 45 39.6 22.3 8.8 26.8 7 31.7 6.6 4.9-.4 15.6-6.4 17.8-12.6 2.2-6.1 2.2-11.3 1.6-12.4-.6-1.1-2.4-1.8-5-3.1-2.6-1.3-15.6-7.7-18-8.5-2.4-.9-4.1-1.3-5.9 1.3-1.8 2.7-6.8 8.5-8.3 10.3-1.5 1.8-3.1 2-5.7.7-2.6-1.3-10.8-4-20.6-12.2-7.6-6.3-12.8-14-14.4-16.3-1.6-2.3-.2-3.6 1.1-4.9 1.2-1.2 2.6-3.1 3.9-4.7 1.3-1.6 1.7-2.7 2.6-4.5.9-1.8.5-3.3-.2-4.6-.7-1.3-6-14.8-8.3-20.1z"
      fill="#fff"
    />
  </svg>
);

/* ---------------- UI pieces ---------------- */
function ContactCard({
  item,
  focused,
  onClick,
}: {
  item: ContactItem;
  focused?: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      hoverable
      bodyStyle={{ padding: 20 }}
      style={{
        width: 280,
        borderRadius: 14,
        border: focused ? "2px solid #1677ff" : "1px solid #f0f0f0",
        boxShadow: focused
          ? "0 8px 18px rgba(22,119,255,.15)"
          : "0 6px 16px rgba(0,0,0,.06)",
        transition: "all .2s ease",
      }}
    >
      <div style={{ display: "grid", gap: 10 }}>
        <WaLogo />
        <Text strong style={{ fontSize: 14 }}>
          {item.name}
        </Text>
        <Button
          type="primary"
          block
          style={{
            background: "#d32b2b",
            borderColor: "#d32b2b",
            height: 40,
            fontWeight: 600,
          }}
          onClick={onClick}
        >
          Hubungi
        </Button>
      </div>
    </Card>
  );
}

function ContactGrid({
  data,
  page,
  pageSize,
  onPageChange,
}: {
  data: ContactItem[];
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
}) {
  const slice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  return (
    <>
      <Row gutter={[20, 20]} justify="center">
        {slice.map((c) => (
          <Col key={c.id}>
            <ContactCard
              item={c}
              onClick={() => {
                const link = toWaLink(c.phone);
                if (link) window.open(link, "_blank");
              }}
            />
          </Col>
        ))}
      </Row>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
        <Pagination
          current={page}
          total={data.length}
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false}
          itemRender={(pg, type, original) => {
            if (type === "prev")
              return (
                <span>
                  <LeftOutlined /> Sebelumnya
                </span>
              );
            if (type === "next")
              return (
                <span>
                  Selanjutnya <RightOutlined />
                </span>
              );
            return original;
          }}
        />
      </div>
    </>
  );
}

/* ---------------- main (with Tabs + API data) ---------------- */
export default function Content() {
  const screens = Grid.useBreakpoint();
  const { data: contactsRaw } = useContacts({});

  const [search, setSearch] = useState("");
  const [pageKader, setPageKader] = useState(1);
  const [pagePemegang, setPagePemegang] = useState(1);
  const pageSize = 4;

  // Ambil array dari response API (bisa langsung array, atau {result: []})
  const contacts: ApiContact[] = useMemo(() => {
    const raw: unknown = contactsRaw as unknown;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw as ApiContact[];
    const maybeObj = raw as { result?: unknown } | undefined;
    if (Array.isArray(maybeObj?.result)) return maybeObj!.result as ApiContact[];
    return [];
  }, [contactsRaw]);

  // Kelompokkan dan map ke ContactItem
  const kaderSehati: ContactItem[] = useMemo(
    () =>
      contacts
        .filter((c) => c.departement?.name?.toLowerCase() === "kader sehati")
        .map((c) => ({
          id: c.id,
          name: c.name,
          phone: c.no_whatsapp || "",
        })),
    [contacts]
  );

  const petugasLapangan: ContactItem[] = useMemo(
    () =>
      contacts
        .filter(
          (c) => c.departement?.name?.toLowerCase() === "petugas lapangan"
        )
        .map((c) => ({
          id: c.id,
          name: c.name,
          phone: c.no_whatsapp || "",
        })),
    [contacts]
  );

  // Search (case-insensitive) di masing-masing kelompok
  const filteredKader = useMemo(
    () =>
      kaderSehati.filter((k) =>
        k.name.toLowerCase().includes(search.toLowerCase())
      ),
    [kaderSehati, search]
  );
  const filteredPemegang = useMemo(
    () =>
      petugasLapangan.filter((k) =>
        k.name.toLowerCase().includes(search.toLowerCase())
      ),
    [petugasLapangan, search]
  );

  return (
    <div style={{ padding: screens.md ? "24px 24px 40px" : "16px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "12px 0 24px",
        }}
      >
        <Input
          allowClear
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Cari kontak…"
          style={{ maxWidth: 680, height: 44, borderRadius: 999 }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageKader(1);
            setPagePemegang(1);
          }}
        />
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="kader"
        items={[
          {
            key: "kader",
            label: "Kader SEHATI",
            children: (
              <ContactGrid
                data={filteredKader}
                page={pageKader}
                pageSize={pageSize}
                onPageChange={setPageKader}
              />
            ),
          },
          {
            key: "pemegang",
            label: "Pemegang Program Wilayah",
            children: (
              <ContactGrid
                data={filteredPemegang}
                page={pagePemegang}
                pageSize={pageSize}
                onPageChange={setPagePemegang}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
