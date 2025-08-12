"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const PatientDataDetailContent = lazy(() => import("./content"));
export default function PatientDataDetailPage() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <PatientDataDetailContent />
    </Suspense>
  );
}
