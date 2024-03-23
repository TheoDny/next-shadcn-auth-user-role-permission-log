import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog"

import { ReactNode } from "react"

type props = {
    show: boolean
    childrenForm: ReactNode
}

export function DialogForm({ show, childrenForm }: props) {
    return (
        <Dialog open={show}>
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <DialogContent className="sm:max-w-[425px]">{childrenForm}</DialogContent>
        </Dialog>
    )
}
