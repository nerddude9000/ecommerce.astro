import { articleToUrl } from "@/lib/utils";
import type { Article, CartArticle } from "../../types/items";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/stores/cart";
import type { EventHandler } from "react";

interface Props {
	article: Article;
}

export default function ArticleItem({ article }: Props) {
	const addToCart = useCart(s => s.addToCart);

	const handleArticleClick = () => {
		window.location.href = articleToUrl(article);
	};

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

	return (
		<article
			className="flex flex-col gap-2 bg-neutral-800 p-2 rounded-2xl"
		>
			{/* @Todo: Add actual images or something */}
			<img
				src={`https://placehold.co/600/webp?font=poppins&text=${article.name}`}
				alt=""
				className="w-full h-64 lg:h-[500px] rounded-t-xl cursor-pointer"
				onClick={handleArticleClick}
			/>

			<div className="flex items-center">
				<div className="flex flex-col flex-1">
					<h2
						className="text-lg font-black italic cursor-pointer"
						onClick={handleArticleClick}
					>{article.name}</h2>
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
