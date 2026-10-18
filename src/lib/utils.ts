import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Путь к файлу из public/ с учётом базового URL
// (на GitHub Pages сайт живёт в подкаталоге, абсолютный путь "/file.jpg" там не работает)
export function pub(p: string | undefined) {
  return `${import.meta.env.BASE_URL}${(p ?? '').replace(/^\//, '')}`
}
