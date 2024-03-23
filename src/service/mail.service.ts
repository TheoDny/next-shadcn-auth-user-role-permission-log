import nodemailer from "nodemailer"
import { generateToken } from "@/util/auth.util"

export interface EmailOptions {
    to: string[]
    subject: string
    htmlContent: string
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
            html: options.htmlContent,
            attachments: options.attachments,
        }
        info = await transporter.sendMail(mailOptions)
    }
    return info
}

export async function sendEmailNewUser(email: string, idUser: string) {
    const token = generateToken({ idUser: idUser }, "24hours")
    const appName = process.env.NEXT_PUBLIC_APP_NAME || "Mon Application"
    try {
        await sendEmail({
            to: [email],
            subject: `Bienvenue sur ${appName} - Création de compte`,
            htmlContent: `
                <html lang="fr">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f5f5f5;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                            color: #3498db;
                        }
                        p {
                            margin-bottom: 20px;
                            line-height: 1.6;
                        }
                        a {
                            display: inline-block;
                            padding: 12px 20px;
                            background-color: #3498db;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                    </style><title>Bienvenue</title>
                </head>
                <body>
                    <div class="container">
                        <h2>Bienvenue sur ${appName} !</h2>
                        <p>
                            Nous sommes ravis de vous accueillir. Votre compte a été créé. Pour définir votre mot de passe et finaliser la création de votre compte, cliquez sur le lien ci-dessous :
                        </p>
                        <p>
                            <a href="${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}">
                                Définir votre mot de passe
                            </a>
                        </p>
                        <p>
                            Si vous n'avez pas demandé la création de ce compte, veuillez ignorer cet email.
                        </p>
                    </div>
                </body>
                </html>
            `,
        })
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}
