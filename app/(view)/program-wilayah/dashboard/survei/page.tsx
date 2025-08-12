"use client"

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const SurveiContent = lazy(() => import("./content"));
export default function Survei() {
    return (
        <Suspense fallback={<CustomLoading />}>
            <SurveiContent />
        </Suspense>
    );
}