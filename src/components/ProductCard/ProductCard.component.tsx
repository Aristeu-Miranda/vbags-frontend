import type { ProductCardProps } from './ProductCard.types'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export const ProductCard = ({ title, description, image, price, onAction, status }: ProductCardProps) => {

  return (
    <div className="w-full max-w-96 border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-5 overflow-hidden">
      <div className="w-full h-full relative">
        <img src={image} alt={title} className="w-full object-cover rounded-lg hover:scale-105 transition-all duration-300" />
        <div className="absolute top-3 right-3">
          <div className={cn("text-xs font-poppins font-medium px-2 py-1 rounded-md", status === 'Disponível' ? 'bg-green-500 text-white' : status === 'Indisponível' ? 'bg-gray-400 text-white' : 'bg-yellow-500 text-white')}>
            {status}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-6 px-5 pb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-poppins font-medium text-gray-700">{title}</h3>
          <h3 className="text-lg font-poppins font-medium text-gray-400">R$ {price.toFixed(2)}</h3>
        </div>
        <p className="text-sm font-poppins font-light text-gray-700">{description}</p>
        <Button className="w-full mt-2 bg-pink-light text-white font-poppins hover:bg-pink-dark cursor-pointer" onClick={onAction}>
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}