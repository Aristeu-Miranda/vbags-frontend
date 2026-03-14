import { z } from 'zod'

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(1, 'O email é obrigatório')
        .email('Digite um email válido'),
    password: z
        .string()
        .min(1, 'A senha é obrigatória')
        .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, 'O nome é obrigatório')
            .min(2, 'O nome deve ter no mínimo 2 caracteres'),
        email: z
            .string()
            .min(1, 'O email é obrigatório')
            .email('Digite um email válido'),
        password: z
            .string()
            .min(1, 'A senha é obrigatória')
            .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        confirmPassword: z
            .string()
            .min(1, 'Confirme sua senha'),
        phone: z
            .string()
            .min(1, 'O telefone é obrigatório')
            .regex(
                /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                'Digite um telefone válido. Ex: (11) 99999-9999'
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    })

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
