import { Link } from 'react-router-dom'
import { Container } from '../Container'
import logo from '@/assets/logo.png'
import { Button } from "@/components/ui/button"
export const Header = () => {
  return (
    <header className="mx-auto shadow-md">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl font-extralight font-poppins">V-Bags</h1>
          </Link>
          <nav className="w-1/2 justify-center items-center flex">
            <ul className="flex items-center font-poppins text-sm justify-between w-1/2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Sobre</Link></li>
              <li><Link to="/products">Produtos</Link></li>
              <li><Link to="/contact">Contato</Link></li>
            </ul>
          </nav>
          <Button variant="default" className="bg-pink-light text-white font-poppins hover:bg-pink-dark cursor-pointer">Login</Button>
        </div>
      </Container>
    </header>
  )
}