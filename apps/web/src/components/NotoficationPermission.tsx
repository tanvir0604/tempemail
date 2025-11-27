"use client";

import { useEffect } from "react";

export default function NotificationPermission() {
    useEffect(() => {
        // Only run in browser
        if (typeof window === "undefined") return;

        // Check if permission is not already granted
        if (Notification.permission === "default") {
            Notification.requestPermission()
                .then((permission) => {
                    console.log("Notification permission:", permission);
                })
                .catch((err) =>
                    console.error("Notification permission error:", err)
                );
        }
    }, []);

    return null; // no UI needed
}
