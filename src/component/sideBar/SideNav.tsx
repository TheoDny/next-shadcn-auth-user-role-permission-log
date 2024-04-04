"use client"

import Link from "next/link"

import { NAVIGATION_ITEMS } from "@/constant/navigation.constant"
import { NavigationItemType } from "@/type/navigation.type"
import { NavigationItem } from "@/component/sideBar/NavigationItem"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const SideNav = () => {
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
        <div className="md:w-52 z-40 bg-background text-foreground h-screen flex-1 fixed border-r border-accent hidden md:flex">
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
                    {NAVIGATION_ITEMS.map((item: NavigationItemType, index: number) => {
                        return (
                            <NavigationItem
                                key={index}
                                item={item}
                                index={index}
                                pathname={pathname}
                            />
                        )
                    })}
                </div>
                <div>
                    {/*<Link*/}
                    {/*    href={item.path}*/}
                    {/*    className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${*/}
                    {/*        item.path === pathname ? "bg-zinc-100" : ""*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*<span className="font-semibold text-lg flex">*/}
                    {/*    {item.title}*/}
                    {/*</span>*/}
                    {/*</Link>*/}
                </div>
            </div>
        </div>
    )
}

export default SideNav
