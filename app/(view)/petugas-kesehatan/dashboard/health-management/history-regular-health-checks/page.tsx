"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const HistoryRegularHealthChecksContent = lazy(() => import("./content"));
export default function HistoryRegularHealthChecksPage() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <HistoryRegularHealthChecksContent />
    </Suspense>
  );
}
