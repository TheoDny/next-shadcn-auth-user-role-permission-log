"use server"

import ResetPasswordForm from "@/component/account/form/ResetPasswordForm"
import { BasicCard } from "@/component/card/basicCard"
import { redirect } from "next/navigation"
import { verify } from "jsonwebtoken"
import Image from "next/image"
import { CardDescription, CardTitle } from "@/component/ui/card"

type Props = {
    params: {}
    searchParams: {
        token: string
    }
}
export default async function ResetPassword(props: Props) {
    const token = props.searchParams.token

    if (!token) {
        redirect("/login")
    }

    try {
        const decodedToken: { idUser?: string; email?: string } = verify(
            token,
            process.env.APP_SECRET || "my_ultra_secure_nextauth_secret",
        ) as { idUser?: string; email?: string }

        if (!decodedToken?.idUser && !decodedToken?.email) {
            redirect("/login")
        }
        const headerCard = (
            <div className="space-y-4">
                <div className={"flex justify-center"}>
                    <Image
                        src="/logo-full.png"
                        alt="logo"
                        width={150}
                        height={70}
                    />
                </div>
                <CardTitle>Réinitialiser le mot de passe</CardTitle>
                <CardDescription>Email du compte concerné: {decodedToken.email}</CardDescription>
            </div>
        )
        return (
            <BasicCard header={headerCard}>
                <ResetPasswordForm token={token} />
            </BasicCard>
        )
    } catch (e) {
        redirect("/login")
    }
}
