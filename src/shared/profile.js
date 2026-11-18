// Single source of truth for every fact the site states.
// Everything here is confirmed by Jason's 2026 resume or PRODUCT.md.
// Do not add numbers, employers, or claims that are not listed here.

export const PERSON = {
  name: "Jason Artley",
  role: "Solutions Architect",
  location: "San Diego, CA",
  email: "contact@jasonartley.com",
  linkedin: "https://www.linkedin.com/in/jasonartley/",
  linkedinLabel: "linkedin.com/in/jasonartley",
  github: "https://github.com/shoepack",
  resume: "/Jason_Artley_Resume.pdf",
};

// Hero proof sentence, rendered with the outcome phrase emphasized.
export const INTRO = {
  text: "As Software Product Specialist at Reotemp Instruments, I built reotempintelligence.com as its sole developer, including the company's first Stripe subscription product. I also built Reotemp's AI quoting and product-matching tools.",
  emphasis: "built reotempintelligence.com as its sole developer",
};

export const SUMMARY =
  "A generalist across product design, front-end, AI tooling, business systems, and security. Cognitive Science (Design & Interaction) graduate, UC San Diego, with Cum Laude honors.";

export const PORTRAIT = {
  alt: "Jason Artley sitting outdoors among green foliage, smiling",
  width: 3960,
  height: 2640,
  // Responsive sources, widest last.
  sources: {
    avif: [640, 1080, 1600].map((w) => ({ src: `/img/portrait-${w}.avif`, w })),
    webp: [640, 1080, 1600].map((w) => ({ src: `/img/portrait-${w}.webp`, w })),
    jpg: [640, 1080, 1600].map((w) => ({ src: `/img/portrait-${w}.jpg`, w })),
  },
  fallback: "/img/portrait-1080.jpg",
};

export const srcset = (list) => list.map(({ src, w }) => `${src} ${w}w`).join(", ");

