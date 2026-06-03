import { Link } from 'react-router-dom'
import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'

export default function Hero() {
  const booking = telLink(restaurant.phone)
  const photo = restaurant.heroSlides?.[1] ?? restaurant.heroSlides?.[0] ?? '/images/hero/slide-2.jpg'

  return (
    <section id="top" className="bg-cream">
      <div className="container-x grid gap-8 pt-36 pb-16 md:grid-cols-2 md:items-center md:gap-14 md:pt-44 md:pb-24">
        {/* Testo */}
        <div className="order-2 md:order-1">
          <h1 className="sr-only">Locanda Blues — Risto-Pub & Live Music, Roma</h1>
          <span className="stamp">Risto-Pub · Pizzeria · Birreria</span>
          <p className="mt-5 font-display text-4xl font-bold leading-[1.05] text-charcoal sm:text-5xl md:text-6xl">
            {restaurant.tagline}
          </p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal/75">
            Pizza al forno a legna, hamburger fatti in casa, le migliori birre alla spina
            e musica dal vivo nel weekend.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={booking} className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Prenota
            </a>
            <Link to="/menu" className="btn-secondary">Vedi il Menù</Link>
          </div>

          <p className="mt-7 text-sm text-charcoal/60">
            {restaurant.address.street}, {restaurant.address.city} · Cena dalle 20:00
          </p>
        </div>

        {/* Foto contenuta (non più sfondo a tutto schermo) */}
        <div className="order-1 md:order-2">
          <div className="relative">
            <img
              src={photo}
              alt="La sala in legno del Locanda Blues"
              fetchpriority="high"
              decoding="async"
              className="h-64 w-full rounded-2xl object-cover shadow-xl ring-1 ring-charcoal/10 sm:h-80 md:h-[62vh]"
            />
            {/* Etichetta sull'angolo, come un cartello appeso */}
            <span className="absolute -bottom-3 left-5 rounded-sm bg-terracotta px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cream shadow-lg">
              Roma Nord · Cassia
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
