"use client";

import CustomLoading from "@/app/components/common/loading";
import { Suspense, lazy } from "react";

const HistoryControllAndMedicationContent = lazy(() => import("./content"));

export default function HistoryControllAndMedicationPage() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <HistoryControllAndMedicationContent />
    </Suspense>
  );
}
