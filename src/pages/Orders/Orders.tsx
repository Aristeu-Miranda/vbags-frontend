import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { OrderCard } from '@/components/OrderCard'
import { HEADER_HEIGHT } from '@/constants/header'
import { useOrderCart } from '@/contexts/OrderCartContext'

export const OrdersPage = () => {
  const navigate = useNavigate()
  const { lines, setLineQuantity, removeLine } = useOrderCart()

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      <div
        className="flex flex-1 min-h-0 flex-col box-border"
        style={{ paddingTop: HEADER_HEIGHT }}
      >
        <div className="relative flex flex-1 min-h-0 flex-col min-w-0 w-full max-w-[1600px] mx-auto">
          <button
            type="button"
            aria-label="Voltar para home"
            className="absolute left-3 sm:left-5 top-0 z-10 flex items-center gap-2 text-sm font-poppins text-gray-700 hover:text-pink-light transition-colors cursor-pointer py-1 whitespace-nowrap"
            onClick={() => navigate('/')}
          >
            <span aria-hidden>←</span>
            <span className="hidden sm:inline">Voltar</span>
          </button>

          <div
            className={`flex min-h-0 flex-col min-w-0 px-3 sm:px-5 pb-8 w-full flex-1 ${
              lines.length === 0 ? 'pt-6' : 'pt-10'
            }`}
          >
            {lines.length > 0 && (
              <header className="mb-6 max-w-2xl">
                <p className="font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7568]">
                  Seu pedido
                </p>
                <h1 className="mt-1 font-poppins text-2xl font-semibold tracking-tight text-[#2a1810] md:text-3xl">
                  Itens selecionados
                </h1>
                <p className="mt-2 font-poppins text-sm text-[#6b5344]">
                  Ajuste quantidades ou remova itens antes de finalizar.
                </p>
              </header>
            )}

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                  width={96}
                  height={96}
                />
                <p className="font-poppins text-base text-[#6b5344] sm:text-lg">Nenhum produto selecionado</p>
                <button
                  type="button"
                  className="rounded-lg bg-pink-light px-6 py-2.5 font-poppins text-sm font-medium text-white transition-colors hover:bg-pink-dark cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  Visualizar Produtos
                </button>
              </div>
            ) : (
              <ul className="flex max-w-3xl flex-col gap-4">
                {lines.map(({ productId, imageUrl, imageAlt, title, unitPrice, quantity, stock }) => (
                  <li key={productId}>
                    <OrderCard
                      imageUrl={imageUrl}
                      imageAlt={imageAlt}
                      title={title}
                      unitPrice={unitPrice}
                      quantity={quantity}
                      stock={stock}
                      statusLabel="Pendente"
                      onQuantityChange={(next) => setLineQuantity(productId, next)}
                      onRemove={() => removeLine(productId)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
