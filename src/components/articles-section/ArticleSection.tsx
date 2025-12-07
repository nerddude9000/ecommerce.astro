import type { Article, Category, Filters } from "../../types/items";
import { getAllProducts, getFilteredProducts } from "../../api/api";
import ArticleItem from "./ArticleItem";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { useState, useEffect } from "react";

export default function ArticleSection() {
	const [filters, setFilters] = useState<Filters>({});
	const [articles, setArticles] = useState<Article[]>(getAllProducts);

	useEffect(() => {
		setArticles(() => getFilteredProducts(filters));
	}, [filters]);

	const handleChangeFilters = (newFilters: Filters) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	return (
		<>
			<aside className="flex flex-col items-start">
				<h1>Filters</h1>

				<NativeSelect
					onChange={(e) =>
						handleChangeFilters({ category: e.currentTarget.value as Category })
					}
					value={filters.category}
				>
					<NativeSelectOption value="">Select Category</NativeSelectOption>
					<NativeSelectOption value="parts">Parts</NativeSelectOption>
					<NativeSelectOption value="accessories">
						Accessories
					</NativeSelectOption>
					<NativeSelectOption value="cases">Cases</NativeSelectOption>
					<NativeSelectOption value="peripherals">
						Peripherals
					</NativeSelectOption>
					<NativeSelectOption value="desks">Desks</NativeSelectOption>
					<NativeSelectOption value="chairs">Chairs</NativeSelectOption>
				</NativeSelect>
			</aside>

			<div
				className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-8"
				id="item-container"
			>
				{articles.map((article) => (
					<ArticleItem key={article.id} article={article} />
				))}
			</div>
		</>
	);
}
