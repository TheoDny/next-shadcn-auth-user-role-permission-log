"use server"
import { addUser, editUser, resetPassword, sendMailPasswordReset, setRoles } from "@/service/user.service"
import { z } from "zod"
import { action } from "@/lib/safe-actions"
import { addUserZod, editUserZod } from "@/zod/user.zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { checkPermissions } from "@/util/auth.util"
import { idAdminAccount } from "../../prisma/dataSeed"
import jwt, { JwtPayload } from "jsonwebtoken"

export const setRolesAction = action(
    z.object({
        userId: z.string(),
        roleIds: z.array(z.string().cuid()),
    }),
    async ({ userId, roleIds }) => {
        const session = await getServerSession(authOptions)
        if (!session?.user || !checkPermissions(session, ["gestion_user"])) {
            throw new Error("Unauthorized")
        }
        if (userId === idAdminAccount) {
            throw new Error("La réattribution des roles du compte Administrateur n'est autorisé")
        }

        return await setRoles(userId, roleIds)
    },
)

export const addUserAction = action(addUserZod, async ({ firstname, lastname, email, isActive }) => {
    const session = await getServerSession(authOptions)
    if (!session?.user || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }

    return await addUser(firstname, lastname, email, isActive)
})

export const editUserAction = action(editUserZod, async ({ userId, firstname, lastname, email, isActive }) => {
    const session = await getServerSession(authOptions)
    if (!session?.user || (!checkPermissions(session, ["gestion_role"]) && userId !== session.user.id)) {
        throw new Error("Unauthorized")
    }
    if (userId === idAdminAccount) {
        throw new Error("L'édition du compte Administrateur n'est autorisé")
    }

    return await editUser(userId, firstname, lastname, email, isActive)
})

export const resetPasswordAction = action(
    z.object({
        token: z.string().optional(),
        newPassword: z.string(),
    }),
    async ({ token, newPassword }) => {
        if (!token) {
            const session = await getServerSession(authOptions)
            if (!session?.user || !session.user?.id) {
                throw new Error("Unauthorized: No active session found.")
            }
            return await resetPassword(session.user.id, newPassword)
        } else {
            const decodedToken: JwtPayload | string = jwt.verify(token, process.env.APP_SECRET ?? "secret")
            if (!decodedToken || typeof decodedToken === "string" || !decodedToken.idUser) {
                throw new Error("Invalid token: Token is either missing or invalid.")
            }
            return await resetPassword(decodedToken.idUser as string, newPassword)
        }
    },
)

export const sendMailPasswordResetAction = action(
    z.object({
        userId: z.string().nullable(),
    }),
    async ({ userId }) => {
        const session = await getServerSession(authOptions)
        if (!session?.user || (!checkPermissions(session, ["gestion_role"]) && Boolean(userId))) {
            throw new Error("Unauthorized")
        }
        if (!userId) {
            userId = session.user.id as string
        }

        return await sendMailPasswordReset(userId)
    },
)
