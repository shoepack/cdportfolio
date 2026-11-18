import { AREAS, EXPERIENCE, SKILLS } from "@/shared/profile";
import { REFS } from "./SheetExperience";
import { Tick } from "./parts";

const titleOf = (id) => EXPERIENCE[0].wins.find((w) => w.id === id)?.title ?? "";

export default function SheetAreas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="sheet-body grid-paper">
      <h2 id="areas-title" className="h-sheet">Areas</h2>
      <p className="lead">
        A generalist, checked against the job. Each area points back to the worked problems on sheet 2 that prove it.
      </p>

      <table className="ref-table">
        <caption className="sr-only">Areas of work, each with the problems on sheet 2 that back it</caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">The work</th>
            <th scope="col">Chk’d against</th>
          </tr>
        </thead>
        <tbody>
          {AREAS.map((a) => (
            <tr key={a.id}>
              <th scope="row">{a.name}</th>
              <td className="line">{a.line}</td>
              <td className="refs">
                <span className="refs-inner">
                  <Tick />
                  {a.wins.map((id) => (
                    <a key={id} href={`#p-${id}`} aria-label={`Problem ${REFS[id]}: ${titleOf(id)}`}>
                      {REFS[id]}
                    </a>
                  ))}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="subhead">Tools on hand</h3>
      <dl className="stock">
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group}>
            <dt>{group}</dt>
            <dd>{items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
