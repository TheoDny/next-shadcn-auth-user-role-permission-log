import { SessionUser } from "next-auth"
import AddEditUserForm from "@/component/dataTable/userManagement/form/AddEditUserForm"

type Props = {
    infoUser: SessionUser
}

const MyAccount = ({ infoUser }: Props) => {
    return (
        <AddEditUserForm
            defaultValues={{
                id: infoUser.id,
                firstname: infoUser.firstname,
                lastname: infoUser.lastname,
                email: infoUser.email,
                isActive: infoUser.isActive,
            }}
        />
    )
}

export default MyAccount
