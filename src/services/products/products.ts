import type { ProductResponseItem, ProductsResponse } from "./products.types"

export const API_BASE_URL = "http://localhost:1337"
const PRODUCTS_ENDPOINT = "/api/products?populate=*"

const normalizeProductsPayload = (
  payload: ProductResponseItem[] | ProductsResponse,
): ProductResponseItem[] => {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload.data
}

export const getProducts = async (): Promise<ProductResponseItem[]> => {
  const response = await fetch(`${API_BASE_URL}${PRODUCTS_ENDPOINT}`)

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos")
  }

  const payload = (await response.json()) as ProductResponseItem[] | ProductsResponse
  return normalizeProductsPayload(payload)
}
