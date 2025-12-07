import type { Article } from "../../types/items";

interface Props {
	article: Article;
}

export default function ArticleItem({ article }: Props) {
	const handleArticleClick = () => {
		window.location.href = `/products/${article.id}`;
	};

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

			<h1 className="text-lg font-black italic">{article.name}</h1>
			<p className="font-light text-white">{article.price} Ruby</p>
			{article.stock == 0 && (
				<p className="text-lg text-red-500">OUT OF STOCK</p>
			)}
		</article>
	);
}
