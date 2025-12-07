"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then((reg) => console.log("SW registered:", reg.scope))
                .catch((err) => console.log("SW registration failed:", err));
        }
    }, []);

    return null; // renders nothing
}