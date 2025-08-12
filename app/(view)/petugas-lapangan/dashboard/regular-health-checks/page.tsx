"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const ControlTimeDataContent = lazy(() => import("./content"));

export default function ControlTimeDataPage() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <ControlTimeDataContent />
    </Suspense>
  );
}
