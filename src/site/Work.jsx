import { useEffect, useRef, useState } from "react";
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
      "Built as the sole developer: configurator, emailed quotes, signing and Stripe billing for Reotemp’s smart-probe line, a resource library, and a staff dashboard for quotes, pricing and past-due invoices. HTML, CSS and JavaScript with serverless functions on Vercel, plus Supabase, Stripe and SMTP2GO.",
    pages: [
      { url: "reotempintelligence.com", href: "https://www.reotempintelligence.com/", title: "Home", src: "/img/work/rti-home.webp", alt: "Reotemp Intelligence home page" },
      { url: "reotempintelligence.com/software", href: "https://www.reotempintelligence.com/software", title: "Software", src: "/img/work/rti-software.webp", alt: "Reotemp Intelligence software page" },
      { url: "reotempintelligence.com/configure", href: "https://www.reotempintelligence.com/configure", title: "Subscribe", src: "/img/work/rti-configure.webp", alt: "Reotemp Intelligence subscription configurator" },
    ],
  },
  {
    id: "wfc",
    label: "wakefrequencycalc.com",
    short: "Wake calculator",
    href: "https://www.wakefrequencycalc.com/",
    win: "win-wakecalc",
    blurb:
      "Took an engineer’s Google Sheets prototype of the ASME PTC 19.3 TW-2016 calculation to a public calculator: front-end form, calculation engine and API, and PDF reports.",
    pages: [
      { url: "wakefrequencycalc.com", href: "https://www.wakefrequencycalc.com/", title: "Home", src: "/img/work/wfc-home.webp", alt: "Thermowell wake frequency calculator home page" },
      { url: "wakefrequencycalc.com/calculator", href: "https://www.wakefrequencycalc.com/calculator", title: "Calculator", src: "/img/work/wfc-calculator.webp", alt: "Wake frequency calculator form" },
      { url: "wakefrequencycalc.com/batch", href: "https://www.wakefrequencycalc.com/batch", title: "Batch", src: "/img/work/wfc-batch.webp", alt: "Batch wake frequency calculations page" },
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
  const [page, setPage] = useState(0);
  // Once the visitor pauses or steps through pages, autoplay stays off, across both sites.
  const [stopped, setStopped] = useState(false);
  const win = useRef(null);
  const phone = useIsPhone();
  const site = SITES[active];
  const pages = phone ? phonePages(site.pages) : site.pages;

  const selectSite = (index) => {
    if (index === active) return;
    setActive(index);
    setPage(0);
  };

  const onKey = (e) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (active + 1) % SITES.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + SITES.length) % SITES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SITES.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectSite(next);
    document.getElementById(`work-tab-${SITES[next].id}`)?.focus();
  };

  const goTo = (index) => {
    setPage(index);
    win.current?.goTo(index);
  };

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto w-full max-w-[68rem] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-y-6 border-t border-line pt-10 sm:pt-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-12 lg:pt-20">
        <div>
          <h2 id="work-title" className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] lg:sticky lg:top-8 lg:text-[1.625rem]">
            Work in public
          </h2>
        </div>
        <div className="min-w-0">
          <p className="mb-6 max-w-[44rem] text-[1.0625rem] leading-relaxed text-muted">
            Most of what I build is internal. These two are live: step through the pages, or click a screenshot to visit the page.
          </p>

          <div
            role="tablist"
            aria-label="Sites"
            onKeyDown={onKey}
            className="mb-4 flex w-full max-w-full flex-wrap gap-1 rounded-xl border border-line bg-raised p-1 sm:inline-flex sm:w-auto"
          >
            {SITES.map((s, i) => (
              <button
                key={s.id}
                id={`work-tab-${s.id}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls="work-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => selectSite(i)}
                className={`min-h-11 min-w-0 flex-auto rounded-lg px-3 py-1.5 text-[0.875rem] font-medium leading-snug break-words transition-colors duration-150 sm:flex-none sm:px-4 ${
                  i === active ? "bg-white text-ink shadow-[0_1px_2px_rgb(23_23_22/0.08)] ring-1 ring-line" : "text-muted hover:text-ink"
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
                ref={win}
                key={`${site.id}-${phone ? "m" : "d"}`}
                pages={pages}
                defaultPage={page}
                label={`Screenshots of ${site.label}`}
                chrome="compact"
                frame="inset"
                dots="mono"
                theme="light"
                accentColor="#1f6b45"
                windowColor="#efeee8"
                textColor="#3d3c38"
                mutedColor="#62615b"
                radius={18}
                aspect={phone ? 0.82 : 1.6}
                fit="cover"
                scroll={false}
                transition="fade"
                interval={5200}
                autoplay={!stopped}
                onPlayingChange={(playing) => setStopped(!playing)}
                onPageChange={setPage}
              />
            </div>

            <div role="group" aria-label={`Pages on ${site.label}`} className="mt-5 flex flex-wrap gap-2">
              {pages.map((p, i) => (
                <button
                  key={p.url}
                  type="button"
                  aria-pressed={i === page}
                  onClick={() => goTo(i)}
                  className={`min-h-11 min-w-0 rounded-full border px-4 py-1.5 text-[0.875rem] font-medium leading-snug break-words transition-colors duration-150 ${
                    i === page
                      ? "border-pine/30 bg-pine-wash text-ink"
                      : "border-line bg-raised text-muted hover:border-field hover:text-ink"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            <div className="mt-5 flex max-w-[44rem] flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <p className="leading-relaxed text-muted">{site.blurb}</p>
              <div className="flex shrink-0 flex-wrap gap-x-4 text-[0.9375rem]">
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
