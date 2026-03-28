import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { HEADER_HEIGHT } from "@/constants/header"
import { cn } from "@/lib/utils"
import { useProductsPageData } from "../Products/Products.hooks"

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export const ProductPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const [descriptionOverflows, setDescriptionOverflows] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { products, isLoading, isError } = useProductsPageData()

  const product = useMemo(() => {
    return products.find((item) => item.id === productId)
  }, [productId, products])

  useEffect(() => {
    setSelectedImageIndex(0)
    setDescriptionExpanded(false)
  }, [product?.id])

  useLayoutEffect(() => {
    const element = descriptionRef.current
    if (!element || descriptionExpanded) {
      setDescriptionOverflows(false)
      return
    }

    const measure = () => {
      setDescriptionOverflows(element.scrollHeight > element.clientHeight)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [product?.description, descriptionExpanded])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
        <p className="text-lg font-poppins text-gray-700">Carregando produto...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
        <p className="text-lg font-poppins text-gray-700">Nao foi possivel carregar o produto.</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
        <p className="text-lg font-poppins text-gray-700">Produto nao encontrado.</p>
      </div>
    )
  }

  const images = product.images
  const hasMultipleImages = images.length > 1
  const selectedImage = images[selectedImageIndex]

  const handleShowPreviousImage = () => {
    if (!hasMultipleImages) return

    setSelectedImageIndex((currentIndex) => {
      return currentIndex === 0 ? images.length - 1 : currentIndex - 1
    })
  }

  const handleShowNextImage = () => {
    if (!hasMultipleImages) return

    setSelectedImageIndex((currentIndex) => {
      return currentIndex === images.length - 1 ? 0 : currentIndex + 1
    })
  }

  return (
    <div className="h-dvh overflow-hidden bg-gray-50 flex flex-col">
      <div
        className="flex flex-1 min-h-0 flex-col box-border"
        style={{ paddingTop: HEADER_HEIGHT }}
      >
        <div className="relative flex flex-1 min-h-0 flex-col min-w-0 w-full max-w-[1600px] mx-auto">
          <button
            type="button"
            aria-label="Voltar para home"
            className="absolute left-3 sm:left-5 top-0 z-10 flex items-center gap-2 text-sm font-poppins text-gray-700 hover:text-pink-light transition-colors cursor-pointer py-1 whitespace-nowrap"
            onClick={() => navigate("/")}
          >
            <span aria-hidden>←</span>
            <span className="hidden sm:inline">Voltar</span>
          </button>

          <div className="flex flex-1 min-h-0 flex-col min-w-0 px-3 sm:px-5 pb-3 pt-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-[minmax(0,1fr)_auto] lg:grid-rows-1 gap-4 lg:gap-6 items-stretch flex-1 min-h-0 min-w-0 rounded-2xl bg-white p-4 md:p-6 shadow-sm border border-gray-100 overflow-hidden">
            <div className="lg:col-span-7 flex flex-col min-h-0 gap-2 h-full">
              <div className="relative flex-1 min-h-[140px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.altText}
                    className="max-w-full max-h-full w-auto h-auto object-contain object-center"
                  />
                ) : (
                  <div className="w-full min-h-[140px] flex flex-1 items-center justify-center text-gray-500 font-poppins">
                    Imagem indisponivel
                  </div>
                )}

                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-white transition cursor-pointer"
                      onClick={handleShowPreviousImage}
                      aria-label="Mostrar imagem anterior"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-white transition cursor-pointer"
                      onClick={handleShowNextImage}
                      aria-label="Mostrar proxima imagem"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {images.length > 0 && (
                <div className="shrink-0 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {images.map((image, index) => {
                    const isSelected = index === selectedImageIndex

                    return (
                      <button
                        key={image.id}
                        type="button"
                        className={`rounded-lg overflow-hidden border-2 transition cursor-pointer ${isSelected ? "border-pink-light" : "border-transparent hover:border-gray-300"}`}
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`Selecionar imagem ${index + 1}`}
                      >
                        <img src={image.url} alt={image.altText} className="w-full h-12 sm:h-14 object-cover object-center" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3 min-h-0 overflow-hidden">
              <div className="space-y-2 shrink-0">
                <h1 className="text-2xl md:text-[1.65rem] lg:text-[1.85rem] font-poppins font-semibold text-gray-900 leading-[1.2] tracking-tight">
                  {product.title}
                </h1>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-2xl md:text-3xl font-poppins font-semibold text-pink-light tabular-nums">
                    {CURRENCY_FORMATTER.format(product.price)}
                  </p>
                  <span className="text-sm font-poppins font-normal text-gray-500">referência · no pix</span>
                </div>
              </div>

              {product.description.trim().length > 0 ? (
                <div className="space-y-2 pt-2 border-t border-gray-100 shrink-0">
                  <h2 className="text-xs font-poppins font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Sobre o produto
                  </h2>
                  <p
                    ref={descriptionRef}
                    className={cn(
                      "text-base font-poppins font-light text-gray-600 leading-relaxed whitespace-pre-wrap",
                      !descriptionExpanded && "line-clamp-3",
                    )}
                  >
                    {product.description}
                  </p>
                  {(descriptionOverflows ||
                    descriptionExpanded ||
                    product.description.trim().length > 120) && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto font-poppins text-pink-light border-pink-light/40 hover:bg-pink-light/5 hover:text-pink-dark hover:border-pink-light/60"
                      onClick={() => setDescriptionExpanded((previous) => !previous)}
                    >
                      {descriptionExpanded ? "Ver menos" : "Ver descrição completa"}
                    </Button>
                  )}
                  <Button className="w-full min-h-11 rounded-xl bg-pink-light text-white hover:bg-pink-dark cursor-pointer text-base font-poppins font-medium shadow-sm">
                    Solicitar produto
                  </Button>
                </div>
              ) : (
                <div className="shrink-0 pt-1">
                  <Button className="w-full min-h-11 rounded-xl bg-pink-light text-white hover:bg-pink-dark cursor-pointer text-base font-poppins font-medium shadow-sm">
                    Solicitar produto
                  </Button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
