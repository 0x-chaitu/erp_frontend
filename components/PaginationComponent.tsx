"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface Props<TData> {
    table: Table<TData>
    pageSizeOptions?: number[]
}

export function PaginationComponent<TData>({
    table,
    pageSizeOptions = [10, 20, 30, 40, 50],
}: Props<TData>) {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const leftEllipsis = currentPage > 3;
    const rightEllipsis = currentPage < table.getPageCount() - 2;


    const generatePaginationLinks = () => {
        const paginationLinks = [];
        for (let i = 1; i <= table.getPageCount(); i++) {

            if (
                i === 1 || i == 2 || i == table.getPageCount() - 1 ||
                i === table.getPageCount()
                ||
                (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
                paginationLinks.push(
                    <PaginationLink
                        key={i}
                        onClick={() => table.setPageIndex(i - 1)}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                );
            }
        }
        console.log(leftEllipsis, rightEllipsis, table.getState().pagination.pageSize);

        if (leftEllipsis) {
            paginationLinks.splice(2, 0, <PaginationEllipsis key="left" />);
        }
        if (rightEllipsis) {

            paginationLinks.splice(
                paginationLinks.length - 2,
                0,
                <PaginationEllipsis key="right" />
            );
        }

        return paginationLinks;
    };

    if (table.getPageCount() <= 1) return null;

    return (
        <Pagination>
            <PaginationContent className=" *:cursor-pointer">
                <Button
                    variant="ghost"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    className="group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-all duration-300 delay-150" />{" "}
                    Previous
                </Button>
                {generatePaginationLinks()}
                <Button
                    variant="ghost"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    className="group"
                >
                    Next
                    <ChevronRight className="group-hover:translate-x-1 transition-all duration-300 delay-150" />
                </Button>
            </PaginationContent>
        </Pagination>
    );
};

