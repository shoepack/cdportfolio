import { LuArrowRight } from "react-icons/lu";

// DETAIL A: how the quoting assistant reads a part number.
// An illustration with placeholder segments; not a real part number,
// segment scheme, or price.
const SEGS = [
  { k: "A", code: "AAA" },
  { k: "B", code: "BB" },
  { k: "C", code: "C" },
  { k: "D", code: "DD" },
];
const PN = SEGS.map((s) => s.code).join("-");

export default function QuoteDetail() {
  return (
    <figure id="detail-a" className="detail">
      <figcaption className="detail-head">
        <h5 id="detail-a-title">
          <span className="callout-mark" aria-hidden="true">A</span>
          Detail A<span className="mono" style={{ letterSpacing: 0, fontWeight: 500 }}>&ensp;Scale 1:1</span>
        </h5>
        <p className="detail-note" style={{ margin: 0 }}>
          Illustration of the quoting assistant. Placeholder segments, not a real part number or price.
        </p>
      </figcaption>

      <div className="detail-body">
        <div>
          <p className="step-lbl"><span className="mono">1</span> Split</p>
          <div className="pn" role="img" aria-label={`Placeholder part number ${PN}, split into segments A, B, C and D`}>
            {SEGS.map((s, i) => (
              <span key={s.k} style={{ display: "contents" }}>
                {i > 0 && <span className="pn-dash" aria-hidden="true">-</span>}
                <span className="seg" aria-hidden="true">
                  <span className="seg-box">{s.code}</span>
                  <span className="seg-tick" />
                  <span className="seg-tag">Seg {s.k}</span>
                </span>
              </span>
            ))}
          </div>
          <p className="pn-caption">Sales types a part number. The app cuts it into its segments.</p>
        </div>

        <div className="step-arrow" aria-hidden="true"><LuArrowRight size={20} /></div>

        <div>
          <p className="step-lbl"><span className="mono">2</span> Match</p>
          <table className="sheet-table">
            <caption className="sr-only">Each segment looked up in the internal pricing sheet (placeholder rows)</caption>
            <thead>
              <tr>
                <th scope="col">Seg</th>
                <th scope="col">Code</th>
                <th scope="col">Pricing sheet entry</th>
              </tr>
            </thead>
            <tbody>
              {SEGS.map((s) => (
                <tr key={s.k}>
                  <td className="mono">{s.k}</td>
                  <td className="mono">{s.code}</td>
                  <td className="ph">price and description for {s.k}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="step-arrow" aria-hidden="true"><LuArrowRight size={20} /></div>

        <div>
          <p className="step-lbl"><span className="mono">3</span> Return</p>
          <div className="chat">
            <p className="bubble bubble--in" style={{ margin: 0 }}>{PN}</p>
            <div className="bubble bubble--out">
              <dl>
                <dt>Price</dt>
                <dd className="ph">from the sheet</dd>
                <dt>Description</dt>
                <dd className="ph">from the sheet</dd>
              </dl>
            </div>
          </div>
          <p className="pn-caption">A price and description, back in the chat.</p>
        </div>
      </div>
    </figure>
  );
}
