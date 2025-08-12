"use client";

import CustomLoading from "@/app/components/common/loading";
import { Suspense, lazy } from "react";

const UserContent = lazy(() => import("./content"));

export default function User() {
    return (
        <Suspense fallback={<CustomLoading />}>
            <UserContent />
        </Suspense>
    );
}