---
name: Jason Artley
description: A calm, light, typographic personal site whose proof is real, public work.
colors:
  paper: "#f7f6f2"
  raised: "#fdfcfa"
  white: "#ffffff"
  ink: "#171716"
  muted: "#62615b"
  line: "#e3e1da"
  field: "#8c8a82"
  pine: "#1f6b45"
  pine-deep: "#17573a"
  pine-wash: "#dbe8df"
  danger: "#a8321c"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.625rem, 1.7rem + 3.6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  role:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1rem + 0.6vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.015em"
  title-sm:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"kern\", \"liga\""
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.375
  caption:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.375
  numeral:
    fontFamily: "Red Hat Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "\"tnum\""
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  bubble: "16px"
  window: "18px"
  full: "9999px"
spacing:
  gutter-phone: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  container: "68rem"
  measure: "44rem"
  label-rail: "13rem"
  section-gap-phone: "48px"
  section-gap-tablet: "96px"
  section-gap-desktop: "112px"
  section-top-phone: "40px"
  section-top-tablet: "64px"
  section-top-desktop: "80px"
components:
  button-primary:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 18px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.pine-deep}"
  button-secondary:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 18px"
    height: "48px"
  contact-bar-button:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "0 6px"
    height: "44px"
  disclosure-toggle:
    textColor: "{colors.pine}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "44px"
  tool-chip:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "0 10px"
    height: "28px"
  page-pill:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
    height: "44px"
  page-pill-active:
    backgroundColor: "{colors.pine-wash}"
    textColor: "{colors.ink}"
  site-tab-active:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "44px"
  icon-tile:
    backgroundColor: "{colors.pine-wash}"
    textColor: "{colors.pine}"
    rounded: "{rounded.lg}"
    size: "36px"
  figure-panel:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.xl}"
    padding: "16px"
  input-text:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "48px"
---

# Design System: Jason Artley

## Overview

**Creative North Star: "The Category Standard, Played Straight"**

A personal site that looks like the best version of what a careful engineer's site should look like: warm off-white paper, near-black ink, one grey, and one pine-green accent taken from the foliage in the portrait. Proof comes from real, public work (live screenshots of the two public sites, public-safe architecture diagrams, a labelled illustration of an internal tool), never from decoration. The page is typographic first: one grotesque does every job, hairlines do the structuring, and colour is reserved for what can be clicked.

Density is calm and editorial. Sections sit in a two-column frame on desktop (a sticky section title rail beside a single reading column) and collapse to one column on phones, where the first screen must carry name, role, proof line and the Resume, Email and LinkedIn actions. The world refuses the dark developer-portfolio template (glow, gradient titles, logo walls) and any themed costume. Motion is a single authored moment: the hero settles in once on load.

This world is the standing-exit canon direction (seed `12619c66cff89c54`), chosen by Jason after comparing three built directions and documented from the shipped build.

**Key Characteristics:**
- Light only (`color-scheme: light`); warm paper ground, never pure white as the page.
- One accent, pine, used for links, the primary action and the selected state.
- One sans family for everything; the mono face is confined to numerals and dates.
- Hairline rules and tonal panels for structure; almost no shadow.
- Feather line icons for UI, brand marks only on tool chips and architecture-diagram nodes, real logos only on jobs.
- The hero is the only thing that animates on its own.

## Colors

A restrained, warm neutral palette with a single deep green accent; every text pairing clears WCAG AA.

### Primary
- **Portrait Pine** (pine): inline links, the primary action fill, the "How I did it" toggle, the focus ring, the caret and the "sent" form status. 5.98:1 on paper; white on pine is 6.47:1.
- **Deep Pine** (pine-deep): hover and pressed state for every pine element. White on it is 8.53:1.
- **Pine Wash** (pine-wash): text selection, icon tiles, the active page pill, quoting segment chips, and (at 50%) the host panel of architecture diagrams. Pine text on it is 5.12:1; ink on it is 14.2:1.

### Neutral
- **Warm Paper** (paper): the page, the phone contact bar (at 95% with a light blur) and the browser theme colour.
- **Raised Paper** (raised): form fields, secondary buttons, tool chips, the site tablist track, figure panels and contact-row hover.
- **Plain White** (white): text on pine, and the innermost layer inside raised figures (diagram nodes, the active site tab, the quote bubble). Never the page ground.
- **Ink** (ink): headings, body emphasis, field text. 16.59:1 on paper.
- **Stone Grey** (muted): secondary text, intros, captions, dates, placeholders, nav links at rest, UI icons. 5.74:1 on paper, 6.06:1 on raised.
- **Hairline** (line): section rules, list dividers, chip and panel borders, logo rings. Decorative only (1.21:1); it never carries meaning alone.
- **Field Stroke** (field): form field borders at full strength (3.2:1 on paper, 3.37:1 on raised) and secondary button borders at 50%.

