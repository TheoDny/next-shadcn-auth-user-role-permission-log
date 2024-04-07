"use client"
import {
    ColumnDef,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { TableVirtuoso } from "react-virtuoso"

import { Table, TableCell, TableHead, TableRow, TableRowHead } from "@/component/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu"
import { ChangeEvent, ReactNode, useMemo, useRef, useState } from "react"
import { Input } from "@/component/ui/input"

import { remove as removeDiacritics } from "diacritics"
import { cn } from "@/lib/utils"
import { Button } from "@/component/ui/button"

export type DataTableStyle = {
    toolbar?: string
    containerDiv?: string
    containerTableDiv?: string
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
    enableColumnVisibility?: boolean
    refDiv?: any
}

export function DataTable<TData, TValue>({
    columns,
    data,
    config,
    className,
    toolbar,
    onDoubleClick,
    enableColumnVisibility,
    refDiv,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const filterWithAccents: FilterFn<TData[]> = (row, columnId: string, filterValue: string) => {
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
        onColumnVisibilityChange: setColumnVisibility,
        ...config,
        state: {
            sorting,
            rowSelection,
            globalFilter,
            columnVisibility,
            ...config?.state,
        },
    })

    const { rows } = table.getRowModel()
    let selectedDoubleClickRef = useRef<string>("")

    return (
        <div
            className={cn("grow", className?.containerDiv)}
            ref={refDiv}
        >
            <div className={cn("flex flex-col py-1 space-x-1 space-y-1 justify-between", className?.filter?.div)}>
                <div className="flex flex-row">
                    <Input
                        placeholder={config?.filterPlaceHolder ?? "Filtre..."}
                        value={globalFilter ?? ""}
                        onChange={handleFilterChange}
                        className={"max-w-sm " + className?.filter?.input}
                        sizeElement={"sm"}
                    />
                    {enableColumnVisibility && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="ml-auto"
                                    size={"sm"}
                                >
                                    Visibilité
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <div className={"flex-grow text-right space-x-1 " + className?.toolbar}>{toolbar && toolbar}</div>
            </div>
            <div
                className={cn(
                    "relative w-full overflow-auto rounded-md border h-[calc(100dvh-155px)]",
                    className?.containerTableDiv,
                )}
            >
                <TableVirtuoso
                    totalCount={rows.length}
                    increaseViewportBy={400}
                    components={{
                        Table: ({ style, ...props }) => {
                            return (
                                <Table
                                    style={{ ...style, width: "100%" }}
                                    className={className?.table}
                                    {...props}
                                />
                            )
                        },
                        TableRow: (props) => {
                            const index = props["data-index"]
                            const row = rows[index]

                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${index % 2 ? "bg-muted" : ""} ${className?.row}`}
                                    onClick={(_event) => {
                                        if (onDoubleClick) {
                                            if (row.id === selectedDoubleClickRef.current) {
                                                onDoubleClick(index)
                                                row.toggleSelected(true)
                                            } else {
                                                row.toggleSelected()
                                                selectedDoubleClickRef.current = row.id
                                                setTimeout(() => {
                                                    selectedDoubleClickRef.current = ""
                                                }, 300)
                                            }
                                        } else {
                                            row.toggleSelected()
                                        }
                                    }}
                                    {...props}
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
                            )
                        },
                    }}
                    fixedHeaderContent={() => {
                        return table.getHeaderGroups().map((headerGroup) => (
                            <TableRowHead
                                key={headerGroup.id}
                                className={cn("bg-primary", className?.rowHeader)}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={className?.head}
                                            colSpan={header.colSpan}
                                            style={{ width: header.getSize() }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRowHead>
                        ))
                    }}
                />
            </div>
        </div>
    )
}
