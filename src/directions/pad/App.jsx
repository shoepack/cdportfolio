import { PERSON } from "@/shared/profile";
import { NewTab, SHEETS, Sep, Strip, YEAR } from "./parts";
import SheetAnswer from "./SheetAnswer";
import SheetExperience from "./SheetExperience";
import SheetAreas from "./SheetAreas";
import SheetContact from "./SheetContact";

function SheetNav() {
  return (
    <nav className="c-nav" aria-label="Sheets">
      <ul className="nav-list">
        {SHEETS.slice(1).map((s, i) => (
          <li key={s.id}>
            <a className="cell" href={`#${s.id}`}>
              <span className="lbl">Sheet {i + 2}</span>
              <span className="nav-val">{s.nav}</span>
            </a>
          </li>
        ))}
        <li>
          <a className="cell" href={PERSON.resume} target="_blank" rel="noopener">
            <span className="lbl">PDF</span>
            <span className="nav-val">Résumé</span>
            <NewTab />
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Later({ index, children }) {
  return (
    <div className="sheet">
      <div className="strip-wrap">
        <Strip index={index} />
      </div>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div className="pad" id="top">
      <a className="skip" href="#main">Skip to the answer</a>

      <header className="sheet sheet--top strip-wrap">
        <Strip index={0}>
          <SheetNav />
        </Strip>
      </header>

      <main id="main" tabIndex={-1}>
        <div className="sheet sheet--cont">
          <SheetAnswer />
        </div>
        <Later index={1}>
          <SheetExperience />
        </Later>
        <Later index={2}>
          <SheetAreas />
        </Later>
        <Later index={3}>
          <SheetContact />
        </Later>
      </main>

      <footer className="sheet sheet--cont pad-foot">
        <div className="end-rule" aria-hidden="true" />
        <div className="foot-grid">
          <p className="end" style={{ margin: 0 }}>
            END OF CALC<Sep />SHEET {SHEETS.length} OF {SHEETS.length}
          </p>
          <div>
            <p style={{ margin: 0, color: "var(--color-ink)" }}>
              © {YEAR} {PERSON.name}<Sep />{PERSON.roleLong}<Sep />{PERSON.location}
            </p>
            <p className="colophon">Set in Overpass and Overpass Mono, type descended from the Highway Gothic engineering alphabet.</p>
          </div>
          <ul className="foot-links" aria-label="Elsewhere">
            <li><a href={`mailto:${PERSON.email}`}>Email</a></li>
            <li><a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<NewTab /></a></li>
            <li><a href={PERSON.github} target="_blank" rel="noopener noreferrer">GitHub<NewTab /></a></li>
            <li><a href="#top">Back to sheet 1</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
