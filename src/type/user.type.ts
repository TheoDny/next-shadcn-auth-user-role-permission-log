import { Prisma } from "@prisma/client"
import { PermissionSmall } from "@/type/permission.type"

export type includeUserFullType = {
    Roles: {
        select: {
            id: true
            name: true
            Permissions: {
                select: {
                    id: true
                    name: true
                }
            }
        }
    }
}

export const includeUserFull: includeUserFullType = {
    Roles: {
        select: {
            id: true,
            name: true,
            Permissions: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
}

export type UserFull = Prisma.UserGetPayload<{
    include: includeUserFullType
}>

export type includeUserRoleType = {
    Roles: {
        select: {
            id: true
            name: true
        }
    }
}

export const includeUserRole: includeUserRoleType = {
    Roles: {
        select: {
            id: true,
            name: true,
        },
    },
}

export type UserRole = Prisma.UserGetPayload<{
    select: {
        id: true
        firstname: true
        lastname: true
        email: true
        isActive: true
        updatedAt: true
        createdAt: true
    }
    include: includeUserRoleType
}>

export type UserInfoFull = Prisma.UserGetPayload<{
    include: includeUserRoleType
}> & { Permissions: PermissionSmall[] }

export type UserFormatted = {
    id: string
    firstname: string
    lastname: string
    email: string
    isActive: "Oui" | "Non"
    updatedAt: string
    createdAt: string
}
