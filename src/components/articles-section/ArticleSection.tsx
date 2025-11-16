import type { Article, Category, Filters } from "../../types/items";
import { getAllItems, getItems } from "../../api/api";
import ArticleItem from "./ArticleItem";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { useState, useEffect } from "react";

export default function ArticleSection() {
	const [filters, setFilters] = useState<Filters>({});
	const [articles, setArticles] = useState<Article[]>(getAllItems);

	useEffect(() => {
		setArticles(() => getItems(filters));
	}, [filters]);

	const handleChangeFilters = (newFilters: Filters) => {
		setFilters((prev) => ({ ...prev, newFilters }));
	};

	return (
		<main className="flex flex-col w-screen m-8 gap-16">
			<aside className="flex flex-col items-stretch text-left">
				<h1>Filters</h1>

				<NativeSelect
					onChange={(e) =>
						handleChangeFilters({ category: e.currentTarget.value as Category })
					}
					value={filters.category}
				>
					<NativeSelectOption value="" selected>
						Select Category
					</NativeSelectOption>
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
				className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8"
				id="item-container"
			>
				{articles.map((article) => (
					<ArticleItem article={article} />
				))}
			</div>
		</main>
	);
}
