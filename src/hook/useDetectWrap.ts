import { Dispatch, RefObject, SetStateAction, useEffect } from "react"

const useDetectWrap = (setIsWrapped: Dispatch<SetStateAction<boolean>>, elementRef: RefObject<HTMLElement>) => {
    useEffect(() => {
        const detectWrap = () => {
            if (elementRef.current && elementRef.current.previousSibling) {
                const currentOffsetTop = elementRef.current.offsetTop
                const prevOffsetTop = (elementRef.current.previousSibling as HTMLElement).offsetTop
                // -8 to handle the space added by the margin when it is wrapped
                const wrapped = currentOffsetTop - 8 > prevOffsetTop
                setIsWrapped(wrapped)
            }
        }

        // Call detectWrap whenever the window is resized
        window.addEventListener("resize", detectWrap)

        // Call detectWrap once initially
        detectWrap()

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", detectWrap)
        }
    }, [setIsWrapped, elementRef])
}

export default useDetectWrap
