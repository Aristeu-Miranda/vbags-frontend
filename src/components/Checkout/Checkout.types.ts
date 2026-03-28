import type { OrderCartLine } from '@/contexts/OrderCartContext'

export type CheckoutProps = {
  lines: OrderCartLine[]
  shippingAmount?: number | null
}
