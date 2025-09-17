/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState, useCallback } from "react";
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
import { SearchOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useContacts } from "@/app/hooks/admin/contact";
import { ContactDataModel } from "@/app/models/admin/contact";

const { Text } = Typography;

/* ---------------- util & types ---------------- */
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

function titleCase(s?: string) {
  return (s || "")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/* ---------------- kecil: kartu & grid ---------------- */
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

/* ---------------- main: Tabs dinamis dari departement ---------------- */
export default function Content() {
  const screens = Grid.useBreakpoint();
  const { data: contactsRaw } = useContacts({});

  const [search, setSearch] = useState("");
  const pageSize = 4;

  // Normalisasi respons -> array ApiContact
  const contacts: ApiContact[] = useMemo(() => {
    const raw: any = contactsRaw;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw as ApiContact[];
    if (Array.isArray(raw?.result)) return raw.result as ApiContact[];
    return [];
  }, [contactsRaw]);

  // Group by departement name (asli dari API), lalu map ke ContactItem
  const groups = useMemo(() => {
    const map = new Map<
      string, // deptName original
      ContactItem[]
    >();
    for (const c of contacts) {
      const dept = c.departement?.name || "Lainnya";
      const arr = map.get(dept) || [];
      arr.push({
        id: c.id,
        name: c.name,
        phone: c.no_whatsapp || "",
      });
      map.set(dept, arr);
    }
    return map;
  }, [contacts]);

  // Pencarian per grup
  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groups;
    const out = new Map<string, ContactItem[]>();
    for (const [dept, list] of groups.entries()) {
      out.set(
        dept,
        list.filter((i) => i.name.toLowerCase().includes(q))
      );
    }
    return out;
  }, [groups, search]);

  // State halaman per tab (key = dept original)
  const [pages, setPages] = useState<Record<string, number>>({});
  const getPage = useCallback((dept: string) => pages[dept] ?? 1, [pages]);
  const setPage = useCallback((dept: string, p: number) => {
    setPages((prev) => ({ ...prev, [dept]: p }));
  }, []);

  // Susun item Tabs secara dinamis
  const tabItems = useMemo(() => {
    return Array.from(filteredGroups.entries()).map(([dept, items]) => ({
      key: dept, // pakai nama asli sebagai key
      label: titleCase(dept), // tampilannya dibagusin
      children: (
        <ContactGrid
          data={items}
          page={getPage(dept)}
          pageSize={pageSize}
          onPageChange={(p) => setPage(dept, p)}
        />
      ),
    }));
  }, [filteredGroups, getPage, setPage]);

  // Default active tab = grup pertama
  const defaultActiveKey = tabItems[0]?.key;

  return (
    <div style={{ padding: screens.md ? "24px 24px 40px" : "16px" }}>
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
            // reset semua halaman ke 1 saat cari
            setPages({});
          }}
        />
      </div>

      {/* Tabs dinamis berdasar nama departement */}
      <Tabs
        defaultActiveKey={defaultActiveKey}
        items={tabItems}
        destroyInactiveTabPane={false}
      />
    </div>
  );
}
