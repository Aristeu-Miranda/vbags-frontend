import { useMutation, useQuery } from "@tanstack/react-query"
import { createAddress, getAddressByCep } from "./address"
import type { CreateAddressPayload } from "./address.types"

export const ADDRESS_QUERY_KEY = ["address"] as const

export const useGetAddressByCep = (cepDigits: string) => {
  const enabled = cepDigits.length === 8

  return useQuery({
    queryKey: [...ADDRESS_QUERY_KEY, cepDigits] as const,
    queryFn: () => getAddressByCep(cepDigits),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })
}

export type UseCreateAddressVariables = {
  payload: CreateAddressPayload
  token: string
}

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: ({ payload, token }: UseCreateAddressVariables) =>
      createAddress(payload, token),
  })
}