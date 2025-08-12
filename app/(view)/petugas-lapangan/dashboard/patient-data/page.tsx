"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const AdminContent = lazy(() => import("./content"));
export default function AdminPage() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <AdminContent />
    </Suspense>
  );
}
