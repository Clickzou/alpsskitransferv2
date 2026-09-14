"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Recharge les données de la page toutes les vingt secondes, tant qu'un relevé tourne. */
export default function Rafraichir() {
  const router = useRouter();
  useEffect(() => {
    const minuteur = setInterval(() => router.refresh(), 20_000);
    return () => clearInterval(minuteur);
  }, [router]);
  return null;
}
