import { articleToUrl } from "@/lib/utils";
import { useCart } from "@/stores/cart";
import type { CartArticle } from "@/types/items"
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect } from "react";

function CartWindowItem({ item }: { item: CartArticle }) {
	const addToCart = useCart(s => s.addToCart);
	const popFromCart = useCart(s => s.popFromCart);

	const handleItemClick = () => {
		window.location.href = articleToUrl(item);
	};

	const handleAddClick = () => {
		addToCart(item);
	}

	const handleSubtractClick = () => {
		popFromCart(item.id);
	}

	return <div className="flex items-center gap-2 h-12">
		<div className="flex flex-col justify-stretch items-stretch">
			<button onClick={handleAddClick}><ChevronUp /></button>
			<p className="font-bold bg-white/5 text-center">{item.amount}</p>
			<button onClick={handleSubtractClick}><ChevronDown /></button>
		</div>
		<p className="flex-1 cursor-pointer" onClick={handleItemClick}>{item.name}</p>
		<p className="text-green-200">{item.price * item.amount} Ruby</p>
	</div>;
}

export default function CartWindowContent() {
	const cart = useCart(s => s.cart);
	const loadCart = useCart(s => s.loadCart);
	const clearCart = useCart(s => s.clearCart);

	useEffect(() => {
		loadCart();
	}, []);

	const handleClearCartClick = () => {
		const response = confirm("Do you really want to clear your cart?");

		if (response)
			clearCart();
	}

	if (cart.length <= 0)
		return <p>No items in cart.</p>;

	return <div className="flex flex-col gap-8">
		<div className="flex">
			<h2 className="flex-1">Your cart</h2>
			<button className="underline" onClick={handleClearCartClick}>CLEAR</button>
		</div>
		{cart.map((item) => <CartWindowItem key={`cart_${item.name}`} item={item} />)}
	</div>
}
