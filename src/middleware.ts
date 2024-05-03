export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/((?!api/auth|login|_next/static|_next/image|logo-full.png|settings/account/reset-password).*)"],
}
