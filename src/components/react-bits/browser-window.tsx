"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export interface BrowserPage {
  url: string;
  title?: string;
  src?: string;
  alt?: string;
  /** Live address of this page. When set, the viewport becomes a link to it (new tab). */
  href?: string;
  content?: ReactNode;
}

export interface BrowserWindowHandle {
  /** next / prev / goTo are treated as the visitor taking control: autoplay stops until play(). */
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reload: () => void;
  play: () => void;
  pause: () => void;
}

export interface BrowserWindowProps {
  pages?: BrowserPage[];
  url?: string;
  children?: ReactNode;
  chrome?: "compact" | "tabs";
  frame?: "solid" | "inset";
  dots?: "mono" | "color";
  theme?: "auto" | "light" | "dark";
  accentColor?: string;
  windowColor?: string;
  textColor?: string;
  /** Secondary chrome text (URL path, idle tabs, icons). Must hold 4.5:1 on the address field. */
  mutedColor?: string;
  radius?: number;
  aspect?: number;
  height?: number;
  fit?: "cover" | "contain";
  transition?: "blur" | "slide" | "fade";
  interval?: number;
  autoplay?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  typing?: boolean;
  loader?: boolean;
  scroll?: boolean;
  controls?: boolean;
  defaultPage?: number;
  /** Loading hint for the first screenshot. Later pages are preloaded before they are shown. */
  imageLoading?: "lazy" | "eager";
  /** Accessible name for the window. */
  label?: string;
  onPageChange?: (index: number) => void;
  onPlayingChange?: (playing: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

interface Palette {
  surface: string;
  frame: string;
  shadow: string;
  frameShadow: string;
  panel: string;
  bar: string;
  text: string;
  muted: string;
  accent: string;
  field: string;
  fieldEdge: string;
  hover: string;
  dot: string;
  divide: string;
}

interface Layer {
  key: number;
  index: number;
}

type NavMode = "auto" | "user" | "replay";

const SANS = 'var(--font-sans, ui-sans-serif), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

const SR_ONLY: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const DEFAULT_PAGES: BrowserPage[] = [
  { url: "atelier.studio", title: "Atelier", src: "https://pro.reactbits.dev/demo-media/architecture-pool.webp", alt: "Figure in black crossing a shallow pool before a tall cream wall" },
  {
    url: "atelier.studio/projects",
    title: "Projects",
    src: "https://pro.reactbits.dev/demo-media/architecture-ribbons.webp",
    alt: "White facade ribbons flowing in parallel waves",
  },
  {
    url: "atelier.studio/journal",
    title: "Journal",
    src: "https://pro.reactbits.dev/demo-media/architecture-drum.webp",
    alt: "Rounded white concrete drum against a bright blue sky",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const finite = (value: number | undefined, fallback: number) => (typeof value === "number" && Number.isFinite(value) ? value : fallback);

const splitUrl = (url: string) => {
  const clean = url.replace(/^https?:\/\//, "");
  const cut = clean.indexOf("/");
  return cut < 0 ? { host: clean, path: "" } : { host: clean.slice(0, cut), path: clean.slice(cut) };
};

const subscribeToMotion = (notify: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

const readMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const luminance = (color: string, probe: CanvasRenderingContext2D | null) => {
  if (!probe) return -1;
  probe.fillStyle = "#010203";
  probe.fillStyle = color;
  if (String(probe.fillStyle) === "#010203" && color.trim().toLowerCase() !== "#010203") return -1;
  probe.clearRect(0, 0, 1, 1);
  probe.fillRect(0, 0, 1, 1);
  const rgba = probe.getImageData(0, 0, 1, 1).data;
  if (rgba[3] / 255 < 0.5) return -1;
  const linear = (value: number) => {
    const v = value / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linear(rgba[0]) + 0.7152 * linear(rgba[1]) + 0.0722 * linear(rgba[2]);
};

const readBackdrop = (root: HTMLElement, probe: CanvasRenderingContext2D | null) => {
  let node: Element | null = root.parentElement;
  let view: Window | null = root.ownerDocument.defaultView;
  for (let hop = 0; hop < 4 && view; hop += 1) {
    while (node) {
      const color = view.getComputedStyle(node).backgroundColor;
      const value = luminance(color, probe);
      if (value >= 0) return { dark: value < 0.35, color };
      node = node.parentElement;
    }
    let frame: Element | null = null;
    try {
      frame = view.frameElement;
    } catch {
      frame = null;
    }
    if (!frame) break;
    node = frame.parentElement;
    view = frame.ownerDocument.defaultView;
  }
  const doc = root.ownerDocument;
  const html = doc.documentElement;
  const own = doc.defaultView ?? window;
  if (html.classList.contains("dark")) return { dark: true, color: null };
  if (html.classList.contains("light")) return { dark: false, color: null };
  const scheme = own.getComputedStyle(html).colorScheme;
  if (scheme === "dark" || scheme === "light") return { dark: scheme === "dark", color: null };
  return { dark: own.matchMedia("(prefers-color-scheme: dark)").matches, color: null };
};

// Secondary text follows the caller's colours when given: an explicit mutedColor wins, then a
// mix of textColor into the surface, and only then the built-in neutral (5.2:1 on the light frame).
const makePalette = (dark: boolean, accent?: string, surface?: string, text?: string, muted?: string): Palette => {
  if (dark) {
    const base = surface || "#111113";
    const ink = text || "#E7E7EA";
    return {
      surface: base,
      frame: `color-mix(in srgb, ${base} 94%, #ffffff)`,
      shadow: "0 0 0 1px rgba(255,255,255,0.07), 0 24px 60px -16px rgba(0,0,0,0.65)",
      frameShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -16px rgba(0,0,0,0.65)",
      panel: "inset 0 0 0 1px rgba(255,255,255,0.06)",
      bar: "rgba(255,255,255,0.025)",
      text: ink,
      muted: muted || (text ? `color-mix(in srgb, ${ink} 70%, ${base})` : "#9A9AA3"),
      accent: accent || "#A99BFF",
      field: "rgba(255,255,255,0.06)",
      fieldEdge: "rgba(255,255,255,0.05)",
      hover: "rgba(255,255,255,0.07)",
      dot: "rgba(255,255,255,0.14)",
      divide: "rgba(255,255,255,0.06)",
    };
  }
  const base = surface || "#FFFFFF";
  const ink = text || "#18181B";
  return {
    surface: base,
    frame: `color-mix(in srgb, ${base} 96%, #000000)`,
    shadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), 0 16px 40px -14px rgba(0,0,0,0.16)",
    frameShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 16px 40px -14px rgba(0,0,0,0.14)",
    panel: "inset 0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    bar: "rgba(0,0,0,0.022)",
    text: ink,
    muted: muted || (text ? `color-mix(in srgb, ${ink} 78%, ${base})` : "#66666E"),
    accent: accent || "#5227FF",
    // A raised field, lighter than the toolbar, so secondary text keeps its contrast.
    field: `color-mix(in srgb, ${base} 55%, #ffffff)`,
    fieldEdge: "rgba(0,0,0,0.06)",
    hover: "rgba(0,0,0,0.05)",
    dot: "rgba(0,0,0,0.12)",
    divide: "rgba(0,0,0,0.06)",
  };
};

type IconName = "back" | "forward" | "lock" | "pause" | "play" | "external";

const Icon = ({ name }: { name: IconName }) => {
  if (name === "lock")
    return (
      <svg width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
        <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
      </svg>
    );
  if (name === "external")
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 16 16 8" />
        <path d="M9 8h7v7" />
      </svg>
    );
  if (name === "pause")
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M9 6.5v11M15 6.5v11" />
      </svg>
    );
  if (name === "play")
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 6.2v11.6L18 12 8.5 6.2Z" />
      </svg>
    );
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={name === "back" ? "M15 5.5 8.5 12l6.5 6.5" : "M9 5.5l6.5 6.5L9 18.5"} />
    </svg>
  );
};

const BrowserWindow = forwardRef<BrowserWindowHandle, BrowserWindowProps>(function BrowserWindow(
  {
    pages = DEFAULT_PAGES,
    url,
    children,
    chrome = "compact",
    frame = "inset",
    dots = "mono",
    theme = "auto",
    accentColor,
    windowColor,
    textColor,
    mutedColor,
    radius = 16,
    aspect = 1.6,
    height,
    fit = "cover",
    transition = "blur",
    interval = 4600,
    autoplay = true,
    loop = true,
    pauseOnHover = true,
    pauseOnFocus = true,
    typing = true,
    loader = true,
    scroll = true,
    controls = true,
    defaultPage = 0,
    imageLoading = "lazy",
    label = "Browser window",
    onPageChange,
    onPlayingChange,
    className,
    style,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timersRef = useRef<number[]>([]);
  const tokenRef = useRef(0);
  const keyRef = useRef(1);
  const pageRef = useRef(0);
  const busyRef = useRef(false);
  const changeRef = useRef(onPageChange);
  const playingChangeRef = useRef(onPlayingChange);
  // Things that hold the autoplay clock without stopping autoplay.
  const holdRef = useRef({ hover: false, focus: false, press: false, visible: false });
  // setTimeout-based dwell clock: remaining time survives pauses.
  const clockRef = useRef({ handle: 0, startedAt: 0, remaining: 0 });
  const syncRef = useRef<() => void>(() => {});
  const jobsRef = useRef(new Map<string, Promise<void>>());
  const decodedRef = useRef(new Set<string>());
  const reduced = useSyncExternalStore(subscribeToMotion, readMotion, () => false);
  const single = children !== undefined && children !== null;
  const list = single ? [{ url: url ?? "localhost:3000", title: "", content: children } as BrowserPage] : pages.length ? pages : DEFAULT_PAGES;
  const count = list.length;
  const start = clamp(Math.round(finite(defaultPage, 0)), 0, count - 1);
  const dwell = Math.max(1800, finite(interval, 4600));
  const [layers, setLayers] = useState<Layer[]>([{ key: 0, index: start }]);
  const [active, setActive] = useState(start);
  const [typed, setTyped] = useState(list[start]?.url ?? "");
  const [caret, setCaret] = useState(false);
  const [progress, setProgress] = useState({ value: 0, visible: false, speed: 0 });
  const [dark, setDark] = useState(theme === "dark");
  const [playing, setPlaying] = useState(autoplay);
  const [width, setWidth] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [linkRing, setLinkRing] = useState(false);
  const [linkHot, setLinkHot] = useState(false);
  const listRef = useRef(list);
  const dwellRef = useRef(dwell);
  if (!clockRef.current.remaining) clockRef.current.remaining = dwell;

  useEffect(() => {
    changeRef.current = onPageChange;
    playingChangeRef.current = onPlayingChange;
    listRef.current = list;
    dwellRef.current = dwell;
  });

  useEffect(() => {
    pageRef.current = start;
    // Only the mount value matters; later page changes come from navigate().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPlaying(autoplay);
  }, [autoplay]);

  const firstPlaying = useRef(true);
  useEffect(() => {
    if (firstPlaying.current) {
      firstPlaying.current = false;
      return;
    }
    playingChangeRef.current?.(playing);
  }, [playing]);

  const later = useCallback((callback: () => void, wait: number) => {
    const view = rootRef.current?.ownerDocument.defaultView ?? window;
    const handle = view.setTimeout(() => {
      timersRef.current = timersRef.current.filter((item) => item !== handle);
      callback();
    }, wait);
    timersRef.current.push(handle);
  }, []);

  const clearTimers = useCallback(() => {
    const view = rootRef.current?.ownerDocument.defaultView ?? window;
    timersRef.current.forEach((handle) => view.clearTimeout(handle));
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // Fetch and decode a page's screenshot off-screen. Pages are only swapped in once this settles,
  // so a slow network shows the loader bar instead of a half-painted image.
  const ready = useCallback((index: number) => {
    const src = listRef.current[index]?.src;
    if (!src || decodedRef.current.has(src)) return Promise.resolve();
    const jobs = jobsRef.current;
    let job = jobs.get(src);
    if (!job) {
      const view = rootRef.current?.ownerDocument.defaultView ?? window;
      const image = new view.Image();
      image.decoding = "async";
      image.src = src;
      const decoding = typeof image.decode === "function" ? image.decode() : new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = reject;
      });
      job = decoding.then(
        () => {
          decodedRef.current.add(src);
        },
        () => {
          jobs.delete(src);
        },
      );
      jobs.set(src, job);
    }
    const view = rootRef.current?.ownerDocument.defaultView ?? window;
    return Promise.race([job, new Promise<void>((resolve) => view.setTimeout(resolve, 8000))]);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => setWidth(root.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const doc = root.ownerDocument;
    const view = doc.defaultView ?? window;
    if (theme !== "auto") {
      setDark(theme === "dark");
      return;
    }
    const probe = doc.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const measure = () => {
      setDark(readBackdrop(root, probe).dark);
    };
    const frames: number[] = [];
    const timers: number[] = [];
    const schedule = () => {
      frames.push(view.requestAnimationFrame(measure));
      timers.push(view.setTimeout(measure, 380));
    };
    schedule();
    timers.push(view.setTimeout(measure, 1200));
    const observer = new MutationObserver(schedule);
    const watch = (target: Document) => {
      observer.observe(target.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
      if (target.body) observer.observe(target.body, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
    };
    watch(doc);
    let outer: Element | null = null;
    try {
      outer = view.frameElement;
    } catch {
      outer = null;
    }
    if (outer) watch(outer.ownerDocument);
    return () => {
      observer.disconnect();
      frames.forEach((id) => view.cancelAnimationFrame(id));
      timers.forEach((id) => view.clearTimeout(id));
    };
  }, [theme]);

  const swap = useCallback(
    (index: number, token: number, user: boolean) => {
      if (token !== tokenRef.current) return;
      const key = keyRef.current++;
      pageRef.current = index;
      setActive(index);
      setLayers((current) => [...current.slice(-1), { key, index }]);
      changeRef.current?.(index);
      if (user) {
        const pagesNow = listRef.current;
        setAnnouncement(`Showing ${pagesNow[index]?.url ?? ""}, page ${index + 1} of ${pagesNow.length}`);
      }
      clockRef.current.remaining = dwellRef.current;
      const settle = reduced ? 0 : 700;
      later(() => {
        if (token !== tokenRef.current) return;
        setLayers((current) => current.filter((layer) => layer.key === key));
        busyRef.current = false;
        syncRef.current();
      }, settle + 40);
    },
    [later, reduced],
  );

  const navigate = useCallback(
    (target: number, mode: NavMode = "auto") => {
      const pagesNow = listRef.current;
      const total = pagesNow.length;
      if (!total) return;
      const replay = mode === "replay";
      const user = mode !== "auto";
      const index = ((Math.round(target) % total) + total) % total;
      if (index === pageRef.current && !replay) return;
      clearTimers();
      tokenRef.current += 1;
      const token = tokenRef.current;
      busyRef.current = true;
      syncRef.current();
      const from = pagesNow[pageRef.current]?.url ?? "";
      const to = pagesNow[index]?.url ?? "";
      const src = pagesNow[index]?.src;
      const cached = !src || decodedRef.current.has(src);
      const loaded = ready(index);
      const live = () => token === tokenRef.current;
      const complete = () => {
        later(() => {
          if (live()) setProgress({ value: 1, visible: true, speed: 260 });
        }, 0);
        later(() => {
          if (live()) setProgress((current) => ({ ...current, visible: false }));
        }, 300);
      };

      // Reduced motion, or the visitor asked for this page: no typing theatre, swap as soon as decoded.
      if (reduced || user) {
        setCaret(false);
        setTyped(to);
        if (reduced || cached || !loader) {
          setProgress((current) => ({ ...current, visible: false }));
          loaded.then(() => {
            if (live()) swap(index, token, user);
          });
          return;
        }
        setProgress({ value: 0, visible: true, speed: 0 });
        later(() => {
          if (live()) setProgress({ value: 0.72, visible: true, speed: 520 });
        }, 30);
        loaded.then(() => {
          if (!live()) return;
          swap(index, token, user);
          complete();
        });
        return;
      }

      let shared = 0;
      while (shared < from.length && shared < to.length && from[shared] === to[shared]) shared++;
      const erase = typing && !replay ? from.length - shared : 0;
      const write = typing && !replay ? to.length - shared : 0;
      let wait = 0;
      if (erase + write > 0) {
        setCaret(true);
        for (let k = 1; k <= erase; k++) {
          const text = from.slice(0, from.length - k);
          later(() => {
            if (live()) setTyped(text);
          }, (wait += 22));
        }
        wait += erase ? 90 : 0;
        for (let k = 1; k <= write; k++) {
          const text = to.slice(0, shared + k);
          later(() => {
            if (live()) setTyped(text);
          }, (wait += 34 + (to[shared + k - 1] === "/" ? 40 : 0)));
        }
        wait += 120;
        later(() => {
          if (live()) setCaret(false);
        }, wait);
      } else {
        setTyped(to);
      }
      const show = loader;
      if (show) {
        later(() => {
          if (live()) setProgress({ value: 0, visible: true, speed: 0 });
        }, wait);
        later(() => {
          if (live()) setProgress({ value: 0.72, visible: true, speed: 520 });
        }, wait + 30);
      }
      later(() => {
        loaded.then(() => {
          if (!live()) return;
          swap(index, token, false);
          if (show) complete();
        });
      }, wait + (show ? 560 : 120));
    },
    [clearTimers, later, loader, ready, reduced, swap, typing],
  );

  const advance = useCallback(() => {
    const total = listRef.current.length;
    if (!loop && pageRef.current >= total - 1) {
      setPlaying(false);
      return;
    }
    navigate(pageRef.current + 1);
  }, [loop, navigate]);

  const canAutoplay = count > 1 && !reduced && !single;
  const running = playing && canAutoplay;

  // The dwell clock. One setTimeout per page, armed only while the window is on screen, the tab is
  // visible, nothing holds it (hover, focus, press) and no page change is in flight.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const doc = root.ownerDocument;
    const view = doc.defaultView ?? window;
    const clock = clockRef.current;
    const hold = holdRef.current;
    const stop = () => {
      if (!clock.handle) return;
      view.clearTimeout(clock.handle);
      clock.handle = 0;
      clock.remaining = Math.max(0, clock.remaining - (view.performance.now() - clock.startedAt));
    };
    if (!running) {
      syncRef.current = () => {};
      return;
    }
    const sync = () => {
      const blocked =
        busyRef.current || doc.visibilityState === "hidden" || !hold.visible || hold.press || (pauseOnHover && hold.hover) || (pauseOnFocus && hold.focus);
      if (blocked) {
        stop();
        return;
      }
      if (clock.handle) return;
      const total = listRef.current.length;
      if (loop || pageRef.current < total - 1) void ready((pageRef.current + 1) % total);
      clock.startedAt = view.performance.now();
      clock.handle = view.setTimeout(() => {
        clock.handle = 0;
        clock.remaining = dwellRef.current;
        advance();
      }, Math.max(0, clock.remaining));
    };
    syncRef.current = sync;
    const observer = new IntersectionObserver(
      (entries) => {
        hold.visible = entries[entries.length - 1]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    doc.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      doc.removeEventListener("visibilitychange", sync);
      stop();
      syncRef.current = () => {};
    };
  }, [advance, loop, pauseOnFocus, pauseOnHover, ready, running]);

  const takeControl = useCallback(
    (target: number) => {
      setPlaying(false);
      navigate(target, "user");
    },
    [navigate],
  );

  useImperativeHandle(
    ref,
    () => ({
      next: () => takeControl(pageRef.current + 1),
      prev: () => takeControl(pageRef.current - 1),
      goTo: (index: number) => takeControl(index),
      reload: () => navigate(pageRef.current, "replay"),
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
    }),
    [navigate, takeControl],
  );

  const enter = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || node.dataset.played) return;
      node.dataset.played = "1";
      if (reduced || node.dataset.initial || typeof node.animate !== "function") return;
      const frames: Keyframe[] =
        transition === "slide"
          ? [
              { opacity: 0, transform: "translateX(5%)" },
              { opacity: 1, transform: "translateX(0)" },
            ]
          : transition === "fade"
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [
                { opacity: 0, filter: "blur(14px)", transform: "scale(1.02)" },
                { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
              ];
      node.animate(frames, { duration: 680, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
    },
    [reduced, transition],
  );

  const pan = useCallback(
    (image: HTMLImageElement | null) => {
      if (!image) return;
      const run = () => {
        const viewport = viewportRef.current;
        if (!viewport || !scroll || reduced || typeof image.animate !== "function" || !image.naturalWidth) return;
        const rendered = viewport.clientWidth * (image.naturalHeight / image.naturalWidth);
        const travel = rendered - viewport.clientHeight;
        if (travel < 4) return;
        image.getAnimations().forEach((animation) => animation.cancel());
        image.animate(
          [
            { transform: "translateY(0px)", offset: 0 },
            { transform: "translateY(0px)", offset: 0.12 },
            { transform: `translateY(${-travel}px)`, offset: 0.92 },
            { transform: `translateY(${-travel}px)`, offset: 1 },
          ],
          { duration: dwell + 1400, easing: "ease-in-out", fill: "forwards" },
        );
      };
      if (image.complete) run();
      else image.addEventListener("load", run, { once: true });
    },
    [dwell, reduced, scroll],
  );

  const onTabKey = (event: ReactKeyboardEvent, index: number) => {
    let target = -1;
    if (event.key === "ArrowRight") target = (index + 1) % count;
    else if (event.key === "ArrowLeft") target = (index - 1 + count) % count;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = count - 1;
    if (target < 0) return;
    event.preventDefault();
    tabRefs.current[target]?.focus();
    takeControl(target);
  };

  const releasePress = () => {
    const hold = holdRef.current;
    if (!hold.press) return;
    hold.press = false;
    // A tap or long-press earns a fresh, full look at the page.
    if (!clockRef.current.handle) clockRef.current.remaining = dwellRef.current;
    syncRef.current();
  };

  const palette = makePalette(dark, accentColor, windowColor, textColor, mutedColor);
  const corner = clamp(finite(radius, 14), 0, 40);
  const inset = frame === "inset";
  const gap = 4;
  const inner = Math.max(0, corner - gap);
  const narrow = width > 0 && width < 480;
  const showNav = controls && !single && count > 1;
  const parts = splitUrl(typed);
  const ratio = clamp(finite(aspect, 1.6), 0.4, 4);
  const current = list[active];

  // Icon buttons draw a 30px chip but take a 44px hit area. The focus ring sits inside the button
  // so the window's rounded clip never cuts it off.
  const button = (
    name: string,
    icon: IconName,
    onClick: () => void,
    { disabled = false, pressed }: { disabled?: boolean; pressed?: boolean } = {},
  ) => (
    <button
      type="button"
      aria-label={name}
      aria-pressed={pressed}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(event) => {
        const chip = event.currentTarget.firstElementChild as HTMLElement | null;
        if (!disabled && chip) chip.style.background = palette.hover;
      }}
      onMouseLeave={(event) => {
        const chip = event.currentTarget.firstElementChild as HTMLElement | null;
        if (chip) chip.style.background = "transparent";
      }}
      style={{
        boxSizing: "border-box",
        width: 44,
        height: 44,
        padding: 0,
        display: "grid",
        placeItems: "center",
        flex: "none",
        border: 0,
        borderRadius: 10,
        outlineOffset: -5,
        background: "transparent",
        color: palette.muted,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "default" : "pointer",
        WebkitTapHighlightColor: "transparent",
        transition: "opacity 160ms ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 30, height: 30, borderRadius: 8, display: "grid", placeItems: "center", transition: "background-color 160ms ease" }}
      >
        <Icon name={icon} />
      </span>
    </button>
  );

  const nav = showNav ? (
    <div style={{ display: "flex", flex: "none" }}>
      {button("Previous page", "back", () => takeControl(pageRef.current - 1), { disabled: !loop && active === 0 })}
      {button("Next page", "forward", () => takeControl(pageRef.current + 1), { disabled: !loop && active === count - 1 })}
    </div>
  ) : null;

  const onToggle = () => {
    if (!playing) {
      // An explicit Play outranks the hover and focus holds that the click itself created;
      // they come back the next time the pointer or focus enters.
      const hold = holdRef.current;
      hold.hover = false;
      hold.focus = false;
      hold.press = false;
    }
    setPlaying(!playing);
  };

  const toggle = canAutoplay ? button("Pause slideshow", playing ? "pause" : "play", onToggle, { pressed: !playing }) : null;

  // The address bar is decorative; the viewport link and the live region carry the URL for
  // assistive tech. Sized in rem so it grows with the visitor's text size.
  const address = (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        flex: "1 1 auto",
        maxWidth: chrome === "compact" ? "27.5rem" : undefined,
        margin: chrome === "compact" ? "0 auto" : undefined,
        minWidth: 0,
        boxSizing: "border-box",
        minHeight: "1.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: chrome === "compact" ? "center" : "flex-start",
        gap: "0.375rem",
        padding: "0.3rem 0.75rem",
        borderRadius: "0.5rem",
        background: palette.field,
        boxShadow: `inset 0 0 0 1px ${palette.fieldEdge}`,
        fontFamily: SANS,
        fontSize: "0.78125rem",
        lineHeight: 1.2,
        fontWeight: 500,
        letterSpacing: "0.005em",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span style={{ color: palette.muted, display: "flex", flex: "none" }}>
        <Icon name="lock" />
      </span>
      <span style={{ display: "flex", minWidth: 0, overflow: "hidden" }}>
        <span style={{ color: palette.text, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{parts.host}</span>
        <span style={{ color: palette.muted, flex: "none" }}>{parts.path}</span>
        {caret ? (
          <span style={{ display: "inline-block", flex: "none", width: 1.5, height: "1.05em", marginLeft: 1, alignSelf: "center", background: palette.accent }} />
        ) : null}
      </span>
    </div>
  );

  const windowDots = (
    <div aria-hidden="true" style={{ display: "flex", gap: 7, flex: "none" }}>
      {(dots === "color" ? ["#FF5F57", "#FEBC2E", "#28C840"] : [palette.dot, palette.dot, palette.dot]).map((color, index) => (
        <span key={index} style={{ width: 11, height: 11, borderRadius: 999, background: color }} />
      ))}
    </div>
  );

  const bar = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        pointerEvents: "none",
        opacity: progress.visible ? 1 : 0,
        transition: "opacity 260ms ease",
      }}
    >
      <div
        style={{
          height: "100%",
          background: palette.accent,
          transformOrigin: "0 50%",
          transform: `scaleX(${progress.value})`,
          transition: progress.speed ? `transform ${progress.speed}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
          borderRadius: 2,
        }}
      />
    </div>
  );

  const header =
    chrome === "compact" ? (
      <div
        style={{
          position: "relative",
          flex: "none",
          minHeight: "2.75rem",
          display: "flex",
          alignItems: "center",
          gap: narrow ? 2 : 8,
          padding: narrow ? "0 2px" : inset ? "0 2px 0 13px" : "0 3px 0 14px",
          background: inset ? "transparent" : palette.bar,
          boxShadow: inset ? undefined : `inset 0 -1px 0 ${palette.divide}`,
        }}
      >
        {narrow ? null : windowDots}
        {nav}
        {address}
        {toggle}
        {loader ? bar : null}
      </div>
    ) : (
      <div style={{ flex: "none", background: inset ? "transparent" : palette.bar, boxShadow: inset ? undefined : `inset 0 -1px 0 ${palette.divide}` }}>
        <div style={{ height: 40, display: "flex", alignItems: "center", gap: 12, padding: inset ? "0 9px 0 13px" : "0 10px 0 14px" }}>
          {windowDots}
          <div
            role="tablist"
            aria-label="Pages"
            style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0, flex: "1 1 auto", overflowX: "auto", scrollbarWidth: "none" }}
          >
            {list.map((item, index) => {
              const selected = index === active;
              const name = item.title || splitUrl(item.url).host;
              return (
                <button
                  key={index}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => takeControl(index)}
                  onKeyDown={(event) => onTabKey(event, index)}
                  style={{
                    flex: "none",
                    boxSizing: "border-box",
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "0 11px 0 8px",
                    border: 0,
                    borderRadius: 8,
                    background: selected ? palette.field : "transparent",
                    color: selected ? palette.text : palette.muted,
                    fontFamily: SANS,
                    fontSize: "0.78125rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 200ms ease, color 200ms ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 4,
                      display: "grid",
                      placeItems: "center",
                      background: selected ? palette.accent : palette.dot,
                      color: selected ? palette.surface : palette.muted,
                      fontSize: 8.5,
                      fontWeight: 700,
                      transition: "background-color 200ms ease, color 200ms ease",
                    }}
                  >
                    {name.slice(0, 1).toUpperCase()}
                  </span>
                  {name}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ position: "relative", minHeight: 44, display: "flex", alignItems: "center", gap: 4, padding: inset ? "0 3px 4px" : "0 4px 4px" }}>
          {controls ? button("Previous page", "back", () => takeControl(pageRef.current - 1), { disabled: single || count < 2 || (!loop && active === 0) }) : null}
          {controls ? button("Next page", "forward", () => takeControl(pageRef.current + 1), { disabled: single || count < 2 || (!loop && active === count - 1) }) : null}
          {address}
          {toggle}
          {loader ? bar : null}
        </div>
      </div>
    );

  const renderPage = (index: number, layerKey: number) => {
    const item = list[index];
    if (!item) return null;
    if (item.content !== undefined) return <div style={{ position: "absolute", inset: 0, overflow: "auto" }}>{item.content}</div>;
    if (!item.src) return null;
    const tall = fit === "cover" && scroll;
    return (
      <img
        ref={tall ? pan : undefined}
        src={item.src}
        alt={item.alt ?? item.title ?? ""}
        loading={layerKey === 0 ? imageLoading : "eager"}
        decoding="async"
        draggable={false}
        style={
          tall
            ? { position: "absolute", left: 0, top: 0, width: "100%", minHeight: "100%", objectFit: "cover", objectPosition: "top", display: "block" }
            : { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: fit, objectPosition: "top", display: "block" }
        }
      />
    );
  };

  const link = current?.href ? (
    <a
      href={current.href}
      target="_blank"
      rel="noopener noreferrer"
      onFocus={(event) => {
        let ring = true;
        try {
          ring = event.currentTarget.matches(":focus-visible");
        } catch {
          ring = true;
        }
        setLinkRing(ring);
      }}
      onBlur={() => setLinkRing(false)}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setLinkHot(true);
      }}
      onPointerLeave={() => setLinkHot(false)}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 11,
        borderRadius: inset ? inner : 0,
        outline: "none",
        boxShadow: linkRing ? `inset 0 0 0 2px ${palette.accent}, inset 0 0 0 4px ${palette.surface}` : undefined,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span style={SR_ONLY}>Open {current.url} (opens in new tab)</span>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.375rem 0.625rem 0.375rem 0.75rem",
          borderRadius: 999,
          background: palette.surface,
          color: palette.text,
          boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 6px 16px -6px rgba(0,0,0,0.25)",
          fontFamily: SANS,
          fontSize: "0.78125rem",
          fontWeight: 500,
          lineHeight: 1.2,
          opacity: linkHot || linkRing ? 1 : 0,
          transform: linkHot || linkRing || reduced ? "none" : "translateY(3px)",
          transition: "opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: "none",
        }}
      >
        Open page
        <Icon name="external" />
      </span>
    </a>
  ) : null;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={label}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        holdRef.current.hover = true;
        syncRef.current();
      }}
      onPointerLeave={() => {
        holdRef.current.hover = false;
        releasePress();
        syncRef.current();
      }}
      onPointerDown={() => {
        holdRef.current.press = true;
        syncRef.current();
      }}
      onPointerUp={releasePress}
      onPointerCancel={releasePress}
      onFocus={() => {
        holdRef.current.focus = true;
        syncRef.current();
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        holdRef.current.focus = false;
        syncRef.current();
      }}
      className={cn("relative isolate flex w-full flex-col overflow-hidden", className)}
      style={{
        borderRadius: corner,
        background: inset ? palette.frame : palette.surface,
        boxShadow: inset ? palette.frameShadow : palette.shadow,
        color: palette.text,
        ...style,
      }}
    >
      {header}
      <div
        ref={viewportRef}
        style={{
          position: "relative",
          flex: "none",
          height: height ? Math.max(80, finite(height, 360)) : undefined,
          aspectRatio: height ? undefined : `${ratio}`,
          margin: inset ? `0 ${gap}px ${gap}px` : 0,
          borderRadius: inset ? inner : 0,
          boxShadow: inset ? palette.panel : undefined,
          background: palette.surface,
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        {layers.map((layer, position) => (
          <div
            key={layer.key}
            ref={enter}
            data-initial={layer.key === 0 ? "" : undefined}
            aria-hidden={position < layers.length - 1 ? true : undefined}
            style={{ position: "absolute", inset: 0, zIndex: position }}
          >
            {renderPage(layer.index, layer.key)}
          </div>
        ))}
        {inset ? <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: inner, boxShadow: palette.panel, pointerEvents: "none", zIndex: 10 }} /> : null}
        {link}
      </div>
      <div aria-live="polite" aria-atomic="true" style={SR_ONLY}>
        {announcement}
      </div>
    </div>
  );
});

BrowserWindow.displayName = "BrowserWindow";

export { BrowserWindow };
export default BrowserWindow;
