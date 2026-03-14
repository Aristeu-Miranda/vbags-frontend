import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage, AboutPage, ProductsPage, ProductPage, ContactPage, AuthPage, OrdersPage } from './pages'
import { Header } from './components/Header'
import { HEADER_HEIGHT } from './constants/header'
import { ProtectedRoute } from './components/ProtectedRoute'

const LandingPage = () => {
  return (
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
    </div>
  )
}

function App() {
  const { pathname } = useLocation()
  const hideHeaderRoutes = ['/auth']

  return (
    <>
      {!hideHeaderRoutes.includes(pathname) && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
