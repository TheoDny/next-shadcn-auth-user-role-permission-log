import { prisma } from "@/lib/prisma"
import {
    RoleIncludePermissionSmall,
    RoleSmall,
    selectRoleIncludePermissionSmall,
    selectRoleSmall,
} from "@/type/role.type"
import { Role } from "@prisma/client"
import { addLog } from "@/service/log.service"

export const getAllRolePermission = async (): Promise<RoleIncludePermissionSmall[]> => {
    return prisma.role.findMany({
        select: selectRoleIncludePermissionSmall,
    })
}

export const getAllRole = async (): Promise<Role[]> => {
    return prisma.role.findMany({})
}

export const getAllRoleSmall = async (): Promise<RoleSmall[]> => {
    return prisma.role.findMany({
        select: selectRoleSmall,
    })
}

export const setPermissions = async (
    roleId: string,
    permissionIds: string[],
): Promise<RoleIncludePermissionSmall> => {
    const role = await prisma.role.update({
        where: { id: roleId },
        data: {
            Permissions: {
                set: permissionIds.map((permissionId) => {
                    return { id: permissionId }
                }),
            },
        },
        select: selectRoleIncludePermissionSmall,
    })

    addLog("ROLE_EDIT", `Edition des permissions du role ${role.name} (${role.id})`)

    return role
}

export const addRole = async (name: string, description?: string): Promise<RoleIncludePermissionSmall> => {
    const newRole = await prisma.role.create({
        data: {
            name: name,
            description: description ?? undefined,
        },
        select: selectRoleIncludePermissionSmall,
    })

    addLog("ROLE_ADD", `Ajout du role ${newRole.name} (${newRole.id})`)

    return newRole
}

export const editRole = async (
    roleId: string,
    name: string,
    description?: string,
): Promise<RoleIncludePermissionSmall> => {
    const editedRole = await prisma.role.update({
        where: {
            id: roleId,
        },
        data: {
            name: name,
            description: description ?? undefined,
        },
        select: selectRoleIncludePermissionSmall,
    })

    addLog("ROLE_EDIT", `Edition du role ${editedRole.name} (${editedRole.id})`)

    return editedRole
}

export const deleteRole = async (roleId: string): Promise<Role> => {
    const deletedRole = await prisma.role.delete({
        where: {
            id: roleId,
        },
    })

    addLog("ROLE_DELETE", `Suppression du role ${deletedRole.name} (${roleId})`)

    return deletedRole
}
