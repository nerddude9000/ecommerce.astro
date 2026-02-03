import type { Article, Category, Filters } from "../../types/items";
import { getFilteredProducts, getMaxPages } from "../../api/api";
import ArticleItem from "./ArticleItem";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { useState, useEffect } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";
import { SimplePagination, type PaginationState } from "../pagination";

export default function ArticleSection() {
	const [filters, setFilters] = useState<Filters>({});
	const [articles, setArticles] = useState<Article[]>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pages: getMaxPages(filters),
		currentPage: 1
	});

	useEffect(() => {
		setArticles(getFilteredProducts(filters, pagination.currentPage));
	}, [filters, pagination]);

	useEffect(() => {
		const maxPages = getMaxPages(filters);

		setPagination({
			pages: maxPages,
			currentPage: 1
		});
	}, [filters])

	const handleChangeFilters = (newFilters: Filters) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	const handleChangePage = (targetPage: number) => {
		setPagination(prev => ({ ...prev, currentPage: targetPage }));
	}

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

			<SimplePagination state={pagination} updatePage={handleChangePage} />

			<div
				className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-8"
				id="item-container"
			>
				{articles.length > 0
					? articles.map((article) => (
						<ArticleItem key={article.id} article={article} />
					))
					: <p className="text-lg italic">No products match the selected filters ): .</p>
				}
			</div>

			<SimplePagination state={pagination} updatePage={handleChangePage} />
		</>
	);
}
