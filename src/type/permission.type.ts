import { Prisma } from "@prisma/client"

// ==== PermissionMedium ====
export type PermissionMedium = Prisma.PermissionGetPayload<{
    select: selectPermissionMediumType
}>
export const selectPermissionMedium = {
    id: true,
    name: true,
    description: true,
}

export const includePermissionMedium = {
    Permissions: {
        select: selectPermissionMedium,
    },
}

export type selectPermissionMediumType = typeof selectPermissionMedium

// ==== PermissionSmall ====
export type PermissionSmall = Prisma.PermissionGetPayload<{
    select: selectPermissionSmallType
}>

export const selectPermissionSmall = {
    id: true,
    name: true,
}

export const includePermissionSmall = {
    Permissions: {
        select: selectPermissionSmall,
    },
}

export type includePermissionSmallType = typeof includePermissionSmall

export type selectPermissionSmallType = typeof selectPermissionSmall

export type PermissionFormatted = {
    id: string
    name: string
    description: string
}
