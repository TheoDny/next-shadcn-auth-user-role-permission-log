"use client"
import { signIn } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ButtonLoading } from "@/component/ui/button-loading"
import { useState } from "react"

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [visilityPassword, setVisilityPassword] = useState(false)

    const formSchema = z.object({
        email: z.string().email({
            message: "Veillez entrer une adresse email valide",
        }),
        password: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        await signIn("credentials", {
            email: values.email,
            password: values.password,
        })
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleLogin)}
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type={visilityPassword ? "text" : "password"}
                                    setVisibility={setVisilityPassword}
                                    visibility={visilityPassword}
                                    autoComplete={"password"}
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
                    Connexion
                </ButtonLoading>
            </form>
        </Form>
    )
}

export default LoginForm
