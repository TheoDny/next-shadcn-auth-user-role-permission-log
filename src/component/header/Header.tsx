"use server"

import React from "react"
import Link from "next/link"
import { ModeToggle } from "@/component/ui/select-theme"
import { Session } from "next-auth"
import { getInitials } from "@/util/diverse.util"

type props = {
    session: Session
}
const Header = async ({ session }: props) => {
    const initials = getInitials(session.user.firstname, session.user.lastname)

    return (
        <div className={"sticky inset-x-0 top-0 z-30 bg-background w-full transition-all border-b border-accent"}>
            <div className="flex h-[47px] items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="flex flex-row space-x-3 items-center justify-center md:hidden"
                    >
                        <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                        <span className="font-bold text-xl flex ">Logo</span>
                    </Link>
                </div>

                <div className="flex flex-row items-center space-x-3">
                    <div className="hidden h-9 w-9 rounded-full bg-primary text-primary-foreground md:flex items-center justify-center text-center">
                        <Link href="/settings/account">
                            <span className="font-semibold text-sm">{initials}</span>
                        </Link>
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default Header
