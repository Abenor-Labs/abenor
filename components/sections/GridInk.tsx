"use client";

import { useEffect, useRef } from "react";

const INK = "28, 25, 23";
const RED = "200, 16, 46";
const CELL = 32;
const RISE = 0.15;
const FADE = 2.2;

type Slug = { x: number; y: number; born: number; peak: number; red: boolean };

export function GridInk() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    // The rule grid never changes between frames. Rasterise it once per resize
    // and blit it, instead of rebuilding ~120 path segments sixty times a second.
    const gridLayer = document.createElement("canvas");
    const gridCtx = gridLayer.getContext("2d");
    if (!gridCtx) return;

    let head = 0;
    let frac = 0;
    let run = 4;
    let spacing = 0;
    const slugs = new Map<number, Slug>();
    let last = 0;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      if (head >= cols * rows) head = 0;
      buildGrid();
    };

    const buildGrid = () => {
      gridLayer.width = canvas.width;
      gridLayer.height = canvas.height;
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridCtx.clearRect(0, 0, w, h);
      gridCtx.strokeStyle = `rgba(${INK}, 0.03)`;
      gridCtx.lineWidth = 1;
      gridCtx.beginPath();
      for (let x = 0; x <= w; x += CELL) {
        gridCtx.moveTo(x + 0.5, 0);
        gridCtx.lineTo(x + 0.5, h);
      }
      for (let y = 0; y <= h; y += CELL) {
        gridCtx.moveTo(0, y + 0.5);
        gridCtx.lineTo(w, y + 0.5);
      }
      gridCtx.stroke();
    };

    const drawGrid = () => {
      if (w > 0 && h > 0) ctx.drawImage(gridLayer, 0, 0, w, h);
    };

    const setNextSlug = () => {
      if (spacing > 0) {
        spacing--;
      } else {
        const red = Math.random() < 0.1;
        slugs.set(head, {
          x: (head % cols) * CELL,
          y: Math.floor(head / cols) * CELL,
          born: last,
          peak: red ? 0.1 : 0.05,
          red,
        });
        run--;
        if (run <= 0) {
          spacing = 1 + Math.floor(Math.random() * 2);
          run = 3 + Math.floor(Math.random() * 4);
        }
      }
      head++;
      if (head >= cols * rows) head = 0;
      if (slugs.size > 500) {
        const oldest = slugs.keys().next().value;
        if (oldest !== undefined) slugs.delete(oldest);
      }
    };

    const frame = (t: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;

      frac += dt * 11;
      while (frac >= 1) {
        frac -= 1;
        setNextSlug();
      }

      ctx.clearRect(0, 0, w, h);
      drawGrid();

      slugs.forEach((slug, key) => {
        const age = (t - slug.born) / 1000;
        const a =
          slug.peak * Math.min(1, age / RISE) * Math.max(0, 1 - (age - RISE) / FADE);
        if (a <= 0.008) {
          slugs.delete(key);
          return;
        }
        ctx.fillStyle = slug.red
          ? `rgba(${RED}, ${a})`
          : `rgba(${INK}, ${a})`;
        ctx.fillRect(slug.x + 1, slug.y + 1, CELL - 2, CELL - 2);
      });

      raf = requestAnimationFrame(frame);
    };

    const staticDraw = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
    };

    resize();

    if (reduced) {
      staticDraw();
      const ro = new ResizeObserver(() => {
        resize();
        staticDraw();
      });
      ro.observe(parent);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(parent);
    last = performance.now();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
