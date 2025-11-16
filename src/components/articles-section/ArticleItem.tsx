import type { Article } from "../../types/items";

interface Props {
	article: Article;
}

export default function ArticleItem({ article }: Props) {
	return (
		<article class="max-w-64 flex flex-col gap-2 bg-neutral-800 p-2 rounded-2xl">
			<div class="w-full h-64">
				<img src={article.img} alt="" />
			</div>

			<h1 class="text-lg font-black italic">{article.name}</h1>
			<p class="font-light text-white">{article.price} DZD</p>
			{article.stock == 0 && <p class="text-lg text-red-500">OUT OF STOCK</p>}
		</article>
	);
}
