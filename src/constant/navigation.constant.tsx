import { NavigationItemType } from "@/type/navigation.type"

export const NAVIGATION_ITEMS: NavigationItemType[] = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Administration",
        subMenuItems: [
            {
                title: "Gestion Utilisateurs",
                path: "/admin/users_management",
                requiredPermission: ["gestion_user"],
            },
            { title: "Gestion Roles", path: "/admin/roles_management", requiredPermission: ["gestion_role"] },
            { title: "Log Utilisateur", path: "/admin/log_user", requiredPermission: ["log_user"] },
        ],
    },
    {
        title: "Paramètres",
        subMenuItems: [{ title: "Mon Compte", path: "/settings/account" }],
    },
]
