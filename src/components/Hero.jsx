import { Link } from 'react-router-dom'
import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'

export default function Hero() {
  const booking = telLink(restaurant.phone)
  // Sfondo: l'interno del pub in legno; davanti, l'insegna vera del locale
  const bg = restaurant.heroSlides?.[1] ?? restaurant.heroSlides?.[0] ?? '/images/hero/slide-2.jpg'

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 bg-ink">
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/55" />
      </div>

      <div
        className="container-x relative z-10 pb-20 pt-40 text-center text-cream md:pt-44"
        style={{ paddingTop: 'calc(9.5rem + env(safe-area-inset-top))' }}
      >
        <h1 className="sr-only">Locanda Blues — Risto-Pub & Live Music, Roma</h1>

        {/* Insegna in legno del locale */}
        <img
          src="/images/general/logo.jpg"
          alt="Locanda Blues — Risto-Pub · Live Music"
          className="mx-auto w-full max-w-2xl -rotate-1 rounded-lg shadow-2xl ring-1 ring-black/20"
        />

        <p className="mx-auto mt-8 max-w-xl text-lg text-cream/90 sm:text-2xl">{restaurant.tagline}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={booking} className="btn-primary w-full justify-center sm:w-auto">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Prenota un Tavolo
          </a>
          <Link to="/menu" className="btn-secondary w-full justify-center border-cream/40 text-cream hover:bg-cream hover:text-charcoal sm:w-auto">
            Vedi il Menù
          </Link>
        </div>

        <p className="mt-9 text-xs font-semibold uppercase tracking-[0.28em] text-cream/70">
          Pizzeria · Birreria · Live Club · Roma Nord
        </p>
      </div>
    </section>
  )
}
