export type OrderCartLine = {
  productId: number
  productDocumentId?: string
  title: string
  imageUrl: string
  imageAlt: string
  unitPrice: number
  quantity: number
  stock: number
}
