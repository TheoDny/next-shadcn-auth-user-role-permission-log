import { getServerSession, SessionUser } from "next-auth"
import { authOptions } from "@/lib/auth"
import MyAccount from "@/component/account/MyAccount"

export default async function MyAccountPage() {
    const myAccountInfo = await getMyAccountInfo()
    if (!myAccountInfo) throw new Error("No data")
    return <MyAccount infoUser={myAccountInfo} />
}

const getMyAccountInfo = async (): Promise<SessionUser> => {
    return (await getServerSession(authOptions))?.user
}
