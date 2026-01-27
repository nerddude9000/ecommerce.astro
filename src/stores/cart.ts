import type { CartArticle } from "@/types/items";
import { create } from "zustand";

const CART_LOCALSTORAGE_KEY = "cart";

type CartStore = {
	cart: CartArticle[];
	updateCart: (newCart: CartArticle[]) => void;
	clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
	cart: [],
	updateCart: (newCart) => {
		localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(newCart));
		set({ cart: newCart });
	},
	clearCart: () => {
		localStorage.removeItem(CART_LOCALSTORAGE_KEY);
		set({ cart: [] });
	}
}));


