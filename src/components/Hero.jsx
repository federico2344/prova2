import { Link } from 'react-router-dom'
import { restaurant, events } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'

function NextLive() {
  const list = events?.upcoming ?? []
  if (list.length === 0) return null
  return (
    <div className="rounded-2xl border border-charcoal/15 bg-ink/75 p-5 backdrop-blur-md sm:p-6">
      <div className="flex items-center gap-2 text-gold">
        <span className="live-dot" />
        <h2 className="font-display text-lg uppercase tracking-[0.18em]">Prossimi Live</h2>
      </div>
      <ul className="mt-4 divide-y divide-charcoal/10">
        {list.map((ev) => (
          <li key={ev.title} className="flex items-center gap-4 py-3 first:pt-0">
            <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-terracotta/15 py-1.5 text-terracotta">
              <span className="text-[0.65rem] font-semibold uppercase leading-none">{ev.day}</span>
              <span className="font-display text-xl font-bold leading-none">{ev.date}</span>
              <span className="text-[0.6rem] uppercase leading-none">{ev.month}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-charcoal">{ev.title}</p>
              <p className="truncate text-sm text-charcoal/60">{ev.genre}</p>
            </div>
            <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-gold">{ev.time}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/#eventi"
        className="mt-4 inline-flex text-sm font-semibold uppercase tracking-wide text-terracotta hover:underline"
      >
        Tutti gli eventi →
      </Link>
    </div>
  )
}

export default function Hero() {
  const booking = telLink(restaurant.phone)
  const bg = restaurant.heroSlides?.[0] ?? '/images/hero/slide-1.jpg'

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Sfondo: un'unica foto forte (concerto) con velo scuro a sinistra e dal basso */}
      <div className="absolute inset-0 bg-ink">
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div
        className="container-x relative z-10 grid w-full gap-10 pb-20 pt-36 text-charcoal md:grid-cols-[1.25fr_0.85fr] md:items-center md:pt-40"
        style={{ paddingTop: 'calc(9rem + env(safe-area-inset-top))' }}
      >
        {/* Colonna testo */}
        <div>
          <p className="eyebrow text-terracotta">Risto-Pub · Birreria · Live Music</p>
          <h1 className="font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight drop-shadow sm:text-7xl md:text-8xl">
            {restaurant.name}
          </h1>
          <p className="mt-5 max-w-md text-base text-charcoal/85 sm:text-xl">{restaurant.tagline}</p>

          <div className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-charcoal/20 bg-ink/40 px-4 py-2 text-sm text-charcoal/85 backdrop-blur-sm">
            <span className="font-semibold text-terracotta">Cena dalle 20:00</span>
            <span className="text-charcoal/40">·</span>
            <span className="font-semibold text-gold">Live dalle 22:00</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={booking} className="btn-primary w-full justify-center sm:w-auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Prenota un Tavolo
            </a>
            <Link
              to="/menu"
              className="btn-secondary w-full justify-center border-charcoal/40 text-charcoal hover:bg-charcoal hover:text-cream sm:w-auto"
            >
              Cucina &amp; Pizza
            </Link>
          </div>
        </div>

        {/* Colonna eventi */}
        <NextLive />
      </div>
    </section>
  )
}
