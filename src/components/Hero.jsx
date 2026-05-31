import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'

function HeroSlideshow({ slides, current }) {
  return (
    <div className="absolute inset-0 bg-charcoal">
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchpriority={i === 0 ? 'high' : 'auto'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/60 to-charcoal/85" />
    </div>
  )
}

export default function Hero() {
  const booking = telLink(restaurant.phone)
  const slides = restaurant.heroSlides ?? ['/images/hero/slide-1.jpg']
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <HeroSlideshow slides={slides} current={current} />

      <div
        className="container-x relative z-10 py-28 text-cream"
        style={{ paddingTop: 'calc(7rem + env(safe-area-inset-top))' }}
      >
        <p className="eyebrow text-gold">{restaurant.address.street} · Roma</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight drop-shadow-sm sm:text-6xl md:text-7xl">
          {restaurant.name}
        </h1>
        <p className="mt-4 max-w-xl text-base text-cream/90 sm:text-xl">
          {restaurant.tagline}. Un'osteria piccola e accogliente dove la cucina
          della tradizione incontra la ricerca.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={booking} className="btn-primary w-full justify-center sm:w-auto">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Prenota un Tavolo
          </a>
          <Link
            to="/menu"
            className="btn-secondary w-full justify-center border-cream/40 text-cream hover:bg-cream hover:text-charcoal sm:w-auto"
          >
            Vedi il Menù
          </Link>
        </div>

        {/* Indicatori slideshow — solo se ci sono più foto */}
        {slides.length > 1 && (
          <div className="mt-10 flex gap-1.5" role="tablist" aria-label="Foto slideshow">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Foto ${i + 1}`}
                onClick={() => setCurrent(i)}
                className="flex items-center px-0.5 py-3"
              >
                <span className={`block h-0.5 rounded-full transition-all duration-500 ${
                  i === current ? 'w-6 bg-cream' : 'w-2 bg-cream/40 hover:bg-cream/70'
                }`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
