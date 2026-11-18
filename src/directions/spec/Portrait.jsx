import { PERSON, PORTRAIT, EDUCATION, srcset } from "@/shared/profile";
import { DimensionLine } from "./parts.jsx";

// Rendered image width, not box width: on large screens the 4:5 box crops a
// 3:2 photo, so the image is drawn at 1.5x the box height.
const SIZES = "(min-width: 1024px) min(70vw, 920px), calc(100vw - 2.75rem)";

// "UCSD Cog Sci '24", restated from EDUCATION.
const SCHOOL_SHORT = EDUCATION.school.includes("San Diego") ? "UCSD" : EDUCATION.school;
const DEGREE_SHORT = EDUCATION.degree.includes("Cognitive Science") ? "Cog Sci" : EDUCATION.degree;
const CALLOUT = `${SCHOOL_SHORT} ${DEGREE_SHORT} ’${EDUCATION.end.slice(-2)}`;

function Leader({ points, className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <polyline points={points} fill="none" stroke="var(--color-paper)" strokeWidth="3" strokeOpacity="0.75" vectorEffect="non-scaling-stroke" />
      <polyline points={points} className="dim" />
    </svg>
  );
}

export default function Portrait() {
  return (
    <figure className="m-0">
      <div className="border border-ink bg-paper p-1.5">
        <div className="portrait-box relative overflow-hidden bg-fill">
          <picture>
            <source type="image/avif" srcSet={srcset(PORTRAIT.sources.avif)} sizes={SIZES} />
            <source type="image/webp" srcSet={srcset(PORTRAIT.sources.webp)} sizes={SIZES} />
            <img
              src={PORTRAIT.fallback}
              srcSet={srcset(PORTRAIT.sources.jpg)}
              sizes={SIZES}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              alt={PORTRAIT.alt}
              fetchpriority="high"
              decoding="async"
              className="portrait-img absolute inset-0 size-full object-cover"
            />
          </picture>

          {/* Callout: a shelf under the label, then a leader to the subject. */}
          <Leader points="3,23 37,23 44,64" className="lg:hidden" />
          <Leader points="4,10.5 30,10.5 39.6,58" className="hidden lg:block" />
          <span className="portrait-dot" aria-hidden="true" />
          <span className="portrait-chip label" aria-hidden="true">
            {CALLOUT}
          </span>
        </div>
      </div>
      <DimensionLine label={PERSON.location} className="mt-2" />
      <figcaption className="sr-only">
        {PERSON.name}. {EDUCATION.degree}, {EDUCATION.school}, {EDUCATION.end.slice(-4)}. Based in {PERSON.location}.
      </figcaption>
    </figure>
  );
}
