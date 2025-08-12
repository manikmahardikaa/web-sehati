"use client";

import CustomLoading from "@/app/components/common/loading";
import { Suspense, lazy } from "react";

const AdminContent = lazy(() => import("./content"));

export default function Admin() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <AdminContent />
    </Suspense>
  );
}
