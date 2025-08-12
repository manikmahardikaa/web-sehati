"use client";

import ProgramWilayahLayout from "@/app/components/container/layout/program-wilayah";
import { useAuth } from "@/app/utils/useAuth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user_name } = useAuth();
  return (
    <ProgramWilayahLayout username={user_name!}>
      {children}
    </ProgramWilayahLayout>
  );
}
