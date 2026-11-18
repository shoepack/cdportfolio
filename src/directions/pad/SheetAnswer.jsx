import { EXPERIENCE, PERSON, SUMMARY } from "@/shared/profile";
import PencilBox from "./PencilBox";
import { NewTab, Portrait, Tick } from "./parts";

const job = EXPERIENCE[0];

// The problem statement and its answer, restated from the Reotemp wins.
// Each GIVEN pairs with the numbered line in the answer that resolved it.
const PAIRS = [
  { n: 1, win: "odoo", given: "A manufacturer running on Sage and a custom CRM.", got: "Moved the business onto Odoo" },
  {
    n: 2,
    win: "stripe",
    given: "A new IoT smart probe with no storefront and no way to sell a subscription.",
    got: "Launched the company’s first Stripe subscription",
  },
  {
    n: 3,
    win: "quoting",
    given: "Products with no configurator, priced by hand from a pricing sheet.",
    got: "Built AI quoting and gauge-matching tools",
  },
  { n: 4, win: "uptime", given: "A website that went down 1–2 times a week.", got: "Cut outages to about 1 a month" },
];

export default function SheetAnswer() {
  return (
    <section id="answer" aria-labelledby="answer-title" className="sheet-body grid-paper">
      <div className="s1">
        <dl className="work s1-problem">
          <dt className="term">Given</dt>
          <dd>
            <ol className="given-list">
              {PAIRS.map((p) => (
                <li key={p.n}>
                  <span className="ref">({p.n})</span>
                  <span>{p.given}</span>
                </li>
              ))}
            </ol>
          </dd>
          <dt className="term">Find</dt>
          <dd className="find">Someone who can design it, build it, and keep it running.</dd>
        </dl>
        <dl className="work s1-ans">
          <dt className="term">Ans.</dt>
          <dd>
            <PencilBox className="answer" seed={7}>
              <h1 id="answer-title" className="h-answer">
                {PERSON.name},<span className="role"> {PERSON.role}</span>
              </h1>
              <p className="proof-at">
                {job.role}, {job.company}, <span className="mono">{job.start} – {job.end}</span>
              </p>
              <ul className="proof">
                {PAIRS.map((p) => (
                  <li key={p.n}>
                    <span className="ref">({p.n})</span>
                    <Tick />
                    <span>{p.got}</span>
                  </li>
                ))}
              </ul>
              <div className="actions">
                <a className="btn btn--primary" href={`mailto:${PERSON.email}`}>
                  Email me
                </a>
                <a className="btn" href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <NewTab />
                </a>
                <a className="btn" href={PERSON.resume} target="_blank" rel="noopener">
                  Résumé <span className="sub">PDF</span>
                  <NewTab />
                </a>
              </div>
            </PencilBox>
          </dd>
        </dl>

        <div className="s1-side">
          <div className="s1-photo">
            <Portrait sizes="(min-width: 1024px) 600px, 380px" />
          </div>
          <p className="side-note">{SUMMARY}</p>
        </div>
      </div>
    </section>
  );
}
