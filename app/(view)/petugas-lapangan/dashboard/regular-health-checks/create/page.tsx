"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const ControlTimeDataCreateContent = lazy(() => import("./content"));

export default function ControlTimeDataCreatePage() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <ControlTimeDataCreateContent />
    </Suspense>
  );
}
