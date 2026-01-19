import { articleToUrl } from "@/lib/utils";
import type { CartArticle } from "@/types/items"
import { ChevronDown, ChevronUp } from "lucide-react";

function CartWindowItem({ item }: { item: CartArticle }) {
	const handleClick = () => {
		window.location.href = articleToUrl(item);
	};

	return <div className="flex items-center gap-2 h-12">
		<div className="flex flex-col justify-stretch items-stretch">
			<button><ChevronUp /></button>
			<p className="font-bold bg-white/5 text-center">{item.amount}</p>
			<button><ChevronDown /></button>
		</div>
		<p className="flex-1 cursor-pointer" onClick={handleClick}>{item.name}</p>
		<p className="text-green-200">{item.price * item.amount} Ruby</p>
	</div>;
}

export default function CartWindowContent() {
	// TODO: TEMP
	const cartContent: CartArticle[] = [
		{
			id: 1,
			name: "RTX 4080 Super GPU",
			price: 1299.99,
			amount: 1,
		},
		{
			id: 2,
			name: "Ryzen 9 7950X Processor",
			price: 699.99,
			amount: 1,
		},
		{
			id: 3,
			name: "Corsair Vengeance 32GB DDR5 RAM",
			price: 389.99,
			amount: 2,
		},
	];

	return <div className="flex flex-col gap-8">
		{cartContent.map((item) => <CartWindowItem key={`cart_${item.name}`} item={item} />)}
	</div>
}
