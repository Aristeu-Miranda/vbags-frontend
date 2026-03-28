import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OrderCardProps } from './OrderCard.types'

const CURRENCY = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const OrderCard = ({
  imageUrl,
  imageAlt,
  title,
  unitPrice,
  quantity,
  stock,
  statusLabel = 'Pendente',
  onQuantityChange,
  onRemove,
}: OrderCardProps) => {
  const lineTotal = unitPrice * quantity
  const canDecrease = quantity > 1
  const canIncrease = quantity < stock

  return (
    <article
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl border border-[#e8dfd4]/90 bg-white',
        'shadow-[0_2px_24px_-8px_rgba(45,28,18,0.12)]',
        'transition-[box-shadow,transform] duration-300 hover:shadow-[0_8px_32px_-12px_rgba(45,28,18,0.18)]',
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5">
        <div className="relative mx-auto w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl bg-[#f6f0ea] sm:mx-0 sm:w-36 md:w-44 aspect-[4/3] sm:aspect-auto sm:min-h-[140px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full min-h-[120px] items-center justify-center px-2 text-center font-poppins text-xs text-[#a08f82]">
              Sem imagem
            </div>
          )}
          <div className="absolute left-2 top-2 sm:left-2.5 sm:top-2.5">
            <span
              className={cn(
                'inline-flex items-center rounded-md px-2.5 py-1 text-[0.65rem] font-poppins font-semibold uppercase tracking-[0.14em]',
                'bg-[#5c3d2e] text-[#fdf6f0] shadow-sm',
              )}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="font-poppins text-base font-semibold leading-snug text-[#2a1810] md:text-lg">
                {title}
              </h3>
              <p className="font-poppins text-xs text-[#6b5344] md:text-sm">
                {CURRENCY.format(unitPrice)}{' '}
                <span className="text-[#9a8478]">· unidade</span>
              </p>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className={cn(
                'shrink-0 cursor-pointer rounded-xl p-2.5 text-[#8b6f5c] transition-colors',
                'hover:bg-[#f0e6df] hover:text-[#cb2040] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light/40',
              )}
              aria-label={`Remover ${title} do pedido`}
            >
              <Trash2 className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="font-poppins text-xs font-medium uppercase tracking-wider text-[#8a7568]">
                Qtd.
              </span>
              <div
                className={cn(
                  'inline-flex items-center rounded-xl border border-[#e5d9cf] bg-[#faf7f4]',
                  'shadow-inner',
                )}
              >
                <button
                  type="button"
                  disabled={!canDecrease}
                  onClick={() => canDecrease && onQuantityChange(quantity - 1)}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-l-xl transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink-light/35',
                    canDecrease
                      ? 'cursor-pointer text-[#5c3d2e] hover:bg-[#efe4dc]'
                      : 'cursor-pointer text-[#c4b5a8] opacity-50',
                  )}
                  aria-label="Diminuir quantidade"
                >
                  <ChevronLeft className="size-5" strokeWidth={2} />
                </button>
                <span
                  className="min-w-[2.5rem] text-center font-poppins text-sm font-semibold tabular-nums text-[#2a1810]"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={!canIncrease}
                  onClick={() => canIncrease && onQuantityChange(quantity + 1)}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-r-xl transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink-light/35',
                    canIncrease
                      ? 'cursor-pointer text-[#5c3d2e] hover:bg-[#efe4dc]'
                      : 'cursor-pointer text-[#c4b5a8] opacity-50',
                  )}
                  aria-label="Aumentar quantidade"
                >
                  <ChevronRight className="size-5" strokeWidth={2} />
                </button>
              </div>
              <span className="hidden font-poppins text-[0.7rem] text-[#a08f82] sm:inline">
                máx. {stock}
              </span>
            </div>

            <div className="text-right sm:pl-4">
              <p className="font-poppins text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#9a8478]">
                Subtotal
              </p>
              <p className="font-poppins text-xl font-semibold tabular-nums text-pink-light md:text-2xl">
                {CURRENCY.format(lineTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
