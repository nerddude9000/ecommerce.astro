import type { CartArticle } from "@/types/items";
import { create } from "zustand";

export const CART_LOCALSTORAGE_KEY = "cart";

type CartStore = {
	cart: CartArticle[];
	loadCart: () => void;
	addToCart: (article: CartArticle) => void;
	popFromCart: (id: number) => void;
	clearCart: () => void;
}

function saveCart(cart: CartArticle[]) {
	localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(cart));
}

export const useCart = create<CartStore>()((set, get) => ({
	cart: [],
	loadCart: () => {
		const localStorageCart = localStorage.getItem(CART_LOCALSTORAGE_KEY);

		if (localStorageCart) {
			const loadedCart = JSON.parse(localStorageCart);
			saveCart(loadedCart);
			set({ cart: loadedCart });
		}
	},
	addToCart: (article) => {
		const cart = get().cart;
		const targetArticleIndex = cart.findIndex((c) => c.id === article.id);

		let newCart = cart.slice();

		if (targetArticleIndex === -1) {
			newCart = [...newCart, article];
		} else {
			newCart[targetArticleIndex].amount++;
		}

		saveCart(newCart);
		set({ cart: newCart });
	},
	popFromCart: (id) => {
		const cart = get().cart;
		const targetArticleIndex = cart.findIndex((c) => c.id === id);

		if (targetArticleIndex === -1)
			return

		let newCart = cart.slice();

		if (cart[targetArticleIndex].amount <= 1)
			newCart.splice(targetArticleIndex, 1);
		else
			newCart[targetArticleIndex].amount--;


		saveCart(newCart);
		set({ cart: newCart });
	},
	clearCart: () => {
		localStorage.removeItem(CART_LOCALSTORAGE_KEY);
		set({ cart: [] });
	}
}));


