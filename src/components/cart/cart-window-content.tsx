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

	useEffect(() => {
		loadCart();
	}, []);

	return <div className="flex flex-col gap-8">
		{cart.length > 0
			? cart.map((item) => <CartWindowItem key={`cart_${item.name}`} item={item} />)
			: <p>No items in cart.</p>}
	</div>
}
