"use server"

import ResetPasswordForm from "@/component/account/form/ResetPasswordForm"
import { BasicCard } from "@/component/card/basicCard"
import { redirect } from "next/navigation"
import { verify } from "jsonwebtoken"

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
        const decodedToken: { idUser?: string } = verify(
            token,
            process.env.APP_SECRET || "my_ultra_secure_nextauth_secret",
        ) as { idUser?: string }

        if (!decodedToken?.idUser) {
            redirect("/login")
        }

        return (
            <div className={"space-y-2 lg:w-1/2  md:w-2/3 w-full m-auto"}>
                <BasicCard title={"Réinitialiser le mot de passe"}>
                    <ResetPasswordForm token={token} />
                </BasicCard>
            </div>
        )
    } catch (e) {
        redirect("/login")
    }
}
