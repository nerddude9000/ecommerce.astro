import type { Article } from "../../types/items";

interface Props {
	article: Article;
}

export default function ArticleItem({ article }: Props) {
	return (
		<article className="max-w-64 flex flex-col gap-2 bg-neutral-800 p-2 rounded-2xl">
			<div className="w-full h-64">
				<img src={article.img !== "" ? article.img : undefined} alt="" />
			</div>

			<h1 className="text-lg font-black italic">{article.name}</h1>
			<p className="font-light text-white">{article.price} DZD</p>
			{article.stock == 0 && (
				<p className="text-lg text-red-500">OUT OF STOCK</p>
			)}
		</article>
	);
}
