import { useEffect, useState } from "preact/hooks";
import type { Article, Filters } from "../../types/items";
import { getAllItems, getItems } from "../../api/api";
import ArticleItem from "./ArticleItem";

export default function ArticleSection() {
	const [filters, setFilters] = useState<Filters>({});
	const [articles, setArticles] = useState<Article[]>(getAllItems);

	useEffect(() => {
		setArticles(() => getItems(filters));
	}, [filters]);

	return (
		<main class="flex flex-col w-screen m-8 gap-16">
			<aside class="flex flex-col items-stretch text-left">
				<h1>Filters</h1>

				<select name="categories" id="category-select">
					<option value="all" selected>
						All
					</option>
					<option value="parts">Parts</option>
					<option value="accessories">Accessories</option>
					<option value="cases">Cases</option>
					<option value="peripherals">Peripherals</option>
					<option value="desks">Desks</option>
					<option value="chairs">Chairs</option>
				</select>
			</aside>

			<div
				class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8"
				id="item-container"
			>
				{articles.map((article) => (
					<ArticleItem article={article} />
				))}
			</div>
		</main>
	);
}
