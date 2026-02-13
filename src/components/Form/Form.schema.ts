import { z } from "zod"

const NAME_MIN_LENGTH = 2
const TITLE_MIN_LENGTH = 3
const MESSAGE_MIN_LENGTH = 10

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(NAME_MIN_LENGTH, "Informe um nome valido."),
  email: z
    .string()
    .trim()
    .email("Informe um email valido."),
  title: z
    .string()
    .trim()
    .min(TITLE_MIN_LENGTH, "Informe um titulo valido."),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, "Escreva uma mensagem com mais detalhes."),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
