import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import MyAccount from "@/component/account/MyAccount"
import { getAccountInfo } from "@/service/user.service"

export default async function MyAccountPage() {
    const seldId = (await getServerSession(authOptions))?.user?.id
    if (!seldId) throw new Error("No data")
    const myAccountInfo = await getAccountInfo(seldId)
    if (!myAccountInfo) throw new Error("No data")
    return <MyAccount infoUserMedium={myAccountInfo} />
}
