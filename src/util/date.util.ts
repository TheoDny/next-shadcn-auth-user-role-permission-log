import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

export const sortDate = (a: string, b: string, format = "DD/MM/YYYY") => {
    const dateA = dayjs(a, format)
    const dateB = dayjs(b, format)

    return dateA.diff(dateB)
}
