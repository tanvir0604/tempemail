import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export function getColor(timeLeft: number) {
  if (timeLeft <= 0) return "text-red-700";
  if (timeLeft <= 60) return "text-red-600";
  if (timeLeft <= 180) return "text-red-500 animate-pulse";
  if (timeLeft <= 420) return "text-orange-500";
  if (timeLeft <= 900) return "text-yellow-500";
  if (timeLeft <= 1500) return "text-lime-500";
  return "text-green-500";
}
