"use client";

import { Suspense, lazy } from "react";

import CustomLoading from "@/app/components/common/loading";
const PsikologiDataContent = lazy(() => import("./content"));

export default function PsikologiData() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <PsikologiDataContent />
    </Suspense>
  );
}
