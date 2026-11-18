import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import BrowserWindow from "@/components/react-bits/browser-window";

// Public sites only (everything else is under NDA). Screenshots captured from the live sites.
const SITES = [
  {
    id: "rti",
    label: "reotempintelligence.com",
    short: "Reotemp Intelligence",
    href: "https://www.reotempintelligence.com/",
    win: "win-stripe",
    blurb:
      "Built and launched the home for Reotemp’s IoT smart probe, including the company’s first Stripe subscription.",
    pages: [
      { url: "reotempintelligence.com", title: "Home", src: "/img/work/rti-home.webp", alt: "Reotemp Intelligence home page" },
      { url: "reotempintelligence.com/software", title: "Software", src: "/img/work/rti-software.webp", alt: "Reotemp Intelligence software page" },
      { url: "reotempintelligence.com/configure", title: "Subscribe", src: "/img/work/rti-configure.webp", alt: "Reotemp Intelligence subscription configurator" },
    ],
  },
  {
    id: "wfc",
    label: "wakefrequencycalc.com",
    short: "Wake calculator",
    href: "https://www.wakefrequencycalc.com/",
    win: "win-wakecalc",
    blurb:
      "Took an engineer’s ASME 19.3 spreadsheet to a public calculator: front-end form, calculation engine and API, and PDF reports.",
    pages: [
      { url: "wakefrequencycalc.com", title: "Home", src: "/img/work/wfc-home.webp", alt: "Thermowell wake frequency calculator home page" },
      { url: "wakefrequencycalc.com/calculator", title: "Calculator", src: "/img/work/wfc-calculator.webp", alt: "Wake frequency calculator form" },
      { url: "wakefrequencycalc.com/batch", title: "Batch", src: "/img/work/wfc-batch.webp", alt: "Batch wake frequency calculations page" },
    ],
  },
];

// Phones get screenshots taken on a phone, in a taller window.
function useIsPhone() {
  const q = "(max-width: 639px)";
  const [phone, setPhone] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setPhone(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return phone;
}

const phonePages = (pages) => pages.map((p) => ({ ...p, src: p.src.replace("/img/work/", "/img/work/m-") }));

export default function Work() {
  const [active, setActive] = useState(0);
  const phone = useIsPhone();
  const site = SITES[active];

  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + SITES.length) % SITES.length;
    setActive(next);
    document.getElementById(`work-tab-${SITES[next].id}`)?.focus();
  };

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto w-full max-w-[68rem] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-y-6 border-t border-line pt-12 sm:pt-16 lg:grid-cols-[13rem_1fr] lg:gap-x-12 lg:pt-20">
        <div>
          <h2 id="work-title" className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] lg:sticky lg:top-8 lg:text-[1.625rem]">
            Work in public
          </h2>
        </div>
        <div className="min-w-0">
          <p className="mb-6 max-w-[44rem] text-[1.0625rem] leading-relaxed text-muted">
            Most of what I build is internal. These two are live, and you can click through them.
          </p>

          <div role="tablist" aria-label="Sites" onKeyDown={onKey} className="mb-4 inline-flex w-full rounded-xl border border-line bg-raised p-1 sm:w-auto">
            {SITES.map((s, i) => (
              <button
                key={s.id}
                id={`work-tab-${s.id}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls="work-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`min-h-11 flex-1 rounded-lg px-3 text-[0.875rem] font-medium transition-colors duration-150 sm:flex-none sm:px-4 ${
                  i === active ? "bg-ink text-paper" : "text-muted hover:text-ink"
                }`}
              >
                <span className="sm:hidden">{s.short}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${site.id}`}>
            <div className="rounded-[18px] shadow-[0_1px_2px_rgb(23_23_22/0.06),0_12px_32px_-12px_rgb(23_23_22/0.18)]">
              <BrowserWindow
                key={`${site.id}-${phone ? "m" : "d"}`}
                pages={phone ? phonePages(site.pages) : site.pages}
                chrome="compact"
                frame="inset"
                dots="mono"
                theme="light"
                accentColor="#1f6b45"
                windowColor="#efeee8"
                textColor="#3d3c38"
                radius={18}
                aspect={phone ? 0.82 : 1.6}
                transition="blur"
                interval={5200}
              />
            </div>
            <div className="mt-4 flex max-w-[44rem] flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <p className="leading-relaxed text-muted">{site.blurb}</p>
              <div className="flex shrink-0 gap-4 text-[0.9375rem]">
                <a href={`#${site.win}`} className="link inline-flex min-h-11 items-center whitespace-nowrap sm:min-h-0">
                  Details
                </a>
                <a href={site.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center whitespace-nowrap sm:min-h-0">
                  Visit site
                  <FiArrowUpRight aria-hidden="true" className="ml-0.5 size-[0.9em]" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
