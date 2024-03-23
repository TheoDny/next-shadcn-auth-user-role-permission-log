import UserManagementDoubleTable from "@/component/dataTable/userManagement/UserManagementDoubleTable"
import { getAllUserRole } from "@/service/user.service"
import { getAllRoleSmall } from "@/service/role.service"

export default async function UserManagementPage() {
    const [usersData, rolesData] = await Promise.all([getAllUserRole(), getAllRoleSmall()])

    return (
        <UserManagementDoubleTable
            usersData={usersData}
            rolesData={rolesData}
        />
    )
}
