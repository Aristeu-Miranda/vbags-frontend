export type OrderCardProps = {
  imageUrl: string
  imageAlt: string
  title: string
  unitPrice: number
  quantity: number
  stock: number
  statusLabel?: string
  onQuantityChange: (nextQuantity: number) => void
  onRemove: () => void
}
