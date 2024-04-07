import { NavigationItemType } from "@/type/navigation.type"

export const NAVIGATION_ITEMS: NavigationItemType[] = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Administration",
        subMenuItems: [
            { title: "Gestion Utilisateurs", path: "/admin/users_management" },
            { title: "Gestion Roles", path: "/admin/roles_management" },
            { title: "Log Utilisateur", path: "/admin/log_user" },
        ],
    },
    {
        title: "Paramètres",
        subMenuItems: [{ title: "Mon Compte", path: "/settings/account" }],
    },
]
