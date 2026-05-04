import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getOptimizedImage(url) {
  if (!url) return url;
  // If it's a local path and has a common image extension, replace it with .avif
  return url.replace(/\.(png|jpg|jpeg)$/i, '.avif');
}
