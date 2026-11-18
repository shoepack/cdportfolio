import { useEffect, useId, useRef, useState } from "react";
import { FiArrowUpRight, FiChevronDown, FiDownload, FiLinkedin, FiMail } from "react-icons/fi";
import { PERSON, PORTRAIT, INTRO, srcset, EXPERIENCE, EDUCATION, AREAS, SUMMARY } from "@/shared/profile";
import ContactForm from "./ContactForm.jsx";
import Work from "./Work.jsx";
import { AREA_ICONS } from "./icons.js";
import { ArchitectureDiagram, IconTile, Logo, QuotingDiagram, ToolChips } from "./visuals.jsx";

const [REOTEMP, MIRACOSTA] = EXPERIENCE;
const WIN_BY_ID = Object.fromEntries(REOTEMP.wins.map((w) => [w.id, w]));
const LEAD_WINS = REOTEMP.wins.filter((w) => w.lead);
const MORE_WINS = REOTEMP.wins.filter((w) => !w.lead);

// Typographic apostrophes for profile copy (display only; the facts are untouched).
const q = (s) => s.replace(/'/g, "’");

// Which phrase in each win's result carries the outcome. Rendered heavier, never reworded.
const RESULT_EMPHASIS = {
  stripe: "first subscription product",
  wakecalc: "each ASME criterion",
  configurators: "About 95%",
  quoting: "Instant quotes",
  matching: "a fraction of a cent per request",
  odoo: "One business platform",
  metrics: "every day",
  uptime: "1–2 a week to about 1 a month",
};

function Emphasize({ text, phrase, className = "font-semibold text-ink" }) {
  text = q(text);
  if (!phrase || !text.includes(phrase)) return text;
  const i = text.indexOf(phrase);
  return (
    <>
      {text.slice(0, i)}
      <strong className={className}>{phrase}</strong>
      {text.slice(i + phrase.length)}
    </>
  );
}

function NewTab({ href, children, className = "link" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

function Range({ start, end }) {
  return (
    <span className="num text-[0.8125rem] text-muted">
      {start} <span aria-hidden="true">–</span>
      <span className="sr-only">to</span> {end}
    </span>
  );
}

const btnBase =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4.5 sm:w-auto text-[0.9375rem] font-medium transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px";
const btnPrimary = `${btnBase} bg-pine text-white hover:bg-pine-deep`;
const btnSecondary = `${btnBase} border border-field/50 bg-raised text-ink hover:border-ink/60`;

function ContactActions({ className = "" }) {
  return (
    <ul className={`grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 ${className}`}>
      <li className="col-span-2">
        <a href={PERSON.resume} className={btnPrimary}>
          <FiDownload aria-hidden="true" className="size-[1.05em]" />
          Résumé <span className="font-normal text-white/80">(PDF)</span>
        </a>
      </li>
      <li>
        <a href={`mailto:${PERSON.email}`} className={btnSecondary}>
          <FiMail aria-hidden="true" className="size-[1.05em] text-muted" />
          Email
        </a>
      </li>
      <li>
        <NewTab href={PERSON.linkedin} className={btnSecondary}>
          <FiLinkedin aria-hidden="true" className="size-[1.05em] text-muted" />
          LinkedIn
        </NewTab>
      </li>
    </ul>
  );
}

/* ---------- Nav ---------- */

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#areas", label: "Areas", desktopOnly: true },
  { href: "#contact", label: "Contact" },
  { href: PERSON.resume, label: "Résumé" },
];

function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[68rem] flex-wrap items-center justify-between gap-x-4 px-4 pt-3 sm:px-6 sm:pt-5 lg:px-8">
      <a
        href="#top"
        className="hidden min-h-11 items-center text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink sm:inline-flex"
      >
        {PERSON.name}
      </a>
      <nav aria-label="Primary" className="w-full sm:w-auto">
        <ul className="-mx-2 flex flex-wrap items-center justify-between sm:mx-0 sm:justify-end sm:gap-1">
          {NAV.map((item) => (
            <li key={item.href} className={item.desktopOnly ? "hidden sm:block" : undefined}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-md px-2 text-[0.9375rem] text-muted transition-colors duration-150 hover:text-ink sm:px-2.5"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */

function Portrait() {
  const { sources } = PORTRAIT;
  const sizes = "(min-width: 1024px) 400px, calc(100vw - 32px)";
  return (
    <picture className="block h-full w-full">
      <source type="image/avif" srcSet={srcset(sources.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(sources.webp)} sizes={sizes} />
      <img
        src={PORTRAIT.fallback}
        srcSet={srcset(sources.jpg)}
        sizes={sizes}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        alt={PORTRAIT.alt}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover object-[50%_55%]"
      />
    </picture>
  );
}

function Hero({ actionsRef }) {
  return (
    <section aria-labelledby="hero-name" className="mx-auto w-full max-w-[68rem] px-4 pt-8 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1
            id="hero-name"
            className="hero-step text-[clamp(2.625rem,1.7rem+3.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            style={{ "--step": 0 }}
          >
            {PERSON.name}
          </h1>
          <p className="hero-step mt-3 text-[clamp(1.1875rem,1rem+0.6vw,1.5rem)] leading-snug tracking-[-0.01em] sm:mt-4" style={{ "--step": 1 }}>
            <span className="font-medium text-ink">{PERSON.role}</span>
            <span className="text-muted"> in {PERSON.location}</span>
          </p>
          <p
            className="hero-step mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-muted sm:mt-7 sm:text-[1.1875rem]"
            style={{ "--step": 2 }}
          >
            <Emphasize text={INTRO.text} phrase={INTRO.emphasis} />
          </p>
          <div ref={actionsRef} className="hero-step mt-6 sm:mt-8" style={{ "--step": 3 }}>
            <ContactActions />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="hero-portrait aspect-[3/2] overflow-hidden rounded-xl bg-line lg:aspect-[4/5]">
            <Portrait />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Thumb-reach contact bar on phones, shown once the hero's actions scroll away. */
function StickyContact({ visible }) {
  return (
    <div
      aria-hidden={!visible}
      inert={!visible ? "" : undefined}
      className={`sticky-contact fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-2.5 backdrop-blur-sm sm:hidden ${
        visible ? "is-visible" : ""
      }`}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <ul className="flex gap-2">
        <li className="flex-[1.4]">
          <a href={PERSON.resume} className={`${btnPrimary} min-h-11`}>
            <FiDownload aria-hidden="true" className="size-[1.05em]" />
            Résumé
          </a>
        </li>
        <li className="flex-1">
          <a href={`mailto:${PERSON.email}`} className={`${btnSecondary} min-h-11`}>
            <FiMail aria-hidden="true" className="size-[1.05em] text-muted" />
            Email
          </a>
        </li>
        <li className="flex-1">
          <NewTab href={PERSON.linkedin} className={`${btnSecondary} min-h-11`}>
            <FiLinkedin aria-hidden="true" className="size-[1.05em] text-muted" />
            <span className="sr-only">LinkedIn</span>
          </NewTab>
        </li>
      </ul>
    </div>
  );
}

/* ---------- Sections ---------- */

function Section({ id, title, children, intro }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-[68rem] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-y-6 border-t border-line pt-10 sm:pt-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-12 lg:pt-20">
        <div>
          <h2 id={`${id}-title`} className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] lg:sticky lg:top-8 lg:text-[1.625rem]">
            {title}
          </h2>
        </div>
        <div className="min-w-0 max-w-[44rem]">
          {intro && <p className="mb-8 text-[1.0625rem] leading-relaxed text-muted sm:mb-10">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

function EntryHead({ title, org, orgUrl, place, start, end, level = "lead", logo }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {logo && <Logo logo={logo} company={org} />}
        <div className="min-w-[min(12rem,100%)] flex-1">
          <h3
            className={
              level === "lead"
                ? "text-[1.3125rem] font-semibold leading-snug tracking-[-0.015em]"
                : "text-[1.125rem] font-semibold leading-snug tracking-[-0.01em]"
            }
          >
            {title}
          </h3>
          <p className="mt-0.5 text-[0.96875rem] text-muted">
            {orgUrl ? <NewTab href={orgUrl}>{org}</NewTab> : <span className="text-ink">{org}</span>}
            {place && <span>, {place}</span>}
          </p>
        </div>
      </div>
      <Range start={start} end={end} />
    </div>
  );
}

function WinAction({ win }) {
  const action = q(win.action);
  if (!win.link || !action.includes(win.link.label)) return action;
  const i = action.indexOf(win.link.label);
  return (
    <>
      {action.slice(0, i)}
      <NewTab href={win.link.href} className="link">
        {win.link.label}
        <FiArrowUpRight aria-hidden="true" className="ml-0.5 inline size-[0.85em] -translate-y-px" />
      </NewTab>
      {action.slice(i + win.link.label.length)}
    </>
  );
}

/* "How I did it": a tap to open on phones for the lead wins, a tap at every
   width for the shorter ones. Desktop shows the lead wins' detail open. */
function How({ win, alwaysCollapsible = false, children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const toggle = alwaysCollapsible ? "" : "sm:hidden";
  const panel = open ? "" : alwaysCollapsible ? "hidden" : "hidden sm:block";
  return (
    <div className="mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`${toggle} -ml-1 inline-flex min-h-11 items-center gap-1 rounded-md px-1 text-[0.9375rem] font-medium text-pine hover:text-pine-deep`}
      >
        {open ? "Hide details" : "How I did it"}
        <span className="sr-only">: {q(win.short || win.title)}</span>
        <FiChevronDown aria-hidden="true" className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={id} className={panel}>
        <p className="leading-relaxed text-muted sm:mt-0">
          <WinAction win={win} />
        </p>
        {children}
        <ToolChips tools={win.tools} />
      </div>
    </div>
  );
}

function LeadWin({ win }) {
  return (
    <li id={`win-${win.id}`} className="py-7 sm:py-8">
      <h4 className="text-[1.1875rem] font-semibold leading-snug tracking-[-0.012em]">{q(win.title)}</h4>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">
        <Emphasize text={win.result} phrase={RESULT_EMPHASIS[win.id]} />
      </p>
      {win.id === "stripe" && <ArchitectureDiagram />}
      <How win={win}>{win.id === "quoting" && <QuotingDiagram />}</How>
    </li>
  );
}

function MoreWin({ win }) {
  return (
    <li id={`win-${win.id}`} className="py-5">
      <h5 className="font-semibold leading-snug tracking-[-0.01em]">{q(win.title)}</h5>
      <p className="mt-1 leading-relaxed text-muted">
        <Emphasize text={win.result} phrase={RESULT_EMPHASIS[win.id]} />
      </p>
      <How win={win} alwaysCollapsible />
    </li>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <article aria-labelledby="exp-reotemp">
        <div id="exp-reotemp">
          <EntryHead
            title={REOTEMP.role}
            org={REOTEMP.company}
            orgUrl={REOTEMP.companyUrl}
            place={REOTEMP.location}
            start={REOTEMP.start}
            end={REOTEMP.end}
            logo={REOTEMP.logo}
          />
        </div>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{q(REOTEMP.summary)}</p>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {LEAD_WINS.map((win) => (
            <LeadWin key={win.id} win={win} />
          ))}
        </ul>

        <h4 className="mt-10 text-[0.9375rem] font-semibold text-muted">Also at Reotemp</h4>
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {MORE_WINS.map((win) => (
            <MoreWin key={win.id} win={win} />
          ))}
        </ul>
      </article>

      <div className="mt-12 grid gap-10 sm:mt-14">
        <article aria-labelledby="exp-miracosta">
          <div id="exp-miracosta">
            <EntryHead
              level="compact"
              title={MIRACOSTA.role}
              org={MIRACOSTA.company}
              orgUrl={MIRACOSTA.companyUrl}
              place={MIRACOSTA.location}
              start={MIRACOSTA.start}
              end={MIRACOSTA.end}
              logo={MIRACOSTA.logo}
            />
          </div>
          <p className="mt-3 leading-relaxed text-muted">
            <Emphasize text={MIRACOSTA.summary} phrase="50+ students" />
          </p>
        </article>

        <article aria-labelledby="exp-education">
          <div id="exp-education">
            <EntryHead
              level="compact"
              title={EDUCATION.degree}
              org={EDUCATION.school}
              start={EDUCATION.start}
              end={EDUCATION.end}
            />
          </div>
          <p className="mt-3 leading-relaxed text-muted">
            {EDUCATION.focus}. <strong className="font-semibold text-ink">{EDUCATION.honors}</strong>, GPA{" "}
            <strong className="num font-semibold text-ink">{EDUCATION.gpa}</strong>.
          </p>
        </article>
      </div>
    </Section>
  );
}

/* An index, not a restatement: each area names and links the wins that prove it. */
function Areas() {
  return (
    <Section id="areas" title="Areas" intro={SUMMARY}>
      <ul className="border-t border-line">
        {AREAS.map((area) => (
          <li
            key={area.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-b border-line py-5 last:border-b-0 sm:grid-cols-[auto_minmax(0,15rem)_minmax(0,1fr)] sm:gap-x-6"
          >
            <IconTile Icon={AREA_ICONS[area.id]} />
            <h3 className="self-center font-semibold leading-snug tracking-[-0.01em]">{area.name}</h3>
            <div className="col-start-2 mt-1 sm:col-start-3 sm:mt-0 sm:self-center">
              <ul className="flex min-w-0 flex-wrap gap-x-4 gap-y-1 [&>li]:max-w-full">
                {area.wins.map((id) => (
                  <li key={id}>
                    <a href={`#win-${id}`} className="link inline-block max-w-full py-1 text-[0.9375rem] [overflow-wrap:anywhere]">
                      {WIN_BY_ID[id].short}
                    </a>
                  </li>
                ))}
              </ul>
              {area.note && <p className="mt-1 text-[0.9375rem] text-muted">{area.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Contact() {
  const direct = [
    { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}`, Icon: FiMail },
    { label: "LinkedIn", value: PERSON.linkedinLabel, href: PERSON.linkedin, Icon: FiLinkedin, external: true },
    { label: "Résumé", value: "Résumé (PDF, 42 KB)", href: PERSON.resume, Icon: FiDownload },
  ];
  return (
    <Section
      id="contact"
      title="Contact"
      intro="Hiring for a solutions architect role, or want to compare notes? Email and LinkedIn reach me directly."
    >
      <ul className="border-y border-line">
        {direct.map(({ label, value, href, Icon, external }) => {
          const inner = (
            <>
              <Icon aria-hidden="true" className="size-[1.1em] shrink-0 text-muted" />
              <span className="sr-only text-muted sm:not-sr-only sm:w-20 sm:shrink-0">{label}</span>
              <span className="min-w-0 break-words font-medium text-pine group-hover:text-pine-deep">{value}</span>
              {external && <FiArrowUpRight aria-hidden="true" className="ml-auto size-[1em] shrink-0 text-muted" />}
            </>
          );
          const cls =
            "group flex min-h-14 items-center gap-3 py-2 transition-colors duration-150 hover:bg-raised sm:-mx-3 sm:rounded-md sm:px-3";
          return (
            <li key={label} className="border-b border-line last:border-b-0">
              {external ? (
                <NewTab href={href} className={cls}>
                  {inner}
                </NewTab>
              ) : (
                <a href={href} className={cls}>
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <ContactForm />
    </Section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto mt-16 w-full max-w-[68rem] px-4 pb-24 sm:mt-24 sm:px-6 sm:pb-10 lg:mt-32 lg:px-8">
      <div className="flex flex-col gap-4 border-t border-line pt-6 text-[0.875rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <span className="num">{year}</span> {PERSON.name}, {PERSON.location}
        </p>
        <ul className="-mx-2 flex flex-wrap">
          <li>
            <a href={`mailto:${PERSON.email}`} className="inline-flex min-h-11 items-center px-2 hover:text-ink">
              Email
            </a>
          </li>
          <li>
            <NewTab href={PERSON.linkedin} className="inline-flex min-h-11 items-center px-2 hover:text-ink">
              LinkedIn
            </NewTab>
          </li>
          <li>
            <NewTab href={PERSON.github} className="inline-flex min-h-11 items-center px-2 hover:text-ink">
              GitHub
            </NewTab>
          </li>
          <li>
            <a href={PERSON.resume} className="inline-flex min-h-11 items-center px-2 hover:text-ink">
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  const actionsRef = useRef(null);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const el = actionsRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const contact = document.getElementById("contact");
    let pastHero = false;
    let atContact = false;
    const update = () => setShowBar(pastHero && !atContact);
    const heroObs = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    const contactObs = new IntersectionObserver(([e]) => {
      atContact = e.isIntersecting;
      update();
    });
    heroObs.observe(el);
    if (contact) contactObs.observe(contact);
    return () => {
      heroObs.disconnect();
      contactObs.disconnect();
    };
  }, []);

  return (
    <div id="top" className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex flex-col gap-12 sm:gap-24 lg:gap-28">
        <Hero actionsRef={actionsRef} />
        <Work />
        <Experience />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <StickyContact visible={showBar} />
    </div>
  );
}
