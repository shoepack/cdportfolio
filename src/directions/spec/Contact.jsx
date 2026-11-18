import { LuArrowUpRight, LuDownload, LuLinkedin, LuMail } from "react-icons/lu";
import { PERSON } from "@/shared/profile";
import { useContactForm } from "@/shared/useContactForm";
import { SheetHead, NewTab } from "./parts.jsx";

function Status({ form }) {
  const msg = form.statusMessage;
  if (form.status === "failed" && msg.includes(PERSON.email)) {
    const [before, after] = msg.split(PERSON.email);
    return (
      <>
        {before}
        <a href={form.mailto} className="ink-link font-semibold">{PERSON.email}</a>
        {after}
      </>
    );
  }
  return msg;
}

function Field({ form, name, label, hint, multiline }) {
  const props = form.field(name);
  const err = form.errors[name];
  return (
    <div className="grid gap-1.5">
      <label htmlFor={form.labelFor(name)} className="label flex items-baseline justify-between gap-3">
        <span>{label}</span>
        {hint && <span className="num text-[0.75rem] font-normal normal-case tracking-normal text-ink-soft">{hint}</span>}
      </label>
      {multiline ? <textarea {...props} rows={5} className="field min-h-[9rem] resize-y" /> : <input {...props} className="field" />}
      {err && (
        <p id={form.errorId(name)} className="m-0 text-[0.9375rem] font-medium text-red">
          {err}
        </p>
      )}
    </div>
  );
}

const DIRECT = [
  { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}`, icon: LuMail },
  { label: "LinkedIn", value: PERSON.linkedinLabel, href: PERSON.linkedin, icon: LuLinkedin, external: true },
  { label: "Résumé", value: "Datasheet, PDF", href: PERSON.resume, icon: LuDownload, download: true },
  { label: "GitHub", value: PERSON.github.replace("https://", ""), href: PERSON.github, icon: LuArrowUpRight, external: true },
];

export default function Contact() {
  const form = useContactForm();
  const sending = form.status === "sending";
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[80rem] px-4 pb-20 pt-20 md:px-8 lg:pb-28 lg:pt-28">
      <SheetHead id="contact-title" title="Contact" page={5} />
      <p className="m-0 mt-5 max-w-[56ch] text-[1.125rem] leading-normal lg:text-[1.25rem]">
        Hiring a solutions architect, or want to talk through a system? Email me or message me on LinkedIn. The inquiry form
        reaches the same inbox, and I reply by email.
      </p>

      <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h3 className="label m-0 border-b border-ink pb-2 text-[0.9375rem]">Direct</h3>
          <ul className="m-0 list-none p-0">
            {DIRECT.map((d) => {
              const Icon = d.icon;
              return (
                <li key={d.label} className="border-b border-rule">
                  <a
                    href={d.href}
                    {...(d.external ? { target: "_blank", rel: "noopener" } : {})}
                    {...(d.download ? { download: "Jason_Artley_Resume.pdf" } : {})}
                    className="direct-link grid min-h-14 grid-cols-[5.5rem_minmax(0,1fr)_auto] items-center gap-2 py-2 no-underline"
                  >
                    <span className="label text-ink-soft">{d.label}</span>
                    <span className="truncate font-medium underline decoration-rule-strong decoration-1 underline-offset-[0.22em]">{d.value}</span>
                    <Icon aria-hidden="true" className="size-[1.125rem]" />
                    {d.external && <NewTab />}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="m-0 mt-4 text-ink-soft">{PERSON.location}</p>
        </div>

        <form {...form.formProps} aria-labelledby="form-title" className="border border-ink">
          <div className="flex items-baseline justify-between gap-4 border-b border-ink bg-fill px-4 py-2.5 lg:px-6">
            <h3 id="form-title" className="label m-0 text-[0.9375rem]">Inquiry form</h3>
            <span className="num text-[0.75rem] text-ink-soft">All fields required</span>
          </div>
          <div className="grid gap-5 p-4 lg:p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field form={form} name="name" label="Name" />
              <Field form={form} name="email" label="Email" />
            </div>
            <Field
              form={form}
              name="message"
              label="Message"
              hint={`${form.values.message.length}/${form.limits.messageMax}`}
              multiline
            />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <button type="submit" className="btn btn-ink min-w-[11rem]" disabled={sending}>
                {sending ? "Sending…" : "Send inquiry"}
              </button>
              <p {...form.statusProps} className={`m-0 min-h-6 flex-1 basis-[16rem] text-[0.9375rem] ${form.status === "failed" ? "font-medium text-red" : "text-ink-soft"}`}>
                <Status form={form} />
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
