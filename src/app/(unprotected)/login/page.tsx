'use client'

import Input from '@/lib/components/forms/input'
import { signIn, signInWithGoogle } from '@/lib/firebase/auth'
import { AuthCredentials, AuthCredentialsSchema } from '@/lib/schemas/auth'
import { useAuthStore } from '@/lib/state/auth.store'
import { Result, ResultType } from '@/lib/utils/algebraic'
import { captureError } from '@/lib/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, UserCredential } from 'firebase/auth'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { match } from 'ts-pattern'

const LoginPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<AuthCredentials>({
        resolver: zodResolver(AuthCredentialsSchema),
        mode: 'onChange',
    })
    const router = useRouter()
    const { setName, setToken } = useAuthStore(state => state)

    const storeUserInfo = async (user: User) => {
        if (user.displayName != null) {
            setName(user.displayName)
        }

        const idToken = await user.getIdToken()
        setToken(idToken)
    }

    const handleSignInResponse = async (
        res: Result<UserCredential>,
    ): Promise<void> => {
        match(res)
            .with({ resultType: ResultType.Ok }, async ({ result }) => {
                storeUserInfo(result.user)
                router.push('/people')
            })
            .with({ resultType: ResultType.Error }, error =>
                captureError(error),
            )
            .exhaustive()
    }

    const handleSignIn = async (
        credentials: AuthCredentials,
    ): Promise<void> => {
        const res = await signIn(credentials)
        handleSignInResponse(res)
    }

    const handleSignInWithGoogle = async () => {
        const res = await signInWithGoogle()
        handleSignInResponse(res)
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleSignIn)}>
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
            <button onClick={handleSignInWithGoogle}>
                Sign in with Google
            </button>
        </>
    )
}

export default LoginPage
