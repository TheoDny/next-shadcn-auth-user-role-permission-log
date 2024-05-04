"use server"
import "./globals.css"
import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Header from "@/component/header/Header"
import { Toaster } from "@/component/ui/sonner"
import SideNav from "@/component/sideBar/SideNav"
import { ConfirmDialogProvider, NextAuthProvider, ThemeProvider } from "./providers"

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <html
            lang="fr"
            suppressHydrationWarning
        >
            <body>
                <NextAuthProvider>
                    {session ? (
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <ConfirmDialogProvider>
                                <SideNav session={session} />
                                <Header session={session} />
                                {/*<HeaderMobile />*/}
                                <main className={"md:ml-52 md:px-3 md:pb-2 md:pt-3 px-1 pb-1 pt-1"}>
                                    {children}
                                </main>
                            </ConfirmDialogProvider>
                        </ThemeProvider>
                    ) : (
                        <div className={"flex justify-center items-center h-dvh"}>
                            <main className={"relative "}>{children}</main>
                        </div>
                    )}
                </NextAuthProvider>
                <Toaster />
            </body>
        </html>
    )
}
