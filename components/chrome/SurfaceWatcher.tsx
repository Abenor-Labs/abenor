"use client";

import { useEffect } from "react";

export function SurfaceWatcher() {
  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.dataset.surface = entry.isIntersecting
          ? "poster"
          : "paper";
      },
      { threshold: 0.35 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  return null;
}
