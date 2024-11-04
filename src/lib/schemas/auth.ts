import { z } from "zod";

export const AuthCredentialsSchema = z.object({
    email: z.string().email({ message: 'Inserisci una mail valida' }),
    password: z.string()
        .min(8, { message: 'Password dev\'essere almeno di 8 caratteri' })
})

export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>