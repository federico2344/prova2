import { Link } from 'react-router-dom'
import { restaurant, menuData, team, wines } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * Home: vetrina che dà l'identità del locale e indirizza alle pagine interne.
 * Niente menù completo qui — solo un assaggio che porta a /menu.
 */
export default function HomePage() {
  // Piatti "Signature" pescati dai dati per il teaser
  const signatures = menuData
    .flatMap((c) => c.sections)
    .flatMap((s) => s.dishes)
    .filter((d) => d.tags?.includes('Signature'))
    .slice(0, 3)

  return (
    <>
      <Hero />

      {/* Intro / filosofia */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Benvenuti</p>
            <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
              Una piccola osteria calda e accogliente sulla Via Cassia.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{restaurant.intro}</p>
            <Link to="/chi-siamo" className="btn-secondary mt-7">
              Scopri la nostra storia
            </Link>
          </Reveal>

          <Reveal delay={150} className="grid grid-cols-2 gap-4">
            {/* Due tessere "atmosfera": immagini con fallback colore */}
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-blush">
              <img
                src="/images/general/1.jpg"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="mt-8 aspect-[3/4] overflow-hidden rounded-2xl bg-olive/20">
              <img
                src="/images/general/2.webp"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Teaser piatti signature */}
      {signatures.length > 0 && (
        <section className="bg-charcoal py-20 text-cream md:py-28">
          <div className="container-x">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-gold">Dalla cucina</p>
              <h2 className="text-3xl font-bold sm:text-4xl">I piatti che ci raccontano</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {signatures.map((dish, i) => (
                <Reveal
                  key={dish.name}
                  delay={i * 120}
                  className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-7"
                >
                  <h3 className="font-display text-xl text-gold">{dish.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{dish.description}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/menu" className="btn-primary">
                Vedi tutti i menù
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Teaser team */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-2">
          {team.map((person, i) => (
            <Reveal
              key={person.name}
              delay={i * 120}
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-charcoal/5"
            >
              <p className="eyebrow mb-2">{person.role}</p>
              <h3 className="text-2xl font-semibold text-charcoal">{person.name}</h3>
              <p className="mt-3 leading-relaxed text-charcoal/70 line-clamp-4">{person.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/chi-siamo" className="btn-secondary">
            Conosci lo Chef e la Sommelier
          </Link>
        </div>
      </section>

      {/* Teaser vini */}
      <section className="bg-blush py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">La Cantina</p>
            <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">Carta dei Vini</h2>
            <p className="mt-4 text-charcoal/70">{wines.intro}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { label: 'Bollicine', count: wines.sections.find(s => s.id === 'bollicine')?.items.length },
              { label: 'Bianchi & Rossi', count: (wines.sections.find(s => s.id === 'bianchi')?.items.length ?? 0) + (wines.sections.find(s => s.id === 'rossi')?.items.length ?? 0) },
              { label: 'Vini Esteri & Birre', count: null },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 100} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-charcoal/5">
                <span className="font-display text-3xl text-gold">✦</span>
                <p className="mt-2 font-semibold text-charcoal">{item.label}</p>
                {item.count && <p className="mt-1 text-sm text-charcoal/60">{item.count} etichette</p>}
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/vini" className="btn-primary">
              Sfoglia la carta dei vini
            </Link>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-terracotta py-16 text-cream">
        <div className="container-x flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-bold">Ti aspettiamo a tavola</h2>
            <p className="mt-2 text-cream/85">
              {restaurant.address.street}, {restaurant.address.city} · Mar–Sab, pranzo e cena
            </p>
          </div>
          <a href={telLink(restaurant.phone)} className="btn-secondary border-cream text-cream hover:bg-cream hover:text-terracotta">
            Chiama per prenotare
          </a>
        </div>
      </section>
    </>
  )
}
