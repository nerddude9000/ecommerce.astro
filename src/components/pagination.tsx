// Custom shadcn pagination abstraction

import { cn } from "@/lib/utils";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./ui/pagination";

export type PaginationState = {
	pages: number;
	currentPage: number;
};

type Props = {
	state: PaginationState;
	updatePage: (i: number) => void;
	className?: string;
};

export function SimplePagination({ state, updatePage, className }: Props) {
	if (state.pages <= 1)
		return null;

	return (
		<Pagination className={cn(className)}>
			<PaginationContent>
				{Array(state.pages).fill(null).map((_, i) => (
					<PaginationItem key={`pagination${i}`}>
						<PaginationLink
							onClick={() => updatePage(i + 1)}
							href="#"
							isActive={state.currentPage === i + 1}
						>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				))}
			</PaginationContent>
		</Pagination>
	);

}

