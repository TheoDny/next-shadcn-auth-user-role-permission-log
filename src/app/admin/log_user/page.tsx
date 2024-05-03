import { getAllLogUserFormated } from "@/service/log.service"
import LogTable from "@/component/dataTable/log/LogDataTable"

export default async function LogUserPage() {
    const logUserDataFormated = await getAllLogUserFormated()
    if (!logUserDataFormated) throw new Error("No data")

    return (
        <>
            <LogTable dataLogUser={logUserDataFormated} />
        </>
    )
}
