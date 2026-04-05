export type LoginType = {
    identifier: string,
    password: string,
}

export type AuthUser = {
    id: number,
    documentId?: string,
    name: string,
    email: string,
    phone: string,
    confirmed: boolean,
}

export type AuthResponse = {
    jwt: string,
    user: AuthUser,
}

export type AuthSession = {
    token: string,
    user: AuthUser,
}

export type RegisterType = {
    username: string,
    email: string,
    password: string,
}
