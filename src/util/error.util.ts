const nextSafeActionValiationErrorToString = (error: { [k: string]: string[] }): string => {
    let result = ""
    for (const key in error) {
        result += `${key}: ${error[key]}\n`
    }
    return result
}
