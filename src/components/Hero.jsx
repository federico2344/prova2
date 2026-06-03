import { Link } from 'react-router-dom'
import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'

const souls = [
  { label: 'Pizzeria & Cucina', note: 'Forno a legna, farina tipo 1' },
  { label: 'Birreria & Mixology', note: 'Spine sempre in rotazione' },
  { label: 'Live Club', note: 'Musica dal vivo nel weekend' },
]

function Highlights() {
  return (
    <div className="rounded-2xl border border-cream/15 bg-ink/80 p-5 text-cream backdrop-blur-md sm:p-6">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Cosa trovi</p>
      <ul className="divide-y divide-cream/10">
        {souls.map((s) => (
          <li key={s.label} className="py-3 first:pt-0 last:pb-0">
            <p className="font-display text-lg font-semibold">{s.label}</p>
            <p className="text-sm text-cream/65">{s.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-cream/10 pt-4 text-sm text-cream/70">
        Cena dalle 20:00 · consigliata la prenotazione
      </p>
    </div>
  )
}

export default function Hero() {
  const booking = telLink(restaurant.phone)
  // Sfondo: l'interno del pub (sala + bancone in legno) — è prima di tutto un risto-pub
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
        {/* Velo caldo (legno) per leggibilità, più intenso a sinistra e in basso */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
      </div>

      <div
        className="container-x relative z-10 grid w-full gap-10 pb-20 pt-36 text-cream md:grid-cols-[1.25fr_0.85fr] md:items-center md:pt-40"
        style={{ paddingTop: 'calc(8.5rem + env(safe-area-inset-top))' }}
      >
        {/* Colonna testo */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Risto-Pub · Pizzeria · Birreria
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight drop-shadow sm:text-6xl md:text-7xl">
            {restaurant.name}
          </h1>
          <p className="mt-5 max-w-md text-base text-cream/85 sm:text-xl">{restaurant.tagline}</p>

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
        </div>

        {/* Colonna offerta del locale */}
        <Highlights />
      </div>
    </section>
  )
}
