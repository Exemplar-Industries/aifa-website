import { useEffect, useRef } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEXW8BXlu8KssH7k";
const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";

type TurnstileWidgetId = string | number;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "auto" | "light" | "dark";
      size?: "normal" | "compact" | "flexible";
      action?: string;
      callback?: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    },
  ) => TurnstileWidgetId;
  remove: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", () => window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile failed to load")), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.defer = true;
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile failed to load"));
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
}

type TurnstileProps = {
  action: string;
  theme?: "auto" | "light" | "dark";
  onTokenChange: (token: string | null) => void;
};

export default function Turnstile({ action, theme = "auto", onTokenChange }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);

  useEffect(() => {
    let mounted = true;

    loadTurnstile()
      .then((turnstile) => {
        if (!mounted || !containerRef.current) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme,
          size: "flexible",
          action,
          callback: (token) => onTokenChange(token),
          "error-callback": () => onTokenChange(null),
          "expired-callback": () => onTokenChange(null),
        });
      })
      .catch(() => onTokenChange(null));

    return () => {
      mounted = false;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [action, onTokenChange, theme]);

  return <div ref={containerRef} aria-label="Bot verification" style={{ minHeight: "65px" }} />;
}
