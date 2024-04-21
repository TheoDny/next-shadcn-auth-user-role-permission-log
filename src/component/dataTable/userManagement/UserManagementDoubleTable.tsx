"use client"
import dayjs from "dayjs"
import { UserFormatted, UserIncludeRoleSmall } from "@/type/user.type"
import DoubleDataTable, { ConfigCustomTable } from "@/component/dataTable/DoubleDataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/component/ui/checkbox"
import { Button } from "@/component/ui/button"
import { DataTableStyle, SortingIndicator } from "@/component/dataTable/DataTable"
import { DialogAddEditUser } from "@/component/dataTable/userManagement/dialog/DialogAddEditUser"
import { ReactNode, useState } from "react"
import { setRolesAction } from "@/action/user.action"
import { toast } from "sonner"
import { RoleSmall } from "@/type/role.type"
import { handleErrorAction } from "@/util/error.util"
import { MdAccountCircle, MdNoAccounts } from "react-icons/md"
import { sortDate } from "@/util/date.util"

type props = {
    usersData: UserIncludeRoleSmall[]
    rolesData: RoleSmall[]
}
export default function UserManagementDoubleTable({ usersData, rolesData }: props) {
    const [usersDataRaw, setUsersDataRaw] = useState<UserIncludeRoleSmall[]>(usersData)
    const [showDialogAddEditUser, setShowDialogAddEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState<(UserIncludeRoleSmall & { index: number }) | undefined>(
        undefined,
    )

    const configLeft: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des users...",
    }
    const classNameLeft: DataTableStyle = {
        row: "cursor-pointer",
    }
    const configRight: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des roles...",
    }
    const classNameRight: DataTableStyle = {
        row: "cursor-pointer",
    }

    const setLeftSelectedWidthIndex = (index: number) => {
        setShowDialogAddEditUser(true)
        setSelectedUser({ index: index, ...usersDataRaw[index] })
    }

    const closeDialogAddEdit = () => {
        setShowDialogAddEditUser(false)
        setSelectedUser(undefined)
    }

    const toolbarLeft: ReactNode = (
        <Button
            size={"sm"}
            onClick={() => {
                setShowDialogAddEditUser(true)
            }}
        >
            Ajouter un utilisateur
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

    const changeRoleOfUser = async (userIndex: number, roleIds: string[]) => {
        const userId = usersDataRaw[userIndex].id
        const response = await setRolesAction({
            userId: userId,
            roleIds: roleIds,
        })
        if (handleErrorAction(response, toast)) {
            setUsersDataRaw((prevState) => {
                const newState = prevState.slice()
                newState[userIndex] = response.data as UserIncludeRoleSmall
                return newState
            })
            toast.success("Roles du user modifiées")
            return true
        }
        return false
    }

    return (
        <div>
            <DialogAddEditUser
                show={showDialogAddEditUser}
                afterSubmit={(user) => {
                    selectedUser
                        ? setUsersDataRaw((prevState) => {
                              const newState = prevState.slice()
                              newState[selectedUser.index] = user
                              return newState
                          })
                        : setUsersDataRaw((prevState) => {
                              const newState = prevState.slice()
                              newState.unshift(user)
                              return newState
                          })
                    closeDialogAddEdit()
                }}
                defaultValues={
                    selectedUser && {
                        id: selectedUser.id,
                        firstname: selectedUser.firstname,
                        lastname: selectedUser.lastname,
                        email: selectedUser.email,
                        isActive: selectedUser.isActive,
                    }
                }
                closeDialog={closeDialogAddEdit}
            />
            <DoubleDataTable<UserIncludeRoleSmall, UserFormatted, RoleSmall, RoleSmall>
                dataLeft={usersDataRaw}
                formatLeft={formatUsersData}
                columnsLeft={columnsUser}
                configLeft={configLeft}
                classNameLeft={classNameLeft}
                toolbarLeft={toolbarLeft}
                enableColumnVisibilityLeft={true}
                keyLeftToRight={"Roles"}
                dataRight={rolesData}
                formatRight={formatRolesData}
                columnsRight={columnsRole}
                configRight={configRight}
                classNameRight={classNameRight}
                onDoubleClickLeft={setLeftSelectedWidthIndex}
                onChangeSelectedRight={changeRoleOfUser}
                toolbarRight={toolbarRight}
                enableColumnVisibilityRight={true}
            />
        </div>
    )
}

const formatUsersData = (usersData: UserIncludeRoleSmall[]): UserFormatted[] => {
    return usersData.map((user) => {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isActive: user.isActive ? "Oui" : "Non",
            updatedAt: dayjs(user.updatedAt).format("DD/MM/YYYY"),
            createdAt: dayjs(user.createdAt).format("DD/MM/YYYY"),
        }
    })
}

const columnsUser: ColumnDef<UserFormatted>[] = [
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
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstname",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Prénom
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
    },
    {
        accessorKey: "lastname",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Nom
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Email
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
    },
    {
        accessorKey: "isActive",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Actif
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
        cell: ({ cell }) => {
            const isActive =
                cell.getValue() === "Oui" ? (
                    <MdAccountCircle className="text-green-600 w-6 h-6" />
                ) : (
                    <MdNoAccounts className="text-destructive w-6 h-6" />
                )
            return <span className="flex justify-center">{isActive}</span>
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Mis à jour
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
        sortingFn: (rowA, rowB, columnId) => sortDate(rowA.getValue(columnId), rowB.getValue(columnId)),
    },
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
        sortingFn: (rowA, rowB, columnId) => sortDate(rowA.getValue(columnId), rowB.getValue(columnId)),
    },
]

const formatRolesData = (rolesData: RoleSmall[]): RoleSmall[] => {
    return rolesData
}

export const columnsRole: ColumnDef<RoleSmall>[] = [
    {
        id: "select",
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        size: 10,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Nom
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Description
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
    },
]
