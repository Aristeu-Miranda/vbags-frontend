import type { ProductCardProps } from "@/components/ProductCard"

export type ProductsProps = {
  products: ProductCardProps[]
}

export type ProductImageData = {
  id: number
  altText: string
  url: string
}

export type ProductCardData = Omit<ProductCardProps, "onAction"> & {
  documentId?: string
  name: string
  color: string
  stock: number
  publishedAt: string
  images: ProductImageData[]
}