### Semantic
- **Brick** (danger): field error text, invalid field borders and their focus ring, the failed-send alert. 6.19:1 on paper.

### Named Rules
**The One Accent Rule.** Pine is the only hue. It marks what can be acted on or what is selected; it is never a background wash for a whole section and never decoration.

**The Warm Paper Rule.** The page is paper (#f7f6f2), not white. White appears only as the innermost layer inside a raised panel, or as text on pine.

## Typography

**Display Font:** Schibsted Grotesk (with ui-sans-serif, system-ui), self-hosted variable 400 to 900
**Body Font:** Schibsted Grotesk
**Label/Mono Font:** Red Hat Mono (with ui-monospace, SFMono-Regular, Menlo), self-hosted variable 300 to 700, numerals only

**Character:** One confident news-grotesque does display, text and UI, tightened with negative tracking as size grows. Red Hat Mono appears in small doses to make dates and figures read as data.

### Hierarchy
- **Display** (600, fluid 42px to 72px, 1.02, -0.035em): the name as h1, once per page.
- **Role line** (500 ink + 400 muted, fluid 19px to 24px, 1.375, -0.01em): role and location under the name.
- **Headline** (600, 28px, 26px at desktop where it sits in the sticky rail, 1.25, -0.025em): section titles.
- **Title** (600, 21px, -0.015em): lead job entries. **Title small** (600, 19px, -0.012em): lead wins and the "Also at Reotemp" subhead. Compact entries and shorter wins step down to 18px and 17px at 600.
- **Body** (400, 17px, 1.6): all reading text; intros and results in muted, emphasised outcome phrases in 600 ink. Hero lede steps up to 19px from the tablet breakpoint. Reading measure tops out at 44rem (hero lede 34rem).
- **Label** (500, 15px): buttons, nav links, form labels, the disclosure toggle, link rows.
- **Caption** (400 to 500, 13px; 12px for figure captions and diagram sub-lines): chip text, diagram node text, figure titles and NDA captions.

Headings use balanced wrapping; paragraphs and list items use pretty wrapping. Typographic apostrophes are applied to profile copy at display time.

### Named Rules
**The Mono Is Data Rule.** Red Hat Mono (with tabular numerals) is allowed only for dates and date ranges, figures (the GPA, prices, the character counter, the copyright year) and part-number codes. Never for headings, labels, nav or prose.

**The Emphasis Is Weight Rule.** Outcomes are emphasised by setting the existing phrase in 600 ink inside muted text; the words are never reworded, recoloured in pine, or enlarged into stat callouts.

## Layout

A centred container of 68rem with side gutters of 16px (phone), 24px (from 640px) and 32px (from 1024px). Main sections are separated by 48px, 96px and 112px at those breakpoints; each section opens with a full-width hairline and 40px, 64px or 80px of top padding.

From 1024px each section is a two-column grid: a 13rem title rail (the h2 sticks 32px from the top) and a content column capped at 44rem, 48px apart. Below that everything is one column with 24px between title and content. The hero is a 12-column grid at desktop (7 text, 5 portrait, 48px gap; portrait 4:5), and stacks on phones with the portrait at 3:2 below the actions.

Lists of wins, areas and contact rows are divided by hairlines rather than boxed. Lead wins breathe at 28px to 32px vertical padding; shorter wins and area rows at 20px.

Phones (below 640px): nav drops the name and the desktop-only Areas link; the Resume button spans both columns above Email and LinkedIn; a fixed contact bar appears once the hero actions scroll away and hides at Contact, and scroll padding grows to 6rem so focused controls stay clear of it. The browser window switches to phone-captured screenshots at a 0.82 aspect ratio (1.6 on larger screens).

## Elevation & Depth

Flat by default. Depth comes from tonal layering (paper, then raised, then white) and hairline borders. Shadows are few, soft and ambient, never offset or hard.

### Shadow Vocabulary
- **Field rest** (`box-shadow: 0 1px 2px rgb(23 23 22 / 0.04)`): form inputs, a hint of press-in surface.
- **Selected tab** (`box-shadow: 0 1px 2px rgb(23 23 22 / 0.08)` plus a 1px line ring): the active site tab lifting out of its track.
- **Showcase** (`box-shadow: 0 1px 2px rgb(23 23 22 / 0.06), 0 12px 32px -12px rgb(23 23 22 / 0.18)`): the browser window only, the single object on the page that floats.

### Named Rules
**The One Floating Object Rule.** Only the browser-window showcase carries a lifted shadow. Every other surface is defined by tone and hairline.

## Shapes

Gently rounded and consistent. Controls, fields, icon tiles, logos and diagram nodes use 8px; small inline targets (nav links, the disclosure toggle, contact rows, quoting segments) use 6px; figure panels, the tablist track and the portrait use 12px; the browser window uses 18px. Chips and page pills are fully round. The quote bubble is 16px with a 2px tail corner at bottom left, the one asymmetric shape. Borders are 1px hairlines; pine borders appear only at 30% around the active pill and the diagram host panel.

## Components

### Buttons
Solid and plain: full-width on phones, content-width from 640px.
- **Shape:** gently rounded (8px), at least 48px tall, 18px side padding, 15px medium label, 8px icon gap.
- **Primary:** pine fill, white label; used for Resume (PDF) and Send message. Only one primary per group.
- **Secondary:** raised fill, ink label, field stroke at 50%; the icon is muted. Used for Email and LinkedIn beside the primary.
- **Hover / Active:** primary darkens to deep pine; secondary border firms to ink at 60%. Both nudge down 1px on press. 150ms transitions.
- **Disabled:** the submit button drops to pine at 70% with a progress cursor while sending.
- **Icons:** Feather download, mail and LinkedIn, at 1.05em, always `aria-hidden`.

### Phone contact bar
A thumb-reach bar for phones only: Resume, Email, LinkedIn in three equal cells.
- **Surface:** fixed to the bottom, paper at 95% with a light backdrop blur, hairline top border, bottom padding respects the safe-area inset.
- **Cells:** 44px tall, 8px radius, 14px medium labels; Resume in pine, the others secondary.
- **Behaviour:** slides up (320ms, ease-out-expo) once the hero actions leave the viewport and stays hidden while Contact is on screen; when hidden it is `inert` and `aria-hidden`. If large text would overflow a cell, labels collapse to icons and stay available to screen readers. Under reduced motion it appears without sliding.

### Chips
- **Tool chips:** fully round, 28px tall, raised fill, hairline border, 13px muted text, with the tool's brand mark at 14px in ink at 70%. Every tool named on a win has a mark so the set stays uniform. Static, not interactive.
- **Page pills** (browser-window page picker): fully round, 44px tall, 14px medium. Rest: raised fill, hairline border, muted text; hover firms border to field and text to ink. Active (`aria-pressed`): pine wash fill, pine border at 30%, ink text.

### Site tabs
A segmented control above the showcase: a raised track with a hairline border and 4px inset, 12px radius. Tabs are 44px tall, 14px medium; the selected tab is white with ink text, a line ring and the selected-tab shadow; others are muted and firm to ink on hover. Phones show the short site name, larger screens the domain. Full ARIA tabs pattern with arrow, Home and End keys.

### "How I did it" disclosure
The written detail of a win sits behind a text toggle: pine, 15px medium, 44px target, with a Feather chevron that rotates 180 degrees (200ms) when open; the label reads "Hide details" when open and carries a screen-reader suffix naming the win. Lead wins collapse on phones only (always open from 640px, where the toggle is hidden); the shorter "Also at Reotemp" wins collapse at every width. Visuals and tool chips of lead wins stay outside the toggle so phones keep them.

### Architecture diagram
A public-safe overview of each public site, visible by default in Experience.
- **Frame:** a figure panel (raised, hairline, 12px radius, 16px to 20px padding) with a 13px medium muted title and a 12px muted caption.
- **Flow:** top to bottom with muted Feather down-arrows: users as white 8px-radius nodes, then the host panel (pine wash at 50%, pine border at 30%, 12px radius) carrying the domain with a Vercel mark, a stack line and the parts as white-at-80% tiles in a two-column grid from 640px, then service nodes with brand marks, name in medium ink and role in muted.
- **Content limit:** who uses the site, what it does and the named services only.

### Quoting strip
A single-line illustration of the internal AI quoting assistant. Part-number segments sit in pine-wash chips (mono, 14px medium pine, 6px radius) with 12px muted labels beneath, joined by hyphens; an arrow (right on larger screens, down on phones) leads to a white chat-bubble reply with the price in mono. Its caption states that the part number and price are illustrative and the tool is internal.

### Browser-window showcase (signature)
The vendored React Bits Pro Browser Window, configured light: compact chrome, inset frame, monochrome window dots, window colour #efeee8, text #3d3c38, muted #62615b, pine accent, 18px radius, cover fit, fade transition, 5.2s dwell. It clicks through live screenshots of the two public sites, phone captures on phones. Back, forward and pause/play buttons draw a 30px chip inside a 44px target. Autoplay pauses on hover, focus, press and when off screen; once the visitor pauses or steps through pages it stays off across both sites. Under reduced motion it never autoplays and swaps pages without the typing or fade effect. Below it: the page pills, a muted blurb, and "Details" and "Visit site" links.

### Inputs / Fields
- **Style:** raised fill, 1px field stroke, 8px radius, 14px side padding, 16px ink text, field-rest shadow; text inputs 48px tall, the message area at least 144px and vertically resizable.
- **Labels:** 15px medium ink above the field; the message counter sits right of its label in mono 13px muted.
- **Hover / Focus:** border firms to ink at 55%; focus turns the border pine and draws a 2px pine outline 2px out.
- **Error:** border and focus outline turn brick; 14px brick message below, tied to the field.
- **Status:** a polite region (muted, or pine medium when sent) and an alert region (brick, with the email address as a link on failure) are always rendered, side by side with the submit button from 640px.

### Navigation
Text only: 15px, muted at rest, ink on hover, 44px targets, 6px radius. Desktop shows the name at left (15px semibold ink) and Work, Experience, Areas, Contact, Resume at right; phones show Work, Experience, Contact, Resume spread across one line. A skip link appears on focus as an ink pill with paper text.

### Contact rows and links
- **Inline links:** pine with a 1px underline at 35% pine, offset 0.22em; on hover the colour deepens and the underline goes solid (160ms). External links add a Feather up-right arrow and a "(opens in new tab)" screen-reader note.
- **Contact rows:** hairline-divided rows at least 56px tall: muted icon, a muted label (visible from 640px), and the value in medium pine; hover lays a raised tint behind the row.

### Logos and icon tiles
- **Logos:** real employer logos only, beside job entries, 36px tall (44px from 640px), 8px radius with a hairline ring.
- **Icon tiles:** 36px pine-wash squares, 8px radius, a faint pine inset ring, holding one Feather icon in pine; used only in the Areas index.

### Motion
- **Hero settle (load only):** name, role line, lede and actions rise 10px from blurred and transparent over 900ms on ease-out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`), staggered 70ms after a 60ms start; the portrait unclips from a 4% inset and settles from 102.5% scale over 800ms at 180ms. Content is visible by default; the animation runs only under `prefers-reduced-motion: no-preference`.
- **State transitions:** colour, border and press feedback at 150ms to 160ms; the chevron at 200ms; the contact bar at 320ms.
- **Nothing animates on scroll.** No reveals, parallax or counters. Under reduced motion smooth scrolling is also turned off.

## Do's and Don'ts

### Do:
- **Do** keep pine (#1f6b45) for links, the primary action, the focus ring and selection only, with deep pine (#17573a) for hover and press.
- **Do** build new surfaces from paper, raised and white in that order, divided by 1px hairlines (#e3e1da).
- **Do** set Red Hat Mono with tabular numerals for dates, figures and part numbers, and Schibsted Grotesk for everything else.
- **Do** give every interactive target at least 44px of height, and keep the 2px pine focus outline at a 3px offset.
- **Do** present numbers in sentences, emphasised by 600 ink weight, never as dials, gauges or stat widgets.
- **Do** write visible copy as "Resume" without accents, and describe past work in durable past tense ("built X as its sole developer").
- **Do** show only reotempintelligence.com and wakefrequencycalc.com as screenshots; anything else (Figma, internal tools, metrics, dashboards) appears only as a figure panel captioned as an illustration.
- **Do** keep architecture diagrams generic: users, what the site does, and the named services. No endpoints, file names, data model or security mechanics.
- **Do** keep the hero settle as the only load animation, and gate any motion behind `prefers-reduced-motion: no-preference`.
- **Do** pair every Feather icon used beside a label with `aria-hidden`, and keep brand marks to tool chips and architecture-diagram nodes.

### Don't:
- **Don't** introduce a dark theme, glow, gradient text, neon accents or a logo wall; this world is the refusal of that template.
- **Don't** add a second accent hue or tint whole sections in pine wash.
- **Don't** use pure white as the page ground.
- **Don't** animate anything on scroll, autoplay anything other than the pausable browser window, or count numbers up.
- **Don't** add lifted shadows beyond the browser-window showcase, and never hard offset shadows.
- **Don't** set headings, labels or prose in the mono face.
- **Don't** use brand marks as UI icons, or a second UI icon family alongside Feather.
- **Don't** add uppercase eyebrows or kickers above section titles; sections open with the hairline and the title.
- **Don't** bring back a Projects section or invent testimonials, certifications or figures not in the profile facts.
