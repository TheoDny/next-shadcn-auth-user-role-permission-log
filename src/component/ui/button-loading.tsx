import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "@/component/ui/button"
import { ReactNode } from "react"

type props = {
    children: string | ReactNode
    loading: boolean
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
} & ButtonProps
export function ButtonLoading({ children, loading, className, ...props }: props) {
    return (
        <Button
            disabled={loading}
            className={className}
            {...props}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    )
}
