import { Prisma } from "@prisma/client"

export type PermissionMedium = Prisma.PermissionGetPayload<{
    select: {
        id: true
        name: true
        description: true
    }
}>

export type PermissionSmall = Prisma.PermissionGetPayload<{
    select: {
        id: true
        name: true
    }
}>

export type PermissionFormatted = {
    id: string
    name: string
    description: string
}
