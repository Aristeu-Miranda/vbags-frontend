import type { ContainerProps } from './Container.types'

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container mx-auto px-4 py-2">
      {children}
    </div>
  )
}