export const EXPERIENCE = [
  {
    id: "reotemp",
    role: "Software Product Specialist",
    company: "Reotemp Instruments",
    companyUrl: "https://reotemp.com/",
    location: "San Diego, CA",
    start: "Aug 2024",
    end: "Present",
    logo: { src: "/img/reotemp-logo.webp", fallback: "/img/reotemp-logo.png", width: 330, height: 144 },
    summary:
      "Product, design, and engineering for an industrial instruments manufacturer: storefront, configurators, AI tools, the business platform, and the infrastructure under it.",
    // Each win is phrased as problem → what I did → result, so any direction
    // can render it as a worked problem, a spec row, or a plain bullet.
    wins: [
      {
        id: "stripe",
        lead: true,
        short: "reotempintelligence.com",
        area: "business",
        title: "Built reotempintelligence.com as its sole developer",
        problem: "Reotemp's IoT smart probe had no home online and no way to sell a subscription.",
        action:
          "As the sole developer, I built and launched reotempintelligence.com and led the company's first Stripe integration. Customers configure a system, get a priced quote by email, sign it and pay; Reotemp staff use a protected dashboard to review quotes, build custom quotes, manage pricing and follow up on past-due invoices. It also holds the resource library for the Intelligence product line, and I contributed to the product's software.",
        result: "The company's first subscription product, live and used by customers and the sales team.",
        link: { href: "https://reotempintelligence.com/", label: "reotempintelligence.com" },
        tools: ["Vercel", "JavaScript", "Supabase", "Stripe"],
        diagram: "rti",
      },
      {
        id: "wakecalc",
        short: "Wake frequency calculator",
        area: "systems",
        title: "Turned an engineering spreadsheet into a public calculator",
        problem:
          "An engineer's thermowell wake-frequency calculator, based on the ASME PTC 19.3 TW-2016 standard, lived in a Google Sheets prototype.",
        action:
          "Learned the thermowell product, then worked with engineers to turn it into a standalone site whose calculation service also powers the thermowell configurator on reotemp.com. I set up the site on Vercel, iterated on it rapidly, and worked on the front-end form, the back-end calculation engine and API, and the customer PDF reports. When a design fails and the engine can't find a fix, it asks OpenAI for suggestions; a batch mode checks up to 500 wells from an Excel workbook.",
        result: "A free public tool that checks a thermowell design against each of the standard's four criteria and produces a PDF report.",
        link: { href: "https://www.wakefrequencycalc.com/", label: "wakefrequencycalc.com" },
        tools: ["Vercel", "Python", "OpenAI"],
        diagram: "wfc",
      },
      {
        id: "configurators",
        short: "Configurators",
        area: "design",
        title: "Designed product configurators and portal redesigns",
        problem: "Sales staff and customers needed a clearer way to configure products and use the customer portal.",
        action:
          "Mocked up configurator updates and customer-portal redesigns in Figma with engineering and leadership, ran the work from my own Jira Kanban board, and led stakeholder user testing.",
        result: "About 95% of designs shipped.",
        metric: { value: "~95%", label: "of designs shipped" },
        tools: ["Figma", "Jira"],
      },
      {
        id: "quoting",
        lead: true,
        short: "AI quoting assistant",
        area: "ai",
        title: "Built an AI quoting assistant",
        problem: "Products without a configurator had to be priced by hand from an internal pricing sheet.",
        action:
          "Sales enters a part number; the app splits it into segments, matches them against the pricing sheet, and returns a price and description in a chat interface.",
        result: "Instant quotes for products with no configurator.",
        tools: [],
      },
      {
        id: "matching",
        short: "Gauge-matching tool",
        area: "ai",
        title: "Built a customer-facing gauge-matching tool",
        problem: "Customers knew the pressure range they needed, not which gauge to order.",
        action:
          "An AI tool that matches a required pressure range to an exact pre-configured gauge, or routes the customer to a salesperson when nothing matches.",
        result: "Runs on a lightweight model at a fraction of a cent per request.",
        tools: [],
      },
      {
        id: "odoo",
        short: "Odoo migration",
        area: "systems",
        title: "Moved the business onto Odoo",
        problem: "The company ran on Sage plus a custom CRM.",
        action:
          "Helped move it onto Odoo as its single business platform: reviewing legacy PHP, proposing modern replacements, and writing custom Python that adapts Odoo to company workflows.",
        result: "One business platform instead of two legacy systems.",
        tools: ["Odoo", "Python", "PHP"],
      },
      {
        id: "metrics",
        short: "CEO metrics report",
        area: "systems",
        title: "Turned the CEO's metric ideas into a daily report",
        problem: "Leadership wanted to track the numbers tied to company bonuses.",
        action:
          "Partnered with the CEO to turn his metric ideas into Python queries and reports, then built a daily company slideshow of bonus-linked metrics.",
        result: "Revenue, shipping speed, and overall performance in front of the company every day.",
        tools: ["Python"],
      },
      {
        id: "uptime",
        lead: true,
        short: "Security and uptime",
        area: "security",
        title: "Improved site security and uptime",
        problem: "The site went down one to two times a week and had SQL injection vulnerabilities.",
        action:
          "Worked with the senior developer to patch SQL injection vulnerabilities, linked server-load spikes to marketing email sends, and led adoption of Cloudflare for caching and filtering malicious traffic.",
        result: "Outages fell from 1–2 a week to about one every six months.",
        metric: { value: "1–2/wk → ~1 per 6 mo", label: "site outages" },
        tools: ["Cloudflare"],
      },
    ],
  },
  {
    id: "miracosta",
    role: "Computer Science Tutor",
    company: "MiraCosta College",
    companyUrl: "https://www.miracosta.edu/",
    location: "STEM Tutoring",
    start: "Aug 2020",
    end: "Dec 2020",
    logo: { src: "/img/miracosta-logo.webp", fallback: "/img/miracosta-logo.png", width: 222, height: 144 },
    summary:
      "One-on-one and group tutoring for 50+ students across Python, Java, C++, and Assembly; built supplemental exercises; tutored math when the department needed it.",
    wins: [],
  },
];

export const EDUCATION = {
  school: "University of California, San Diego",
  degree: "B.S., Cognitive Science",
  focus: "Specialization in Design & Interaction",
  honors: "Cum Laude honors",
  gpa: "3.9",
  start: "Sep 2022",
  end: "Jun 2024",
};

// The job-backed "areas" strip. Each area points at real wins above.
// The job-backed "areas" index. Each area links to the specific wins above.
export const AREAS = [
  { id: "design", name: "Product & front-end design", wins: ["configurators", "stripe", "wakecalc"] },
  { id: "ai", name: "AI tools", wins: ["quoting", "matching"] },
  { id: "business", name: "Business systems", wins: ["stripe", "odoo", "metrics"] },
  {
    id: "security",
    name: "Security, reliability & infrastructure",
    wins: ["uptime"],
    note: "I also run my own servers for gaming and media sharing.",
  },
];

export const SKILLS = {
  "Languages & databases": ["Python", "PHP", "JavaScript", "HTML/CSS", "React", "MySQL", "PostgreSQL (Supabase)"],
  "Product & design": ["Figma", "Jira", "User testing", "Product configurators", "IoT products"],
  "Platforms & tools": ["Git/GitHub", "Stripe", "Cloudflare", "WordPress", "Odoo", "Linux", "phpMyAdmin"],
  "AI tools": ["Claude", "OpenAI API", "OpenRouter", "AI coding agents"],
};
