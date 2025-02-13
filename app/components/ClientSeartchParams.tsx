"use client";

import { useSearchParams } from "next/navigation";

export function ClientSearchParams() {
  const searchParams = useSearchParams();
  return searchParams;
}
