"use server"
import { addRole, deleteRole, editRole, setPermissions } from "@/service/role.service"
import { action } from "@/lib/safe-actions"
import { addRoleZod, deleteRoleZod, editRoleZod, setPermissionsZod } from "@/zod/role.zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { checkPermissions } from "@/util/auth.util"
import { idAdminRole } from "../../prisma/dataSeed"

export const setPermissionsAction = action(setPermissionsZod, async ({ roleId, permissionIds }) => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }
    if (roleId === idAdminRole) {
        throw new Error("La réattribution des permissions du role Admin n'est autorisé")
    }

    return await setPermissions(roleId, permissionIds)
})

export const addRoleAction = action(addRoleZod, async ({ name, description }) => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }

    return await addRole(name, description)
})

export const editRoleAction = action(editRoleZod, async ({ roleId, name, description }) => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }
    if (roleId === idAdminRole) {
        throw new Error("La édition du role Admin n'est autorisé")
    }

    return await editRole(roleId, name, description)
})

export const deleteRoleAction = action(deleteRoleZod, async ({ roleId }) => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }

    if (roleId === idAdminRole) {
        throw new Error("La suppression du role Admin n'est autorisé")
    }

    return await deleteRole(roleId)
})
