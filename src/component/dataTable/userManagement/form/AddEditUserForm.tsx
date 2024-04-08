"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { ButtonLoading } from "@/component/ui/button-loading"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addUserAction, editUserAction } from "@/action/user.action"
import { UserRole } from "@/type/user.type"
import { addUserZod } from "@/zod/user.zod"
import { toast } from "sonner"
import { handleErrorAction } from "@/util/error.util"
import { Switch } from "@/component/ui/switch"

type props = {
    defaultValues?: {
        id: string
        firstname: string
        lastname: string
        email: string
        isActive?: boolean
    }
    afterSubmit?: (value: UserRole) => any
}

const AddEditUserForm = ({ defaultValues, afterSubmit }: props) => {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof addUserZod>>({
        resolver: zodResolver(addUserZod),
        defaultValues,
    })

    const addUser = async (values: z.infer<typeof addUserZod>) => {
        setLoading(true)
        const response = await addUserAction(values)
        if (handleErrorAction(response, toast) && response.data) {
            afterSubmit && afterSubmit(response.data)
        }
        setLoading(false)
    }

    const editUser = async (values: z.infer<typeof addUserZod>) => {
        if (!defaultValues) return console.error("Aucun userId fourni")
        setLoading(true)
        const response = await editUserAction({ userId: defaultValues.id, ...values })
        if (handleErrorAction(response, toast) && response.data) {
            afterSubmit && afterSubmit(response.data)
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
                {(defaultValues?.isActive !== undefined || !defaultValues) && (
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex justify-between">
                                <FormLabel className="leading-loose w-full">Actif</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={!defaultValues ? true : Boolean(field.value)}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
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
