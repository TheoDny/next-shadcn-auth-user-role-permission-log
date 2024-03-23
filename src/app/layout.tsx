"use server"
import "./globals.css"
import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Header from "@/component/header/Header"
import { Toaster } from "@/component/ui/sonner"
import SideNav from "@/component/sideBar/SideNav"
import { NextAuthProvider } from "./providers"
import Login from "@/component/login/Login"

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            <body className={""}>
                <NextAuthProvider>
                    {session ? (
                        <>
                            <SideNav />
                            <Header />
                            {/*<HeaderMobile />*/}
                            <main className={"md:ml-52 md:px-3 md:pb-2 md:pt-3 px-1 pb-1 pt-1"}>{children}</main>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-screen">
                            <Login className={"mb-36"} />
                        </div>
                    )}
                </NextAuthProvider>
                <Toaster />
            </body>
        </html>
    )
}
