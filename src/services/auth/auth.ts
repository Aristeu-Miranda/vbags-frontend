import type { AuthResponse, LoginType, RegisterType } from "./auth.types"

export const API_BASE_URL = "http://localhost:1337"
const LOGIN_ENDPOINT = "/api/auth/local"
const REGISTER_ENDPOINT = "/api/auth/local/register"


export const login = async ({ identifier, password }: LoginType): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
    })

    if (!response.ok) {
        throw new Error("Erro ao fazer login")
    }

    return response.json()
}

export const register = async ({ username, email, password }: RegisterType): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}${REGISTER_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    })

    if (!response.ok) {
        throw new Error("Erro ao criar conta")
    }

    return response.json()
}