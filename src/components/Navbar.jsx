import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import Logo from './Logo.jsx'

const links = [
  { to: '/menu', label: 'Cucina & Pizza' },
  { to: '/vini', label: 'Birreria' },
  { to: '/chi-siamo', label: 'Il Locale' },
  { to: '/contatti', label: 'Contatti' },
]

/** Barra informativa sottile in cima: indirizzo + telefono. Calma, niente scorrimento. */
function InfoBar() {
  return (
    <div className="wood text-cream/85">
      <div className="container-x flex h-8 items-center justify-between text-[0.72rem] sm:text-xs">
        <span className="truncate">
          {restaurant.address.street} · {restaurant.address.city}
        </span>
        <span className="hidden items-center gap-4 sm:flex">
          <span className="text-cream/60">Cena dalle 20:00</span>
          <a href={telLink(restaurant.phone)} className="font-semibold text-gold hover:underline">
            {restaurant.phone}
          </a>
        </span>
        <a href={telLink(restaurant.phone)} className="font-semibold text-gold hover:underline sm:hidden">
          {restaurant.phone}
        </a>
      </div>
    </div>
  )
}

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

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => { if (mq.matches) setOpen(false) }
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  const booking = telLink(restaurant.phone)
  const linkColor = solid ? 'text-charcoal/80' : 'text-cream/90'
  const barColor = solid ? 'bg-charcoal' : 'bg-cream'

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <InfoBar />

      <div className={`transition-colors duration-300 ${
        solid ? 'bg-cream/95 shadow-sm backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <nav className="container-x flex h-14 items-center justify-between md:h-[4.5rem]">
          <Link to="/" className="flex items-center" aria-label="Locanda Blues — torna alla home">
            <Logo size="sm" variant={solid ? 'dark' : 'light'} />
          </Link>

          {/* Link desktop */}
          <div className="hidden items-center gap-6 md:flex lg:gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition hover:text-terracotta ${
                    isActive ? 'text-terracotta' : linkColor
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/#eventi" className={`text-sm font-semibold transition hover:text-terracotta ${linkColor}`}>
              Eventi
            </Link>
            <a href={booking} className="btn-primary py-2 text-sm">
              Prenota
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            type="button"
            aria-label={open ? 'Chiudi menù' : 'Apri menù'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
          >
            <span className="sr-only">{open ? 'Chiudi' : 'Menù'}</span>
            <span className="relative flex h-5 w-6 flex-col justify-between">
              <span className={`block h-0.5 w-full origin-center rounded ${barColor} transition duration-300 ${open ? 'translate-y-[9px] rotate-45' : ''}`} />
              <span className={`block h-0.5 w-full rounded ${barColor} transition duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full origin-center rounded ${barColor} transition duration-300 ${open ? '-translate-y-[9px] -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>
      </div>

      {/* Pannello mobile */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-charcoal/10 bg-cream/97 backdrop-blur-sm transition-all duration-300 md:hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ paddingBottom: open ? 'env(safe-area-inset-bottom)' : undefined }}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-3.5 text-base font-semibold transition active:bg-charcoal/10 ${
                  isActive ? 'text-terracotta' : 'text-charcoal hover:bg-charcoal/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/#eventi" className="rounded-xl px-3 py-3.5 text-base font-semibold text-charcoal transition hover:bg-charcoal/5 active:bg-charcoal/10">
            Eventi
          </Link>
          <a href={booking} className="btn-primary mt-3 justify-center gap-2 text-base">
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
