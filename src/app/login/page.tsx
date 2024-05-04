import Login from "@/component/login/Login"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect("/")
    }

    return <Login />
}
