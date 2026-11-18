import { useId } from "react";
import { FiArrowDown, FiArrowRight, FiFileText, FiMail } from "react-icons/fi";
import { SiOpenai, SiStripe, SiSupabase, SiVercel } from "react-icons/si";
import { TOOL_MARKS } from "./icons.js";

export function IconTile({ Icon }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-pine-wash text-pine ring-1 ring-inset ring-pine/10"
    >
      <Icon className="size-[1.05rem]" />
    </span>
  );
}

export function ToolChips({ tools }) {
  if (!tools?.length) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
      {tools.map((t) => {
        const Mark = TOOL_MARKS[t];
        return (
          <li
            key={t}
            className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-line bg-raised px-2.5 text-[0.8125rem] text-muted"
          >
            {Mark && <Mark aria-hidden="true" className="size-3.5 text-ink/70" />}
            {t}
          </li>
        );
      })}
    </ul>
  );
}

export function Logo({ logo, company, className = "" }) {
  return (
    <span className={`inline-flex shrink-0 overflow-hidden rounded-lg ring-1 ring-line ${className}`}>
      <picture className="block">
        <source type="image/webp" srcSet={logo.src} />
        <img
          src={logo.fallback}
          width={logo.width}
          height={logo.height}
          alt={`${company} logo`}
          loading="lazy"
          decoding="async"
          className="block h-9 w-auto max-w-none sm:h-11"
        />
      </picture>
    </span>
  );
}

/* How the AI quoting assistant works, as one compact strip.
   The real tool is internal (NDA): the part number and price are invented. */
const SEGMENTS = [
  { code: "PG", label: "Series" },
  { code: "25", label: "2.5″ dial" },
  { code: "L4", label: "¼″ lower mount" },
  { code: "160P", label: "0–160 psi" },
];

export function QuotingDiagram() {
  return (
    <figure className="mt-5 rounded-xl border border-line bg-raised p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <ol className="flex flex-wrap items-start gap-1.5" aria-label="Part number split into segments">
          {SEGMENTS.map((s, i) => (
            <li key={s.code} className="flex items-start gap-1.5">
              <span className="flex flex-col items-center">
                <span className="num inline-flex h-8 items-center rounded-md bg-pine-wash px-2 text-[0.875rem] font-medium text-pine">
                  {s.code}
                </span>
                <span className="mt-1 text-[0.75rem] leading-tight text-muted">{s.label}</span>
              </span>
              {i < SEGMENTS.length - 1 && (
                <span aria-hidden="true" className="pt-1.5 text-muted">
                  -
                </span>
              )}
            </li>
          ))}
        </ol>
        <FiArrowRight aria-hidden="true" className="hidden size-4 shrink-0 text-muted sm:block" />
        <FiArrowDown aria-hidden="true" className="size-4 shrink-0 text-muted sm:hidden" />
        <p className="w-fit rounded-2xl rounded-bl-sm border border-line bg-white px-3 py-2 text-[0.875rem] leading-snug text-ink">
          <span className="num font-medium">$48.20</span>
          <span className="text-muted"> · 2.5″ gauge, 0–160 psi, lower mount</span>
        </p>
      </div>
      <figcaption className="mt-3 text-[0.75rem] text-muted">
        Illustrative part number and price, not Reotemp data. The real tool is internal.
      </figcaption>
    </figure>
  );
}

/* Simplified, public-safe overviews of the two public sites. Generic by design:
   who uses each site, what it does, and the services it runs on. No endpoints,
   data model, auth mechanics or other internals. */
const SYSTEMS = {
  rti: {
    title: "How reotempintelligence.com fits together",
    host: "reotempintelligence.com",
    stack: "HTML, CSS and JavaScript, plus serverless functions, on Vercel",
    users: ["Customers", "Reotemp staff"],
    parts: [
      "Product pages & resource library",
      "Configurator \u2192 emailed quote \u2192 sign \u2192 pay",
      "Staff dashboard: quotes, pricing, past-due invoices",
    ],
    services: [
      { name: "Supabase", role: "Data & staff sign-in", Mark: SiSupabase },
      { name: "Stripe", role: "Billing", Mark: SiStripe },
      { name: "SMTP2GO", role: "Quote & order emails", Mark: FiMail },
    ],
    caption: "Simplified overview. I built the site as its sole developer.",
  },
  wfc: {
    title: "How wakefrequencycalc.com fits together",
    host: "wakefrequencycalc.com",
    stack: "Static front end and Python serverless functions on Vercel",
    users: ["Engineers & customers", "reotemp.com configurator"],
    parts: [
      "Pass or fail on ASME PTC 19.3 TW-2016\u2019s four criteria",
      "Fix suggestions when a design fails",
      "Batch: up to 500 wells from an Excel workbook",
      "PDF reports",
    ],
    services: [
      { name: "OpenAI", role: "Suggestions when the engine finds no fix", Mark: SiOpenai },
      { name: "PDF service", role: "Renders the reports", Mark: FiFileText },
    ],
    note: "Stateless: no database, each request carries its own inputs.",
    caption: "Simplified overview.",
  },
};

function Node({ children, className = "" }) {
  return <div className={`rounded-lg border border-line bg-white px-3 py-2 ${className}`}>{children}</div>;
}

function Arrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-muted">
      <FiArrowDown className="size-4" />
    </div>
  );
}

export function ArchitectureDiagram({ site }) {
  const sys = SYSTEMS[site];
  const titleId = useId();
  if (!sys) return null;
  return (
    <figure className="mt-6 rounded-xl border border-line bg-raised p-4 sm:p-5" aria-labelledby={titleId}>
      <p id={titleId} className="text-[0.8125rem] font-medium text-muted">
        {sys.title}
      </p>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2 [&>*]:min-w-0">
        <ul className="flex flex-wrap gap-1.5" aria-label="Used by">
          {sys.users.map((u) => (
            <li key={u}>
              <Node className="text-[0.8125rem] text-ink">{u}</Node>
            </li>
          ))}
        </ul>
        <Arrow />
        <div className="rounded-xl border border-pine/30 bg-pine-wash/50 p-3">
          <p className="flex min-w-0 items-center gap-1.5 text-[0.9375rem] font-semibold text-ink [overflow-wrap:anywhere]">
            <SiVercel aria-hidden="true" className="size-3.5 shrink-0" />
            {sys.host}
          </p>
          <p className="text-[0.75rem] text-muted">{sys.stack}</p>
          <ul className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
            {sys.parts.map((p) => (
              <li key={p} className="rounded-md bg-white/80 px-2.5 py-1.5 text-[0.8125rem] leading-snug text-ink">
                {p}
              </li>
            ))}
          </ul>
          {sys.note && <p className="mt-2 text-[0.75rem] text-muted">{sys.note}</p>}
        </div>
        <Arrow />
        <ul className={`grid grid-cols-[minmax(0,1fr)] gap-1.5 ${sys.services.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`} aria-label="Services">
          {sys.services.map(({ name, role, Mark }) => (
            <li key={name}>
              <Node className="flex h-full items-center gap-2">
                <Mark aria-hidden="true" className="size-3.5 shrink-0 text-ink/70" />
                <span className="min-w-0 text-[0.8125rem] [overflow-wrap:anywhere]">
                  <span className="font-medium text-ink">{name}</span>
                  <span className="text-muted"> · {role}</span>
                </span>
              </Node>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-[0.75rem] text-muted">{sys.caption}</figcaption>
    </figure>
  );
}
