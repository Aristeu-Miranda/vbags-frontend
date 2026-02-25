import { useMemo } from "react"
import type { ProductCardData } from "./Products.types"
import { useProducts } from "@/services/products/products.hooks"
import { API_BASE_URL } from "@/services/products/products"
import type { ProductResponseItem } from "@/services/products/products.types"
import type { ProductImageData } from "./Products.types"

const AVAILABLE_STATUS = "Disponível"
const UNAVAILABLE_STATUS = "Indisponível"

const getProductStatus = (stock: number) => {
  return stock > 0 ? AVAILABLE_STATUS : UNAVAILABLE_STATUS
}

const formatImageUrl = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  return `${API_BASE_URL}${url}`
}

const extractDescriptionText = (description: ProductResponseItem["description"]) => {
  return description
    .flatMap((node) => node.children ?? [])
    .map((child) => child.text.trim())
    .filter(Boolean)
    .join(" ")
}

const mapProductToCardData = (product: ProductResponseItem): ProductCardData => {
  const images: ProductImageData[] = product.image.map((item, index) => ({
    id: item.id,
    altText: item.alternativeText ?? `${product.name} imagem ${index + 1}`,
    url: formatImageUrl(item.url),
  }))

  return {
    id: product.id,
    name: product.name,
    title: product.name,
    description: extractDescriptionText(product.description),
    image: images.map((item) => item.url),
    images,
    price: product.price,
    color: product.color,
    stock: product.stock,
    publishedAt: product.publishedAt,
    status: getProductStatus(product.stock),
  }
}

export const useProductsPageData = () => {
  const productsQuery = useProducts()

  const products = useMemo(() => {
    return (productsQuery.data ?? []).map(mapProductToCardData)
  }, [productsQuery.data])

  return {
    ...productsQuery,
    products,
  }
}
