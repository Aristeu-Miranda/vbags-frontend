import type { ProductCardProps } from './ProductCard.types'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

const DESCRIPTION_WORD_LIMIT = 18

const truncateDescription = (text: string, wordLimit: number) => {
  const words = text.trim().split(/\s+/)

  if (words.length <= wordLimit) {
    return text
  }

  return `${words.slice(0, wordLimit).join(' ')}...`
}

export const ProductCard = ({ title, description, image, price, onAction, status }: ProductCardProps) => {
  const shortDescription = truncateDescription(description, DESCRIPTION_WORD_LIMIT)

  return (
    <div className="w-full max-w-96 h-[600px] max-h-[600px] border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      <div className="w-full h-80 relative overflow-hidden">
        <img src={image[0]} alt={title} className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-300" />
        <div className="absolute top-3 right-3">
          <div className={cn("text-xs font-poppins font-medium px-2 py-1 rounded-md", status === 'Disponível' ? 'bg-green-500 text-white' : status === 'Indisponível' ? 'bg-gray-400 text-white' : 'bg-yellow-500 text-white')}>
            {status}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between gap-5 pt-5 px-5 pb-5 min-h-0">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-poppins font-medium text-gray-700 flex-1">{title}</h3>
          <h3 className="text-lg font-poppins font-semibold text-pink-light text-right whitespace-nowrap">R$ {price.toFixed(2)}</h3>
        </div>
        <p className="text-sm font-poppins font-light text-gray-700">{shortDescription}</p>
        <Button className="w-full mt-2 bg-pink-light text-white font-poppins hover:bg-pink-dark cursor-pointer" onClick={onAction}>
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}