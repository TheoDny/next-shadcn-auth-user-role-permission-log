import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/component/ui/alert-dialog"

export type ConfirmDialogProps = {
    onConfirm: () => void
    onCancel?: () => void
    title?: string
    description?: string
}
export function ConfirmDialog({ onConfirm, onCancel, title, description }: ConfirmDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title ? title : "Êtes vous sûres ?"}</AlertDialogTitle>
                    {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onCancel && onCancel()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onConfirm()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
