import nodemailer from "nodemailer"
import { generateToken } from "@/util/auth.util"
import { addLog } from "@/service/log.service"

import { render } from "@react-email/render"
import { NewUser } from "../../emails/auth/NewUser"

export interface EmailOptions {
    to: string[]
    subject: string
    html: string
    attachments?: { filename: string; path: string }[]
}

const option = {
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_EMAIL_USER,
        pass: process.env.MAIL_EMAIL_PASSWORD,
    },
    secure: true,
}

let transporter = nodemailer.createTransport(option)

async function sendEmail(options: EmailOptions) {
    let info: any = true
    if (process.env.MAILER_ACTIVE ?? true) {
        let mailOptions = {
            from: `"${process.env.NEXT_PUBLIC_APP_NAME}" <myapp@test.com>`, //<myapp@test.com> does not work with gmail
            to: options.to.join(", "),
            subject: options.subject,
            html: options.html,
            attachments: options.attachments,
        }
        info = await transporter.sendMail(mailOptions)
    }
    return info
}

export async function sendEmailNewUser(email: string, idUser: string) {
    const appName = process.env.NEXT_PUBLIC_APP_NAME || "Mon Application"
    const html = render(NewUser({ idUser: idUser, appName: appName }))

    try {
        await sendEmail({
            to: [email],
            subject: `Bienvenue sur ${appName} - Création de compte`,
            html: html,
        })
        addLog("MAIL_SEND", `Envoi de l'email de nouvel utilisateur à ${email}`)
        return true
    } catch (e) {
        addLog("MAIL_ERROR", `Erreur lors de l'envoi de l'email de nouvel utilisateur à ${email}`)
        console.error(e)
        return false
    }
}
