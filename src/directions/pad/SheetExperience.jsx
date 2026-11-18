import { Fragment } from "react";
import { EDUCATION, EXPERIENCE } from "@/shared/profile";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import PencilBox from "./PencilBox";
import QuoteDetail from "./QuoteDetail";
import { NewTab, Sep } from "./parts";

const [reotemp, ...earlier] = EXPERIENCE;

// Problem references on this sheet: 2.1, 2.2 ... Sheet 3 points back at them.
export const REFS = Object.fromEntries(reotemp.wins.map((w, i) => [w.id, `2.${i + 1}`]));


function Metric({ value }) {
  const parts = value.split("→").map((s) => s.trim());
  return (
    <span className="metric">
      {parts.map((p, i) => (
        <Fragment key={p}>
          {i > 0 && (
            <>
              <LuArrowRight size={20} aria-hidden="true" />
              <span className="sr-only">to</span>
            </>
          )}
          <span>{p}</span>
        </Fragment>
      ))}
    </span>
  );
}

function Problem({ win, seed, children }) {
  const ref = REFS[win.id];
  return (
    <li id={`p-${win.id}`} className="prob">
      <div className="prob-gutter prob-ref" aria-hidden="true">{ref}</div>

      <div className="prob-body">
        <div className="prob-headline">
          <span className="prob-ref" aria-hidden="true">{ref}</span>
          <h4 className="h-prob">
            <span className="sr-only">Problem {ref}: </span>
            {win.title}
          </h4>
        </div>
        <dl className="work">
          <dt className="term">Given</dt>
          <dd><p>{win.problem}</p></dd>
          <dt className="term">Solution</dt>
          <dd>
            <p>
              {win.action}
              {win.id === "quoting" && (
                <>
                  {" "}
                  <a className="callout-mark" href="#detail-a" aria-label="See Detail A, how a part number is matched">A</a>
                </>
              )}
            </p>
            {(win.tools.length > 0 || win.link) && (
              <p className="tools" style={{ marginTop: 6 }}>
                {win.tools.length > 0 && <>Using {win.tools.join(", ")}</>}
                {win.tools.length > 0 && win.link && <Sep />}
                {win.link && (
                  <a className="ext-link" href={win.link.href} target="_blank" rel="noopener noreferrer">
                    {win.link.label}
                    <LuArrowUpRight size={14} aria-hidden="true" />
                    <NewTab />
                  </a>
                )}
              </p>
            )}
          </dd>
        </dl>
      </div>

      <PencilBox className="result" seed={seed}>
        <span className="term">Result</span>
        {win.metric ? (
          <p className="metric-wrap">
            <Metric value={win.metric.value} />
            <span className="metric-label">{win.metric.label}</span>
          </p>
        ) : (
          <p>{win.result}</p>
        )}
      </PencilBox>
      {children}
    </li>
  );
}

export default function SheetExperience() {
  const [tutor] = earlier;
  const tutored = tutor.summary.match(/(\d+\+?) students/)?.[1];
  return (
    <section id="experience" aria-labelledby="experience-title" className="sheet-body grid-paper">
      <h2 id="experience-title" className="h-sheet">Experience</h2>
      <p className="lead">Each win at Reotemp, worked as a problem: what was given, what I did, and the result, boxed.</p>

      <div style={{ marginTop: "calc(var(--u) * 1.5)" }}>
        <div className="job-head">
          <h3 className="h-job">
            <a href={reotemp.companyUrl} target="_blank" rel="noopener noreferrer">
              {reotemp.company}
              <NewTab />
            </a>
          </h3>
          <p className="job-meta" style={{ margin: 0 }}>
            {reotemp.role}<Sep />{reotemp.location}<Sep /><span className="mono">{reotemp.start} – {reotemp.end}</span>
          </p>
        </div>
        <p className="job-summary">{reotemp.summary}</p>

        <ol className="problems" aria-label={`Worked problems at ${reotemp.company}`}>
          {reotemp.wins.map((w, i) => (
            <Problem key={w.id} win={w} seed={11 + i * 7}>
              {w.id === "quoting" && <QuoteDetail />}
            </Problem>
          ))}
        </ol>
      </div>

      <h3 className="subhead">Earlier, and school</h3>

      <div className="minor">
        <div className="prob-gutter" />
        <div>
          <h4 className="minor-title">{tutor.role}, {tutor.company}</h4>
          <p className="minor-meta" style={{ margin: 0 }}>
            {tutor.location}<Sep /><span className="mono">{tutor.start} – {tutor.end}</span>
          </p>
          <p>{tutor.summary}</p>
        </div>
        <div className="minor-fig">
          <span className="num">{tutored}</span>
          <span>students tutored, one-on-one and in groups</span>
        </div>
      </div>

      <div className="minor">
        <div className="prob-gutter" />
        <div>
          <h4 className="minor-title">{EDUCATION.degree}, {EDUCATION.school}</h4>
          <p className="minor-meta" style={{ margin: 0 }}>
            {EDUCATION.focus}<Sep /><span className="mono">{EDUCATION.start} – {EDUCATION.end}</span>
          </p>
        </div>
        <div className="minor-fig">
          <span className="num">{EDUCATION.gpa}</span>
          <span>GPA, {EDUCATION.honors}</span>
        </div>
      </div>
    </section>
  );
}
