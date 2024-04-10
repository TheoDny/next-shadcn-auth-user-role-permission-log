import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof InputVariants> {}

type AddProps = {
    setVisibility?: (visibility: boolean) => void
    visibility?: boolean
}

const InputVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            sizeElement: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
    },
)

const Input = React.forwardRef<HTMLInputElement, InputProps & AddProps>(
    ({ className, type, sizeElement, setVisibility, visibility, ...props }, ref) => {
        return (
            <>
                <input
                    type={visibility ? "text" : type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        InputVariants({ sizeElement: sizeElement }),
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {setVisibility && (
                    <span
                        style={{
                            position: "relative",
                            float: "right",
                            top: "-2em",
                            right: "1.5em",
                            display: "block",
                            cursor: "pointer",
                        }}
                        className="cursor-pointer"
                        onClick={() => setVisibility(!visibility)}
                    >
                        {visibility ? <IoIosEye /> : <IoIosEyeOff />}
                    </span>
                )}
            </>
        )
    },
)
Input.displayName = "Input"

export { Input }
