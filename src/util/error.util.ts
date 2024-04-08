import { ReactNode } from "react"

export const nextSafeActionValiationErrorToString = (error: Partial<{ [p: string]: string[] }>): string => {
    let result = ""
    for (const key in error) {
        result += `${key}: ${error[key]}\n`
    }
    return result
}

export const handleErrorAction = (
    response: {
        data?: any
        serverError?: string | undefined
        validationErrors?: Partial<{ [k: string]: string[] }> | undefined
    },
    toast?: {
        error: (message: string | ReactNode) => any
    },
): boolean => {
    if (response.validationErrors) {
        toast && toast.error(nextSafeActionValiationErrorToString(response.validationErrors))
        console.error(response.validationErrors)
        return false
    } else if (response.serverError) {
        toast && toast.error(response.serverError)
        console.error(response.serverError)
        return false
    } else if (!response.data) {
        toast && toast.error("Une erreur est survenue")
        console.error("Une erreur est survenue")
        return false
    }
    return true
}
