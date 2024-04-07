import { compare } from "bcryptjs"
import { AuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserInfoFull } from "@/type/user.type"
import { getUserFullInfoFromEmailOrId } from "@/service/user.service"
import { PermissionSmall } from "@/type/permission.type"
import { addLog } from "@/service/log.service"

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const userInfo: UserInfoFull | null = await getUserFullInfoFromEmailOrId(
                    credentials.email,
                    "email",
                )

                if (!userInfo || !(await compare(credentials.password, userInfo.password))) {
                    throw new Error("Identifiant incorrect")
                }
                if (!userInfo.isActive) {
                    throw new Error("Compte désactivé")
                }

                addLog(
                    "CONNEXION_SUCCESS",
                    `Connexion à l'application de ${userInfo.lastname.toUpperCase()} ${userInfo.firstname}`,
                    userInfo.id,
                )

                return {
                    id: userInfo.id,
                    firstname: userInfo.firstname,
                    lastname: userInfo.lastname,
                    email: userInfo.email,
                    isActive: userInfo.isActive,
                    Roles: userInfo.Roles,
                    Permissions: userInfo.Permissions,
                }
            },
        }),
    ],
    callbacks: {
        //@ts-ignore
        session: async ({ token }) => {
            return {
                user: {
                    id: token.id,
                    firstname: token.firstname,
                    lastname: token.lastname,
                    email: token.email,
                    isActive: token.isActive,
                    Roles: token.Roles,
                    Permissions: token.Permissions,
                },
            }
        },
        //@ts-ignore
        jwt: async ({ token }) => {
            const id = token.id ?? token.sub
            const userInfo: UserInfoFull | null = await getUserFullInfoFromEmailOrId(id)

            if (!userInfo) {
                throw new Error("Erreur dans la récupération de l'utilisateur")
            }
            if (!userInfo.isActive) {
                throw new Error("Compte désactivé")
            }

            return {
                ...token,
                id: userInfo.id,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,
                isActive: userInfo.isActive,
                Roles: userInfo.Roles,
                Permissions: userInfo.Permissions,
                iat: token.iat,
                exp: token.exp,
            }
        },
    },
}
