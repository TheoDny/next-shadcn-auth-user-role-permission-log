import RoleManagementDoubleTable from "@/component/dataTable/roleManagement/RoleManagementDoubleTable"
import { getAllRolePermission } from "@/service/role.service"
import { getAllPermission } from "@/service/permission.service"

export default async function RoleManagementPage() {
    const [rolesData, permissionsData] = await Promise.all([getAllRolePermission(), getAllPermission()])

    return (
        <>
            <h1>Gestion des rôles</h1>
            <RoleManagementDoubleTable
                rolesData={rolesData}
                permissionsData={permissionsData}
            />
        </>
    )
}
