"use client";

import PetugasKesehatanLayout from "@/app/components/container/layout/petugas-kesehatan";
import { useAuth } from "@/app/utils/useAuth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {user_name} = useAuth();
  return <PetugasKesehatanLayout username={user_name!}>{children}</PetugasKesehatanLayout>;
}
