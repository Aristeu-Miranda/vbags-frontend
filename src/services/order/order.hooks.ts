import { useMutation } from '@tanstack/react-query'
import { createOrder } from './order'
import type { CreateOrderPayload } from './order.types'

export type UseCreateOrderVariables = {
  payload: CreateOrderPayload
  token: string
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: ({ payload, token }: UseCreateOrderVariables) => createOrder(payload, token),
  })
}
