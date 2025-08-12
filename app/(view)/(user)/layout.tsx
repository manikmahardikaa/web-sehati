"use client";

import UserLayout from "@/app/components/container/layout/user";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserLayout>{children}</UserLayout>;
}
