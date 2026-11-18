import { PERSON, PORTRAIT, srcset } from "@/shared/profile";
import { LuArrowRight, LuArrowUp } from "react-icons/lu";

export const SHEETS = [
  { id: "answer", subject: PERSON.role },
  { id: "experience", subject: "Experience", nav: "Experience" },
  { id: "areas", subject: "Areas", nav: "Areas" },
  { id: "contact", subject: "Contact", nav: "Contact" },
];
export const TOTAL = SHEETS.length;

// The pad is dated the day it is read; signed by its author.
const today = new Date();
const pad2 = (n) => String(n).padStart(2, "0");
export const DATE = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`;
export const YEAR = today.getFullYear();
const [first, ...rest] = PERSON.name.split(" ");
export const INITIALS = `${first[0]}. ${rest.join(" ")}`;

export const NewTab = () => <span className="sr-only"> (opens in new tab)</span>;

// A red-pencil check, drawn rather than set.
export function Tick({ size = 16, className = "tick" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M2.2 8.6 C3.6 9.6 5 11.2 6 13 C7.8 8.6 10.4 5.2 14 2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({ label, children, className = "", ...rest }) {
  return (
    <div className={`cell ${className}`} {...rest}>
      <span className="lbl">{label}</span>
      <span className="val">{children}</span>
    </div>
  );
}

// Ruled header boxes printed at the top of every sheet.
export function Strip({ index, children }) {
  const sheet = SHEETS[index];
  const later = index > 0;
  const next = SHEETS[index + 1];
  return (
    <div className={`strip ${later ? "strip--later" : "strip--first"}`}>
      <Field label="Project" className="c-project" aria-hidden={later || undefined}>{PERSON.name}</Field>
      <Field label="Subject" className="c-subject">{sheet.subject}</Field>
      <Field label="Sheet" className="c-sheet">
        {index + 1} of {TOTAL}
      </Field>
      {children}
      <Field label="By" className="c-by" aria-hidden="true"><span className="val--sign">{INITIALS}</span></Field>
      <Field label="Date" className="c-date" aria-hidden="true">{DATE}</Field>
      {later && (
        <a className="cell c-link" href={next ? `#${next.id}` : "#top"}>
          <span className="lbl">{next ? `Next · sheet ${index + 2}` : "Back to"}</span>
          <span className="nav-val">
            {next ? next.subject : "Sheet 1"}{" "}
            {next ? <LuArrowRight className="ext" size={14} aria-hidden="true" /> : <LuArrowUp className="ext" size={14} aria-hidden="true" />}
          </span>
        </a>
      )}
    </div>
  );
}

// Paper clip, drawn as one bent wire.
function Clip() {
  return (
    <svg className="clip" viewBox="0 0 20 58" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6.5 20 V44 a3.5 3.5 0 0 0 7 0 V9 a6 6 0 0 0 -12 0 V48 a8.5 8.5 0 0 0 17 0 V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Portrait({ sizes, caption = true, eager = true }) {
  const { sources } = PORTRAIT;
  return (
    <figure className="portrait">
      <div className="print">
        <div className="print-frame">
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
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : undefined}
              decoding="async"
            />
          </picture>
        </div>
      </div>
      <Clip />
      {caption && (
        <figcaption>
          <span className="mono">FIG. 1</span>&ensp;{PERSON.name}, {PERSON.location}
        </figcaption>
      )}
    </figure>
  );
}
