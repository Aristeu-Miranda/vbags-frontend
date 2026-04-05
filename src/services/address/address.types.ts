export type ViaCepResponse = {
  cep?: string
  logradouro?: string
  complemento?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean | string
}

export type CreateAddressPayload = {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  state: string
}

export type CreateAddressRequestData = {
  cep: string
  street: string
  number: string
  neighborhood: string
  state: string
  complement?: string
}

export type AddressEntity = {
  id: number
  cep: string
  street: string
  number: string
  neighborhood: string
  state: string
  complement?: string
}

export type CreateAddressResponse = {
  data: AddressEntity
}
