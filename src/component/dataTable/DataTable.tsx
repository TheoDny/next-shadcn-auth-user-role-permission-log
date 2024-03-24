"use client"
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableRowHead } from "@/component/ui/table"
import { ChangeEvent, CSSProperties, ReactNode, useEffect, useState } from "react"
import { Input } from "@/component/ui/input"

import { remove as removeDiacritics } from "diacritics"
import { cn } from "@/lib/utils"

export type DataTableStyle = {
    toolbar?: string
    containerDiv?: string
    table?: string
    header?: string
    rowHeader?: string
    head?: string
    body?: string
    row?: string
    cell?: string
    filter?: {
        div?: string
        input?: string
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    config?: any
    className?: DataTableStyle
    toolbar?: ReactNode
    onDoubleClick?: (index: number) => any
}

export function DataTable<TData, TValue>({
    columns,
    data,
    config,
    className,
    toolbar,
    onDoubleClick,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")

    const filterWithAccents: FilterFn<any> = (row, columnId: string, filterValue: string) => {
        const cellValue = row.getValue<string | null>(columnId)
        const normalizedCellValue = removeDiacritics(String(cellValue).toLowerCase())
        const normalizedFilterValue = removeDiacritics(filterValue.toLowerCase())

        return normalizedCellValue.includes(normalizedFilterValue)
    }

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        table.setGlobalFilter(value)
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: filterWithAccents,
        ...config,
        state: {
            sorting,
            rowSelection,
            globalFilter,
            ...config?.state,
        },
    })

    return (
        <div>
            <div className={"flex py-2 " + className?.filter?.div}>
                <Input
                    placeholder={config?.filterPlaceHolder ?? "Filtre..."}
                    value={globalFilter ?? ""}
                    onChange={handleFilterChange}
                    className={"max-w-sm " + className?.filter?.input}
                />
                {toolbar && <div className={"flex-grow text-right space-x-1" + className?.toolbar}>{toolbar}</div>}
            </div>
            <div className={cn("relative w-full overflow-auto rounded-md border h-[calc(100dvh-125px)]", className?.containerDiv)}>
                <Table className={className?.table}>
                    <TableHeader className={className?.header}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRowHead
                                key={headerGroup.id}
                                className={cn("bg-primary", className?.rowHeader)}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={className?.head}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRowHead>
                        ))}
                    </TableHeader>
                    <TableBody className={className?.body}>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`odd:bg-gray-100 ${className?.row}`}
                                    onClick={() => row.toggleSelected()}
                                    onDoubleClick={
                                        onDoubleClick &&
                                        (() => {
                                            setRowSelection({})
                                            onDoubleClick(index)
                                        })
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={className?.cell}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Aucun résultat
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
