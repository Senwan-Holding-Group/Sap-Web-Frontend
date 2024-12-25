import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const capitalize = (
  str: string
) => str?.replace(/\b\w/g, substr => substr.toUpperCase())