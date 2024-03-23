import { Prisma } from "@prisma/client"

export type RoleSmall = Prisma.RoleGetPayload<{
    select: selectRoleSmallType
}>

export const selectRoleSmall: selectRoleSmallType = {
    id: true,
    name: true,
    description: true,
}
export type selectRoleSmallType = {
    id: true
    name: true
    description: true
}

export type includeRolePermissionsType = {
    Permissions: {
        select: {
            id: true
            name: true
        }
    }
}

export type RoleFull = Prisma.RoleGetPayload<{
    include: includeRolePermissionsType
}>

export const includeRolePermissions: includeRolePermissionsType = {
    Permissions: {
        select: {
            id: true,
            name: true,
        },
    },
}

export type RoleFormatted = {
    id: string
    name: string
    description: string
    updatedAt: string
    createdAt: string
}
