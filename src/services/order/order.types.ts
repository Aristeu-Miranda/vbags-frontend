export type OrderType = 'pending'

export type RelationConnectByDocumentId = {
  connect: string[]
}

export type CreateOrderItem = {
  product: RelationConnectByDocumentId
  quantity: number
  priceAtPurchase: number
}

export type CreateOrderData = {
  type: OrderType
  total: number
  items: CreateOrderItem[]
  users_permissions_user: RelationConnectByDocumentId
}

export type CreateOrderPayload = {
  data: CreateOrderData
}

export type OrderEntity = {
  id: number
  documentId?: string
  type: OrderType
  total: number
  items: CreateOrderItem[]
  users_permissions_user: RelationConnectByDocumentId
}

export type CreateOrderResponse = {
  data: OrderEntity
}
