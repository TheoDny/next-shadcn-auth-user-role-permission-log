"use client"
import dayjs from "dayjs"
import { RoleFormatted, RoleFull } from "@/type/role.type"
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

type props = {
    rolesData: RoleFull[]
    permissionsData: Permission[]
}
export default function RoleManagementDoubleTable({ rolesData, permissionsData }: props) {
    const [rolesDataRaw, setRolesDataRaw] = useState<RoleFull[]>(rolesData)
    const [showDialogAddEditRole, setShowDialogAddEditRole] = useState(false)
    const [selectedRole, setSelectedRole] = useState<(RoleFull & { index: number }) | undefined>(undefined)

    const configLeft: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des roles...",
    }
    const styleLeft: DataTableStyle = {
        body: {
            style: {
                height: "500px", //"calc(100dvh - 200px)",
            },
        },
        row: {
            style: {
                height: "40px",
            },
            className: "cursor-pointer",
        },
        rowHeader: {
            style: {
                height: "40px",
            },
        },
    }

    const configRight: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des permissions...",
    }
    const styleRight: DataTableStyle = {
        body: {
            style: {
                height: "calc(100dvh - 200px)",
            },
        },
        row: {
            style: {
                height: "40px",
            },
            className: "cursor-pointer",
        },
        rowHeader: {
            style: {
                height: "40px",
            },
        },
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

    const changePermissionOfRole = async (roleIndex: number, permissionIds: string[]) => {
        const roleId = rolesDataRaw[roleIndex].id
        const response = await setPermissionsAction({
            roleId: roleId,
            permissionIds: permissionIds,
        })
        if (response.validationErrors) {
            toast.error(nextSafeActionValiationErrorToString(response.validationErrors))
            console.error(response.validationErrors)
        } else if (response.serverError) {
            toast.error(response.serverError)
            console.error(response.serverError)
        } else if (!response.data) {
            toast.error("Une erreur est survenue")
            console.error("Une erreur est survenue")
        } else {
            setRolesDataRaw((prevState) => {
                const newState = prevState.slice()
                newState[roleIndex] = response.data as RoleFull
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

            <DoubleDataTable<RoleFull, RoleFormatted, Permission, Permission>
                dataLeft={rolesDataRaw}
                formatLeft={formatRolesData}
                columnsLeft={columnsRole}
                configLeft={configLeft}
                styleLeft={styleLeft}
                toolbarLeft={toolbarLeft}
                keyLeftToRight={"Permissions"}
                dataRight={permissionsData}
                formatRight={formatPermissionsData}
                columnsRight={columnsPermission}
                configRight={configRight}
                styleRight={styleRight}
                onDoubleClickLeft={setLeftSelectedWidthIndex}
                onChangeSelectedRight={changePermissionOfRole}
            />
        </div>
    )
}

const formatRolesData = (rolesData: RoleFull[]): RoleFormatted[] => {
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
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                size={"sm"}
                variant="ghost"
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
                variant="ghost"
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
                variant="ghost"
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
                variant="ghost"
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
