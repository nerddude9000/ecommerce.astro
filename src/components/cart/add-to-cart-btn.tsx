import { cn } from "@/lib/utils";
import { useCart } from "@/stores/cart";
import type { Article, CartArticle } from "@/types/items";
import { ShoppingCartIcon } from "lucide-react";

type Props = {
	article: Article;
	isIconOnly?: boolean;
	className?: string;
}

export default function AddToCartButton({ article, isIconOnly, className }: Props) {
	const addToCart = useCart(s => s.addToCart);

	const handleAddToCart = (e: any) => {
		e.stopPropagation();
		e.preventDefault();

		const cartArticle: CartArticle = {
			id: article.id,
			name: article.name,
			amount: 1,
			price: article.price
		};
		addToCart(cartArticle);
	}

	if (isIconOnly)
		return <button onClick={handleAddToCart} className={cn("", className)}>
			<ShoppingCartIcon size={36} />
		</button >

	return (
		<button
			onClick={handleAddToCart}
			className={cn("bg-black max-w-64 h-20 flex items-center justify-center gap-4 rounded-2xl hover:bg-green-800 border border-green-800 transition-colors", className)}
		>
			<ShoppingCartIcon size={32} />
			<span className="text-lg font-semibold">Add to cart</span>
		</button >
	);
}

