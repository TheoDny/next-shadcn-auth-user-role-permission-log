import { Prisma } from "@prisma/client"

export type selectLogUserType = {
    select: {
        id: true
        action: true
        description: true
        createdAt: true
        User: {
            select: {
                firstname: true
                lastname: true
            }
        }
    }
}

export const selectLogUser: selectLogUserType = {
    select: {
        id: true,
        action: true,
        description: true,
        createdAt: true,
        User: {
            select: {
                firstname: true,
                lastname: true,
            },
        },
    },
}

export type LogUser = Prisma.LogGetPayload<selectLogUserType>

export type LogUserFormatted = {
    action: string
    description: string
    createdAt: string
    user: string
}
