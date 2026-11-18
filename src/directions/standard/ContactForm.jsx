import { useContactForm } from "@/shared/useContactForm";
import { PERSON } from "@/shared/profile";

const inputCls =
  "block w-full rounded-lg border border-field bg-raised px-3.5 text-[1rem] text-ink shadow-[0_1px_2px_rgb(23_23_22/0.04)] transition-[border-color,box-shadow] duration-150 hover:border-ink/55 focus:border-pine focus:outline-none focus:ring-3 focus:ring-pine/20 aria-[invalid=true]:border-danger";

function Field({ form, name, label, hint, children }) {
  const error = form.errors[name];
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={form.labelFor(name)} className="text-[0.9375rem] font-medium text-ink">
          {label}
        </label>
        {hint}
      </div>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={form.errorId(name)} className="mt-2 text-[0.875rem] leading-snug text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function Status({ form }) {
  const { status, statusMessage } = form;
  const message = statusMessage.replace(/'/g, "\u2019");
  let content = message;
  if (status === "failed" && message.includes(PERSON.email)) {
    const [before, after] = message.split(PERSON.email);
    content = (
      <>
        {before}
        <a href={form.mailto} className="link font-medium">
          {PERSON.email}
        </a>
        {after}
      </>
    );
  }
  const tone =
    status === "failed" ? "text-danger" : status === "sent" ? "text-pine font-medium" : "text-muted";
  return (
    <div {...form.statusProps} className={`min-h-6 text-[0.9375rem] leading-snug ${tone}`}>
      {content}
    </div>
  );
}

export default function ContactForm() {
  const form = useContactForm();
  const sending = form.status === "sending";
  const count = form.values.message.length;

  return (
    <form {...form.formProps} aria-labelledby="contact-form-title" className="mt-12">
      <h3 id="contact-form-title" className="text-[1.125rem] font-semibold tracking-[-0.01em]">
        Send a message
      </h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field form={form} name="name" label="Name">
          <input {...form.field("name")} type="text" className={`${inputCls} h-12`} placeholder="Your name" />
        </Field>
        <Field form={form} name="email" label="Email">
          <input {...form.field("email")} className={`${inputCls} h-12`} placeholder="name@company.com" />
        </Field>
        <div className="sm:col-span-2">
          <Field
            form={form}
            name="message"
            label="Message"
            hint={
              <span className="num text-[0.8125rem] text-muted" aria-hidden="true">
                {count}/{form.limits.messageMax}
              </span>
            }
          >
            <textarea
              {...form.field("message")}
              rows={5}
              className={`${inputCls} min-h-36 resize-y py-3 leading-relaxed`}
              placeholder="The role, the team, and how to reach you."
            />
          </Field>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-pine px-6 text-[0.9375rem] font-medium text-white transition-[background-color,transform] duration-150 hover:bg-pine-deep active:translate-y-px disabled:cursor-progress disabled:bg-pine/70"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        <Status form={form} />
      </div>
    </form>
  );
}
