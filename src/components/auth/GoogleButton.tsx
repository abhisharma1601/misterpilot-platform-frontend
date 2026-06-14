"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: number;
              text?: string;
              shape?: string;
              logo_alignment?: string;
            }
          ) => void;
        };
      };
    };
  }
}

interface GoogleButtonProps {
  onToken: (idToken: string) => void;
  text?: "continue_with" | "signin_with" | "signup_with" | "signin";
}

export default function GoogleButton({
  onToken,
  text = "continue_with",
}: GoogleButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  const renderButton = useCallback(() => {
    if (!window.google || !containerRef.current || renderedRef.current) return;
    renderedRef.current = true;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: (response) => {
        onToken(response.credential);
      },
    });

    window.google.accounts.id.renderButton(containerRef.current, {
      theme: "outline",
      size: "large",
      width: containerRef.current.offsetWidth || 340,
      text,
      shape: "rectangular",
      logo_alignment: "left",
    });
  }, [onToken, text]);

  useEffect(() => {
    if (window.google) {
      renderButton();
      return;
    }
    const existing = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (existing) {
      existing.addEventListener("load", renderButton);
      return () => existing.removeEventListener("load", renderButton);
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = renderButton;
    document.head.appendChild(script);
  }, [renderButton]);

  return (
    <div ref={containerRef} className="w-full flex justify-center min-h-[44px]" />
  );
}
