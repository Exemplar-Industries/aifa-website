/**
 * AffiliateLinkContext — Global affiliate link state + Meta Pixel tracking
 *
 * AFFILIATE FLOW:
 * 1. Creator's ad → aifilmacademy.com?ref=<their_ref_code>
 * 2. This context reads ?ref= from URL synchronously on init (no render delay)
 * 3. useSkoolUrl() returns Skool URL with ref appended → creator gets credit
 * 4. trackCtaClick() fires Meta Pixel "InitiateCheckout" event with ref data
 *    so Meta knows which creator's ad drove the conversion intent
 *
 * CONTRACTOR REF CODES (from TEAM_Full_Contractor_Database):
 * cf768b4a74b447ed9248d18863689820 → Bruno Saki
 * d4171d9df4bf4059ad11d646844b9754 → Shahine
 * 8d29de4f3923438e880029c66552ca4c → Mark Kobayashi
 * 776e24598283460494f9d93de34297a6 → TeeCee
 * f5511ea8e89d4136b8b9514927c5c4c0 → Gentrit Brahimi
 */

import { createContext, useContext, useCallback, ReactNode } from "react";

const BASE_SKOOL_URL = "https://www.skool.com/aifilmacademy/about";
const SESSION_KEY = "aifa_ref";

// Declare fbq for TypeScript (Meta Pixel global)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _aifaRef?: string | null;
  }
}

/**
 * Resolve the ref code synchronously — called once at module load time.
 * Priority: URL param → sessionStorage → window._aifaRef (set by pixel script)
 * This ensures the correct URL is available on the very first render,
 * with no flash of the wrong link.
 */
function resolveRefCode(): string | null {
  try {
    const urlRef = new URLSearchParams(window.location.search).get("ref");
    if (urlRef) {
      sessionStorage.setItem(SESSION_KEY, urlRef);
      return urlRef;
    }
    const sessionRef = sessionStorage.getItem(SESSION_KEY);
    if (sessionRef) return sessionRef;
    if (window._aifaRef) return window._aifaRef;
  } catch {
    // SSR / restricted environments — fail silently
  }
  return null;
}

// Resolved once at module init — stable for the lifetime of the page
const RESOLVED_REF = resolveRefCode();
const RESOLVED_SKOOL_URL = RESOLVED_REF
  ? `${BASE_SKOOL_URL}?ref=${RESOLVED_REF}`
  : BASE_SKOOL_URL;

interface AffiliateLinkContextType {
  refCode: string | null;
  skoolUrl: string;
  trackCtaClick: (ctaLabel?: string) => void;
}

const AffiliateLinkContext = createContext<AffiliateLinkContextType>({
  refCode: RESOLVED_REF,
  skoolUrl: RESOLVED_SKOOL_URL,
  trackCtaClick: () => {},
});

export function AffiliateLinkProvider({ children }: { children: ReactNode }) {
  /**
   * Call this when user clicks any "Join" CTA button.
   * Fires Meta Pixel "InitiateCheckout" event with affiliate data.
   * Meta uses this to attribute the conversion to the correct ad/creator.
   */
  const trackCtaClick = useCallback((ctaLabel = "Join the Academy") => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: ctaLabel,
        content_category: RESOLVED_REF ? "affiliate_cta" : "organic_cta",
        // Attach ref code so you can filter by creator in Meta Events Manager
        ...(RESOLVED_REF && { content_ids: [RESOLVED_REF] }),
        currency: "USD",
        value: 19.00,
        num_items: 1,
      });
    }
  }, []);

  return (
    <AffiliateLinkContext.Provider
      value={{
        refCode: RESOLVED_REF,
        skoolUrl: RESOLVED_SKOOL_URL,
        trackCtaClick,
      }}
    >
      {children}
    </AffiliateLinkContext.Provider>
  );
}

/** Returns the correct Skool URL with affiliate ref appended if present */
export function useSkoolUrl(): string {
  return useContext(AffiliateLinkContext).skoolUrl;
}

/** Returns the raw ref code (e.g. "cf768b4a74b447ed9248d18863689820") or null */
export function useRefCode(): string | null {
  return useContext(AffiliateLinkContext).refCode;
}

/**
 * Returns both the URL and a click tracker.
 * Use this on CTA buttons to fire the Meta Pixel event on click.
 *
 * Usage:
 *   const { skoolUrl, trackCtaClick } = useSkoolCta();
 *   <a href={skoolUrl} onClick={() => trackCtaClick("Hero CTA")}>Join Now</a>
 */
export function useSkoolCta() {
  const { skoolUrl, trackCtaClick } = useContext(AffiliateLinkContext);
  return { skoolUrl, trackCtaClick };
}
