import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, AboutPage, ProductsPage, ProductPage, ContactPage, LoginPage, RegisterPage } from './pages'
import { Header } from './components/Header'
import { HEADER_HEIGHT } from './constants/header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="relative" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <section 
          id="home" 
          style={{ 
            height: '100dvh',
            margin: 0,
            padding: 0,
            display: 'block',
          }}
        >
          <HomePage />
        </section>
        <section 
          id="about" 
          style={{ 
            minHeight: '100dvh',
            margin: 0,
            padding: 0,
            paddingTop: `${HEADER_HEIGHT}px`,
            boxSizing: 'border-box',
            display: 'block',
            backgroundColor: '#f5f5f5',
          }}
        >
          <AboutPage />
        </section>
        <section 
          id="products" 
          style={{ 
            minHeight: '100dvh',
            margin: 0,
            padding: 0,
            paddingTop: `${HEADER_HEIGHT}px`,
            boxSizing: 'border-box',
            display: 'block',
          }}
        >
          <ProductsPage />
        </section>
        <section 
          id="contact" 
          style={{ 
            minHeight: '100dvh',
            margin: 0,
            padding: 0,
            paddingTop: `${HEADER_HEIGHT}px`,
            boxSizing: 'border-box',
            display: 'block',
          }}
        >
          <ContactPage />
        </section>
        <Routes>
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
