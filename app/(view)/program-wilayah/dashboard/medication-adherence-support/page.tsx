"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const MedicationAdherenceContent = lazy(() => import("./content"));
export default function MedicationAdherence() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <MedicationAdherenceContent />
    </Suspense>
  );
}
