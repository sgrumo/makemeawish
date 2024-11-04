'use client'

import Input from '@/app/components/forms/input'
import { signUp } from '@/lib/firebase/auth'
import { AuthCredentials, AuthCredentialsSchema } from '@/lib/schemas/auth'
import { ResultType } from '@/lib/utils/algebraic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { match } from 'ts-pattern'

const SignupPage = () => {
    const { handleSubmit, register } = useForm<AuthCredentials>({
        resolver: zodResolver(AuthCredentialsSchema),
        mode: 'onChange',
    })

    const signupSubmit = async (credentials: AuthCredentials) => {
        const res = await signUp(credentials)
        match(res)
            .with({ resultType: ResultType.Ok }, () => {})
            .with({ resultType: ResultType.Error }, () => {})
            .exhaustive()
    }

    return (
        <>
            <form onSubmit={handleSubmit(signupSubmit)}>
                <Input type="email" register={register} fieldName="email" />
                <Input
                    type="password"
                    register={register}
                    fieldName="password"
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SignupPage
