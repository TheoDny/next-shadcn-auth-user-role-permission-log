import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog"
import { UserRole } from "@/type/user.type"
import AddEditUserForm from "@/component/dataTable/userManagement/form/AddEditUserForm"

type props = {
    show: boolean
    defaultValues?: {
        id: string
        firstname: string
        lastname: string
        email: string
        isActive: boolean
    }
    afterSubmit: (value: UserRole) => any
    closeDialog: () => void
}

export function DialogAddEditUser({ show, defaultValues, afterSubmit, closeDialog }: props) {
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
                <AddEditUserForm
                    defaultValues={defaultValues}
                    afterSubmit={afterSubmit}
                />
            </DialogContent>
        </Dialog>
    )
}
