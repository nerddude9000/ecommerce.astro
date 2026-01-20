import type { Article, CartArticle } from "@/types/items";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function articleToUrl({ id }: Article | CartArticle): string {
	return `products/${id}`;
}

const CART_STORAGE = "cart" as const;

export function loadCart(): CartArticle[] {
	const storage = localStorage.getItem(CART_STORAGE);
	if (!storage) return [];

	const cart = JSON.parse(storage) as CartArticle[];
	return cart;
}

export function saveCart(cart: CartArticle[]): void {
	const cartJson = JSON.stringify(cart);
	localStorage.setItem(CART_STORAGE, cartJson);
}

