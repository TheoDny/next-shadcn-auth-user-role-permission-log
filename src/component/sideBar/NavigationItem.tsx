"use client"
import { NavigationItemType } from "@/type/navigation.type"
import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/component/ui/accordion"
import { useState } from "react"

export const NavigationItem = ({
    item,
    index,
    pathname,
}: {
    item: NavigationItemType
    index: number
    pathname: string
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
    return (
        <div className="">
            {"path" in item ? (
                <Link
                    href={item.path}
                    className={`flex flex-row text-base items-center p-2 rounded-lg hover:bg-zinc-100 ${
                        item.path === pathname ? "bg-zinc-100" : ""
                    }`}
                >
                    <span className="font-semibold flex">{item.title}</span>
                </Link>
            ) : (
                <>
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
                                {(item?.subMenuItems ?? []).map((subItem, index) => {
                                    return (
                                        <div key={index}>
                                            <Link
                                                href={subItem.path}
                                                className={`flex flex-row items-center text-base  px-2 py-1 rounded-lg hover:bg-zinc-100 ${
                                                    subItem.path === pathname ? "bg-zinc-100" : ""
                                                }`}
                                            >
                                                <span className="font-semibold flex">{subItem.title}</span>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            )}
        </div>
    )
}
