import heroBg from '@/assets/hero-bg.jpg'
import { Button } from '@/components/ui/button'

const scrollToProducts = () => {
  const element = document.getElementById('products')
  if (element) {
    setTimeout(() => {
      const elementTop = element.offsetTop
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      })
    }, 0)
  }
}

export const HomePage = () => {
  return (
    <div 
      className="relative w-full h-full"
      style={{
        height: '100%',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 gap-6">
        <div className="flex flex-col items-center justify-center font-poppins gap-4">
        <h1 className="text-center text-5xl lg:text-7xl font-lobster font-extralight mb-4 text-pink-light">Bolsas <span className="font-lobster font-extralight text-pink-dark">artesanais</span></h1>
        <h1 className="text-center text-5xl lg:text-7xl font-lobster font-extralight mb-4 text-pink-light">feitas em <span className="font-lobster font-extralight text-pink-dark">Tela</span></h1>
        <p className="text-xl font-poppins text-white/80 w-2/3 text-center">
        Cada bolsa é cuidadosamente feita à mão em tela, unindo arte, qualidade e autenticidade em cada detalhe.
        </p>
        </div>
        <div className="flex items-center justify-center gap-9 mt-4">
        <Button 
          variant="default" 
          className="bg-pink-light text-white font-poppins hover:bg-pink-dark cursor-pointer"
          onClick={scrollToProducts}
        >
          Ver produtos
        </Button>
        <Button variant="outline" className="bg-white text-pink-dark font-poppins cursor-pointer">Fazer pedido</Button>
        </div>
      </div>
    </div>
  )
}

