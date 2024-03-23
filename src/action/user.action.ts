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

export const setRolesAction = action(
    z.object({
        userId: z.string(),
        roleIds: z.array(z.string()),
    }),
    async ({ userId, roleIds }) => {
        return await setRoles(userId, roleIds)
    },
)

export const disabledUserAction = action(
    z.object({
        userId: z.string().cuid(),
    }),
    async ({ userId }) => {
        return await disabledUser(userId)
    },
)

export const activeUserAction = action(
    z.object({
        userId: z.string().cuid(),
    }),
    async ({ userId }) => {
        return await activeUser(userId)
    },
)

export const addUserAction = action(
    z.object({
        firstname: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().min(1),
    }),
    async ({ firstname, lastname, email }) => {
        return await addUser(firstname, lastname, email)
    },
)

export const editUserAction = action(
    z.object({
        userId: z.string().cuid(),
        firstname: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().email(),
    }),
    async ({ userId, firstname, lastname, email }) => {
        return await editUser(userId, firstname, lastname, email)
    },
)

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
