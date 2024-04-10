import { Prisma } from "@prisma/client"
import { selectUserSmall, selectUserSmallType } from "@/type/user.type"

export type selectLogUserType = {
    select: {
        id: true
        action: true
        description: true
        createdAt: true
        User: {
            select: selectUserSmallType
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
            select: selectUserSmall,
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
