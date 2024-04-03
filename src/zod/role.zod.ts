import { z } from "zod"

export const addRoleZod = z.object({
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères ").optional(),
})

export const editRoleZod = z.object({
    roleId: z.string(),
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères ").optional(),
})

export const deleteRoleZod = z.object({
    roleId: z.string(),
})

export const setPermissionsZod = z.object({
    roleId: z.string(),
    permissionIds: z.array(z.string().cuid()),
})
