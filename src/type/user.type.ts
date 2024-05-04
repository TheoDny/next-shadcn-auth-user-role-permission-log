import { Prisma } from "@prisma/client"
import { PermissionMedium, PermissionSmall } from "@/type/permission.type"
import {
    includeRoleMedium,
    includeRoleMediumIncludePermissionMedium,
    includeRoleSmall,
    includeRoleSmallIncludePermissionSmall,
} from "@/type/role.type"

// ==== UserSmall ====
export type UserSmall = Prisma.UserGetPayload<{
    select: selectUserSmallType
}>

export type selectUserSmallType = typeof selectUserSmall

export const selectUserSmall = {
    id: true,
    firstname: true,
    lastname: true,
}

// ==== User ====

export type User = Prisma.UserGetPayload<{
    select: selectUserType
}>
export const selectUser = {
    id: true,
    firstname: true,
    lastname: true,
    email: true,
    isActive: true,
    updatedAt: true,
    createdAt: true,
    deletedAt: true,
}

export type selectUserType = typeof selectUser

// ==== UserIncludeRoleSmall ====

export type selectUserIncludeRoleSmallType = typeof selectUserIncludeRoleSmall

export const selectUserIncludeRoleSmall = {
    ...selectUser,
    ...includeRoleSmall,
}

export type UserIncludeRoleSmall = Prisma.UserGetPayload<{
    select: selectUserIncludeRoleSmallType
}>

// ==== UserIncludeRoleSmallIncludePermissionSmall ====

export type selectUserIncludeRoleSmallIncludePermissionSmallType =
    typeof selectUserIncludeRoleSmallIncludePermissionSmall

export const selectUserIncludeRoleSmallIncludePermissionSmall = {
    ...selectUser,
    ...includeRoleSmallIncludePermissionSmall,
}

export type UserIncludeRoleSmallIncludePermissionSmall = Prisma.UserGetPayload<{
    select: selectUserIncludeRoleSmallIncludePermissionSmallType
}>

// ==== UserWithPwd ====

export const selectUserWithPwd = {
    ...selectUser,
    password: true,
}

export type selectUserWithPwdType = typeof selectUserWithPwd

// ==== UserWithPwdIncludeRoleSmallIncludePermissionSmall ====

export const selectUserWithPwdIncludeRoleSmallIncludePermissionSmall = {
    ...selectUserWithPwd,
    ...includeRoleSmallIncludePermissionSmall,
}

export type selectUserWithPwdIncludeRoleSmallIncludePermissionSmallType =
    typeof selectUserWithPwdIncludeRoleSmallIncludePermissionSmall

export type UserWithPwdIncludeRoleSmallIncludePermissionSmall = Prisma.UserGetPayload<{
    select: selectUserWithPwdIncludeRoleSmallIncludePermissionSmallType
}>

// ==== UserInfoFull ====

export type UserInfoFull = Prisma.UserGetPayload<{
    select: selectUserWithPwdType & includeRoleSmall
}> & { Permissions: PermissionSmall[] }

// ==== UserInfoFullMedium ====

export const selectUserInfoFullMedium = {
    ...selectUser,
    ...includeRoleMedium,
}

export type selectUserInfoFullMediumType = typeof selectUserInfoFullMedium

export type UserInfoFullMedium = Prisma.UserGetPayload<{
    select: selectUserInfoFullMediumType
}> & { Permissions: PermissionMedium[] }

// ==== UserIncludeRoleMediumIncludePermissionMedium ====

export type UserIncludeRoleMediumIncludePermissionMedium = Prisma.UserGetPayload<{
    select: selectUserIncludeRoleMediumIncludePermissionMediumType
}>

export const selectUserIncludeRoleMediumIncludePermissionMedium = {
    ...selectUser,
    ...includeRoleMediumIncludePermissionMedium,
}

export type selectUserIncludeRoleMediumIncludePermissionMediumType =
    typeof selectUserIncludeRoleMediumIncludePermissionMedium

// ==== UserFormatted ====

export type UserFormatted = {
    id: string
    firstname: string
    lastname: string
    email: string
    isActive: "Oui" | "Non"
    updatedAt: string
    createdAt: string
}
