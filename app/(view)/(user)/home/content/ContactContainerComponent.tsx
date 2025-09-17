"use client";

import React, { useMemo } from "react";
import ContactInfo, { WaContact } from "./ContactComponent";
import { useContacts } from "@/app/hooks/admin/contact";
import { ContactDataModel } from "@/app/models/admin/contact";

/** Normalisasi URL wa.me dari nomor (menerima 0xxxxxxxx / 62xxxxxxxx / +62xxxxxxxx) */
function toWaLink(phone?: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  const normalized = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits.startsWith("62")
    ? digits
    : digits;
  return `https://wa.me/${normalized}`;
}

function titleCase(s?: string) {
  return (s || "")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/** Ambil array Contact dari berbagai bentuk respons (array langsung / {result: []}) */
function extractContacts(raw: unknown): ContactDataModel[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as ContactDataModel[];
  const maybeObj = raw as { result?: unknown };
  if (Array.isArray(maybeObj?.result))
    return maybeObj!.result as ContactDataModel[];
  return [];
}

export default function ContactInfoContainer() {
  const { data: contactsRaw } = useContacts({});
  const contacts = useMemo(() => extractContacts(contactsRaw), [contactsRaw]);

  // Kelompokkan berdasarkan departement.name asli dari API (case-insensitive untuk pemetaan)
  const grouped = useMemo(() => {
    const map = new Map<
      string, // deptName (asli)
      ContactDataModel[]
    >();
    for (const c of contacts) {
      const dept = c.departement?.name || "Lainnya";
      const arr = map.get(dept) || [];
      arr.push(c);
      map.set(dept, arr);
    }
    return map;
  }, [contacts]);

  // Cari prioritas: "kadersehati" (kiri) dan "dinkes" (kanan), bila tak ada pakai 2 dept pertama
  const { leftName, rightName } = useMemo(() => {
    const entries = Array.from(grouped.keys());
    const findBy = (key: string) =>
      entries.find((x) => x.toLowerCase().trim() === key) ?? null;

    const left = findBy("kadersehati");
    const right = findBy("dinkes");

    if (left && right) return { leftName: left, rightName: right };

    // fallback: ambil 2 pertama berbeda
    if (entries.length >= 2)
      return { leftName: entries[0], rightName: entries[1] };
    if (entries.length === 1)
      return { leftName: entries[0], rightName: entries[0] };
    return { leftName: "Kader", rightName: "Dinkes" };
  }, [grouped]);

  // Konversi ke WaContact[]
  const toWaContacts = (deptName: string): WaContact[] => {
    const list = grouped.get(deptName) ?? [];
    return list.map((c) => ({
      label: c.name,
      phone: c.no_whatsapp || "-",
      onClick: () => {
        const url = toWaLink(c.no_whatsapp);
        if (url) window.open(url, "_blank");
      },
    }));
  };

  const leftContacts = toWaContacts(leftName);
  const rightContacts = toWaContacts(rightName);

  return (
    <ContactInfo
      leftTitle={titleCase(leftName)}
      rightTitle={titleCase(rightName)}
      leftContacts={leftContacts}
      rightContacts={rightContacts}
    />
  );
}
