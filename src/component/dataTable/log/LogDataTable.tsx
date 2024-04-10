"use client"
import React, { FC } from "react"
import { DataTable } from "@/component/dataTable/DataTable"
import { LogUserFormatted } from "@/type/log.type"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/component/ui/button"
import { ArrowUpDown } from "lucide-react"

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
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Créé
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
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
