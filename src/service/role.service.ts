import { prisma } from "@/lib/prisma"
import { includeRolePermissions, RoleFull, RoleSmall, selectRoleSmall } from "@/type/role.type"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Role } from "@prisma/client"
import { addLog } from "@/service/log.service"
import { idAdminRole } from "../../prisma/dataSeed"
import { checkPermissions } from "@/util/auth.util"

export const getAllRolePermission = async (): Promise<RoleFull[]> => {
    return prisma.role.findMany({
        include: includeRolePermissions,
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

export const setPermissions = async (roleId: string, permissionIds: string[]): Promise<RoleFull> => {
    const session = await getServerSession(authOptions)
    console.log(session, roleId, permissionIds)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }

    const role = await prisma.role.update({
        where: { id: roleId },
        data: {
            Permissions: {
                set: permissionIds.map((permissionId) => {
                    return { id: permissionId }
                }),
            },
        },
        include: includeRolePermissions,
    })

    if (roleId === idAdminRole) {
        throw new Error("La réattribution des permissions du role Admin n'est autorisé")
    }

    addLog("ROLE_EDIT", `Edition des permissions du role ${role.name} (${role.id})`)

    return role
}

export const addRole = async (name: string, description?: string): Promise<RoleFull> => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }

    const newRole = await prisma.role.create({
        data: {
            name: name,
            description: description ?? undefined,
        },
        include: includeRolePermissions,
    })

    addLog("ROLE_ADD", `Ajout du role ${newRole.name} (${newRole.id})`)

    return newRole
}

export const editRole = async (roleId: string, name: string, description?: string): Promise<RoleFull> => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }
    if (roleId === idAdminRole) {
        throw new Error("La édition du role Admin n'est autorisé")
    }

    const editedRole = await prisma.role.update({
        where: {
            id: roleId,
        },
        data: {
            name: name,
            description: description ?? undefined,
        },
        include: includeRolePermissions,
    })

    addLog("ROLE_EDIT", `Edition du role ${editedRole.name} (${editedRole.id})`)

    return editedRole
}

export const deleteRole = async (roleId: string): Promise<Role> => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }

    if (roleId === idAdminRole) {
        throw new Error("La suppression du role Admin n'est autorisé")
    }

    const deletedRole = await prisma.role.delete({
        where: {
            id: roleId,
        },
    })

    addLog("ROLE_DELETE", `Suppression du role ${deletedRole.name} (${roleId})`)

    return deletedRole
}
