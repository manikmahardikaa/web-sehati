"use client";

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const PsychosocialContent = lazy(() => import("./content"));

export default function Psychosocial() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <PsychosocialContent />
    </Suspense>
  );
}
