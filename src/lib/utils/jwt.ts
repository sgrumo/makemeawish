import jwt from 'jsonwebtoken'

export const isJwtExpired = (token: string): boolean => {
    const jwtData = jwt.decode(token)
    if (jwtData && typeof jwtData === 'object') {
        const now = Date.now().valueOf() / 1000

        return jwtData.exp ? jwtData.exp < now : false
    }

    return true
}
