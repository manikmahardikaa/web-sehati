"use client";

import AdminLayout from "@/app/components/container/layout/admin";
import { useAuth } from "@/app/utils/useAuth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user_name} = useAuth();
  return <AdminLayout username={user_name!}>{children}</AdminLayout>;
}
