import type { AuthResponse, AuthSession } from '@/services/auth/auth.types'

export type AuthContextValue = {
    isAuthenticated: boolean,
    token: string | null,
    user: AuthSession['user'] | null,
    setSession: (response: AuthResponse) => void,
    logout: () => void,
}
