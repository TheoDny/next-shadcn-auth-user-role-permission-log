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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/component/ui/table"
import { ChangeEvent, CSSProperties, ReactNode, useEffect, useState } from "react"
import { Input } from "@/component/ui/input"

import { remove as removeDiacritics } from "diacritics"

export type DataTableStyle = {
    toolbar?: {
        style?: CSSProperties
        className?: string
    }
    div?: {
        style?: CSSProperties
        className?: string
    }
    table?: {
        style?: CSSProperties
        className?: string
    }
    header?: {
        style?: CSSProperties
        className?: string
    }
    rowHeader?: {
        style?: CSSProperties
        className?: string
    }
    head?: {
        style?: CSSProperties
        className?: string
    }
    body?: {
        style?: CSSProperties
        className?: string
    }
    row?: {
        style?: CSSProperties
        className?: string
    }
    cell?: {
        style?: CSSProperties
        className?: string
    }
    filter?: {
        div?: {
            style?: CSSProperties
            className?: string
        }
        input?: {
            style?: CSSProperties
            className?: string
        }
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    config?: any
    style?: DataTableStyle
    toolbar?: ReactNode
    onDoubleClick?: (index: number) => any
}

export function DataTable<TData, TValue>({
    columns,
    data,
    config,
    style,
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
            <div
                className={"flex py-2 " + style?.filter?.div?.className}
                style={style?.filter?.div?.style}
            >
                <Input
                    placeholder={config?.filterPlaceHolder ?? "Filtre..."}
                    value={globalFilter ?? ""}
                    onChange={handleFilterChange}
                    className={"max-w-sm " + style?.filter?.input?.className}
                    style={style?.filter?.input?.style}
                />
                {toolbar && (
                    <div
                        className={"flex-grow text-right space-x-1" + style?.toolbar?.className}
                        style={style?.toolbar?.style}
                    >
                        {toolbar}
                    </div>
                )}
            </div>
            <div
                className={"rounded-md border " + style?.div?.className}
                style={style?.div?.style}
            >
                <Table
                    className={style?.table?.className}
                    style={style?.table?.style}
                >
                    <TableHeader
                        className={style?.header?.className}
                        style={style?.header?.style}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className={style?.rowHeader?.className}
                                style={style?.rowHeader?.style}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={style?.head?.className}
                                            style={style?.head?.style}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody
                        className={style?.body?.className}
                        style={style?.body?.style}
                    >
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`odd:bg-gray-100 ${style?.row?.className}`}
                                    style={style?.row?.style}
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
                                            className={style?.cell?.className}
                                            style={style?.cell?.style}
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
