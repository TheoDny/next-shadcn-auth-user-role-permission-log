import { prisma } from "@/lib/prisma"
import { Permission } from "@prisma/client"

export const getAllPermission = async (): Promise<Permission[]> => {
    return prisma.permission.findMany()
}
