type Category =
	| "parts"
	| "accessories"
	| "cases"
	| "peripherals"
	| "desks"
	| "chairs";

type Item = {
	id: number;
	name: string;
	desc: string;
	price: number;
	stock: number;
	category: Category;
	img: string;
};

export type { Item, Category };
