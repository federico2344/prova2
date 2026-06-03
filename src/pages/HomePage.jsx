import { Link } from 'react-router-dom'
import { restaurant, menuData, team, events } from '../data/siteData.js'
import { telLink, formatPrice } from '../lib/utils.js'
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
            <h2 className="font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl md:text-[2.75rem]">
              Cucina, birre e musica dal vivo, a Roma Nord.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{restaurant.intro}</p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/10 sm:grid-cols-3">
            {[
              { k: 'Forno a legna', v: 'Pizza con farina di tipo 1' },
              { k: 'Birreria', v: 'Spine sempre in rotazione' },
              { k: 'Live nel weekend', v: 'Cena 20:00 · Live 22:00' },
            ].map((f) => (
              <div key={f.k} className="bg-cream p-7 text-center">
                <p className="font-display text-xl font-semibold text-terracotta">{f.k}</p>
                <p className="mt-1 text-sm text-charcoal/65">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pizze dal forno a legna — banda di legno con "carte" chiare */}
      {signatures.length > 0 && (
        <section className="wood py-20 text-cream md:py-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Dal forno a legna</p>
                <h2 className="font-display text-3xl font-bold sm:text-4xl">Le pizze che ci somigliano</h2>
              </div>
              <Link to="/menu" className="text-sm font-semibold uppercase tracking-wide text-gold hover:underline">
                Tutto il menù →
              </Link>
            </div>

            <div className="rail mt-10">
              {signatures.map((dish) => (
                <article key={dish.name} className="w-72 rounded-2xl bg-panel p-7 text-charcoal shadow-lg">
                  <h3 className="font-display text-2xl font-bold text-terracotta">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{dish.description}</p>
                  {dish.price != null && (
                    <p className="mt-4 font-display text-lg font-semibold text-price">{formatPrice(dish.price)}</p>
                  )}
                </article>
              ))}
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-cream/40">← scorri →</p>
          </div>
        </section>
      )}

      {/* Birreria — banner su foto delle spine */}
      <section className="relative overflow-hidden py-24 text-cream md:py-28">
        <img src="/images/hero/slide-4.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="container-x relative grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Al bancone</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Birreria &amp; Mixology</h2>
            <p className="mt-4 max-w-md text-cream/80">
              Le migliori birre alla spina sempre in rotazione, oltre trenta artigianali in
              bottiglia, cocktail e una scelta di whisky, rum e distillati.
            </p>
            <Link to="/vini" className="btn-primary mt-7">Sfoglia la birreria</Link>
          </Reveal>
        </div>
      </section>

      {/* Le anime del locale */}
      <section className="bg-blush/40 py-20 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Tutto in un posto solo</p>
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Le anime del Locanda</h2>
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
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{person.role}</p>
                  <h3 className="font-display text-2xl font-bold">{person.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/80">{person.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sul palco / Eventi — una delle anime, non la protagonista */}
      {posters.length > 0 && (
        <section id="eventi" className="scroll-mt-32 bg-cream py-20 md:py-24">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Sul palco</p>
              <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Musica dal vivo</h2>
              <p className="mt-4 text-charcoal/75">{events.intro}</p>
            </Reveal>

            {upcoming.length > 0 && (
              <ul className="mt-10 grid gap-3 sm:grid-cols-3">
                {upcoming.map((ev) => (
                  <li key={ev.title} className="flex items-center gap-4 rounded-xl border border-charcoal/10 bg-panel p-4">
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-terracotta/10 py-1.5 text-terracotta">
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

            <div className="rail mt-8">
              {posters.map((src, i) => (
                <div key={src} className="w-44 overflow-hidden rounded-xl bg-ink shadow-md ring-1 ring-charcoal/10 sm:w-52">
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
          </div>
        </section>
      )}

      {/* CTA finale */}
      <section className="bg-terracotta py-16 text-cream">
        <div className="container-x flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-3xl font-bold">Cena, birra e live</h2>
            <p className="mt-2 text-cream/85">{restaurant.address.street}, {restaurant.address.city} · Roma Nord</p>
          </div>
          <a href={telLink(restaurant.phone)} className="btn-secondary border-cream/50 text-cream hover:bg-cream hover:text-terracotta">
            Chiama per prenotare
          </a>
        </div>
      </section>
    </>
  )
}
