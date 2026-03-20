/**
 * useAffiliateLink — Affiliate/Referral Link Routing System
 *
 * How it works:
 * 1. Video creator's ad links to: aifilmacademy.com?ref=<their_ref_code>
 * 2. This hook reads the ?ref= param from the URL on page load
 * 3. Stores it in sessionStorage so it persists across scrolling/navigation
 * 4. Every CTA button uses getSkoolUrl() which appends the ref to the Skool URL
 * 5. If no ref is present (organic traffic), falls back to the default Skool URL
 *
 * Contractor affiliate codes (from TEAM_Full_Contractor_Database):
 * - Bruno Saki:     cf768b4a74b447ed9248d18863689820
 * - Shahine:        d4171d9df4bf4059ad11d646844b9754
 * - Mark Kobayashi: 8d29de4f3923438e880029c66552ca4c
 * - TeeCee:         776e24598283460494f9d93de34297a6
 * - Gentrit Brahimi: f5511ea8e89d4136b8b9514927c5c4c0
 *
 * Usage in components:
 *   import { useAffiliateLink } from "@/hooks/useAffiliateLink";
 *   const { getSkoolUrl } = useAffiliateLink();
 *   <a href={getSkoolUrl()}>Join the Academy</a>
 */

import { useEffect, useState } from "react";

const BASE_SKOOL_URL = "https://www.skool.com/aifilmacademy/about";
const SESSION_KEY = "aifa_ref";

export function useAffiliateLink() {
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check URL params first (fresh click from ad)
    const urlParams = new URLSearchParams(window.location.search);
    const urlRef = urlParams.get("ref");

    if (urlRef) {
      // Save to session so it persists as user scrolls
      sessionStorage.setItem(SESSION_KEY, urlRef);
      setRefCode(urlRef);
    } else {
      // 2. Fall back to session storage (already captured earlier in session)
      const sessionRef = sessionStorage.getItem(SESSION_KEY);
      if (sessionRef) {
        setRefCode(sessionRef);
      }
    }
  }, []);

  /**
   * Returns the correct Skool URL with affiliate ref appended if present.
   * Falls back to base URL for organic traffic.
   */
  const getSkoolUrl = (): string => {
    if (refCode) {
      return `${BASE_SKOOL_URL}?ref=${refCode}`;
    }
    return BASE_SKOOL_URL;
  };

  return { refCode, getSkoolUrl };
}

/**
 * Standalone utility for non-hook contexts (e.g., static constants).
 * Reads from sessionStorage directly.
 */
export function getSkoolUrlStatic(): string {
  if (typeof window === "undefined") return BASE_SKOOL_URL;
  const ref = sessionStorage.getItem(SESSION_KEY) || new URLSearchParams(window.location.search).get("ref");
  return ref ? `${BASE_SKOOL_URL}?ref=${ref}` : BASE_SKOOL_URL;
}

export const DEFAULT_SKOOL_URL = BASE_SKOOL_URL;
