"use client";

import PetugasLapanganLayout from "@/app/components/container/layout/petugas-lapangan";
import { useAuth } from "@/app/utils/useAuth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user_name } = useAuth();
  return (
    <PetugasLapanganLayout username={user_name!}>
      {children}
    </PetugasLapanganLayout>
  );
}
