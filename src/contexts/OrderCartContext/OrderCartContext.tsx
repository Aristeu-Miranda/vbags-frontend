import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { OrderCartLine } from './OrderCartContext.types'

const STORAGE_KEY = 'vbags-order-cart'

type OrderCartContextValue = {
  lines: OrderCartLine[]
  addOrMergeLine: (line: Omit<OrderCartLine, 'quantity'> & { quantity?: number }) => void
  setLineQuantity: (productId: number, quantity: number) => void
  removeLine: (productId: number) => void
  clearCart: () => void
}

const OrderCartContext = createContext<OrderCartContextValue | null>(null)

const loadFromStorage = (): OrderCartLine[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item): item is OrderCartLine =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as OrderCartLine).productId === 'number' &&
        (typeof (item as OrderCartLine).productDocumentId === 'string' ||
          typeof (item as OrderCartLine).productDocumentId === 'undefined') &&
        typeof (item as OrderCartLine).title === 'string' &&
        typeof (item as OrderCartLine).imageUrl === 'string' &&
        typeof (item as OrderCartLine).imageAlt === 'string' &&
        typeof (item as OrderCartLine).unitPrice === 'number' &&
        typeof (item as OrderCartLine).quantity === 'number' &&
        typeof (item as OrderCartLine).stock === 'number',
    )
  } catch {
    return []
  }
}

const persist = (lines: OrderCartLine[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
}

export const OrderCartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<OrderCartLine[]>(loadFromStorage)

  useEffect(() => {
    persist(lines)
  }, [lines])

  const addOrMergeLine = useCallback(
    (line: Omit<OrderCartLine, 'quantity'> & { quantity?: number }) => {
      if (line.stock < 1) return

      const qty = line.quantity ?? 1
      setLines((previous) => {
        const existing = previous.find((item) => item.productId === line.productId)
        if (existing) {
          const nextQty = Math.min(line.stock, existing.quantity + qty)
          return previous.map((item) =>
            item.productId === line.productId
              ? {
                  ...item,
                  unitPrice: line.unitPrice,
                  stock: line.stock,
                  imageUrl: line.imageUrl,
                  imageAlt: line.imageAlt,
                  title: line.title,
                  productDocumentId: line.productDocumentId,
                  quantity: nextQty,
                }
              : item,
          )
        }

        const initialQty = Math.max(1, Math.min(line.stock, qty))

        return [
          ...previous,
          {
            productId: line.productId,
            productDocumentId: line.productDocumentId,
            title: line.title,
            imageUrl: line.imageUrl,
            imageAlt: line.imageAlt,
            unitPrice: line.unitPrice,
            stock: line.stock,
            quantity: initialQty,
          },
        ]
      })
    },
    [],
  )

  const setLineQuantity = useCallback((productId: number, quantity: number) => {
    setLines((previous) => {
      const line = previous.find((item) => item.productId === productId)
      if (!line) return previous

      const clamped = Math.max(1, Math.min(line.stock, Math.floor(quantity)))
      return previous.map((item) =>
        item.productId === productId ? { ...item, quantity: clamped } : item,
      )
    })
  }, [])

  const removeLine = useCallback((productId: number) => {
    setLines((previous) => previous.filter((item) => item.productId !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setLines([])
  }, [])

  const value = useMemo(
    () => ({
      lines,
      addOrMergeLine,
      setLineQuantity,
      removeLine,
      clearCart,
    }),
    [lines, addOrMergeLine, setLineQuantity, removeLine, clearCart],
  )

  return <OrderCartContext.Provider value={value}>{children}</OrderCartContext.Provider>
}

export const useOrderCart = () => {
  const context = useContext(OrderCartContext)
  if (!context) {
    throw new Error('useOrderCart must be used within OrderCartProvider')
  }

  return context
}
