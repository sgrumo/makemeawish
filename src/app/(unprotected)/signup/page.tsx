'use client'

import Input from '@/app/components/forms/input'
import { signUp } from '@/lib/firebase/auth'
import { AuthCredentials, AuthCredentialsSchema } from '@/lib/schemas/auth'
import { ResultType } from '@/lib/utils/algebraic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { match } from 'ts-pattern'

const SignupPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<AuthCredentials>({
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
                <Input
                    type="email"
                    fieldName="email"
                    register={register}
                    error={errors.email}
                />
                <Input
                    type="password"
                    fieldName="password"
                    register={register}
                    error={errors.password}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SignupPage
