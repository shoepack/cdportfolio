import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { EXPERIENCE } from "@/shared/profile";
import { SEGMENTS, SheetHead, Metric, NewTab } from "./parts.jsx";

const WINS = EXPERIENCE.flatMap((e) => e.wins);
const winById = (id) => WINS.find((w) => w.id === id);
const BASE = "JA";

// Path from the selected segment, down to a bus in the gap, left into the
// gutter, down to the breakdown row, and right into the row's code cell.
function useLeader(wrapRef, tabRefs, headRefs, codeRef, listRef, sel) {
  const [geo, setGeo] = useState(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const tab = tabRefs.current[sel];
    const head = headRefs.current[sel];
    if (!wrap || !tab || !head || !codeRef.current || !listRef.current) return;
    const w = wrap.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const h = head.getBoundingClientRect();
    const codeBottom = codeRef.current.getBoundingClientRect().bottom - w.top;
    const listTop = listRef.current.getBoundingClientRect().top - w.top;
    const x = Math.round(t.left + t.width / 2 - w.left) + 0.5;
    const y1 = Math.round(t.bottom - w.top);
    const bus = Math.round(codeBottom + (listTop - codeBottom) / 2) + 0.5;
    const gx = 6.5;
    const yRow = Math.round(h.top + h.height / 2 - w.top) + 0.5;
    const tip = Math.round(h.left - w.left) - 5;
    setGeo({
      d: `M${x} ${y1} V${bus} H${gx} V${yRow} H${tip - 6}`,
      head: `M${tip} ${yRow} L${tip - 7} ${yRow - 3.5} L${tip - 7} ${yRow + 3.5} Z`,
    });
  }, [wrapRef, tabRefs, headRefs, codeRef, listRef, sel]);

  // Track the row while it slides into place, then rest.
  useLayoutEffect(() => {
    measure();
    let raf;
    const until = performance.now() + 760;
    const tick = () => {
      measure();
      if (performance.now() < until) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [measure]);

  useEffect(() => {
    if (!wrapRef.current || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, wrapRef]);

  return geo;
}

function Proof({ win }) {
  return (
    <li className="border-t border-rule py-3 first:border-t-0 first:pt-0">
      <a href={`#win-${win.id}`} className="ink-link font-semibold leading-snug">
        {win.title}
      </a>
      <p className="m-0 mt-1 text-ink-soft">
        {win.metric ? (
          <>
            <Metric value={win.metric.value} className="text-ink" />
            <span className="ml-2">{win.metric.label}</span>
          </>
        ) : (
          win.result
        )}
      </p>
      {win.link && (
        <a href={win.link.href} target="_blank" rel="noopener" className="ink-link mt-1 inline-flex min-h-11 items-center gap-1 text-[0.9375rem]">
          {win.link.label}
          <LuArrowUpRight aria-hidden="true" className="size-4" />
          <NewTab />
        </a>
      )}
    </li>
  );
}

export default function OrderCode() {
  const [sel, setSel] = useState(0);
  const [phase, setPhase] = useState("static");
  const wrapRef = useRef(null);
  const codeRef = useRef(null);
  const listRef = useRef(null);
  const tabRefs = useRef([]);
  const headRefs = useRef([]);
  const geo = useLeader(wrapRef, tabRefs, headRefs, codeRef, listRef, sel);

  const select = (i) => {
    if (i === sel) return;
    setSel(i);
    setPhase("reset");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("draw")));
  };

  const onKeyDown = (e) => {
    const n = SEGMENTS.length;
    let i;
    if (e.key === "ArrowRight") i = (sel + 1) % n;
    else if (e.key === "ArrowLeft") i = (sel - 1 + n) % n;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = n - 1;
    else return;
    e.preventDefault();
    select(i);
    tabRefs.current[i]?.focus();
  };

  const active = SEGMENTS[sel];

  return (
    <section id="order" aria-labelledby="order-title" className="mx-auto max-w-[80rem] px-4 pt-14 md:px-8 lg:pt-16">
      <SheetHead id="order-title" title="How to order" page={2} />
      <div className="mt-5 grid gap-x-10 gap-y-3 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)]">
        <p className="m-0 text-[1.125rem] leading-normal lg:text-[1.25rem]">
          Industrial part numbers are built from segments, one per option. The AI quoting assistant I built at Reotemp reads
          them that way. This is mine: one segment for each area I&rsquo;ve done real work in.
        </p>
        <p className="m-0 self-end text-ink-soft lg:justify-self-end">
          Select a segment to see the job behind it.
        </p>
      </div>

      <div ref={wrapRef} className="order-wrap relative mt-8 lg:mt-12">
        <div ref={codeRef} className="code-line flex items-stretch">
          <span className="seg seg-base" aria-hidden="true">{BASE}</span>
          <span className="code-dash" aria-hidden="true" />
          <div role="tablist" aria-label="Order code segments" className="flex min-w-0 flex-1 items-stretch" onKeyDown={onKeyDown}>
            {SEGMENTS.map((s, i) => (
              <span key={s.id} className="contents">
                {i > 0 && <span className="code-dash" aria-hidden="true" />}
                <button
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`seg-${s.id}`}
                  aria-selected={i === sel}
                  aria-controls={`seg-panel-${s.id}`}
                  aria-label={`${s.code}: ${s.name}`}
                  tabIndex={i === sel ? 0 : -1}
                  className="seg min-w-0 flex-1"
                  onClick={() => select(i)}
                >
                  {s.code}
                </button>
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {active.code}, {active.name}, selected.
        </p>

        <div ref={listRef} className="breakdown mt-9 pl-6 lg:mt-12 lg:pl-8">
          <div className="grid grid-cols-[3.75rem_minmax(0,1fr)] border-b border-ink pb-2 lg:grid-cols-[6rem_minmax(0,1fr)]" aria-hidden="true">
            <span className="label text-ink-soft">Code</span>
            <span className="label text-ink-soft">Area</span>
          </div>
          {SEGMENTS.map((s, i) => {
            const open = i === sel;
            return (
              <div key={s.id} className="bd-row border-b border-rule" data-open={open}>
                <div
                  ref={(el) => (headRefs.current[i] = el)}
                  className="bd-head grid min-h-12 cursor-pointer grid-cols-[3.75rem_minmax(0,1fr)] items-center py-2 lg:min-h-14 lg:grid-cols-[6rem_minmax(0,1fr)]"
                  onClick={() => select(i)}
                >
                  <span className="bd-code num text-[1.0625rem] lg:text-[1.25rem]">{s.code}</span>
                  <span className="font-semibold leading-snug lg:text-[1.1875rem]">{s.name}</span>
                </div>
                <div
                  id={`seg-panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`seg-${s.id}`}
                  aria-hidden={!open}
                  inert={open ? undefined : ""}
                  className="row-body"
                  data-open={open}
                >
                  <div>
                    <div className="row-inner grid gap-x-10 gap-y-4 pb-6 pt-1 sm:pl-[3.75rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:pb-8 lg:pl-[6rem]">
                      <p className="m-0 max-w-[48ch] text-[1.125rem] leading-normal lg:text-[1.25rem]">{s.line}</p>
                      <ul className="m-0 list-none p-0">
                        {s.wins.map((id) => (
                          <Proof key={id} win={winById(id)} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {geo && (
          <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true" focusable="false">
            <path d={geo.d} pathLength="1" className="dim leader" data-phase={phase} />
            <path d={geo.head} className="dim-head leader-head" data-phase={phase} />
          </svg>
        )}
      </div>
    </section>
  );
}
