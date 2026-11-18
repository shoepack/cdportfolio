import { FiArrowDown, FiArrowRight, FiMail } from "react-icons/fi";
import { SiStripe, SiSupabase, SiVercel } from "react-icons/si";
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
                <span className="mt-1 text-[0.6875rem] leading-tight text-muted">{s.label}</span>
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

/* A simplified, public-safe overview of reotempintelligence.com, built from what Jason
   confirmed: who uses it, what it holds, and the services it runs on. */
function Node({ children, className = "" }) {
  return <div className={`rounded-lg border border-line bg-white px-3 py-2 ${className}`}>{children}</div>;
}

function Arrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-muted">
      <FiArrowDown className="size-4 lg:hidden" />
      <FiArrowRight className="hidden size-4 lg:block" />
    </div>
  );
}

export function ArchitectureDiagram() {
  const users = ["Customers", "Sales staff", "Admins"];
  const parts = ["Product pages & resource library", "Quote & subscription checkout", "Admin dashboard: SaaS metrics, past-due invoices"];
  const services = [
    { name: "Supabase", role: "Database", Mark: SiSupabase },
    { name: "Stripe", role: "Subscriptions & invoices", Mark: SiStripe },
    { name: "SMTP2GO", role: "Email delivery", Mark: FiMail },
  ];
  return (
    <figure className="mt-6 rounded-xl border border-line bg-raised p-4 sm:p-5" aria-labelledby="arch-title">
      <p id="arch-title" className="text-[0.8125rem] font-medium text-muted">
        How reotempintelligence.com fits together
      </p>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2 lg:grid-cols-[auto_auto_minmax(0,1fr)_auto_minmax(0,auto)] lg:items-center lg:gap-3 [&>*]:min-w-0">
        <ul className="flex flex-wrap gap-1.5 lg:flex-col" aria-label="Used by">
          {users.map((u) => (
            <li key={u}>
              <Node className="text-[0.8125rem] text-ink">{u}</Node>
            </li>
          ))}
        </ul>
        <Arrow />
        <div className="rounded-xl border border-pine/30 bg-pine-wash/50 p-3">
          <p className="flex min-w-0 items-center gap-1.5 text-[0.9375rem] font-semibold text-ink [overflow-wrap:anywhere]">
            <SiVercel aria-hidden="true" className="size-3.5 shrink-0" />
            reotempintelligence.com
          </p>
          <p className="text-[0.75rem] text-muted">HTML, CSS and JavaScript on Vercel</p>
          <ul className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1">
            {parts.map((p) => (
              <li key={p} className="rounded-md bg-white/80 px-2.5 py-1.5 text-[0.8125rem] leading-snug text-ink">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Arrow />
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-1.5" aria-label="Services">
          {services.map(({ name, role, Mark }) => (
            <li key={name}>
              <Node className="flex items-center gap-2">
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
      <figcaption className="mt-3 text-[0.75rem] text-muted">Simplified overview. I&rsquo;m the site&rsquo;s sole developer.</figcaption>
    </figure>
  );
}
