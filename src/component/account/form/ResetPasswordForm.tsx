"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { ButtonLoading } from "@/component/ui/button-loading"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleErrorAction } from "@/util/error.util"
import { toast } from "sonner"
import { resetPasswordAction } from "@/action/user.action"
import { resetPasswordZod } from "@/zod/user.zod"

const ResetPasswordForm = () => {
    const [loading, setLoading] = useState(false)
    const [visilityNewPassword, setVisilityNewPassword] = useState(false)
    const [visilityRepeatNewPassword, setVisilityRepeatNewPassword] = useState(false)

    const form = useForm<z.infer<typeof resetPasswordZod>>({
        resolver: zodResolver(resetPasswordZod),
        defaultValues: {
            newPassword: "",
            repeatNewPassword: "",
        },
    })

    const handleResetPassword = async (values: z.infer<typeof resetPasswordZod>) => {
        setLoading(true)

        const response = await resetPasswordAction({ ...values })
        if (handleErrorAction(response, toast) && response.data) {
            toast.success("Le mot de passe a été modifié avec succès")
            form.reset()
        }

        setLoading(false)
    }

    useEffect(() => {}, [])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleResetPassword)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nouveau mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type={visilityNewPassword ? "text" : "password"}
                                    setVisibility={setVisilityNewPassword}
                                    visibility={visilityNewPassword}
                                    autoComplete={"new-password"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repeatNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Répéter le mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type={visilityRepeatNewPassword ? "text" : "password"}
                                    setVisibility={setVisilityRepeatNewPassword}
                                    visibility={visilityRepeatNewPassword}
                                    autoComplete={"new-password"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ButtonLoading
                    className="w-full !mt-6"
                    type="submit"
                    loading={loading}
                >
                    {"Modifier le mot de passe"}
                </ButtonLoading>
            </form>
        </Form>
    )
}

export default ResetPasswordForm
