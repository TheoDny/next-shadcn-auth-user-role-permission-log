import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { ButtonLoading } from "@/component/ui/button-loading"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addUserAction, editUserAction } from "@/action/user.action"
import { UserFull, UserRole } from "@/type/user.type" // replace with your actual import path

type props = {
    defaultValues?: {
        id: string
        firstname: string
        lastname: string
        email: string
        isActive: boolean
    }
    afterSubmit: (value: UserRole) => any
}

const AddEditUserForm = ({ defaultValues, afterSubmit }: props) => {
    const [loading, setLoading] = useState(false)

    const formSchema = z.object({
        firstname: z.string().min(1).max(48, "Le prénom doit être compris entre 1 et 48 caractères"),
        lastname: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
        email: z.string().email("L'email doit être valide"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const addUser = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        const response = await addUserAction(values)
        if (response.validationErrors) {
            console.error(response.serverError)
        } else if (response.serverError) {
            console.error(response.serverError)
        } else if (!response.data) {
            console.error("Une erreur est survenue")
        } else {
            afterSubmit(response.data)
        }
        setLoading(false)
    }

    const editUser = async (values: z.infer<typeof formSchema>) => {
        if (!defaultValues) return console.error("Aucun userId fourni")
        setLoading(true)
        const response = await editUserAction({ userId: defaultValues.id, ...values })
        if (response.validationErrors) {
            console.error(response.serverError)
        } else if (response.serverError) {
            console.error(response.serverError)
        } else if (!response.data) {
            console.error("Une erreur est survenue")
        } else {
            afterSubmit(response.data)
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(defaultValues?.id ? editUser : addUser)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                    {defaultValues ? "Modifier" : "Ajouter"}
                </ButtonLoading>
            </form>
        </Form>
    )
}

export default AddEditUserForm
