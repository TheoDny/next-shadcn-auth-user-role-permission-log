import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/card"
import { ReactNode } from "react"

type Props = {
    className?: {
        card?: string
        cardHeader?: string
        cardTitle?: string
        cardDescription?: string
        cardContent?: string
        cardFooter?: string
    }
    children: ReactNode
    footer?: ReactNode
} & (
    | { header?: never; title?: string; description?: string }
    | { header: ReactNode; title?: never; description?: never }
)

export const BasicCard = ({ children, className, title, description, header, footer }: Props) => (
    <Card className={cn("w-full", className?.card)}>
        {(header || title || description) && (
            <CardHeader className={className?.cardHeader}>
                {header ? (
                    header
                ) : (
                    <>
                        <CardTitle className={className?.cardTitle}>{title}</CardTitle>
                        <CardDescription className={className?.cardDescription}>{description}</CardDescription>
                    </>
                )}
            </CardHeader>
        )}
        <CardContent className={cn(className?.cardContent)}>{children}</CardContent>
        {footer && <CardFooter className={cn(className?.cardFooter)}>{footer}</CardFooter>}
    </Card>
)
