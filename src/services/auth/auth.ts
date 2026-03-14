import type { AuthResponse } from "./auth.types"

export const API_BASE_URL = "http://localhost:1337"
const LOGIN_ENDPOINT = "/api/auth/local"


export const login = async (identifier: string, password: string): Promise<AuthResponse> => {
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
