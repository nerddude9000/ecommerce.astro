import type { Article, CartArticle } from "@/types/items";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function articleToUrl({ id }: Article | CartArticle): string {
	return `products/${id}`;
}
