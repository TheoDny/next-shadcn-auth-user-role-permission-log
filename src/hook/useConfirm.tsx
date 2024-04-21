import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogAction,
    AlertDialogDescription,
} from "@/component/ui/alert-dialog"
import { ReactNode, useState } from "react"

const useConfirm = (title: ReactNode | string, message: ReactNode | string) => {
    const [promise, setPromise] = useState<null | { resolve: any }>(null)

    const confirm = () =>
        new Promise((resolve, reject) => {
            setPromise({ resolve })
        })

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }
    // You could replace the Dialog with your library's version
    const ConfirmationDialog = () => (
        <AlertDialog open={promise !== null}>
            <AlertDialogContent>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{message}</AlertDialogDescription>
                <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    )

    return [ConfirmationDialog, confirm]
}

export default useConfirm
