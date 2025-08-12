"use client"

import { Suspense, lazy } from "react";
import CustomLoading from "@/app/components/common/loading";

const NewsManagementContent = lazy(() => import("./content"));

export default function NewsManagement() {
    return (
        <Suspense fallback={<CustomLoading />}>
            <NewsManagementContent />
        </Suspense>
    );
}