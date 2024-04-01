"use server"
import { addRole, deleteRole, editRole, setPermissions } from "@/service/role.service"
import { z } from "zod"
import { action } from "@/lib/safe-actions"
import { sleep } from "@/util/test.util"
import { addRoleZod, deleteRoleZod, editRoleZod, setPermissionsZod } from "../../zod/role.zod"

export const setPermissionsAction = action(setPermissionsZod, async ({ roleId, permissionIds }) => {
    return await setPermissions(roleId, permissionIds)
})

export const addRoleAction = action(addRoleZod, async ({ name, description }) => {
    return await addRole(name, description)
})

export const editRoleAction = action(editRoleZod, async ({ roleId, name, description }) => {
    return await editRole(roleId, name, description)
})

export const deleteRoleAction = action(deleteRoleZod, async ({ roleId }) => {
    return await deleteRole(roleId)
})
