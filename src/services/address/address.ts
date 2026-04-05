import type {
  CreateAddressPayload,
  CreateAddressRequestData,
  CreateAddressResponse,
  ViaCepResponse,
} from "./address.types"

const VIACEP_BASE_URL = "https://viacep.com.br/ws/"

const STRAPI_API_BASE_URL = "http://localhost:1337"
const ADDRESSES_ENDPOINT = "/api/addresses"

export type { ViaCepResponse, CreateAddressPayload, CreateAddressResponse } from "./address.types"

export const getAddressByCep = async (cep: string): Promise<ViaCepResponse> => {
  const response = await fetch(`${VIACEP_BASE_URL}${cep}/json/`)
  return response.json() as Promise<ViaCepResponse>
}

export const createAddress = async (
  payload: CreateAddressPayload,
  token: string,
): Promise<CreateAddressResponse> => {
  const data: CreateAddressRequestData = {
    cep: payload.cep,
    street: payload.street,
    number: payload.number,
    neighborhood: payload.neighborhood,
    state: payload.state,
  }

  const complement = payload.complement?.trim()
  if (complement) {
    data.complement = complement
  }

  const response = await fetch(`${STRAPI_API_BASE_URL}${ADDRESSES_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  })

  if (!response.ok) {
    throw new Error("Erro ao salvar endereço")
  }

  return response.json() as Promise<CreateAddressResponse>
}
