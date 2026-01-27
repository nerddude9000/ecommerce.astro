import { articleToUrl } from "@/lib/utils";
import type { Article, CartArticle } from "../../types/items";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/stores/cart";

interface Props {
	article: Article;
}

export default function ArticleItem({ article }: Props) {
	const cart = useCart(s => s.cart);
	const updateCart = useCart(s => s.updateCart);

	const handleArticleClick = () => {
		window.location.href = articleToUrl(article);
	};

	const handleAddToCart = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();

		const idxInCart = cart.findIndex((c) => c.id === article.id);

		if (idxInCart === -1) {
			const newCartArticle: CartArticle = {
				id: article.id,
				name: article.name,
				amount: 1,
				price: article.price
			};

			updateCart([...cart, newCartArticle]);
		} else {
			// NOTE: optimize this somehow, because it's an array and we have the index!
			updateCart(cart.map((c) => c.id === idxInCart ? { ...c, amount: c.amount + 1 } : c));
		}
	}

	return (
		<article
			className="flex flex-col gap-2 bg-neutral-800 p-2 rounded-2xl cursor-pointer"
			onClick={handleArticleClick}
		>
			{/* @Todo: Add actual images or something */}
			<img
				src={`https://placehold.co/600/webp?font=poppins&text=${article.name}`}
				alt=""
				className="w-full h-64 lg:h-[500px] rounded-t-xl"
			/>

			<div className="flex items-center">
				<div className="flex flex-col flex-1">
					<h1 className="text-lg font-black italic">{article.name}</h1>
					<p className="font-light text-white">{article.price} Ruby</p>
					{article.stock === 0 && (
						<p className="text-lg text-red-500">OUT OF STOCK</p>
					)}
				</div>

				{article.stock > 0 &&
					<button onClick={handleAddToCart} className="m-2"><ShoppingCartIcon size={36} /></button>}
			</div>
		</article>
	);
}
