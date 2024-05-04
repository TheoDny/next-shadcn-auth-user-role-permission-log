"use client"

import Link from "next/link"

import { NAVIGATION_ITEMS } from "@/constant/navigation.constant"
import { NavigationItem } from "@/component/sideBar/NavigationItem"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ReactNode, useEffect, useState } from "react"
import { Button } from "@/component/ui/button"
import { signOut } from "next-auth/react"
import { Session } from "next-auth"
import { checkPermissions } from "@/util/auth.util"

const SideNav = ({ session }: { session: Session }) => {
    const pathname = usePathname()
    const { resolvedTheme } = useTheme()
    const [imageLink, setImageLink] = useState<string>("/logo-full.png")

    // workaround to fix the image not displaying teh dark one when the theme is dark at the first load
    useEffect(() => {
        if (resolvedTheme === "dark") {
            setImageLink("/logo-full-dark.png")
        } else {
            setImageLink("/logo-full.png")
        }
    }, [resolvedTheme])

    return (
        <div className="md:w-52 z-40 bg-background text-foreground h-screen flex-1 fixed border-r border-accent hidden md:flex flex-col justify-between">
            <div className="flex flex-col space-y-2 w-full">
                <Link
                    href="/"
                    className="flex flex-row items-center justify-center md:justify-start md:px-4 border-b border-accent h-12 w-full"
                >
                    <Image
                        src={imageLink}
                        alt="logo"
                        width={85}
                        height={40}
                        priority={true}
                    />
                </Link>
                <div className="flex flex-col space-y-1 md:px-3">
                    {NAVIGATION_ITEMS.reduce((acc: ReactNode[], item, index) => {
                        if (!item.requiredPermission || checkPermissions(session, item.requiredPermission)) {
                            acc.push(
                                <NavigationItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    pathname={pathname}
                                    session={session}
                                />,
                            )
                        }
                        return acc
                    }, [])}
                </div>
            </div>
            <div className="flex flex-col space-y-1 md:p-3 p-1  border-t border-accent">
                <Button
                    onClick={() => signOut()}
                    size="sm"
                >
                    Déconnexion
                </Button>
            </div>
        </div>
    )
}

export default SideNav
