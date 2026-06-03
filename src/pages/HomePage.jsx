import { Link } from 'react-router-dom'
import { restaurant, menuData, team, events } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import { formatPrice } from '../lib/utils.js'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'

export default function HomePage() {
  const signatures = menuData
    .flatMap((c) => c.sections)
    .flatMap((s) => s.dishes)
    .filter((d) => d.tags?.includes('Signature'))

  const posters = events?.posters ?? []
  const upcoming = events?.upcoming ?? []

  return (
    <>
      <Hero />

      {/* Intro + tre "fatti" */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Benvenuti alla Locanda</p>
            <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-charcoal sm:text-4xl md:text-5xl">
              Cucina, birre e musica dal vivo, a Roma Nord.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{restaurant.intro}</p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/10 sm:grid-cols-3">
            {[
              { k: 'Forno a legna', v: 'Pizza con farina di tipo 1' },
              { k: 'Birreria', v: 'Spine sempre in rotazione' },
              { k: 'Live ogni weekend', v: 'Cena 20:00 · Live 22:00' },
            ].map((f) => (
              <div key={f.k} className="bg-cream p-7 text-center">
                <p className="font-display text-xl uppercase tracking-wide text-terracotta">{f.k}</p>
                <p className="mt-1 text-sm text-charcoal/65">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu a scorrimento orizzontale */}
      {signatures.length > 0 && (
        <section className="bg-ink py-20 text-charcoal md:py-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-gold">Dal forno a legna</p>
                <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">Le pizze che ci somigliano</h2>
              </div>
              <Link to="/menu" className="text-sm font-semibold uppercase tracking-wide text-terracotta hover:underline">
                Tutto il menù →
              </Link>
            </div>

            <div className="rail mt-10">
              {signatures.map((dish) => (
                <article
                  key={dish.name}
                  className="w-72 rounded-2xl border border-charcoal/10 bg-panel p-7"
                >
                  <span className="font-display text-3xl text-gold">♫</span>
                  <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-terracotta">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{dish.description}</p>
                  {dish.price != null && (
                    <p className="mt-4 font-display text-lg text-price">{formatPrice(dish.price)}</p>
                  )}
                </article>
              ))}
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-charcoal/40">← scorri →</p>
          </div>
        </section>
      )}

      {/* Muro di locandine / Eventi */}
      {posters.length > 0 && (
        <section id="eventi" className="scroll-mt-28 bg-cream py-20 md:py-24">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <p className="eyebrow text-gold">
                <span className="live-dot mr-2 text-terracotta" /> Sul palco
              </p>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-charcoal sm:text-4xl">Musica dal vivo</h2>
              <p className="mt-4 text-charcoal/75">{events.intro}</p>
            </Reveal>

            {/* Poster wall */}
            <div className="rail mt-10">
              {posters.map((src, i) => (
                <div
                  key={src}
                  className="w-60 overflow-hidden rounded-2xl border border-charcoal/10 bg-ink shadow-lg sm:w-64"
                >
                  <img
                    src={src}
                    alt={`Locandina concerto ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.closest('div').style.display = 'none')}
                  />
                </div>
              ))}
            </div>

            {/* Prossimi appuntamenti */}
            {upcoming.length > 0 && (
              <ul className="mt-10 grid gap-3 sm:grid-cols-3">
                {upcoming.map((ev) => (
                  <li key={ev.title} className="flex items-center gap-4 rounded-xl border border-charcoal/10 bg-blush/40 p-4">
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-terracotta/15 py-1.5 text-terracotta">
                      <span className="text-[0.65rem] font-semibold uppercase leading-none">{ev.day}</span>
                      <span className="font-display text-xl font-bold leading-none">{ev.date}</span>
                      <span className="text-[0.6rem] uppercase leading-none">{ev.month}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-charcoal">{ev.title}</p>
                      <p className="truncate text-sm text-charcoal/60">{ev.genre} · {ev.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Gli spazi / le anime del locale */}
      <section className="bg-blush/30 py-20 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Tutto in un posto solo</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-charcoal sm:text-4xl">Le anime del Locanda</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map((person, i) => (
              <Reveal
                key={person.name}
                delay={i * 120}
                className="group relative overflow-hidden rounded-2xl bg-ink shadow-lg"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow mb-1 text-gold">{person.role}</p>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-charcoal">{person.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{person.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Birreria — banner */}
      <section className="relative overflow-hidden py-24 text-charcoal md:py-28">
        <img src="/images/hero/slide-4.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="container-x relative grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold">Al bancone</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">Birreria &amp; Mixology</h2>
            <p className="mt-4 max-w-md text-charcoal/80">
              Le migliori birre alla spina sempre in rotazione, oltre trenta artigianali in
              bottiglia, cocktail e una scelta di whisky, rum e distillati.
            </p>
            <Link to="/vini" className="btn-primary mt-7">Sfoglia la birreria</Link>
          </Reveal>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-terracotta py-16 text-ink">
        <div className="container-x flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight">Cena, birra e live</h2>
            <p className="mt-2 text-ink/80">{restaurant.address.street}, {restaurant.address.city} · Roma Nord</p>
          </div>
          <a href={telLink(restaurant.phone)} className="btn-secondary border-ink text-ink hover:bg-ink hover:text-terracotta">
            Chiama per prenotare
          </a>
        </div>
      </section>
    </>
  )
}
