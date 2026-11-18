import { useCallback, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { PERSON } from "./profile";

// Shared contact-form behaviour. Each direction renders its own markup and
// wires it up with the props this hook returns:
//
//   const form = useContactForm();
//   <form {...form.formProps}>
//     <input {...form.field("name")} />          // value, onChange, aria-invalid, aria-describedby, ref
//     {form.errors.name && <p id={form.errorId("name")}>{form.errors.name}</p>}
//     <div {...form.statusProps}>{form.statusMessage}</div>   // role=status/alert live region
//     <button disabled={form.status === "sending"}>…</button>
//   </form>

const LIMITS = { nameMin: 2, messageMin: 10, messageMax: 1000 };
const RATE_LIMIT_MS = 60_000;
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sanitize = (input) =>
  input
    .trim()
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");

function validate(values) {
  const errors = {};
  if (sanitize(values.name).length < LIMITS.nameMin) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(sanitize(values.email))) errors.email = "Please enter an email address I can reply to, like name@company.com.";
  const msg = sanitize(values.message);
  if (msg.length < LIMITS.messageMin) errors.message = "Please write at least a sentence (10+ characters).";
  else if (msg.length > LIMITS.messageMax) errors.message = `Please keep it under ${LIMITS.messageMax} characters.`;
  return errors;
}

export function useContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  // idle | sending | sent | failed | wait
  const [status, setStatus] = useState("idle");
  const lastSent = useRef(0);
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear a field's error as soon as it becomes valid.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = validate({ ...values, [name]: value });
      return next[name] ? prev : { ...prev, [name]: undefined };
    });
  }, [values]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = ["name", "email", "message"].find((k) => found[k]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      setStatus("idle");
      return;
    }
    if (Date.now() - lastSent.current < RATE_LIMIT_MS) {
      setStatus("wait");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: sanitize(values.name),
          email: sanitize(values.email),
          message: sanitize(values.message),
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      lastSent.current = Date.now();
      setValues({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const errorId = (name) => `contact-${name}-error`;

  const field = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    ref: refs[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    autoComplete: name === "message" ? "off" : name,
    ...(name === "email" ? { type: "email", inputMode: "email" } : {}),
    ...(name === "message" ? { maxLength: LIMITS.messageMax } : {}),
  });

  const statusMessage = {
    idle: "",
    sending: "Sending…",
    sent: "Thanks, your message is on its way. I'll reply to the email address you gave.",
    failed: `That didn't send. Please email me directly at ${PERSON.email}.`,
    wait: "Your last message just went through. Give it a minute before sending another.",
  }[status];

  return {
    values,
    errors,
    status,
    statusMessage,
    // On failure, render statusMessage with PERSON.email as a mailto link (see mailto below).
    mailto: `mailto:${PERSON.email}`,
    field,
    errorId,
    labelFor: (name) => `contact-${name}`,
    limits: LIMITS,
    formProps: { onSubmit, noValidate: true },
    // Render this container always (empty when idle) so screen readers announce changes.
    statusProps: {
      role: status === "failed" ? "alert" : "status",
      "aria-live": status === "failed" ? "assertive" : "polite",
    },
  };
}
