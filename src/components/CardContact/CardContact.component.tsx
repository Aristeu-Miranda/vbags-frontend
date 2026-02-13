import type { CardContactProps } from './CardContact.types'


export const CardContact = ({ title, description, icon, href }: CardContactProps) => {
  return (
    <a href={href} target="_blank" className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-5 gap-4 min-w-60">
        <div className="w-20 h-10 object-cover rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-lg font-poppins font-medium text-gray-700">{title}</h3>
        <p className="text-sm font-poppins font-extralight text-gray-700">{description}</p>
    </a>
  )
}