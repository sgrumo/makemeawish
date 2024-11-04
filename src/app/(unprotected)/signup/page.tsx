'use client'

import { AuthCredentials, AuthCredentialsSchema } from '@/lib/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const SignupPage = () => {
    const { handleSubmit } = useForm<AuthCredentials>({
        resolver: zodResolver(AuthCredentialsSchema),
        mode: 'onChange',
    })

    const signupSubmit = (credentials: AuthCredentials) => {
        console.log(credentials)
    }

    return (
        <>
            <form onSubmit={handleSubmit(signupSubmit)}></form>
        </>
    )
}

export default SignupPage
