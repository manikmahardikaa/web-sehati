"use client";

import { Suspense, lazy } from "react";

import CustomLoading from "@/app/components/common/loading";

const Content = lazy(() => import("./content"));

export default function Page() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <Content />
    </Suspense>
  );
}
