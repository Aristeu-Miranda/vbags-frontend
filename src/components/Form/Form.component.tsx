import emailjs from "@emailjs/browser"
import { type ChangeEvent, type FormEvent, useState } from "react"
import { z } from "zod"
import { contactFormSchema, type ContactFormSchema } from "./Form.schema"
import { Button } from "../ui/button"

type ContactFormErrors = Partial<Record<keyof ContactFormSchema, string>>

const INITIAL_FORM_DATA: ContactFormSchema = {
  name: "",
  email: "",
  title: "",
  message: "",
}

const EMAILJS_CONFIG = {
  serviceId: import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string | undefined,
  templateId: import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string | undefined,
  publicKey: import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string | undefined,
}

export const Form = () => {
  const [formData, setFormData] = useState<ContactFormSchema>(INITIAL_FORM_DATA)
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({})
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target
    const fieldName = id as keyof ContactFormSchema

    setFormData((previousState) => ({
      ...previousState,
      [fieldName]: value,
    }))

    setFormErrors((previousState) => ({
      ...previousState,
      [fieldName]: undefined,
    }))
  }

  const buildFieldErrors = (error: z.ZodError<ContactFormSchema>) => {
    const nextErrors: ContactFormErrors = {}

    error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as keyof ContactFormSchema
      if (!nextErrors[fieldName]) {
        nextErrors[fieldName] = issue.message
      }
    })

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedbackMessage("")

    const parseResult = contactFormSchema.safeParse(formData)

    if (!parseResult.success) {
      setFormErrors(buildFieldErrors(parseResult.error))
      return
    }

    const { serviceId, templateId, publicKey } = EMAILJS_CONFIG

    if (!serviceId || !templateId || !publicKey) {
      setFeedbackMessage("Configuracao do EmailJS incompleta.")
      return
    }

    try {
      setIsSubmitting(true)
      setFormErrors({})

      await emailjs.send(serviceId, templateId, parseResult.data, {
        publicKey,
      })

      setFormData(INITIAL_FORM_DATA)
      setFeedbackMessage("Mensagem enviada com sucesso!")
      setTimeout(() => {
        setFeedbackMessage("")
      }, 3000)
    } catch {
      setFeedbackMessage("Nao foi possivel enviar a mensagem. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start justify-center gap-10 w-full"
    >
        <div className="flex items-start justify-between gap-4 w-full">
        <div className="flex flex-col items-start justify-center gap-2 w-1/2">
            <label htmlFor="name" className="text-sm font-poppins font-extralight text-pink-light">Nome</label>
            <input
              className="w-full bg-gray-200 p-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-light rounded-md"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome"
              required
            />
            {formErrors.name && <span className="text-xs text-red-600">{formErrors.name}</span>}
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-1/2">
            <label htmlFor="email" className="text-sm font-poppins font-extralight text-pink-light">Email</label>
            <input
              className="w-full bg-gray-200 p-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-light rounded-md"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            {formErrors.email && <span className="text-xs text-red-600">{formErrors.email}</span>}
        </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-full">
            <label htmlFor="title" className="text-sm font-poppins font-extralight text-pink-light">Titulo</label>
            <input
              className="w-full bg-gray-200 p-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-light rounded-md"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Titulo"
              required
            />
            {formErrors.title && <span className="text-xs text-red-600">{formErrors.title}</span>}
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-full">
            <label htmlFor="message" className="text-sm font-poppins font-extralight text-pink-light">Mensagem</label>
            <textarea
              rows={5}
              className="w-full bg-gray-200 p-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-light rounded-md"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Mensagem"
              required
            />
            {formErrors.message && <span className="text-xs text-red-600">{formErrors.message}</span>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-light text-white font-poppins hover:bg-pink-dark cursor-pointer"
        >
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
        </Button>
        {feedbackMessage && (
          <p className="text-sm font-poppins text-gray-700">{feedbackMessage}</p>
        )}
    </form>
  )
}