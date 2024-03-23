import { prisma } from "@/lib/prisma"
import { LogUser, LogUserFormatted, selectLogUser } from "@/type/log.type"
import { $Enums } from ".prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import LogAction = $Enums.LogAction

export const getAllLogUser = async (): Promise<LogUser[]> => {
    return prisma.log.findMany({
        ...selectLogUser,
        orderBy: {
            createdAt: "desc",
        },
    })
}

export const getAllLogUserFormated = async (): Promise<LogUserFormatted[] | null> => {
    const query: string = `
        SELECT
            action,
            description,
            to_char(l."createdAt", 'DD/MM/YYYY HH24:MI:SS') as "createdAt",
            concat(u.firstname, ' ', u.lastname) as "user"
        FROM
            "Log" as l
                left join "User" u on l."userId" = u.id
        ORDER BY
            "createdAt" DESC
    `
    return prisma.$queryRawUnsafe(query)
}

export const addLog = async (logAction: LogAction, description: string, idUser?: string) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        if (!idUser) {
            return false
        }
    } else {
        idUser = session.user.id
    }

    return prisma.log.create({
        data: {
            action: logAction,
            description: description,
            userId: idUser ?? "",
        },
    })
}
