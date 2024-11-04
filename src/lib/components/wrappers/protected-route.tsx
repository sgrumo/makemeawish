'use client'
import { useAuthStore } from '@/lib/state/auth.store'
import { isJwtExpired } from '@/lib/utils/jwt'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ProtectedRouteProperties = {
    children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProperties) => {
    const router = useRouter()
    const { token, clearState } = useAuthStore(state => state)
    const [hasJwt, setHasJwt] = useState(true)

    useEffect(() => {
        if (!token || (token && isJwtExpired(token))) {
            setHasJwt(false)
            clearState()
            router.push('/login')
        }
        if (token && isJwtExpired(token)) {
            setHasJwt(true)
        }
    }, [token])

    if (!hasJwt) {
        return
    }

    return <div className="relative w-screen">{children}</div>
}
