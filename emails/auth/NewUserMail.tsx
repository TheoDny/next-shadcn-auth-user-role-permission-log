import { Body, Button, Container, Html, Preview, Text } from "@react-email/components"
import { generateToken } from "@/util/auth.util"
import { Hr } from "@react-email/hr"
import { CSSProperties } from "react"

interface NewUserProps {
    user: {
        id: string
        email: string
    }
    appName: string
}

export const NewUserMail = ({ user, appName }: NewUserProps) => {
    const token = generateToken({ idUser: user.id, email: user.email }, "24hours")
    const app_url = process.env.NEXTAUTH_URL || "http://localhost:3000"

    return (
        <Html>
            <Preview>Bienvenue sur {appName} !</Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>
                    <Text style={styles.h2}>Bienvenue sur {appName} !</Text>
                    <Hr />
                    <Text style={styles.p}>
                        Nous sommes ravis de vous accueillir. Votre compte a été créé. Pour définir votre mot de
                        passe et finaliser la création de votre compte, cliquez sur le lien ci-dessous :
                    </Text>
                    <Button>
                        <a
                            href={`${app_url}/settings/account/reset-password?token=${token}`}
                            style={styles.a}
                        >
                            Définir votre mot de passe
                        </a>
                    </Button>
                    <Text style={styles.small}>
                        Vous disposez de 24 heures pour réinitialiser votre mot de passe.Passez ce délai, vous
                        devrez effectuer une demande de réinitialisation de mot de passe sur la page de connexion.
                        <br />
                        Si vous n'avez pas demandé la création de ce compte, veuillez ignorer cet email.
                    </Text>
                    <Hr />
                </Container>
            </Body>
        </Html>
    )
}

NewUserMail.PreviewProps = {
    user: {
        id: "1",
        email: "test@example.com",
    },
    appName: "Mon Application",
} as NewUserProps

const styles: { [k: string]: CSSProperties } = {
    body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
    },
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#F7FBFDFF",
        color: "#030C11FF",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    h2: {
        color: "#026BB1FF",
        fontWeight: "bolder",
        fontSize: "24px",
    },
    p: {
        marginBottom: "20px",
        lineHeight: "1.6",
    },
    a: {
        display: "inline-block",
        padding: "12px 20px",
        backgroundColor: "#025F9DFF",
        color: "#FFFFFFFF",
        textDecoration: "none",
        borderRadius: "5px",
    },
    small: {
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "0.75rem",
        fontStyle: "italic",
    },
}
export default NewUserMail
