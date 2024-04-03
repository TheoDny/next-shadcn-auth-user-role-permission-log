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

export const setRolesAction = action(
    z.object({
        userId: z.string(),
        roleIds: z.array(z.string().cuid()),
    }),
    async ({ userId, roleIds }) => {
        return await setRoles(userId, roleIds)
    },
)

export const disabledUserAction = action(activeDesactiveUser, async ({ userId }) => {
    return await disabledUser(userId)
})

export const activeUserAction = action(activeDesactiveUser, async ({ userId }) => {
    return await activeUser(userId)
})

export const addUserAction = action(addUserZod, async ({ firstname, lastname, email }) => {
    return await addUser(firstname, lastname, email)
})

export const editUserAction = action(editUserZod, async ({ userId, firstname, lastname, email }) => {
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
        return await sendMailPasswordReset(userId)
    },
)
