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