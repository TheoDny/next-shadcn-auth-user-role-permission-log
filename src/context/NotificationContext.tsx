"use client"
import { createContext, FC, ReactNode, useContext } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type NotificationContextType = {
    notifySuccess: (msg: string) => void
    notifyError: (msg: string) => void
    notifyInfo: (msg: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context
}

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const notifyError = (msg: string) => {
        toast.error(msg)
    }
    const notifySuccess = (msg: string) => {
        toast.success(msg)
    }
    const notifyInfo = (msg: string) => {
        toast.info(msg)
    }

    return (
        <NotificationContext.Provider value={{ notifySuccess, notifyError, notifyInfo }}>
            {children}
            <ToastContainer pauseOnFocusLoss={false} />
        </NotificationContext.Provider>
    )
}
