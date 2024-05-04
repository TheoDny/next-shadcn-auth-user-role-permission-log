"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/component/ui/dialog"
import ResetPasswordWidthEmailForm from "@/component/login/ResetPasswordWidthEmailForm"

export const ResetPasswordQuestionDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className={"italic cursor-pointer hover:brightness-50 text-sm text-muted-foreground"}>
                    {" "}
                    Mot de passe oublié ?
                </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Mot de passe oublié ?</DialogTitle>
                    <DialogDescription>Envoiyez un email pour réinitialiser votre mot de passe</DialogDescription>
                </DialogHeader>
                <ResetPasswordWidthEmailForm />
            </DialogContent>
        </Dialog>
    )
}
