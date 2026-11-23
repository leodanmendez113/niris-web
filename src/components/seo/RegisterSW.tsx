"use client";
import { useEffect } from "react";
import { site } from "@/config/site";

/** Activa el "service worker": un pequeño programa del navegador que guarda el sitio para que cargue rápido y funcione sin conexión. */
export function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${site.basePath}/sw.js`, { scope: `${site.basePath}/` }).catch(() => {});
  }, []);
  return null;
}
