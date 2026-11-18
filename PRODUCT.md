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
- Security and reliability (patched SQL injection vulnerabilities with the senior developer; led Cloudflare adoption for caching and malicious-traffic filtering)
- Infrastructure and self-hosting (Linux, Cloudflare; runs his own servers for gaming and media sharing)
- Data and reporting (turned the CEO's metric ideas into Python queries, reports, and a daily company metrics slideshow)

What a neighbouring portfolio can't copy: he bridges design, engineering, and business systems inside a real company — e.g. launching reotempintelligence.com with the company's first Stripe subscription integration, and moving the business platform from legacy systems to Odoo.

The current hero title "Full-Stack Engineer" predates this positioning and should be revisited.

## Operating Context

- Visitors usually come from a LinkedIn profile, a job application, or a résumé link; mobile is a primary context.
- Screeners compare him against other candidates for minutes or less; peers may read the experience section in full.
- The site is hosted on Vercel (project `portfolio-site`), deployed from the `master` branch of `shoepack/cdportfolio`; other branches get preview deployments.

## Capabilities and Constraints

- Stack: React 18 + Vite 7, Tailwind CSS 4 (Vite plugin), JavaScript with TypeScript support enabled (for React Bits Pro components), `@/` alias to `src/`. Facts live in `src/shared/profile.js`; contact behaviour in `src/shared/useContactForm.js`.
- Sections today: Navbar (logo, LinkedIn, GitHub), Hero (name, title, intro, About Me, portrait), Technical Skills, Experience, Contact (details + EmailJS-powered message form).
- Contact form sends through EmailJS using `VITE_EMAILJS_*` environment variables set in Vercel.
- React Bits Pro (Ultimate license) is configured in `components.json`; the license key is injected by the cloud environment's proxy (`.env.local` holds a placeholder).
- **Projects are intentionally removed.** They are college-era work; for a second job, employers care about jobs and what he did at them. Do not bring the Projects section back as filler.
- Gauge-style stat dials were considered and rejected by Jason as corny for a two-year, one-company career; present numbers in text.
- Résumé is published at `/Jason_Artley_Resume.pdf`, exported from the 2026 Google Doc with the phone number removed (Jason's decision). Re-export when the Doc changes.

## Evidence on Hand

- Experience: Software Product Specialist, Reotemp Instruments (Aug 2024 – present); Math & Computer Science Tutor, MiraCosta College (Aug–Dec 2020). Copy in `src/constants/index.js`, logos in `public/`.
- Education: B.S. Cognitive Science (Design & Interaction), UC San Diego, 2024, Cum Laude.
- Portrait: `src/assets/portrait-1.jpg` (6.5 MB; also `sanDiego-2.jpg`).
- Contact: contact@jasonartley.com, LinkedIn `linkedin.com/in/jasonartley`, GitHub `github.com/shoepack`, San Diego, CA.
- Résumé: Google Doc `Jason_Artley_Resume_2026` (Drive, edited Oct 2026). It is the source of truth for the claims below. Its header includes a phone number; do not publish the phone number on the site without Jason's explicit OK.
- Résumé-confirmed facts usable on the site:
  - Reotemp: built and launched reotempintelligence.com and led the company's first Stripe integration (its first subscription product); contributes to the product's software.
  - Reotemp: designed product configurators and customer-portal redesigns in Figma, ran his own Jira Kanban, led stakeholder user testing; **about 95% of designs shipped**.
  - Reotemp: built an AI quoting assistant (part number → segments → matched to internal pricing sheet → price and description in a chat UI).
  - Reotemp: built a customer-facing AI tool matching a pressure range to an exact pre-configured gauge, or routing to sales; runs on a lightweight model at a fraction of a cent per request.
  - Reotemp: helped move the company off Sage and a custom CRM onto Odoo; reviews legacy PHP, writes custom Python for Odoo workflows.
  - Reotemp: partnered with the CEO on Python metric queries/reports and a daily slideshow of bonus-linked metrics.
  - Reotemp: patched SQL injection vulnerabilities, linked server-load spikes to marketing email sends, led Cloudflare adoption; **outages fell from 1–2 a week to about 1 a month**.
  - Reotemp (confirmed by Jason, not yet on the résumé): took an engineer's Google Sheets thermowell wake-frequency calculator (ASME 19.3) to a standalone public site, wakefrequencycalc.com, and later into reotemp.com's thermowell configurator; set up and iterated the site on Vercel, worked with engineers on the front-end form, the back-end engine/API, and customer PDF reports.
  - Public work that may be shown as screenshots: reotempintelligence.com and wakefrequencycalc.com. Everything else (Figma, internal tools, metrics) is under NDA; show it only as clearly labelled illustrations.
  - MiraCosta: tutored **50+ students** across Python, Java, C++, and Assembly; also tutored math.
  - UCSD: **GPA 3.9**, Cum Laude, Sep 2022 – Jun 2024.
  - Skills: Python, PHP, JavaScript, HTML/CSS, React, MySQL, PostgreSQL (Supabase); Figma, Jira; Git/GitHub, Stripe, Cloudflare, WordPress, Odoo, Linux, phpMyAdmin; Claude, OpenAI API, OpenRouter, AI coding agents.
- **Absent — do not fabricate:** testimonials, certifications, employer names beyond those listed, and any numbers or claims not on the résumé above.

## Product Principles

1. **Jobs are the proof.** Lead with what he did at each job and its outcome, not school projects or skill lists.
2. **Legible in seconds.** A recruiter on a phone should get who he is, what role he fits, and how to reach him within the first screen.
3. **Generalist, made concrete.** Show breadth through specific work in each area, never through a wall of buzzwords or logos.
4. **One obvious next step.** LinkedIn, email, and résumé are always within reach; the contact form supports them and doesn't compete.
5. **The site is a work sample.** Its own craft and performance are evidence of his front-end and design skill.
