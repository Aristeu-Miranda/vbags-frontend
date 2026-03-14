import {
    createContext,
    useContext,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react'
import type { AuthResponse, AuthSession } from '@/services/auth/auth.types'
import type { AuthContextValue } from './AuthContext.types'

const AUTH_STORAGE_KEY = 'auth-session'

const persistSession = (session: AuthSession) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    localStorage.setItem('token', session.token)
    localStorage.setItem('user', JSON.stringify(session.user))
}

const clearPersistedSession = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

const getInitialSession = (): AuthSession | null => {
    if (typeof window === 'undefined') {
        return null
    }

    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY)
    const legacyToken = localStorage.getItem('token')
    const legacyUser = localStorage.getItem('user')

    if (storedSession) {
        try {
            return JSON.parse(storedSession) as AuthSession
        } catch {
            clearPersistedSession()
        }
    }

    if (!legacyToken || !legacyUser) {
        return null
    }

    try {
        return {
            token: legacyToken,
            user: JSON.parse(legacyUser) as AuthSession['user'],
        }
    } catch {
        clearPersistedSession()
        return null
    }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSessionState] = useState<AuthSession | null>(() => getInitialSession())

    const setSession = (response: AuthResponse) => {
        const nextSession = {
            token: response.jwt,
            user: response.user,
        }

        setSessionState(nextSession)
        persistSession(nextSession)
    }

    const logout = () => {
        setSessionState(null)
        clearPersistedSession()
    }

    const value = useMemo<AuthContextValue>(() => ({
        isAuthenticated: !!session?.token,
        token: session?.token ?? null,
        user: session?.user ?? null,
        setSession,
        logout,
    }), [session])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
