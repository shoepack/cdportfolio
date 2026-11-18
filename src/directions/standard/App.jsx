import { FiArrowUpRight, FiDownload, FiLinkedin, FiMail } from "react-icons/fi";
import { PERSON, PORTRAIT, srcset, EXPERIENCE, EDUCATION, AREAS, SUMMARY } from "@/shared/profile";
import ContactForm from "./ContactForm.jsx";

const [REOTEMP, MIRACOSTA] = EXPERIENCE;

// Typographic apostrophes for profile copy (display only; the facts are untouched).
const q = (s) => s.replace(/'/g, "\u2019");

// Which phrase in each win's result carries the outcome. Rendered heavier, never reworded.
const RESULT_EMPHASIS = {
  stripe: "first subscription product",
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
    <span className="num text-[0.8125rem] text-muted whitespace-nowrap">
      {start} <span aria-hidden="true">–</span>
      <span className="sr-only">to</span> {end}
    </span>
  );
}

/* ---------- Nav ---------- */

const NAV = [
  { href: "#experience", label: "Experience" },
  { href: "#areas", label: "Areas" },
  { href: "#contact", label: "Contact" },
  { href: PERSON.resume, label: "Résumé" },
];

function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[68rem] items-center justify-between px-4 pt-3 sm:px-6 sm:pt-5 lg:px-8">
      <a
        href="#top"
        className="hidden min-h-11 items-center text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink sm:inline-flex"
      >
        {PERSON.name}
      </a>
      <nav aria-label="Primary" className="w-full sm:w-auto">
        <ul className="-mx-2.5 flex items-center justify-between sm:mx-0 sm:justify-end sm:gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-md px-2.5 text-[0.9375rem] text-muted transition-colors duration-150 hover:text-ink"
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

const btnBase =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4.5 sm:w-auto text-[0.9375rem] font-medium transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px";

function Portrait() {
  const { sources } = PORTRAIT;
  const sizes = "(min-width: 1024px) 760px, calc(100vw - 32px)";
  return (
    <picture>
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

function Hero() {
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
            As {REOTEMP.role} at {REOTEMP.company}, I shipped the company’s first Stripe subscription product, built
            its AI quoting and product-matching tools, and cut site outages from{" "}
            <strong className="font-semibold text-ink">1–2 a week to about one a month</strong>.
          </p>
          <ul className="hero-step mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3" style={{ "--step": 3 }}>
            <li className="col-span-2">
              <a href={PERSON.resume} className={`${btnBase} bg-pine text-white hover:bg-pine-deep`}>
                <FiDownload aria-hidden="true" className="size-[1.05em]" />
                Résumé <span className="font-normal text-white/80">(PDF)</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PERSON.email}`}
                className={`${btnBase} border border-field/50 bg-raised text-ink hover:border-ink/60`}
              >
                <FiMail aria-hidden="true" className="size-[1.05em] text-muted" />
                Email
              </a>
            </li>
            <li>
              <NewTab
                href={PERSON.linkedin}
                className={`${btnBase} border border-field/50 bg-raised text-ink hover:border-ink/60`}
              >
                <FiLinkedin aria-hidden="true" className="size-[1.05em] text-muted" />
                LinkedIn
              </NewTab>
            </li>
          </ul>
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

/* ---------- Sections ---------- */

function Section({ id, title, children, intro }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-[68rem] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-y-6 border-t border-line pt-12 sm:pt-16 lg:grid-cols-[13rem_1fr] lg:gap-x-12 lg:pt-20">
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

function EntryHead({ title, org, orgUrl, place, start, end, level = "lead" }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div>
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
      <NewTab href={win.link.href} className="link whitespace-nowrap">
        {win.link.label}
        <FiArrowUpRight aria-hidden="true" className="ml-0.5 inline size-[0.85em] -translate-y-px" />
      </NewTab>
      {action.slice(i + win.link.label.length)}
    </>
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
          />
        </div>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{q(REOTEMP.summary)}</p>

        <ul className="mt-8 divide-y divide-line border-y border-line">
          {REOTEMP.wins.map((win) => (
            <li key={win.id} id={`win-${win.id}`} className="py-6 sm:py-7">
              <h4 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">{q(win.title)}</h4>
              <p className="mt-2 leading-relaxed text-muted">
                <WinAction win={win} />
              </p>
              <p className="mt-2 leading-relaxed text-ink">
                <Emphasize text={win.result} phrase={RESULT_EMPHASIS[win.id]} />
              </p>
              {win.tools.length > 0 && (
                <p className="mt-3 text-[0.8125rem] text-muted">
                  <span className="sr-only">Tools: </span>
                  {win.tools.join(" · ")}
                </p>
              )}
            </li>
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

function Areas() {
  return (
    <Section id="areas" title="Areas" intro={SUMMARY}>
      <dl className="border-t border-line">
        {AREAS.map((area) => (
          <div
            key={area.id}
            className="grid gap-1 border-b border-line py-5 last:border-b-0 sm:grid-cols-[14.5rem_1fr] sm:gap-8 sm:py-6"
          >
            <dt className="font-semibold leading-snug tracking-[-0.01em]">{area.name}</dt>
            <dd className="leading-relaxed text-muted">{q(area.line)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Contact() {
  const direct = [
    { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}`, Icon: FiMail },
    { label: "LinkedIn", value: PERSON.linkedinLabel, href: PERSON.linkedin, Icon: FiLinkedin, external: true },
    { label: "Résumé", value: `${PERSON.resume.replace(/^\//, "")}`, href: PERSON.resume, Icon: FiDownload },
  ];
  return (
    <Section
      id="contact"
      title="Contact"
      intro="Hiring for a solutions architect role, or want to compare notes? Email and LinkedIn reach me directly, or leave a message here."
    >
      <ul className="border-y border-line">
        {direct.map(({ label, value, href, Icon, external }) => {
          const inner = (
            <>
              <Icon aria-hidden="true" className="size-[1.1em] shrink-0 text-muted" />
              <span className="sr-only text-muted sm:not-sr-only sm:w-20 sm:shrink-0">{label}</span>
              <span className="min-w-0 truncate font-medium text-pine group-hover:text-pine-deep">{value}</span>
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
    <footer className="mx-auto mt-24 w-full max-w-[68rem] px-4 pb-10 sm:px-6 lg:mt-32 lg:px-8">
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
  return (
    <div id="top" className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex flex-col gap-20 sm:gap-24 lg:gap-28">
        <Hero />
        <Experience />
        <Areas />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
