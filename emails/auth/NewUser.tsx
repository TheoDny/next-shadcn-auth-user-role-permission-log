import { Body, Button, Container, Head, Html, Preview, Text } from "@react-email/components"
import { generateToken } from "@/util/auth.util"
import { Hr } from "@react-email/hr"
import { CSSProperties } from "react"

interface NewUserProps {
    idUser: string
    appName: string
}

export const NewUser = ({ idUser, appName }: NewUserProps) => {
    const token = generateToken({ idUser: idUser }, "24hours")

    return (
        <Html>
            <Head />
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
                            href={`${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`}
                            style={styles.a}
                        >
                            Définir votre mot de passe
                        </a>
                    </Button>
                    <Text style={styles.small}>
                        Si vous n'avez pas demandé la création de ce compte, veuillez ignorer cet email.
                    </Text>
                    <Hr />
                </Container>
            </Body>
        </Html>
    )
}

NewUser.PreviewProps = {
    idUser: "1",
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
        backgroundColor: "hsl(204 60% 98%)",
        color: "hsl(204 70% 4%)",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    h2: {
        color: "hsl(204 98% 35%)",
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
        backgroundColor: "hsl(204 98% 31%)",
        color: "hsl(0 0% 100%)",
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
export default NewUser
