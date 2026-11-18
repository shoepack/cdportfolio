# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring managers** screening Jason for his next full-time role. They arrive from LinkedIn, a résumé, or an application, often on a phone, and decide in seconds whether he is worth a conversation.
- **Engineering and design peers** (interviewers, future teammates) who look closer at what he actually did at each job and how he works.

## Product Purpose

Jason Artley's personal portfolio at jasonartley.com. It exists to land his second job: to make a screener understand quickly what he does, believe it, and reach out.

Success means a visitor **reaches out on LinkedIn or by email**, or **views/downloads his résumé** on the way to doing so.

## Positioning

Target role: **(Software) Solutions Architect** — a technical generalist who is strong across several areas rather than a single-track specialist. The areas he has confirmed real work in:

- Front-end and product design (Cognitive Science B.S., Design & Interaction; Figma configurators; shipped sites)
- Building and using AI tools (e.g. quoting and product-matching tools at Reotemp)
- Security work (specifics to be supplied by Jason before any claim is written)
- Infrastructure and self-hosting (runs his own servers for gaming and media sharing)

What a neighbouring portfolio can't copy: he bridges design, engineering, and business systems inside a real company — e.g. launching reotempintelligence.com with the company's first Stripe subscription integration, and moving the business platform from legacy systems to Odoo.

The current hero title "Full-Stack Engineer" predates this positioning and should be revisited.

## Operating Context

- Visitors usually come from a LinkedIn profile, a job application, or a résumé link; mobile is a primary context.
- Screeners compare him against other candidates for minutes or less; peers may read the experience section in full.
- The site is hosted on Vercel (project `portfolio-site`), deployed from the `master` branch of `shoepack/cdportfolio`; other branches get preview deployments.

## Capabilities and Constraints

- Stack: React 18 + Vite 7, Tailwind CSS 3, Framer Motion, plain JavaScript (no TypeScript), single page.
- Sections today: Navbar (logo, LinkedIn, GitHub), Hero (name, title, intro, About Me, portrait), Technical Skills, Experience, Contact (details + EmailJS-powered message form).
- Contact form sends through EmailJS using `VITE_EMAILJS_*` environment variables set in Vercel.
- React Bits Pro (Ultimate license) is available for components and blocks; it targets TypeScript and Tailwind 4, so adopting it may require upgrading the stack.
- **Projects are intentionally removed.** They are college-era work; for a second job, employers care about jobs and what he did at them. Do not bring the Projects section back as filler.
- Open: a résumé exists in Jason's Google Drive but is not yet on the site.

## Evidence on Hand

- Experience: Software Product Specialist, Reotemp Instruments (Aug 2024 – present); Math & Computer Science Tutor, MiraCosta College (Aug–Dec 2020). Copy in `src/constants/index.js`, logos in `public/`.
- Education: B.S. Cognitive Science (Design & Interaction), UC San Diego, 2024, Cum Laude.
- Portrait: `src/assets/portrait-1.jpg` (6.5 MB; also `sanDiego-2.jpg`).
- Contact: contact@jasonartley.com, LinkedIn `linkedin.com/in/jasonartley`, GitHub `github.com/shoepack`, San Diego, CA.
- Résumé: in Google Drive (to be located and linked).
- **Absent — do not fabricate:** testimonials, metrics or outcome numbers, certifications, employer names beyond those listed, and any specifics of his security, AI, or infrastructure work beyond what is written above.

## Product Principles

1. **Jobs are the proof.** Lead with what he did at each job and its outcome, not school projects or skill lists.
2. **Legible in seconds.** A recruiter on a phone should get who he is, what role he fits, and how to reach him within the first screen.
3. **Generalist, made concrete.** Show breadth through specific work in each area, never through a wall of buzzwords or logos.
4. **One obvious next step.** LinkedIn, email, and résumé are always within reach; the contact form supports them and doesn't compete.
5. **The site is a work sample.** Its own craft and performance are evidence of his front-end and design skill.
