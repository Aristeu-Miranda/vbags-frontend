import { useParams } from 'react-router-dom'

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>Product {id}</h1>
      <p>Product details with ID: {id}</p>
    </div>
  )
}

