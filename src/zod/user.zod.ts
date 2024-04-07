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

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/
export const resetPasswordZod = z
    .object({
        token: z.string().optional(),
        newPassword: z.string().refine((value) => passwordRegex.test(value), {
            message:
                "Le mot de passe doit être entre 8 et 64 caractères et contenir au moins une majuscule, un chiffre et un caractère spécial (@$!%*?&)",
            path: ["newPassword"],
        }),
        repeatNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.repeatNewPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["repeatNewPassword"],
    })
