import { useQuery } from "@tanstack/react-query"
import { getProducts } from "./products"

export const PRODUCTS_QUERY_KEY = ["products"] as const

export const useProducts = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })
}
