"use client";

import { useEffect } from "react";

export default function NotificationPermission() {
  useEffect(() => {
    // SSR safety
    if (typeof window === "undefined") return;

    // Browser does not support Notifications
    if (!("Notification" in window)) return;

    // Never request permission automatically on page load
    // This is blocked or discouraged in many mobile browsers
    if (Notification.permission === "default") {
      // Only request permission after first user interaction
      const request = () => {
        Notification.requestPermission().catch(() => { });
        window.removeEventListener("click", request);
        window.removeEventListener("touchstart", request);
      };

      window.addEventListener("click", request);
      window.addEventListener("touchstart", request);
    }
  }, []);

  return null;
}