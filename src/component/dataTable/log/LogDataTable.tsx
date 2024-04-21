"use client"
import React, { FC } from "react"
import { DataTable, SortingIndicator } from "@/component/dataTable/DataTable"
import { LogUserFormatted } from "@/type/log.type"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/component/ui/button"
import { sortDate } from "@/util/date.util"

type LogTableProps = {
    dataLogUser: LogUserFormatted[]
}

const LogTable: FC<LogTableProps> = ({ dataLogUser }) => {
    return (
        <DataTable
            data={dataLogUser}
            columns={columnsLog}
            className={{
                containerTableDiv: "h-[calc(100dvh-120px)]",
            }}
        />
    )
}

export const columnsLog: ColumnDef<LogUserFormatted>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Créé
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
        sortingFn: (rowA, rowB, columnId) =>
            sortDate(rowA.getValue(columnId), rowB.getValue(columnId), "DD/MM/YYYY HH:mm:ss"),
    },
    {
        accessorKey: "user",
        header: "Utilisateur",
    },
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]

export default LogTable
