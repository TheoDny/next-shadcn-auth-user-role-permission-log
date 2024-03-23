import { Permission } from "@prisma/client"

export const roleAdminData = {
    id: "clpvugral000108jrbyndawuo",
    name: "Administrateur",
    description: "Possède tout les droits",
}

export const idAdminRole = roleAdminData.id

export const AdminAccountData = {
    id: "clpugjfox000108jrea58bttu",
    email: "admin@admin.com",
    firstname: "Admin",
    lastname: "Admin",
}

export const idAdminAccount = AdminAccountData.id

export const permissions: Permission[] = [
    {
        id: "cltq357oa000008kv3swdcr8i",
        name: "gestion_role",
        description: "Gestion des roles",
    },
    {
        id: "cltq35hev000108kvcuov026k",
        name: "gestion_user",
        description: "Gestion des utilisateurs",
    },
    {
        id: "cltq35xh3000208kv0u7ihomb",
        name: "vue_log",
        description: "Vue des log",
    },
]
