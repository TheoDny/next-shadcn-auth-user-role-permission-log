import { prisma } from "@/lib/prisma"
import { includeUserFull, includeUserRole, UserFull, UserInfoFull, UserRole } from "@/type/user.type"
import { PermissionSmall } from "@/type/permission.type"
import { addLog } from "@/service/log.service"
import { hash } from "bcryptjs"
import { sendEmailNewUser } from "@/service/mail.service"

export const getUserFullInfoFromEmailOrId = async (
    emailOrId: string,
    from: "id" | "email" = "id",
): Promise<UserInfoFull | null> => {
    const where = from === "id" ? { id: emailOrId } : { email: emailOrId }

    const userFull: UserFull | null = await prisma.user.findUnique({
        where,
        include: {
            ...includeUserFull,
            Roles: {
                include: {
                    Permissions: true,
                },
            },
        },
    })

    if (!userFull) return null

    const permissionsSet = new Set<PermissionSmall>()
    userFull.Roles.forEach((role) => {
        role.Permissions.forEach((permission) => {
            permissionsSet.add(permission)
        })
        // @ts-ignore --- Clear Permissions to avoid unnecessary data transfer
        delete role.Permissions
    })

    const permissions: PermissionSmall[] = Array.from(permissionsSet)

    return { ...userFull, Permissions: permissions }
}

export const getAllUserRole = async (): Promise<UserRole[]> => {
    return prisma.user.findMany({
        include: includeUserRole,
    })
}

export const setRoles = async (userId: string, roleIds: string[]): Promise<UserRole> => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            Roles: {
                set: roleIds.map((roleId) => {
                    return { id: roleId }
                }),
            },
        },
        include: includeUserRole,
    })

    addLog(
        "USER_EDIT",
        `Edition des roles de l'utilisateur ${user.lastname.toUpperCase()} ${user.firstname} (${user.id})`,
    )

    return user
}

export const disabledUser = async (userId: string) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            isActive: false,
        },
        include: includeUserRole,
    })

    addLog(
        "USER_DEACTIVATE",
        `Désactivation de l'utilisateur ${user.lastname.toUpperCase()} ${user.firstname} (${user.id})`,
    )

    return user
}

export const activeUser = async (userId: string) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            isActive: true,
        },
        include: includeUserRole,
    })

    addLog(
        "USER_ACTIVATE",
        `Activation de l'utilisateur ${user.lastname.toUpperCase()} ${user.firstname} (${user.id})`,
    )

    return user
}

export const addUser = async (firstname: string, lastname: string, email: string): Promise<UserRole> => {
    const newUser = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: "to_define_with_email_send",
        },
        include: includeUserRole,
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
): Promise<UserRole> => {
    const editedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
        },
        include: includeUserRole,
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
