"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ButtonLoading } from "@/component/ui/button-loading"
import { useState } from "react"
import { sendMailPasswordResetAction } from "@/action/user.action"
import { handleErrorAction } from "@/util/error.util"
import { toast } from "sonner"

const ResetPasswordWidthEmailForm = () => {
    const [loading, setLoading] = useState(false)

    const formSchema = z.object({
        email: z.string().email({
            message: "Veillez entrer une adresse email valide",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const handleResetPassword = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        const response = await sendMailPasswordResetAction(values)
        if (handleErrorAction(response, toast) && response.data) {
            toast.success("Le mot de passe a été modifié avec succès")
            form.reset()
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleResetPassword)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                    Envoyer
                </ButtonLoading>
            </form>
        </Form>
    )
}

export default ResetPasswordWidthEmailForm
