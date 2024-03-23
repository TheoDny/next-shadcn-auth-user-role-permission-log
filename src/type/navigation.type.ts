import { IconType } from "react-icons"

export type NavigationItemType = LinkItemType | MenuItemType

export type MenuItemType = {
    title: string
    icon?: IconType
    subMenuItems?: LinkItemType[]
    requiredPermission?: string[]
}

export type LinkItemType = {
    title: string
    path: string
    icon?: IconType
    requiredPermission?: string[]
}
