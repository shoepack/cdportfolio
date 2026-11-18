import {
  FiActivity,
  FiBarChart2,
  FiCpu,
  FiCreditCard,
  FiLayers,
  FiLayout,
  FiMessageSquare,
  FiServer,
  FiShield,
  FiTarget,
} from "react-icons/fi";
import { SiCloudflare, SiFigma, SiJavascript, SiJira, SiOdoo, SiPhp, SiPython, SiStripe, SiSupabase, SiVercel } from "react-icons/si";

// One UI icon family (Feather) for wins and areas; brand marks only for named tools.
export const WIN_ICONS = {
  stripe: FiCreditCard,
  wakecalc: FiActivity,
  configurators: FiLayout,
  quoting: FiMessageSquare,
  matching: FiTarget,
  odoo: FiLayers,
  metrics: FiBarChart2,
  uptime: FiShield,
};

export const AREA_ICONS = {
  design: FiLayout,
  ai: FiCpu,
  business: FiLayers,
  security: FiShield,
  infra: FiServer,
};

const TOOL_MARKS = {
  Stripe: SiStripe,
  Vercel: SiVercel,
  Figma: SiFigma,
  Jira: SiJira,
  Python: SiPython,
  Odoo: SiOdoo,
  Cloudflare: SiCloudflare,
  PHP: SiPhp,
  JavaScript: SiJavascript,
  Supabase: SiSupabase,
};

export function IconTile({ Icon, size = "md" }) {
  const box = size === "lg" ? "size-11 rounded-xl" : "size-9 rounded-lg";
  return (
    <span
      aria-hidden="true"
      className={`${box} inline-flex shrink-0 items-center justify-center bg-pine-wash text-pine ring-1 ring-inset ring-pine/10`}
    >
      <Icon className={size === "lg" ? "size-5" : "size-[1.05rem]"} />
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
          className="block h-11 w-auto max-w-none"
        />
      </picture>
    </span>
  );
}

/* How the AI quoting assistant works, as a labelled illustration.
   The real tool is internal (NDA): placeholder segments, no real part number or price. */
export function QuotingDiagram() {
  const segs = [
    { k: "A", label: "Series" },
    { k: "B", label: "Size" },
    { k: "C", label: "Range" },
    { k: "D", label: "Option" },
  ];
  return (
    <figure className="mt-5 overflow-hidden rounded-xl border border-line bg-raised">
      <div className="grid gap-px bg-line sm:grid-cols-3">
        <div className="bg-raised p-4">
          <p className="text-[0.75rem] font-medium text-muted">1 · Part number in</p>
          <div className="mt-3 flex flex-wrap gap-1" aria-hidden="true">
            {segs.map((s, i) => (
              <span key={s.k} className="flex items-center gap-1">
                <span className="num inline-flex h-8 min-w-9 items-center justify-center rounded-md bg-pine-wash px-2 text-[0.875rem] font-medium text-pine">
                  {s.k.repeat(i === 0 ? 3 : 2)}
                </span>
                {i < segs.length - 1 && <span className="text-muted">-</span>}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[0.8125rem] leading-snug text-muted">Split into its segments.</p>
        </div>
        <div className="bg-raised p-4">
          <p className="text-[0.75rem] font-medium text-muted">2 · Match each segment</p>
          <table className="mt-3 w-full text-[0.8125rem]">
            <caption className="sr-only">Each segment matched to a row of the pricing sheet</caption>
            <tbody>
              {segs.map((s) => (
                <tr key={s.k} className="border-b border-line last:border-0">
                  <th scope="row" className="num w-7 py-1 text-left font-medium text-pine">
                    {s.k}
                  </th>
                  <td className="py-1 text-muted">{s.label}</td>
                  <td className="py-1 text-right" aria-label="matched">
                    <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-pine" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-raised p-4">
          <p className="text-[0.75rem] font-medium text-muted">3 · Answer in chat</p>
          <div className="mt-3 space-y-1.5 text-[0.8125rem] leading-snug">
            <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-ink px-3 py-1.5 text-paper">
              Price for <span className="num">AAA-BB-CC-DD</span>?
            </p>
            <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-white px-3 py-1.5 text-ink">
              Price and description, from the pricing sheet.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-line px-4 py-2.5 text-[0.75rem] text-muted">
        Illustration of how the tool works. The real tool is internal; segments shown are placeholders.
      </figcaption>
    </figure>
  );
}
