import { prisma } from "@/lib/prisma"
import {
    selectUserIncludeRoleMediumIncludePermissionMedium,
    selectUserIncludeRoleSmall,
    selectUserWithPwdIncludeRoleSmallIncludePermissionSmall,
    UserIncludeRoleMediumIncludePermissionMedium,
    UserIncludeRoleSmall,
    UserInfoFull,
    UserInfoFullMedium,
    UserWithPwdIncludeRoleSmallIncludePermissionSmall,
} from "@/type/user.type"
import { PermissionMedium, PermissionSmall } from "@/type/permission.type"
import { addLog } from "@/service/log.service"
import { hash } from "bcryptjs"
import { sendEmailNewUser } from "@/service/mail.service"

export const getUserFullInfoFromEmailOrId = async (
    emailOrId: string,
    from: "id" | "email" = "id",
): Promise<UserInfoFull | null> => {
    const where = from === "id" ? { id: emailOrId } : { email: emailOrId }

    const userFull: UserWithPwdIncludeRoleSmallIncludePermissionSmall | null = await prisma.user.findUnique({
        where,
        select: selectUserWithPwdIncludeRoleSmallIncludePermissionSmall,
    })

    if (!userFull) return null

    const permissionsSet = new Set<PermissionSmall>()
    userFull.Roles.forEach((role) => {
        role.Permissions.forEach((permission) => {
            permissionsSet.add(permission)
        })
        // @ts-ignore:TS2790 --- Clear Permissions to avoid unnecessary data transfer
        delete role.Permissions
    })

    const permissions: PermissionSmall[] = Array.from(permissionsSet)

    return { ...userFull, Permissions: permissions }
}

export const getAllUserRole = async (): Promise<UserIncludeRoleSmall[]> => {
    return prisma.user.findMany({
        select: selectUserIncludeRoleSmall,
    })
}

export const setRoles = async (userId: string, roleIds: string[]): Promise<UserIncludeRoleSmall> => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            Roles: {
                set: roleIds.map((roleId) => {
                    return { id: roleId }
                }),
            },
        },
        select: selectUserIncludeRoleSmall,
    })

    addLog(
        "USER_EDIT",
        `Edition des roles de l'utilisateur ${user.lastname.toUpperCase()} ${user.firstname} (${user.id})`,
    )

    return user
}

export const addUser = async (
    firstname: string,
    lastname: string,
    email: string,
    isActive?: boolean,
): Promise<UserIncludeRoleSmall> => {
    const newUser = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: "to_define_with_email_send",
            isActive: isActive,
        },
        select: selectUserIncludeRoleSmall,
    })

    const resEmail = await sendEmailNewUser(newUser.email, newUser.id)
    if (!resEmail) {
        await prisma.user.delete({
            where: { id: newUser.id },
        })
        throw new Error("Sending email failed")
    }

    addLog("USER_ADD", `Ajout de l'utilisateur ${newUser.lastname} ${newUser.firstname} (${newUser.id})`)

    return newUser
}

export const editUser = async (
    userId: string,
    firstname: string,
    lastname: string,
    email: string,
    isActive?: boolean,
): Promise<UserIncludeRoleSmall> => {
    const editedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            isActive: isActive,
        },
        select: selectUserIncludeRoleSmall,
    })

    addLog(
        "USER_EDIT",
        `Edition de l'utilisateur ${editedUser.lastname.toUpperCase()} ${editedUser.firstname} (${editedUser.id})`,
    )

    return editedUser
}

export const resetPassword = async (idUser: string, newPassword: string) => {
    await prisma.user.update({
        where: {
            id: idUser,
        },
        data: {
            password: await hash(newPassword, 12),
        },
    })

    addLog("USER_CHANGE_PWD", "Changement de mot de passe", idUser)

    return true
}

export const sendMailPasswordReset = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    })
    if (!user) {
        throw new Error("User not found")
    }

    const resEmail = await sendEmailNewUser(user.email, user.id)
    if (!resEmail) {
        throw new Error("failed to send email")
    }

    return resEmail
}

export const getAccountInfo = async (userId: string): Promise<UserInfoFullMedium | null> => {
    const userFull: UserIncludeRoleMediumIncludePermissionMedium | null = await prisma.user.findUnique({
        where: { id: userId },
        select: selectUserIncludeRoleMediumIncludePermissionMedium,
    })

    if (!userFull) return null

    const permissionsSet = new Set<PermissionMedium>()
    userFull.Roles.forEach((role) => {
        role.Permissions.forEach((permission) => {
            permissionsSet.add(permission)
        })
        // @ts-ignore:TS2790 --- Clear Permissions to avoid unnecessary data transfer
        delete role.Permissions
    })

    const permissions: PermissionMedium[] = Array.from(permissionsSet)

    return { ...userFull, Permissions: permissions }
}
