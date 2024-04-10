import { Prisma } from "@prisma/client"
import { includePermissionMedium, includePermissionSmall } from "@/type/permission.type"

// ==== RoleSmall ====
export type RoleSmall = Prisma.RoleGetPayload<{
    select: selectRoleSmallType
}>

export const selectRoleSmall = {
    id: true,
    name: true,
}

export const includeRoleSmall = {
    Roles: {
        select: selectRoleSmall,
    },
}

export type includeRoleSmall = typeof includeRoleSmall

export type selectRoleSmallType = typeof selectRoleSmall

// ==== RoleSmallIncludePermissionSmall ====
export type RoleSmallIncludePermissionSmall = Prisma.RoleGetPayload<{
    select: RoleSmallIncludePermissionSmallType
}>
export const selectRoleSmallIncludePermissionSmall = {
    ...selectRoleSmall,
    ...includePermissionSmall,
}

export const includeRoleSmallIncludePermissionSmall = {
    Roles: {
        select: selectRoleSmallIncludePermissionSmall,
    },
}

export type RoleSmallIncludePermissionSmallType = typeof selectRoleSmallIncludePermissionSmall

// ==== RoleMedium ====
export type RoleMedium = Prisma.RoleGetPayload<{
    select: selectRoleMediumType
}>

export const selectRoleMedium = {
    id: true,
    name: true,
    description: true,
}

export const includeRoleMedium = {
    Roles: {
        select: selectRoleMedium,
    },
}

export type selectRoleMediumType = typeof selectRoleMedium

export type includeRoleMediumType = typeof includeRoleMedium

// ==== RoleMediumIncludePermissionMedium ====
export type RoleMediumIncludePermissionMedium = Prisma.RoleGetPayload<{
    select: RoleMediumIncludePermissionMediumType
}>
export const selectRoleMediumIncludePermissionMedium = {
    ...selectRoleMedium,
    ...includePermissionMedium,
}

export const includeRoleMediumIncludePermissionMedium = {
    Roles: {
        select: selectRoleMediumIncludePermissionMedium,
    },
}

export type RoleMediumIncludePermissionMediumType = typeof selectRoleMediumIncludePermissionMedium

// ==== RoleIncludePermissionSmall ====
export type RoleIncludePermissionSmall = Prisma.RoleGetPayload<{
    select: RoleIncludePermissionSmallType
}>
export const selectRoleIncludePermissionSmall = {
    id: true,
    name: true,
    description: true,
    createdAt: true,
    updatedAt: true,
    ...includePermissionSmall,
}

export const includeRoleIncludePermissionSmall = {
    Roles: {
        select: selectRoleIncludePermissionSmall,
    },
}

export type RoleIncludePermissionSmallType = typeof selectRoleIncludePermissionSmall

// ==== RoleFormatted ====

export type RoleFormatted = {
    id: string
    name: string
    description: string
    updatedAt: string
    createdAt: string
}
