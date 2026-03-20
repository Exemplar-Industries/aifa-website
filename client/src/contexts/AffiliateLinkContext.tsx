/**
 * AffiliateLinkContext — Global affiliate link state
 * Wraps the app so every component can call useSkoolUrl() without prop drilling.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const BASE_SKOOL_URL = "https://www.skool.com/aifilmacademy/about";
const SESSION_KEY = "aifa_ref";

interface AffiliateLinkContextType {
  refCode: string | null;
  skoolUrl: string;
}

const AffiliateLinkContext = createContext<AffiliateLinkContextType>({
  refCode: null,
  skoolUrl: BASE_SKOOL_URL,
});

export function AffiliateLinkProvider({ children }: { children: ReactNode }) {
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlRef = urlParams.get("ref");

    if (urlRef) {
      sessionStorage.setItem(SESSION_KEY, urlRef);
      setRefCode(urlRef);
    } else {
      const sessionRef = sessionStorage.getItem(SESSION_KEY);
      if (sessionRef) setRefCode(sessionRef);
    }
  }, []);

  const skoolUrl = refCode ? `${BASE_SKOOL_URL}?ref=${refCode}` : BASE_SKOOL_URL;

  return (
    <AffiliateLinkContext.Provider value={{ refCode, skoolUrl }}>
      {children}
    </AffiliateLinkContext.Provider>
  );
}

/** Use this in any component to get the correct Skool CTA URL */
export function useSkoolUrl(): string {
  return useContext(AffiliateLinkContext).skoolUrl;
}

export function useRefCode(): string | null {
  return useContext(AffiliateLinkContext).refCode;
}
