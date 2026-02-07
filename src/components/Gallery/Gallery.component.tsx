import type { GalleryProps } from './Gallery.types'

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="w-1/2 lg:w-full">
        <img 
          src={images[0]} 
          alt="Gallery main" 
          className="w-full rounded-xl shadow-md object-cover"
          style={{ aspectRatio: '4/3' }}
        />
        </div>
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center">
        <img 
          src={images[1]} 
          alt="Gallery left" 
          className="w-[48%] rounded-xl shadow-md object-cover"
          style={{ aspectRatio: '1/1', maxWidth: '300px' }}
        />
        <img 
          src={images[2]} 
          alt="Gallery right" 
          className="w-[48%] rounded-xl shadow-md object-cover"
          style={{ aspectRatio: '1/1', maxWidth: '300px' }}
        />
      </div>
    </div>
  )
}