"use server"
import { addRole, deleteRole, editRole, setPermissions } from "@/service/role.service"
import { z } from "zod"
import { action } from "@/lib/safe-actions"
import { sleep } from "@/util/test.util"

export const setPermissionsAction = action(
    z.object({
        roleId: z.string(),
        permissionIds: z.array(z.string()),
    }),
    async ({ roleId, permissionIds }) => {
        return await setPermissions(roleId, permissionIds)
    },
)

export const addRoleAction = action(
    z.object({
        name: z.string().min(1).max(48),
        description: z.string().max(96).optional(),
    }),
    async ({ name, description }) => {
        return await addRole(name, description)
    },
)

export const editRoleAction = action(
    z.object({
        roleId: z.string(),
        name: z.string().min(1).max(48),
        description: z.string().max(96).optional(),
    }),
    async ({ roleId, name, description }) => {
        return await editRole(roleId, name, description)
    },
)

export const deleteRoleAction = action(
    z.object({
        roleId: z.string(),
    }),
    async ({ roleId }) => {
        return await deleteRole(roleId)
    },
)
