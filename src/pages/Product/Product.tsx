import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import { HEADER_HEIGHT } from "@/constants/header"
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
  const { products, isLoading, isError } = useProductsPageData()

  const product = useMemo(() => {
    return products.find((item) => item.id === productId)
  }, [productId, products])

  useEffect(() => {
    setSelectedImageIndex(0)
  }, [product?.id])

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
    <div className="min-h-screen bg-gray-50 py-12" style={{ paddingTop: `${HEADER_HEIGHT + 32}px` }}>
      <Container>
        <button
          type="button"
          className="mb-8 flex items-center gap-2 text-sm font-poppins text-gray-700 hover:text-pink-light transition-colors cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span aria-hidden>←</span>
          <span>Voltar para home</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="lg:col-span-7">
            <div className="relative bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {selectedImage ? (
                <img src={selectedImage.url} alt={selectedImage.altText} className="w-full h-[500px] md:h-[700px] object-contain object-center" />
              ) : (
                <div className="w-full h-[500px] md:h-[700px] flex items-center justify-center text-gray-500 font-poppins">
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
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
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
                      <img src={image.url} alt={image.altText} className="w-full h-20 object-cover object-center" />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-poppins font-semibold text-gray-900 leading-tight">{product.title}</h1>
            <p className="text-3xl font-poppins font-semibold text-pink-light">{CURRENCY_FORMATTER.format(product.price)} <span className="text-gray-500 text-sm">no pix</span></p>
            <Button className="w-full sm:w-auto bg-pink-light text-white hover:bg-pink-dark cursor-pointer mt-4">
              Solicitar produto
            </Button>
          </div>

          <div className="lg:col-span-12 mt-8 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-poppins font-semibold text-gray-900 mb-4">Descrição</h2>
            <p className="text-base font-poppins font-light text-gray-700 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
