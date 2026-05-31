import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import Logo from './Logo.jsx'

const links = [
  { to: '/menu', label: 'I Menù' },
  { to: '/chi-siamo', label: 'Il Ristorante' },
  { to: '/vini', label: 'Vini' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  const solid = !isHome || scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Chiude il pannello mobile se si ruota il dispositivo su desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => { if (mq.matches) setOpen(false) }
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  const booking = telLink(restaurant.phone)
  const linkColor = solid ? 'text-charcoal/80' : 'text-cream/90'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-cream/95 shadow-sm backdrop-blur-sm' : 'bg-transparent'
      }`}
      // Padding per notch/Dynamic Island (iOS) e barra di stato Android
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <nav className="container-x flex h-14 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center" aria-label="L'Altra Osteria — torna alla home">
          <Logo
            variant={solid ? 'dark' : 'light'}
            className={`h-9 w-auto transition duration-300 md:h-16 ${
              solid ? 'mix-blend-multiply' : 'brightness-0 invert'
            }`}
          />
        </Link>

        {/* Link desktop */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-terracotta ${
                  isActive ? 'text-terracotta' : linkColor
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={booking}
            className="btn-primary py-2 text-sm"
          >
            Prenota
          </a>
        </div>

        {/* Hamburger mobile — area tap minima 44×44px */}
        <button
          type="button"
          aria-label={open ? 'Chiudi menù' : 'Apri menù'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
        >
          <span className="sr-only">{open ? 'Chiudi' : 'Menù'}</span>
          {/* Tre linee → croce con CSS */}
          <span className="relative flex h-5 w-6 flex-col justify-between">
            <span
              className={`block h-0.5 w-full origin-center rounded transition duration-300 ${
                solid ? 'bg-charcoal' : 'bg-cream'
              } ${open ? 'translate-y-[9px] rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-full rounded transition duration-300 ${
                solid ? 'bg-charcoal' : 'bg-cream'
              } ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-full origin-center rounded transition duration-300 ${
                solid ? 'bg-charcoal' : 'bg-cream'
              } ${open ? '-translate-y-[9px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </nav>

      {/* Pannello mobile */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-charcoal/10 bg-cream/97 backdrop-blur-sm transition-all duration-300 md:hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        // Padding per safe area bottom quando il pannello è aperto
        style={{ paddingBottom: open ? 'env(safe-area-inset-bottom)' : undefined }}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-3.5 text-base font-medium transition active:bg-charcoal/10 ${
                  isActive
                    ? 'text-terracotta'
                    : 'text-charcoal hover:bg-charcoal/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={booking}
            className="btn-primary mt-3 justify-center gap-2 text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Chiama per prenotare
          </a>
        </div>
      </div>
    </header>
  )
}
