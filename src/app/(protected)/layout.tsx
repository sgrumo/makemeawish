'use client'

import { ProtectedRoute } from '@/lib/components/wrappers/protected-route'

type ProtectedLayoutProperties = {
    children: React.ReactNode
}

export default function ProtectedLayout(properties: ProtectedLayoutProperties) {
    return <ProtectedRoute>{properties.children}</ProtectedRoute>
}
