import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
    if (seconds <= 0) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export function getColor(timeLeft: number, reversed: boolean = false) {
    const ranges = [
        { limit: 0, normal: 'text-red-700', reverse: 'text-green-500' },
        { limit: 60, normal: 'text-red-600', reverse: 'text-lime-500' },
        {
            limit: 180,
            normal: 'text-red-500 animate-pulse',
            reverse: 'text-yellow-500',
        },
        { limit: 420, normal: 'text-orange-500', reverse: 'text-orange-500' },
        {
            limit: 900,
            normal: 'text-yellow-500',
            reverse: 'text-red-500 animate-pulse',
        },
        { limit: 1500, normal: 'text-lime-500', reverse: 'text-red-600' },
        { limit: Infinity, normal: 'text-green-500', reverse: 'text-red-700' },
    ];

    const match = ranges.find((r) => timeLeft <= r.limit);
    return reversed ? match!.reverse : match!.normal;
}

export const notifyWithSound = (title: string, body: string) => {
    if (typeof window === 'undefined') return;

    if (!('Notification' in window)) {
        console.warn("Browser doesn't support notifications.");
        return;
    }

    // console.log("Notification permission:", Notification.permission);
    // Request permission if not granted
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    if (Notification.permission === 'granted') {
        new Notification(title, { body });

        // Play sound
        // const audio = new Audio("/notification.mp3");
        // audio.play().catch((err) => console.log("Audio play error:", err));
    }
};

export async function isIncognito() {
    return new Promise((resolve) => {
        const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) {
            resolve(false);
            return;
        }
        fs(
            window.TEMPORARY,
            100,
            () => resolve(false),
            () => resolve(true),
        );
    });
}
