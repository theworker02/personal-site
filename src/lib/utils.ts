import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatMonth(value?: string) {
  if (!value) return null;
  return value;
}

export function externalRel(href: string) {
  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:")) {
    return undefined;
  }
  return "noopener noreferrer";
}

export function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}
