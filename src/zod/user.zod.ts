import { z } from "zod"

export const addUserZod = z.object({
    firstname: z.string().min(1).max(48, "Le prénom doit être compris entre 1 et 48 caractères"),
    lastname: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    email: z.string().email("L'email doit être valide"),
})

export const editUserZod = z.object({
    userId: z.string().cuid(),
    firstname: z.string().min(1).max(48, "Le prénom doit être compris entre 1 et 48 caractères"),
    lastname: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    email: z.string().email("L'email doit être valide"),
})

export const activeDesactiveUser = z.object({
    userId: z.string().cuid(),
})
