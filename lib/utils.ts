import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreTier(score: number): "good" | "caution" | "bad" {
  if (score >= 70) return "good";
  if (score >= 40) return "caution";
  return "bad";
}

export const TIER_STYLES = {
  good: {
    box: "bg-emerald-500/10 border-emerald-500/20",
    title: "text-emerald-400",
    text: "text-emerald-200/80",
  },
  caution: {
    box: "bg-orange-500/10 border-orange-500/20",
    title: "text-orange-400",
    text: "text-orange-200/80",
  },
  bad: {
    box: "bg-red-500/10 border-red-500/20",
    title: "text-red-400",
    text: "text-red-200/80",
  },
};
