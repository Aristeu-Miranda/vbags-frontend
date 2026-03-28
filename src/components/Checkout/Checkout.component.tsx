import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { CheckoutProps } from './Checkout.types'

const CURRENCY = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const Checkout = ({ lines, shippingAmount = null }: CheckoutProps) => {
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false)
  const itemsSubtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const shippingResolved = typeof shippingAmount === 'number'
  const shippingValue = shippingResolved ? shippingAmount : 0
  const total = itemsSubtotal + shippingValue

  return (
    <>
      <aside
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-2xl border border-[#e8dfd4]/90 bg-white',
          'shadow-[0_4px_32px_-10px_rgba(45,28,18,0.15)]',
          'min-h-[min(100%,520px)] lg:min-h-[480px]',
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <h2 className="border-b border-[#e8dfd4] pb-4 font-poppins text-lg font-semibold tracking-tight text-[#2a1810] sm:text-xl">
            Resumo
          </h2>

          <div className="flex flex-1 flex-col gap-1 pt-4">
            <p className="font-poppins text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#9a8478]">
              Itens
            </p>
            <ul className="flex flex-col gap-3">
              {lines.map((line) => {
                const lineSubtotal = line.unitPrice * line.quantity

                return (
                  <li
                    key={line.productId}
                    className="flex items-start justify-between gap-3 border-b border-[#f0e8e0]/90 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-poppins text-sm font-medium text-[#2a1810]">{line.title}</p>
                      <p className="mt-0.5 font-poppins text-xs text-[#8a7568]">
                        {line.quantity} {line.quantity === 1 ? 'unidade' : 'unidades'}
                      </p>
                    </div>
                    <p className="shrink-0 font-poppins text-sm font-semibold tabular-nums text-[#5c3d2e]">
                      {CURRENCY.format(lineSubtotal)}
                    </p>
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto flex flex-col gap-4 pt-6">
              <div className="flex items-center justify-between gap-3 border-t border-[#e8dfd4] pt-4">
                <span className="font-poppins text-sm font-medium text-[#6b5344]">Frete</span>
                {shippingResolved ? (
                  <span className="font-poppins text-sm font-semibold tabular-nums text-[#5c3d2e]">
                    {CURRENCY.format(shippingValue)}
                  </span>
                ) : (
                  <span className="font-poppins text-sm font-medium italic text-[#a08f82]">A calcular</span>
                )}
              </div>

              <div className="rounded-xl bg-[#faf7f4] px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex min-h-[3.25rem] items-center justify-between gap-3 sm:min-h-[3.5rem]">
                  <span className="font-poppins text-sm font-semibold uppercase leading-none tracking-[0.08em] text-[#6b5344]">
                    Total
                  </span>
                  <span className="font-poppins text-2xl font-bold leading-none tabular-nums text-pink-light sm:text-3xl">
                    {CURRENCY.format(total)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={cn(
                  'w-full cursor-pointer rounded-xl border border-[#e8dfd4] bg-white py-3 font-poppins text-sm font-medium text-[#5c3d2e]',
                  'transition-colors hover:bg-[#faf7f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light/40',
                )}
                onClick={() => setShippingDialogOpen(true)}
              >
                Calcular frete
              </button>
            </div>
          </div>
        </div>
      </aside>

      <Dialog open={shippingDialogOpen} onOpenChange={setShippingDialogOpen}>
        <DialogContent className="font-poppins sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#2a1810]">Calcular frete</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
