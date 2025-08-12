"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const PatientControlContent = lazy(() => import("./content"));

export default function PatientControl() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <PatientControlContent />
    </Suspense>
  );
}

