"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/component/ui/card"
import LoginForm from "@/component/login/LoginForm"
import Image from "next/image"
import { ResetPasswordQuestionDialog } from "@/component/login/ResetPasswordQuestionDialog"

const Login = ({ className }: { className?: string }) => {
    return (
        <Card className={"w-[350px] " + className}>
            <CardHeader className={"items-center"}>
                <Image
                    src="/logo-full.png"
                    alt="logo"
                    width={200}
                    height={94}
                />
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter className={"justify-end"}>
                <ResetPasswordQuestionDialog />
            </CardFooter>
        </Card>
    )
}

export default Login
