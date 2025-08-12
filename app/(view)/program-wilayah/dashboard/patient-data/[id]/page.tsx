"use client"

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const PatientDataContent = lazy(() => import("./content"));

export default function PatientDataPage() {
    return (
        <Suspense fallback={<CustomLoading />}>
            <PatientDataContent />
        </Suspense>
    );
}