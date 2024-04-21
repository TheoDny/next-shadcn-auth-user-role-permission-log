import React, { createContext, ReactNode, useContext, useState } from "react"
import { ConfirmDialog } from "@/component/dialog/ConfirmDialog"

const ConfirmDialogContext = createContext({
    openDialog: (title?: ReactNode, description?: ReactNode) => Promise.resolve(false),
})

type Props = {
    children?: ReactNode
}

export const ConfirmDialogProvider = ({ children }: Props) => {
    const [dialog, setDialog] = useState<{
        open: boolean
        title?: ReactNode
        description?: ReactNode
        resolve?: (value: boolean) => void
    }>({
        open: false,
    })

    const openDialog = async (title?: ReactNode, description?: ReactNode): Promise<boolean> => {
        return await new Promise<boolean>((resolve, reject) => {
            setDialog({
                open: true,
                title: title,
                description: description,
                resolve: resolve,
            })
        })
    }

    const closeDialog = (result: boolean) => {
        dialog.resolve && dialog.resolve(result)
        setDialog({ open: false, title: "", description: "" })
    }

    return (
        <ConfirmDialogContext.Provider value={{ openDialog }}>
            {children}
            <ConfirmDialog
                open={dialog.open}
                onCancel={() => closeDialog(false)}
                onConfirm={() => closeDialog(true)}
                title={dialog.title}
                description={dialog.description}
            />
        </ConfirmDialogContext.Provider>
    )
}

export const useConfirm = () => {
    const { openDialog } = useContext(ConfirmDialogContext)

    return {
        confirm: (title?: ReactNode, description?: ReactNode) => openDialog(title, description),
    }
}
