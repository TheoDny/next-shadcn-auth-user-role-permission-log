import jwt from "jsonwebtoken"
import { StringValueTime } from "@/type/jwt.type"
import { Session } from "next-auth"
import { PermissionSmall } from "@/type/permission.type"

const secretKey = process.env.APP_SECRET ?? "secret" // Remplacez par une clé secrète sécurisée
export const generateToken = (object: { [key: string]: string }, duration: StringValueTime) => {
    return jwt.sign(object, secretKey, { expiresIn: duration })
}

export const checkPermissions = (session: Session, permissionsRequired: string[]): boolean => {
    const userPermissionNames = new Set(
        session.user.Permissions.map((permission: PermissionSmall) => permission.name),
    )
    return permissionsRequired.every((required) => userPermissionNames.has(required))
}
