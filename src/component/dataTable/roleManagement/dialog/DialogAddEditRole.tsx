import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog"

import AddEditRoleForm from "@/component/dataTable/roleManagement/form/AddEditRoleForm"
import { RoleIncludePermissionSmall } from "@/type/role.type"

type props = {
    show: boolean
    defaultValues?: {
        id: string
        name: string
        description: string
    }
    afterSubmit: (value: RoleIncludePermissionSmall, toDelete?: boolean) => any
    closeDialog: () => void
}

export function DialogAddEditRole({ show, defaultValues, afterSubmit, closeDialog }: props) {
    return (
        <Dialog
            open={show}
            onOpenChange={(o) => {
                if (!o) closeDialog()
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{defaultValues?.id ? "Edition d'un role" : "Ajout d'un role"}</DialogTitle>
                </DialogHeader>
                <AddEditRoleForm
                    defaultValues={defaultValues}
                    afterSubmit={afterSubmit}
                />
            </DialogContent>
        </Dialog>
    )
}
