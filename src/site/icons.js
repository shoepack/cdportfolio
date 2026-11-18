import { FiCpu, FiLayers, FiLayout, FiShield } from "react-icons/fi";
import {
  SiCloudflare,
  SiFigma,
  SiJavascript,
  SiJira,
  SiOdoo,
  SiPhp,
  SiPython,
  SiStripe,
  SiSupabase,
  SiVercel,
} from "react-icons/si";

// One UI icon family (Feather) for the areas index.
export const AREA_ICONS = {
  design: FiLayout,
  ai: FiCpu,
  business: FiLayers,
  security: FiShield,
};

// Brand marks for the tools a win names. Every tool listed in profile.js has one,
// so the chips stay a single, consistent treatment.
export const TOOL_MARKS = {
  Stripe: SiStripe,
  Vercel: SiVercel,
  Supabase: SiSupabase,
  JavaScript: SiJavascript,
  Figma: SiFigma,
  Jira: SiJira,
  Python: SiPython,
  Odoo: SiOdoo,
  Cloudflare: SiCloudflare,
  PHP: SiPhp,
};
