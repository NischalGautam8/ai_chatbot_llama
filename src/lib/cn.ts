import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
//what does twmerge do?
// twMerge is a function that takes in a list of class names and returns a string of class names that are merged together.
