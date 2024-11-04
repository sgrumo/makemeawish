'use client'

import { signInWithGoogle } from '@/lib/firebase/auth'
import { ResultType } from '@/lib/utils/algebraic'
import { match } from 'ts-pattern'

const LoginPage = () => {
    const handleSignInWithGoogle = async () => {
        const res = await signInWithGoogle()
        match(res)
            .with({ resultType: ResultType.Ok }, userCredential => {
                console.log(userCredential.result)
            })
            .with({ resultType: ResultType.Error }, error => {
                console.error(error)
            })
    }
    return (
        <>
            <h1>Login</h1>
            <button onClick={handleSignInWithGoogle}>
                Sign in with Google
            </button>
        </>
    )
}

export default LoginPage
