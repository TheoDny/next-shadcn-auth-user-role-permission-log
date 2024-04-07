"use server"
import {
    activeUser,
    addUser,
    disabledUser,
    editUser,
    resetPassword,
    sendMailPasswordReset,
    setRoles,
} from "@/service/user.service"
import { z } from "zod"
import { action } from "@/lib/safe-actions"
import { activeDesactiveUser, addUserZod, editUserZod } from "@/zod/user.zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { checkPermissions } from "@/util/auth.util"
import { idAdminAccount } from "../../prisma/dataSeed"

export const setRolesAction = action(
    z.object({
        userId: z.string(),
        roleIds: z.array(z.string().cuid()),
    }),
    async ({ userId, roleIds }) => {
        const session = await getServerSession(authOptions)
        if (!session || !checkPermissions(session, ["gestion_user"])) {
            throw new Error("Unauthorized")
        }
        if (userId === idAdminAccount) {
            throw new Error("La réattribution des roles du compte Administrateur n'est autorisé")
        }

        return await setRoles(userId, roleIds)
    },
)

export const disabledUserAction = action(activeDesactiveUser, async ({ userId }) => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_user"])) {
        throw new Error("Unauthorized")
    }
    if (userId === idAdminAccount) {
        throw new Error("La désactivation du compte Administrateur n'est autorisé")
    }

    return await disabledUser(userId)
})

export const activeUserAction = action(activeDesactiveUser, async ({ userId }) => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_user"])) {
        throw new Error("Unauthorized")
    }

    return await activeUser(userId)
})

export const addUserAction = action(addUserZod, async ({ firstname, lastname, email }) => {
    const session = await getServerSession(authOptions)
    if (!session || !checkPermissions(session, ["gestion_role"])) {
        throw new Error("Unauthorized")
    }

    return await addUser(firstname, lastname, email)
})

export const editUserAction = action(editUserZod, async ({ userId, firstname, lastname, email }) => {
    const session = await getServerSession(authOptions)
    if (!session || (!checkPermissions(session, ["gestion_role"]) && userId !== session.user.id)) {
        throw new Error("Unauthorized")
    }
    if (userId === idAdminAccount) {
        throw new Error("L'édition du compte Administrateur n'est autorisé")
    }

    return await editUser(userId, firstname, lastname, email)
})

export const resetPasswordAction = action(
    z.object({
        token: z.string(),
        newPassword: z.string(),
    }),
    async ({ token, newPassword }) => {
        return await resetPassword(token, newPassword)
    },
)

export const sendMailPasswordResetAction = action(
    z.object({
        userId: z.string().nullable(),
    }),
    async ({ userId }) => {
        const session = await getServerSession(authOptions)
        if (!session || (!checkPermissions(session, ["gestion_role"]) && Boolean(userId))) {
            throw new Error("Unauthorized")
        }
        if (!userId) {
            userId = session.user.id as string
        }

        return await sendMailPasswordReset(userId)
    },
)
