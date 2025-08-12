"use client";

import { lazy } from "react";

const LoginContent = lazy(() => import("./content"));

export default function Login() {
  return <LoginContent />;
}
