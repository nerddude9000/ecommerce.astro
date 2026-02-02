import { articleToUrl } from "@/lib/utils";
import type { Article } from "../../types/items";
import AddToCartButton from "../cart/add-to-cart-btn";

interface Props {
	article: Article;
}

export default function ArticleItem({ article }: Props) {
	const handleArticleClick = () => {
		window.location.href = articleToUrl(article);
	};

	return (
		<article
			className="flex flex-col gap-2 bg-neutral-800 p-2 rounded-2xl"
		>
			{/* @Todo: Add actual images or something */}
			<img
				src={`https://placehold.co/600/webp?font=poppins&text=${article.name}`}
				alt={`product image of ${article.name}`}
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
					<AddToCartButton article={article} isIconOnly className="m-2" />}
			</div>
		</article>
	);
}
