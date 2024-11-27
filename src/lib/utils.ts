import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeJsonForUrl(json: string): string {
  return encodeURIComponent(json);
}

export function decodeJsonFromUrl(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch (error) {
    console.error("Error decoding JSON from URL:", error);
    return "";
  }
}

export function generateShareableUrl(json: string): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const encodedJson = encodeJsonForUrl(json);
  return `${baseUrl}?json=${encodedJson}`;
}
