import { Link } from 'react-router-dom'
import { Container } from '../Container'
import logo from '@/assets/logo.png'
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from 'react'
import { HEADER_HEIGHT } from '@/constants/header'

const NAVIGATION_ITEMS = [
  { path: '/about', label: 'Sobre', sectionId: 'about' },
  { path: '/products', label: 'Produtos', sectionId: 'products' },
  { path: '/contact', label: 'Contato', sectionId: 'contact' },
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      return
    }

    setTimeout(() => {
      const elementTop = element.offsetTop
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      })
    }, 0)
  }
}

const getActiveSection = (): string | null => {
  const sections = ['home', 'about', 'products', 'contact']
  const scrollPosition = window.scrollY + HEADER_HEIGHT + 20

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section && section.offsetTop <= scrollPosition) {
      return sections[i]
    }
  }

  return 'home'
}

export const Header = () => {
  const navRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current || !indicatorRef.current) return

      const currentSection = getActiveSection()
      setActiveSection(currentSection || 'home')

      const activeIndex = NAVIGATION_ITEMS.findIndex(
        item => item.sectionId === currentSection
      )

      if (activeIndex === -1) {
        setIndicatorStyle({ left: 0, width: 0 })
        return
      }

      const navItems = navRef.current.querySelectorAll('li')
      const activeItem = navItems[activeIndex]

      if (activeItem) {
        const navRect = navRef.current.getBoundingClientRect()
        const itemRect = activeItem.getBoundingClientRect()
        
        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
        })
      }
    }

    const handleScroll = () => {
      updateIndicator()
    }

    updateIndicator()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateIndicator)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-auto shadow-md bg-white/90 backdrop-blur-sm">
      <Container>
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
          >
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl font-extralight font-poppins">V-Bags</h1>
          </Link>
          <nav className="w-1/2 justify-center items-center flex">
            <ul 
              ref={navRef}
              className=" items-center font-poppins text-sm justify-between w-full lg:w-1/2 relative hidden sm:flex"
            >
              {NAVIGATION_ITEMS.map((item) => (
                <li className="cursor-pointer mb-1" key={item.path}>
                  <Link 
                    to={item.path}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.sectionId)
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-pink-light transition-all duration-300 ease-in-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            </ul>
          </nav>
          <Button variant="default" className="bg-pink-light text-white font-poppins hover:bg-pink-dark cursor-pointer hidden sm:block">Login</Button>
        </div>
      </Container>
    </header>
  )
}