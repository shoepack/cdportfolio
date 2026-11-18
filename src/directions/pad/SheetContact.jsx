import { PERSON } from "@/shared/profile";
import { useContactForm } from "@/shared/useContactForm";
import { LuArrowUpRight, LuMapPin } from "react-icons/lu";
import PencilBox from "./PencilBox";
import { NewTab, Tick } from "./parts";

const DIRECT = [
  { k: "LinkedIn", v: PERSON.linkedinLabel, href: PERSON.linkedin },
  { k: "Résumé", v: "Open the PDF", href: PERSON.resume },
  { k: "GitHub", v: PERSON.github.replace(/^https?:\/\//, ""), href: PERSON.github },
];

function Status({ form }) {
  const { status, statusMessage } = form;
  if (status === "failed") {
    const [before, after] = statusMessage.split(PERSON.email);
    return (
      <>
        {before}
        <a href={form.mailto}>{PERSON.email}</a>
        {after}
      </>
    );
  }
  if (status === "sent") {
    return (
      <span className="ok">
        <Tick />
        <span>{statusMessage}</span>
      </span>
    );
  }
  return statusMessage;
}

export default function SheetContact() {
  const form = useContactForm();
  const { errors, values, limits } = form;
  const sending = form.status === "sending";

  const fieldClass = (name) => `field${errors[name] ? " is-invalid" : ""}`;
  const Err = ({ name }) =>
    errors[name] ? (
      <p id={form.errorId(name)} className="field-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="sheet-body grid-paper">
      <h2 id="contact-title" className="h-sheet">Send me the next problem.</h2>
      <p className="lead">
        Hiring a {PERSON.role}, or have a system that needs designing, building and keeping running? Email or
        LinkedIn reach me directly. The form works too.
      </p>

      <div className="contact">
        <div className="contact-direct">
          <PencilBox className="mailbox" seed={41}>
            <span className="term">Answer to</span>
            <a className="mail-big" href={`mailto:${PERSON.email}`}>
              {PERSON.email}
            </a>
          </PencilBox>
          <ul className="direct" aria-label="Other ways to reach me">
            {DIRECT.map(({ k, v, href }) => (
              <li key={k}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <span className="lbl">{k}</span>
                  <span className="dval">{v}</span>
                  <LuArrowUpRight className="dicon" size={18} aria-hidden="true" />
                  <NewTab />
                </a>
              </li>
            ))}
            <li>
              <span className="static">
                <span className="lbl">Based in</span>
                <span className="dval">{PERSON.location}</span>
                <LuMapPin className="dicon" size={18} aria-hidden="true" />
              </span>
            </li>
          </ul>
        </div>

        <form className="form" aria-labelledby="form-title" {...form.formProps}>
          <h3 id="form-title" className="sr-only">Message form</h3>
          <div className="form-grid">
            <div>
              <div className={fieldClass("name")}>
                <label htmlFor={form.labelFor("name")}>Name</label>
                <input {...form.field("name")} placeholder="Your name" />
              </div>
              <Err name="name" />
            </div>
            <div>
              <div className={fieldClass("email")}>
                <label htmlFor={form.labelFor("email")}>Email</label>
                <input {...form.field("email")} placeholder="name@company.com" />
              </div>
              <Err name="email" />
            </div>
          </div>
          <div>
            <div className={fieldClass("message")}>
              <label htmlFor={form.labelFor("message")}>
                Message
                <span className="count" aria-hidden="true">
                  {values.message.length}/{limits.messageMax}
                </span>
              </label>
              <textarea {...form.field("message")} rows={6} placeholder="The role, the problem, or both." />
            </div>
            <Err name="message" />
          </div>
          <div className="form-foot">
            <button type="submit" className="btn btn--ink" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </button>
            <div className={`status${form.status === "failed" ? " is-failed" : ""}`} {...form.statusProps}>
              <Status form={form} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
