import type { CreateOrderPayload, CreateOrderResponse } from './order.types'

const STRAPI_API_BASE_URL = 'http://localhost:1337'
const ORDERS_ENDPOINT = '/api/orders'

export const createOrder = async (
  payload: CreateOrderPayload,
  token: string,
): Promise<CreateOrderResponse> => {
  const response = await fetch(`${STRAPI_API_BASE_URL}${ORDERS_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Erro ao solicitar pedido')
  }

  return response.json() as Promise<CreateOrderResponse>
}
