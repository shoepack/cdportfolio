import { clsx, type ClassValue } from "clsx";

// Class-name joiner for vendored React Bits components. The site never passes
// conflicting Tailwind classes, so tailwind-merge (27 KB) is not needed.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
