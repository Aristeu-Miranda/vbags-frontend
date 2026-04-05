export type ProductDescriptionTextNode = {
  type: "text"
  text: string
}

export type ProductDescriptionNode = {
  type: string
  children?: ProductDescriptionTextNode[]
}

export type ProductImage = {
  id: number
  alternativeText: string | null
  url: string
}

export type ProductResponseItem = {
  id: number
  documentId?: string
  name: string
  price: number
  color: string
  stock: number
  description: ProductDescriptionNode[]
  image: ProductImage[]
  publishedAt: string
}

export type ProductsResponse = {
  data: ProductResponseItem[]
}
