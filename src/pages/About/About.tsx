import { ABOUT_DATA, ABOUT_IMAGES } from "./About.data"
import { Gallery } from "@/components/Gallery"

export const AboutPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-8 lg:px-16 py-12 flex flex-col lg:flex-row gap-20 w-full max-w-7xl">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-10">
          <h1 className="text-5xl font-bold mb-6 text-left font-lobster text-pink-dark">
            {ABOUT_DATA.title}
          </h1>
          <p className="text-lg font-poppins font-light text-gray-700 leading-relaxed text-left">
            {ABOUT_DATA.p1}
          </p>
          <p className="text-lg font-poppins font-light text-gray-700 leading-relaxed text-left">
            {ABOUT_DATA.p2}
          </p>
          <p className="text-lg font-poppins font-light text-gray-700 leading-relaxed text-left">
            {ABOUT_DATA.p3}
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
          <Gallery images={ABOUT_IMAGES.map(image => image.toString())} />
        </div>
      </div>
    </div>
  )
}
