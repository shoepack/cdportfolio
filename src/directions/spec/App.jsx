import { useEffect, useState } from "react";
import { LuArrowUpRight, LuDownload, LuLinkedin, LuMail } from "react-icons/lu";
import { PERSON, HEADLINE, SUMMARY, EXPERIENCE, EDUCATION, SKILLS } from "@/shared/profile";
import { MODEL, REV, PAGES, CODE_FOR_WIN, NewTab, Metric, SheetHead, DimensionLine } from "./parts.jsx";
import Portrait from "./Portrait.jsx";
import OrderCode from "./OrderCode.jsx";
import Contact from "./Contact.jsx";

const REOTEMP = EXPERIENCE.find((e) => e.id === "reotemp");
const winById = (id) => REOTEMP.wins.find((w) => w.id === id);

/* ---------- Header ---------- */

function usePage() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    const els = PAGES.map((p) => document.getElementById(p.id)).filter(Boolean);
    if (!("IntersectionObserver" in window) || !els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const n = PAGES.findIndex((p) => p.id === en.target.id) + 1;
            if (n) setPage(n);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return page;
}

const NAV = [
  { href: "#specs", label: "Specs" },
  { href: "#order", label: "Order code" },
  { href: "#contact", label: "Contact" },
];

function Header() {
  const page = usePage();
  return (
    <header className="spec-header sticky z-40 border-b border-ink bg-paper">
      <div className="mx-auto flex max-w-[80rem] flex-wrap items-stretch px-4 md:px-8 lg:flex-nowrap">
        <a
          href="#top"
          className="flex h-9 min-w-0 flex-1 items-center gap-2.5 no-underline lg:h-14 lg:flex-none"
          aria-label={`${PERSON.name}, ${PERSON.role}. Back to top`}
        >
          <span className="num bg-red px-1.5 py-0.5 text-[0.8125rem] leading-none text-white lg:text-[0.875rem]">{MODEL}</span>
          <span className="truncate font-cond text-[0.9375rem] font-semibold uppercase tracking-[0.05em]">{PERSON.role}</span>
        </a>
        <p className="num flex h-9 items-center text-[0.75rem] text-ink-soft lg:order-last lg:h-14 lg:pl-6 lg:text-[0.8125rem]">
          Rev. {REV}
          <span className="px-1.5" aria-hidden="true">/</span>
          <span>
            Page <span aria-live="off">{page}</span>
            <span className="hidden sm:inline"> of {PAGES.length}</span>
          </span>
        </p>
        <nav aria-label="Datasheet" className="order-last -mx-4 w-[calc(100%+2rem)] border-t border-rule md:-mx-8 md:w-[calc(100%+4rem)] lg:order-none lg:mx-0 lg:ml-auto lg:w-auto lg:border-0">
          <ul className="m-0 grid list-none grid-cols-4 p-0 lg:flex lg:gap-1">
            {NAV.map((n) => (
              <li key={n.href} className="border-r border-rule last:border-r-0 lg:border-0">
                <a href={n.href} className="nav-link">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={PERSON.resume} target="_blank" rel="noopener" className="nav-link">
                Résumé
                <NewTab />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Page 1: the model ---------- */

function SpecRow({ label, children, note, className = "" }) {
  return (
    <tr className={`border-b border-rule ${className}`}>
      <th scope="row" className="label w-[7.25rem] bg-fill px-3 py-2.5 text-left align-top font-semibold sm:w-[9.5rem]">
        {label}
      </th>
      <td className="px-3 py-2 align-top leading-snug">
        {children}
        {note && <span className="mt-0.5 block text-[0.875rem] text-ink-soft">{note}</span>}
      </td>
    </tr>
  );
}

function Actions() {
  return (
    <div className="hero-actions grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:flex-nowrap">
      <a href={PERSON.resume} download="Jason_Artley_Resume.pdf" className="btn btn-primary col-span-2">
        <LuDownload aria-hidden="true" className="size-[1.125rem]" />
        Download datasheet
        <span className="font-sans text-[0.875rem] font-normal opacity-90 lg:max-xl:hidden">Résumé, PDF</span>
      </a>
      <a href={`mailto:${PERSON.email}`} className="btn btn-line">
        <LuMail aria-hidden="true" className="size-[1.125rem]" />
        Email
      </a>
      <a href={PERSON.linkedin} target="_blank" rel="noopener" className="btn btn-line">
        <LuLinkedin aria-hidden="true" className="size-[1.125rem]" />
        LinkedIn
        <NewTab />
      </a>
    </div>
  );
}

function Hero() {
  const uptime = winById("uptime");
  const designs = winById("configurators");
  const ships = [winById("stripe").tools[0], winById("odoo").tools[0], "AI tools"];
  return (
    <section id="top" aria-labelledby="model-name" className="mx-auto max-w-[80rem] px-4 pt-4 md:px-8 lg:pt-10">
      <div className="hero-grid">
        <div className="hero-title">
          <h1 id="model-name" className="m-0 text-[2.625rem] font-bold leading-[0.95] tracking-[-0.025em] sm:text-[3.5rem] lg:text-[5.75rem]">
            {PERSON.name}
          </h1>
          <p className="m-0 mt-1.5 font-cond text-[1.125rem] font-medium text-ink-soft lg:mt-3 lg:text-[1.5rem]">
            {PERSON.role}, {PERSON.location.replace(", CA", "")}
          </p>
        </div>

        <p className="hero-intro mb-0 max-w-[34ch] text-[1.25rem] leading-snug lg:text-[1.5rem]">{HEADLINE}</p>

        <div className="hero-photo">
          <Portrait />
        </div>

        <div className="hero-specs">
          <table className="w-full border-collapse text-[1rem]">
            <caption className="border-t-2 border-ink pb-1.5 pt-2 text-left">
              <span className="label text-[0.875rem]">Specifications</span>
            </caption>
            <tbody className="border-t border-ink">
              <SpecRow label="Current role" note={`${REOTEMP.company}, since ${REOTEMP.start}`}>
                <span className="font-medium">{REOTEMP.role}</span>
              </SpecRow>
              <SpecRow label="Ships">
                {ships.map((s, i) => (
                  <span key={s}>
                    {i > 0 && <span className="px-1.5 text-rule-strong" aria-hidden="true">/</span>}
                    {i > 0 && <span className="sr-only">, </span>}
                    <span className="font-medium">{s}</span>
                  </span>
                ))}
              </SpecRow>
              <SpecRow label={uptime.metric.label.replace(/^./, (c) => c.toUpperCase())}>
                <Metric value={uptime.metric.value} className="text-[1.0625rem]" />
              </SpecRow>
              <SpecRow label="Designs shipped">
                <span className="num text-[1.0625rem]">{designs.metric.value}</span>
              </SpecRow>
              <SpecRow label="Education" className="hidden lg:table-row" note={`${EDUCATION.focus}, ${EDUCATION.honors}`}>
                <span className="font-medium">{EDUCATION.degree}, {EDUCATION.school}</span>
              </SpecRow>
            </tbody>
          </table>
        </div>

        <Actions />
      </div>
    </section>
  );
}

/* ---------- Page 3: Experience ---------- */

function WinRow({ win, code }) {
  return (
    <li id={`win-${win.id}`} className="win-row border-b border-rule py-5 lg:py-6">
      <div className="win-head">
        <span className="num inline-block border border-ink px-1.5 py-px text-[0.8125rem] leading-snug">{code}</span>
        <h4 className="m-0 mt-2 text-[1.1875rem] font-semibold leading-snug lg:text-[1.25rem]">{win.title}</h4>
      </div>
      <dl className="win-cols m-0">
        <div className="win-cell">
          <dt className="label text-ink-soft">Problem</dt>
          <dd className="m-0">{win.problem}</dd>
        </div>
        <div className="win-cell">
          <dt className="label text-ink-soft">Action</dt>
          <dd className="m-0">
            {win.action}
            {win.tools.length > 0 && (
              <span className="mt-2 block font-cond text-[0.9375rem] text-ink-soft">
                Tools: {win.tools.join(", ")}
              </span>
            )}
          </dd>
        </div>
        <div className="win-cell">
          <dt className="label text-ink-soft">Result</dt>
          <dd className="m-0">
            {win.metric && (
              <span className="mb-1.5 block">
                <Metric value={win.metric.value} className="text-[1.375rem] text-ink lg:text-[1.5rem]" />
              </span>
            )}
            <span className="font-medium">{win.result}</span>
            {win.link && (
              <a href={win.link.href} target="_blank" rel="noopener" className="ink-link mt-2 flex min-h-11 items-center gap-1 font-medium">
                {win.link.label}
                <LuArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                <NewTab />
              </a>
            )}
          </dd>
        </div>
      </dl>
    </li>
  );
}

function Experience() {
  const miracosta = EXPERIENCE.find((e) => e.id === "miracosta");
  return (
    <section id="specs" aria-labelledby="specs-title" className="mx-auto max-w-[80rem] px-4 pt-20 md:px-8 lg:pt-28">
      <SheetHead id="specs-title" title="Experience" page={3} />

      <article aria-labelledby="reotemp-title" className="mt-8 lg:mt-10">
        <div className="block-head grid grid-cols-[minmax(0,1fr)] border border-ink lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div className="p-4 lg:p-6">
            <h3 id="reotemp-title" className="m-0 text-[1.5rem] font-semibold leading-tight lg:text-[2rem]">
              {REOTEMP.role}
            </h3>
            <p className="m-0 mt-1 text-[1.0625rem]">
              <a href={REOTEMP.companyUrl} target="_blank" rel="noopener" className="ink-link font-medium">
                {REOTEMP.company}
                <NewTab />
              </a>
              <span className="text-ink-soft"> · {REOTEMP.location}</span>
            </p>
            <p className="m-0 mt-4 max-w-[62ch] text-ink-soft">{REOTEMP.summary}</p>
          </div>
          <div className="flex flex-col justify-end border-t border-ink bg-fill p-4 lg:border-l lg:border-t-0 lg:p-6">
            <p className="label m-0 text-ink-soft">Tenure</p>
            <DimensionLine className="mt-3" start={REOTEMP.start} end={REOTEMP.end} />
          </div>
        </div>

        <div className="win-colhead hidden lg:grid" aria-hidden="true">
          <span className="label">Item</span>
          <span className="label">Problem</span>
          <span className="label">Action</span>
          <span className="label">Result</span>
        </div>
        <ol className="m-0 list-none p-0">
          {REOTEMP.wins.map((w) => (
            <WinRow key={w.id} win={w} code={CODE_FOR_WIN[w.id]} />
          ))}
        </ol>
      </article>

      <div className="mt-12 lg:mt-16">
        <h3 className="label m-0 border-b border-ink pb-2 text-[0.9375rem]">Earlier and education</h3>
        <article aria-labelledby="miracosta-title" className="compact-row border-b border-rule">
          <p className="num m-0 text-[0.9375rem] text-ink-soft">
            {miracosta.start} – {miracosta.end}
          </p>
          <div>
            <h4 id="miracosta-title" className="m-0 text-[1.125rem] font-semibold leading-snug">
              {miracosta.role},{" "}
              <a href={miracosta.companyUrl} target="_blank" rel="noopener" className="ink-link font-semibold">
                {miracosta.company}
                <NewTab />
              </a>
            </h4>
            <p className="m-0 mt-1 max-w-[68ch] text-ink-soft">{miracosta.summary}</p>
          </div>
        </article>
        <article aria-labelledby="edu-title" className="compact-row border-b border-rule">
          <p className="num m-0 text-[0.9375rem] text-ink-soft">
            {EDUCATION.start} – {EDUCATION.end}
          </p>
          <div>
            <h4 id="edu-title" className="m-0 text-[1.125rem] font-semibold leading-snug">
              {EDUCATION.degree}, {EDUCATION.school}
            </h4>
            <p className="m-0 mt-1 text-ink-soft">
              {EDUCATION.focus} · {EDUCATION.honors} · GPA <span className="num text-ink">{EDUCATION.gpa}</span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- Page 4: Tools ---------- */

function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="mx-auto max-w-[80rem] px-4 pt-20 md:px-8 lg:pt-28">
      <SheetHead id="tools-title" title="Tools and languages" page={4} />
      <p className="m-0 mt-5 max-w-[60ch] text-ink-soft">{SUMMARY}</p>
      <table className="mt-6 w-full border-collapse border-t border-ink">
        <caption className="sr-only">Tools and languages Jason works with</caption>
        <tbody>
          {Object.entries(SKILLS).map(([group, items]) => (
            <tr key={group} className="border-b border-rule">
              <th scope="row" className="label w-[8.5rem] bg-fill px-3 py-3 text-left align-top sm:w-[14rem]">
                {group}
              </th>
              <td className="px-3 py-2.5 align-top leading-relaxed">
                {items.map((s, i) => (
                  <span key={s}>
                    <span className="whitespace-nowrap">
                      {s}
                      {i < items.length - 1 && ","}
                    </span>{" "}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto grid max-w-[80rem] gap-4 px-4 py-8 text-[0.9375rem] md:grid-cols-[1fr_auto] md:px-8">
        <div>
          <p className="m-0">
            <span className="num bg-red px-1.5 py-0.5 text-[0.8125rem] text-white">{MODEL}</span>
            <span className="ml-2 font-semibold">{PERSON.name}</span>
            <span className="text-ink-soft">, {PERSON.role}, {PERSON.location}</span>
          </p>
          <p className="num m-0 mt-3 text-[0.8125rem] text-ink-soft">
            Rev. {REV} · Page {PAGES.length} of {PAGES.length} · Specifications subject to change.
          </p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-5 p-0 md:justify-end">
          <li>
            <a href={`mailto:${PERSON.email}`} className="ink-link inline-flex min-h-11 items-center">{PERSON.email}</a>
          </li>
          <li>
            <a href={PERSON.linkedin} target="_blank" rel="noopener" className="ink-link inline-flex min-h-11 items-center">
              LinkedIn
              <NewTab />
            </a>
          </li>
          <li>
            <a href={PERSON.github} target="_blank" rel="noopener" className="ink-link inline-flex min-h-11 items-center">
              GitHub
              <NewTab />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <OrderCode />
        <Experience />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
