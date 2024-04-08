import { SessionUser } from "next-auth"
import AddEditUserForm from "@/component/dataTable/userManagement/form/AddEditUserForm"
import ResetPasswordForm from "@/component/account/form/ResetPasswordForm"
import { BasicCard } from "@/component/card/basicCard"

type Props = {
    infoUser: SessionUser
}

const MyAccount = ({ infoUser }: Props) => {
    return (
        <div className={"space-y-2 lg:w-1/2  md:w-2/3 w-full m-auto"}>
            <BasicCard>
                <AddEditUserForm
                    defaultValues={{
                        id: infoUser.id,
                        firstname: infoUser.firstname,
                        lastname: infoUser.lastname,
                        email: infoUser.email,
                        isActive: infoUser.isActive,
                    }}
                />
            </BasicCard>
            <BasicCard
                title="Roles"
                description="Roles assignés au compte"
            >
                <ul className={"flex space-x-1"}>
                    {infoUser.Roles.map((role, index) => (
                        <li
                            key={index}
                            className="mb-4 pr-3 grid grid-cols-[15px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex flex-wrap h-2 w-2 translate-y-1 rounded-full bg-primary" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{role.name}</p>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </BasicCard>
            <BasicCard
                title="Permissions"
                description="Permissions assignés au compte"
            >
                <ul className={"flex space-x-1"}>
                    {infoUser.Permissions.map((permission, index) => (
                        <li
                            key={index}
                            className="mb-4 pr-3 grid grid-cols-[15px_1fr] items-start last:mb-0 last:pb-0"
                        >
                            <span className="flex flex-wrap h-2 w-2 translate-y-1 rounded-full bg-primary" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{permission.name}</p>
                                <p className="text-sm text-muted-foreground">{permission.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </BasicCard>
            <BasicCard>
                <ResetPasswordForm />
            </BasicCard>
        </div>
    )
}

export default MyAccount
