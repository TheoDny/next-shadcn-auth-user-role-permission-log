"use client"
import { NavigationItemType } from "@/type/navigation.type"
import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/component/ui/accordion"
import { ReactNode, useState } from "react"
import { checkPermissions } from "@/util/auth.util"
import { Session } from "next-auth"

export const NavigationItem = ({
    item,
    index,
    pathname,
    session,
}: {
    item: NavigationItemType
    index: number
    pathname: string
    session: Session
}) => {
    const isCurrentItemActive =
        "path" in item
            ? pathname.includes(item.path)
            : item?.subMenuItems?.some((subItem: { path: string }) => pathname.includes(subItem.path)) ?? false

    const [accordionOpen, setAccordionOpen] = useState(false)

    const handleAccordionCollapse = () => {
        setAccordionOpen(false)
    }

    const handleAccordionExpand = () => {
        setAccordionOpen(true)
    }
    let element: null | ReactNode
    if ("path" in item) {
        element = (
            <Link
                href={item.path}
                className={`flex flex-row text-base items-center p-1 rounded-lg hover:bg-secondary ${
                    item.path === pathname ? "bg-secondary" : ""
                }`}
            >
                <span className="font-semibold flex">{item.title}</span>
            </Link>
        )
    } else {
        let subItems = (item?.subMenuItems ?? []).reduce((acc: ReactNode[], subItem, index) => {
            if (!subItem.requiredPermission || checkPermissions(session, subItem.requiredPermission)) {
                acc.push(
                    <div key={index}>
                        <Link
                            href={subItem.path}
                            className={`flex flex-row items-center text-base  px-2 py-1 rounded-lg hover:bg-secondary ${
                                subItem.path === pathname ? "bg-secondary" : ""
                            }`}
                        >
                            <span className="font-semibold flex">{subItem.title}</span>
                        </Link>
                    </div>,
                )
            }
            return acc
        }, [])

        element = subItems.length ? (
            <Accordion
                type="single"
                collapsible={!(isCurrentItemActive || accordionOpen)}
                value={isCurrentItemActive || accordionOpen ? "item-" + index : undefined}
            >
                <AccordionItem
                    value={"item-" + index}
                    onMouseEnter={handleAccordionExpand}
                    onMouseLeave={handleAccordionCollapse}
                >
                    <AccordionTrigger className={"cursor-default hover:no-underline"}>
                        <span className="font-bold flex text-base ">{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-0.5">
                        {subItems.map((subItem) => subItem)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ) : null
    }

    return element
}
