import { RoleSmall } from "@/type/role.type"
import { PermissionSmall } from "@/type/permission.type"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        id: string
        firstname: string
        lastname: string
        email: string
        Roles: RoleSmall[]
        Permissions: PermissionSmall[]
        iat: number
        exp: number
    }
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            name: string
            lastname: string
            email: string
            theme?: string
            Roles: RoleSmall[]
            Permissions: PermissionSmall[]
        } & DefaultSession["user"]
    }
}
