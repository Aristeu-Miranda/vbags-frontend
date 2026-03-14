export type LoginType = {
    identifier: string,
    password: string,
}

export type AuthResponse = {
    jwt: string,
    user: {
        id: number,
        name: string,
        email: string,
        phone: string,
        confirmed: boolean,
    }
}

export type RegisterType = {
    username: string,
    email: string,
    password: string,
}

