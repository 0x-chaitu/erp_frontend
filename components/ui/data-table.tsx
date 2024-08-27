"use client"

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { PaginationComponent } from "@/components/PaginationComponent"



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    pageCount?: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageCount
}: DataTableProps<TData, TValue>) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // search params
    const page = searchParams?.get("page") ?? "1" // default is page: 1
    const per_page = searchParams?.get("per_page") ?? "10" // default 5 record per page

    // create query string
    const createQueryString = useCallback(
        (params: Record<string, string | number | null>) => {
            const newSearchParams = new URLSearchParams(searchParams?.toString())

            for (const [key, value] of Object.entries(params)) {
                if (value === null) {
                    newSearchParams.delete(key)
                } else {
                    newSearchParams.set(key, String(value))
                }
            }

            return newSearchParams.toString()
        },
        [searchParams]
    )



    const [{ pageIndex, pageSize }, setPagination] =
        useState<PaginationState>({
            pageIndex: Number(page) - 1,
            pageSize: Number(per_page),
        })

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    useEffect(() => {
        setPagination({
            pageIndex: Number(page) - 1,
            pageSize: Number(per_page),
        })
    }, [page, per_page])

    useEffect(() => {



        router.push(
            `${pathname}?${createQueryString({
                page: pageIndex + 1,
                per_page: pageSize,
            })}`,
        )

    }, [pageIndex, pageSize])


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        pageCount: pageCount ?? -1,
        state: {
            pagination
        },
        onPaginationChange: setPagination,
        manualPagination: true,
    })


    return (
        <div>
            <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
                <Table className="relative">
                    <TableHeader className="sticky top-0 bg-secondary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}</TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex items-center justify-end space-x-2 py-4">
                <PaginationComponent table={table} />
            </div>

        </div >
    )

}