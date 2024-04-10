"use client"
import dayjs from "dayjs"
import { RoleFormatted, RoleIncludePermissionSmall, RoleSmallIncludePermissionSmall } from "@/type/role.type"
import DoubleDataTable, { ConfigCustomTable } from "@/component/dataTable/DoubleDataTable"
import { Permission } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/component/ui/checkbox"
import { Button } from "@/component/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DataTableStyle } from "@/component/dataTable/DataTable"
import { DialogAddEditRole } from "@/component/dataTable/roleManagement/dialog/DialogAddEditRole"
import { ReactNode, useState } from "react"
import { setPermissionsAction } from "@/action/role.action"
import { toast } from "sonner"
import { handleErrorAction } from "@/util/error.util"

type props = {
    rolesData: RoleIncludePermissionSmall[]
    permissionsData: Permission[]
}
export default function RoleManagementDoubleTable({ rolesData, permissionsData }: props) {
    const [rolesDataRaw, setRolesDataRaw] = useState<RoleIncludePermissionSmall[]>(rolesData)
    const [showDialogAddEditRole, setShowDialogAddEditRole] = useState(false)
    const [selectedRole, setSelectedRole] = useState<(RoleIncludePermissionSmall & { index: number }) | undefined>(
        undefined,
    )

    const configLeft: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des roles...",
    }
    const classNameLeft: DataTableStyle = {
        row: "cursor-pointer",
    }

    const configRight: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des permissions...",
    }
    const classNameRight: DataTableStyle = {
        row: "cursor-pointer",
    }

    const setLeftSelectedWidthIndex = (index: number) => {
        setShowDialogAddEditRole(true)
        setSelectedRole({ index: index, ...rolesDataRaw[index] })
    }

    const closeDialogAddEdit = () => {
        setShowDialogAddEditRole(false)
        setSelectedRole(undefined)
    }

    const toolbarLeft: ReactNode = (
        <Button
            size={"sm"}
            onClick={() => {
                setShowDialogAddEditRole(true)
            }}
        >
            Ajouter un role
        </Button>
    )

    // to align the left and right table
    const toolbarRight: ReactNode = (
        <Button
            size={"sm"}
            className={"opacity-0 cursor-default"}
        >
            Nothing button
        </Button>
    )

    const changePermissionOfRole = async (roleIndex: number, permissionIds: string[]) => {
        const roleId = rolesDataRaw[roleIndex].id
        const response = await setPermissionsAction({
            roleId: roleId,
            permissionIds: permissionIds,
        })
        if (handleErrorAction(response, toast)) {
            setRolesDataRaw((prevState) => {
                const newState = prevState.slice()
                newState[roleIndex] = response.data as RoleIncludePermissionSmall
                return newState
            })
            toast.success("Permissions du role modifiées")
            return true
        }
        return false
    }

    return (
        <div>
            <DialogAddEditRole
                show={showDialogAddEditRole}
                afterSubmit={(role) => {
                    selectedRole
                        ? setRolesDataRaw((prevState) => {
                              const newState = prevState.slice()
                              newState[selectedRole.index] = role
                              return newState
                          })
                        : setRolesDataRaw((prevState) => {
                              const newState = prevState.slice()
                              newState.unshift(role)
                              return newState
                          })
                    closeDialogAddEdit()
                }}
                defaultValues={
                    selectedRole && {
                        id: selectedRole.id,
                        name: selectedRole.name,
                        description: selectedRole.description,
                    }
                }
                closeDialog={closeDialogAddEdit}
            />

            <DoubleDataTable<RoleIncludePermissionSmall, RoleFormatted, Permission, Permission>
                dataLeft={rolesDataRaw}
                formatLeft={formatRolesData}
                columnsLeft={columnsRole}
                configLeft={configLeft}
                classNameLeft={classNameLeft}
                toolbarLeft={toolbarLeft}
                enableColumnVisibilityLeft={true}
                keyLeftToRight={"Permissions"}
                dataRight={permissionsData}
                formatRight={formatPermissionsData}
                columnsRight={columnsPermission}
                configRight={configRight}
                classNameRight={classNameRight}
                onDoubleClickLeft={setLeftSelectedWidthIndex}
                onChangeSelectedRight={changePermissionOfRole}
                toolbarRight={toolbarRight}
                enableColumnVisibilityRight={true}
            />
        </div>
    )
}

const formatRolesData = (rolesData: RoleIncludePermissionSmall[]): RoleFormatted[] => {
    return rolesData.map((role) => {
        return {
            id: role.id,
            name: role.name,
            description: role.description,
            updatedAt: dayjs(role.updatedAt).format("DD/MM/YYYY"),
            createdAt: dayjs(role.createdAt).format("DD/MM/YYYY"),
        }
    })
}

const columnsRole: ColumnDef<RoleFormatted>[] = [
    {
        id: "select",
        header: () => null,
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        size: 10,
        minSize: 10, //enforced during column resizing
        maxSize: 10,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nom
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Mis à jour
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
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
]

const formatPermissionsData = (permissionsData: Permission[]): Permission[] => {
    return permissionsData
}

const columnsPermission: ColumnDef<Permission>[] = [
    {
        id: "select",
        header: () => null,
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nom
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]
