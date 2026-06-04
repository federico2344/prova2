import { Link } from 'react-router-dom'
import { restaurant, menuData, team, events, home } from '../data/siteData.js'
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

  const bigSoul = team[0]
  const smallSouls = team.slice(1)

  return (
    <>
      <Hero />

      {/* Manifesto — asimmetrico, allineato a sinistra, parola gigante sbiadita dietro */}
      <section className="relative overflow-hidden bg-cream py-20 md:py-28">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-impact uppercase leading-none text-terracotta/[0.06] text-[40vw] md:text-[20rem]"
        >
          Blues
        </span>
        <div className="container-x relative">
          <span className="stamp">{home.manifesto.eyebrow}</span>
          <p className="mt-6 max-w-2xl font-display text-2xl font-bold leading-snug text-charcoal sm:text-3xl md:text-4xl">
            {home.manifesto.title}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/75">{restaurant.intro}</p>
          {home.manifesto.tags && (
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              {home.manifesto.tags}
            </p>
          )}
        </div>
      </section>

      {/* Pizze — banda di legno full-width, taglio diagonale, carte sfalsate */}
      {signatures.length > 0 && (
        <section className="wood slant-tb py-24 text-cream md:py-28">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{home.pizze.eyebrow}</p>
                <h2 className="text-neon text-3xl sm:text-4xl">{home.pizze.title}</h2>
              </div>
              <Link to="/menu" className="text-sm font-semibold uppercase tracking-wide text-gold hover:underline">
                Tutto il menù →
              </Link>
            </div>

            <div className="rail mt-12 items-start">
              {signatures.map((dish, i) => (
                <article
                  key={dish.name}
                  className={`w-72 rounded-2xl bg-panel p-7 text-charcoal shadow-xl ${
                    i % 2 ? 'rotate-[0.8deg] md:mt-10' : '-rotate-[0.8deg]'
                  }`}
                >
                  <h3 className="font-display text-2xl font-bold text-terracotta">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{dish.description}</p>
                  {dish.price != null && (
                    <p className="mt-4 font-display text-lg font-semibold text-price">{formatPrice(dish.price)}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Birreria — asimmetrica: foto grande disassata + card testo che la sovrappone */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7 md:col-start-6 md:row-start-1">
              <img
                src="/images/hero/slide-4.jpg"
                alt="Le birre alla spina del Locanda Blues"
                className="h-72 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-charcoal/10 sm:h-96 md:h-[30rem]"
                loading="lazy"
              />
            </div>
            <div className="relative z-10 -mt-10 rotate-[-1deg] bg-panel p-8 shadow-2xl ring-1 ring-charcoal/10 md:col-span-6 md:col-start-1 md:row-start-1 md:-mr-12 md:mt-0 md:p-10">
              <span className="stamp">{home.birreria.eyebrow}</span>
              <h2 className="mt-4 text-3xl text-charcoal sm:text-4xl">{home.birreria.title}</h2>
              <p className="mt-4 max-w-md text-charcoal/75">{home.birreria.text}</p>
              <Link to="/vini" className="btn-primary mt-7">Sfoglia la birreria</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Le anime del locale — griglia irregolare: 1 grande + 2 sfalsate */}
      {bigSoul && (
        <section className="bg-blush/30 py-20 md:py-24">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <span className="stamp">{home.anime.eyebrow}</span>
              <h2 className="mt-4 text-3xl text-charcoal sm:text-4xl">{home.anime.title}</h2>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-12 md:items-start">
              <SoulCard person={bigSoul} className="md:col-span-7" h="h-80 md:h-[32rem]" />
              <div className="grid gap-6 md:col-span-5 md:mt-14">
                {smallSouls.map((p) => (
                  <SoulCard key={p.name} person={p} h="h-72 md:h-[15rem]" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Musica dal vivo — blocco legno full-width con taglio diagonale ("storto"),
          ma struttura interna semplice (griglia date + striscia locandine) */}
      {posters.length > 0 && (
        <section id="eventi" className="wood slant-t scroll-mt-32 py-24 text-cream md:py-28">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <span className="stamp-blue">{home.eventi.eyebrow}</span>
              <h2 className="text-neon mt-4 text-3xl sm:text-4xl">{home.eventi.title}</h2>
              <p className="mt-4 text-cream/80">{events.intro}</p>
            </Reveal>

            {upcoming.length > 0 && (
              <ul className="mt-10 grid gap-3 sm:grid-cols-3">
                {upcoming.map((ev) => (
                  <li key={ev.title} className="flex items-center gap-4 rounded-xl bg-panel p-4 text-charcoal shadow-lg">
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
                <div key={src} className="w-44 overflow-hidden rounded-xl bg-ink shadow-md ring-1 ring-black/30 sm:w-52">
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
            <h2 className="text-3xl">{home.cta.title}</h2>
            <p className="mt-2 text-cream/85">{restaurant.address.street}, {restaurant.address.city} · Roma Nord</p>
          </div>
          <a href={telLink(restaurant.phone)} className="btn-primary">
            Chiama per prenotare
          </a>
        </div>
      </section>
    </>
  )
}

/** Card "anima del locale": foto con testo in overlay; rotazione via .ticket */
function SoulCard({ person, className = '', h = 'h-72' }) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl bg-ink shadow-xl ${className}`}>
      <div className={`overflow-hidden ${h}`}>
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
    </article>
  )
}
