import type { CartArticle } from "@/types/items";

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

