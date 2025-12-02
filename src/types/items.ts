type Category =
	| "parts"
	| "accessories"
	| "cases"
	| "peripherals"
	| "desks"
	| "chairs";

type Article = {
	id: number;
	name: string;
	desc: string;
	price: number;
	stock: number;
	category: Category;
	img: string;
};

type Filters = Partial<{
	category: Category;
}>;

export type { Article, Category, Filters };
