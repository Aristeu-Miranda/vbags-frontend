import { Container } from "@/components/Container"
import { productsMock } from "./Products.mock"
import { ProductCard } from "@/components/ProductCard"

export const ProductsPage = () => {

  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Container>
        <div className="flex flex-col items-center justify-center w-2/3 mx-auto mb-16">
          <h1 className="text-6xl font-lobster font-extralight mb-4 text-pink-light">Nossa coleção</h1>
          <p className="text-lg font-poppins font-light text-gray-700 leading-relaxed text-center">
          Descubra nossa seleção exclusiva de bolsas artesanais bordadas em tela, 
          cada uma contando sua própria história única através de padrões intrincados e 
          materiais de alta qualidade.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {productsMock.map(({ id, title, description, image, price, onAction, status }) => (
            <ProductCard key={id} id={id} title={title} description={description} image={image} price={price} onAction={onAction} status={status} />
          ))}
        </div>
      </Container>
    </div>
  )
}

