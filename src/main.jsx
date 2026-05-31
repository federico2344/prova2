import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* Body fonts */
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/lora/400.css'
import '@fontsource/lora/500.css'
import '@fontsource/lora/600.css'

/* Display fonts */
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/500-italic.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/dm-serif-display/400.css'

import './index.css'
import ThemeProvider from './components/ThemeProvider.jsx'

import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import WinesPage from './pages/WinesPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import CookiePage from './pages/CookiePage.jsx'
import AdminGuidePage from './pages/AdminGuidePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider />
    <BrowserRouter>
      {/* Riporta in cima ad ogni cambio pagina */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="chi-siamo" element={<AboutPage />} />
          <Route path="vini" element={<WinesPage />} />
          <Route path="contatti" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="cookie" element={<CookiePage />} />
          <Route path="guida-admin" element={<AdminGuidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
