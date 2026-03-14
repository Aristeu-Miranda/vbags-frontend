import { useMutation } from "@tanstack/react-query"
import { login } from "./auth"

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ identifier, password }: Parameters<typeof login>[0] extends never ? any : { identifier: string, password: string }) => login(identifier, password),
    })
}