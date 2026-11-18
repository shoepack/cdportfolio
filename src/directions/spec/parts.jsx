import { AREAS } from "@/shared/profile";

// Datasheet vocabulary. These are the page's own grammar, not facts about Jason.
export const MODEL = "JA-26";
export const REV = "2026";

// The sheet's pages, in reading order. Page n in each heading comes from here.
export const PAGES = [
  { id: "top", title: "Model" },
  { id: "order", title: "How to order" },
  { id: "specs", title: "Experience" },
  { id: "tools", title: "Tools and languages" },
  { id: "contact", title: "Contact" },
];

// Order-code segment for each area in profile.js.
const CODES = { design: "DES", ai: "AI", business: "SYS", security: "SEC", infra: "INF" };
export const SEGMENTS = AREAS.map((a) => ({ ...a, code: CODES[a.id] ?? a.id.slice(0, 3).toUpperCase() }));

// Each win carries the code of the first area that cites it.
export const CODE_FOR_WIN = SEGMENTS.reduce((map, seg) => {
  seg.wins.forEach((id) => {
    if (!map[id]) map[id] = seg.code;
  });
  return map;
}, {});

export function NewTab() {
  return <span className="sr-only"> (opens in new tab)</span>;
}

export function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 22 10" width="22" height="10" className={`inline-block align-middle ${className}`} aria-hidden="true" focusable="false">
      <line x1="0" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M15 1.5 L21 5 L15 8.5 Z" fill="currentColor" />
    </svg>
  );
}

// "1–2/wk → ~1/mo" renders with a drawn arrow and reads as "… to …".
export function Metric({ value, className = "" }) {
  const parts = value.split("→").map((p) => p.trim());
  return (
    <span className={`num whitespace-nowrap ${className}`}>
      {parts.map((p, i) => (
        <span key={p}>
          {i > 0 && (
            <>
              <Arrow className="mx-1.5 -mt-0.5 text-red" />
              <span className="sr-only"> to </span>
            </>
          )}
          {p}
        </span>
      ))}
    </span>
  );
}

export function SheetHead({ id, title, page }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-2 border-ink pt-3">
      <h2 id={id} className="m-0 font-cond text-[1.625rem] font-semibold uppercase leading-[1.1] tracking-[0.02em] lg:text-[2.125rem]">
        {title}
      </h2>
      <p className="num m-0 text-[0.8125rem] text-ink-soft">
        {MODEL} · Rev. {REV} · Page {page}
      </p>
    </div>
  );
}

function Head({ dir }) {
  return (
    <svg viewBox="0 0 8 8" width="8" height="8" className="shrink-0" aria-hidden="true" focusable="false">
      {dir === "left" ? <path d="M0 4 L8 0.8 L8 7.2 Z" className="dim-head" /> : <path d="M8 4 L0 0.8 L0 7.2 Z" className="dim-head" />}
    </svg>
  );
}

function Rule() {
  return (
    <svg viewBox="0 0 100 8" preserveAspectRatio="none" height="8" className="h-2 min-w-0 flex-1" aria-hidden="true" focusable="false">
      <line x1="0" y1="4" x2="100" y2="4" className="dim" />
    </svg>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 1 18" width="1" height="18" className="shrink-0 overflow-visible" aria-hidden="true" focusable="false">
      <line x1="0.5" y1="0" x2="0.5" y2="18" className="dim" />
    </svg>
  );
}

// A drawing-style dimension line: extension ticks, arrowheads, label in the gap.
export function DimensionLine({ label, start, end, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Tick />
      <Head dir="left" />
      <Rule />
      {label ? (
        <span className="label shrink-0 px-2.5 text-[0.8125rem]">{label}</span>
      ) : (
        <>
          <span className="num shrink-0 px-2 text-[0.9375rem]">{start}</span>
          <Rule />
          <span className="num shrink-0 px-2 text-[0.9375rem]">{end}</span>
        </>
      )}
      <Rule />
      <Head dir="right" />
      <Tick />
    </div>
  );
}
