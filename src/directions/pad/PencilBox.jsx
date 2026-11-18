import { useEffect, useLayoutEffect, useRef, useState } from "react";

// The signature move: a red-pencil box drawn once around an answer as it
// scrolls into view. The content is always visible; only the stroke draws.
// Under reduced motion (or without IntersectionObserver) the box is static.

const PAD = 6; // how far the stroke sits outside the element's border box

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A hand-boxed rectangle: slightly bowed edges, soft corners, and an
// overshoot past the starting point, the way a pencil closes a box.
function boxPath(w, h, seed) {
  const r = rng(seed);
  const j = (a) => (r() - 0.5) * 2 * a;
  const x0 = PAD - 1, y0 = PAD - 1;
  const x1 = w + PAD + 1, y1 = h + PAD + 1;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  const f = (n) => n.toFixed(1);
  return [
    `M ${f(x0 + 16 + j(4))} ${f(y0 + 1.2 + j(0.8))}`,
    `Q ${f(mx)} ${f(y0 - 1.2 + j(1.2))} ${f(x1 - 4)} ${f(y0 + 0.4 + j(0.8))}`,
    `Q ${f(x1 + 0.6)} ${f(y0 + 0.6)} ${f(x1 + j(0.5))} ${f(y0 + 5)}`,
    `Q ${f(x1 + 1.2 + j(1))} ${f(my)} ${f(x1 - 0.6 + j(0.6))} ${f(y1 - 4)}`,
    `Q ${f(x1 - 0.4)} ${f(y1 + 0.4)} ${f(x1 - 5)} ${f(y1 + j(0.5))}`,
    `Q ${f(mx)} ${f(y1 + 1.4 + j(1.2))} ${f(x0 + 4)} ${f(y1 - 0.6 + j(0.6))}`,
    `Q ${f(x0 - 0.6)} ${f(y1 - 0.4)} ${f(x0 + j(0.5))} ${f(y1 - 5)}`,
    `Q ${f(x0 - 1.2 + j(1))} ${f(my)} ${f(x0 + 0.6 + j(0.6))} ${f(y0 + 6)}`,
    `Q ${f(x0 + 0.8)} ${f(y0 + 0.6)} ${f(x0 + 7)} ${f(y0 + 0.8)}`,
    `L ${f(x0 + 34 + j(6))} ${f(y0 - 0.2 + j(0.8))}`,
  ].join(" ");
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function PencilBox({ as: Tag = "div", seed = 1, className = "", children, ...rest }) {
  const ref = useRef(null);
  const pathRef = useRef(null);
  const [size, setSize] = useState(null);
  const [len, setLen] = useState(0);
  // static: box shown, no motion. armed: hidden, waiting. drawn: drawing/finished.
  const [phase, setPhase] = useState("static");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return () => ro?.disconnect();

    setPhase("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          requestAnimationFrame(() => requestAnimationFrame(() => setPhase("drawn")));
        }
      },
      { threshold: 0.6, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => {
      ro?.disconnect();
      io.disconnect();
    };
  }, []);

  useIsoLayoutEffect(() => {
    if (pathRef.current && size) setLen(Math.ceil(pathRef.current.getTotalLength()) + 2);
  }, [size]);

  const hidden = phase === "armed" || (phase === "drawn" && !len);
  const style = len
    ? { strokeDasharray: `${len} ${len}`, strokeDashoffset: hidden ? len : 0 }
    : phase === "static"
      ? undefined
      : { opacity: 0 };

  return (
    <Tag ref={ref} className={`pbox ${className}`} {...rest}>
      {children}
      {size && (
        <svg
          className={`pbox-svg${phase === "drawn" ? " is-drawing" : ""}`}
          width={size.w + PAD * 2}
          height={size.h + PAD * 2}
          viewBox={`0 0 ${size.w + PAD * 2} ${size.h + PAD * 2}`}
          aria-hidden="true"
          focusable="false"
        >
          <path ref={pathRef} d={boxPath(size.w, size.h, seed)} style={style} />
        </svg>
      )}
    </Tag>
  );
}
