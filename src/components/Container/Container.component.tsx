import { cn } from '@/lib/utils'
import type { ContainerProps } from './Container.types'

export const Container = ({ children, isFlex = false }: ContainerProps) => {

  return (
    <div className={cn('container mx-auto px-4 py-2', isFlex ? 'flex' : 'flex-col')}>
      {children}
    </div>
  )
}