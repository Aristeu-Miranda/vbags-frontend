export type ProductCardProps = {
  id: number
  title: string
  description: string
  image: string
  price: number
  onAction: () => void
  status: string
}
