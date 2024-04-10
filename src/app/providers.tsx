"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

type Props = {
    children?: ReactNode
}

export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
