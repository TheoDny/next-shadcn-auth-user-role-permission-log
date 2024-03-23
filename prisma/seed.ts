import { Permission, PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
import { AdminAccountData, permissions, roleAdminData } from "./dataSeed"

const prisma = new PrismaClient()

export const seedRole = async (
    role: {
        name: string
        description: string
    },
    permissions: Permission[],
) => {
    return prisma.role.upsert({
        create: {
            id: roleAdminData.id,
            name: roleAdminData.name,
            description: roleAdminData.description,
            Permissions: {
                connect: permissions,
            },
        },
        update: {
            id: roleAdminData.id,
            description: role.description,
            Permissions: {
                set: permissions,
            },
        },
        where: { id: roleAdminData.id },
    })
}

export const seedPermissions = async (): Promise<Permission[]> => {
    const permissionsDb: Permission[] = []
    for (const permission of permissions) {
        const permissionDb = await prisma.permission.upsert({
            where: { name: permission.name },
            update: {
                description: permission.description,
            },
            create: {
                name: permission.name,
                description: permission.description,
            },
        })
        permissionsDb.push(permissionDb)
    }
    return permissionsDb
}

async function main() {
    const password = await hash("admin", 12)
    const permissions = await seedPermissions()
    const roleAdmin = await seedRole(roleAdminData, permissions)
    const userAdmin = await prisma.user.upsert({
        where: { id: AdminAccountData.id },
        update: {
            Roles: {
                connect: roleAdmin,
            },
        },
        create: {
            id: AdminAccountData.id,
            email: AdminAccountData.email,
            firstname: AdminAccountData.firstname,
            lastname: AdminAccountData.lastname,
            password,
            Roles: {
                connect: roleAdmin,
            },
        },
        include: {
            Roles: {
                include: {
                    Permissions: true,
                },
            },
        },
    })
    console.info("permissions :", permissions)
    console.info("roleAdmin :", roleAdmin)
    console.info("userAdmin :", userAdmin)
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        // process.exit(1);
    })
