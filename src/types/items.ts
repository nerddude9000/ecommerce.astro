type Item = {
	id: number;
	name: string;
	desc: string;
	price: number;
	stock: number;
};

type GraphicalItem = Item & {
	imgs: string | string[];
};
