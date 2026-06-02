import { Link } from 'react-router-dom'
import { restaurant, menuData, team } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * Home: vetrina che dà l'identità del locale (risto-pub + live club) e
 * indirizza alle pagine interne. Niente menù completo qui — solo un assaggio.
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
            <h2 className="text-3xl font-bold uppercase tracking-tight text-charcoal sm:text-4xl">
              Cucina, birre e musica dal vivo.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{restaurant.intro}</p>
            <Link to="/chi-siamo" className="btn-secondary mt-7">
              Scopri il locale
            </Link>
          </Reveal>

          <Reveal delay={150} className="grid grid-cols-2 gap-4">
            {/* Due tessere "atmosfera": immagini con fallback colore */}
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-blush">
              <img
                src="/images/general/1.jpg"
                alt="La sala del Locanda Blues durante una serata"
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="mt-8 aspect-[3/4] overflow-hidden rounded-2xl bg-olive/30">
              <img
                src="/images/general/2.jpg"
                alt="Le birre alla spina del Locanda Blues"
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Teaser pizze signature */}
      {signatures.length > 0 && (
        <section className="bg-ink py-20 text-charcoal md:py-28">
          <div className="container-x">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-gold">Dal forno a legna</p>
              <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Le pizze che ci somigliano
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {signatures.map((dish, i) => (
                <Reveal
                  key={dish.name}
                  delay={i * 120}
                  className="rounded-2xl border border-charcoal/10 bg-panel p-7"
                >
                  <h3 className="font-display text-xl uppercase tracking-wide text-terracotta">{dish.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{dish.description}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/menu" className="btn-primary">
                Vedi tutto il menù
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Live Music — l'anima del locale */}
      <section className="relative overflow-hidden py-24 text-charcoal md:py-32">
        <img
          src="/images/hero/slide-1.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container-x relative text-center">
          <Reveal className="mx-auto max-w-2xl">
            <p className="eyebrow text-gold">Live Club</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-5xl">
              Musica dal vivo, soprattutto rock
            </h2>
            <p className="mt-5 text-lg text-charcoal/80">
              Concerti, tribute band e serate live. Si cena dalle 20:00, si suona dalle 22:00:
              prenota un tavolo e goditi lo spettacolo.
            </p>
            <a href={telLink(restaurant.phone)} className="btn-primary mt-8">
              Prenota la tua serata
            </a>
          </Reveal>
        </div>
      </section>

      {/* Le tre anime del locale (ex "team") */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Tutto in un posto solo</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-charcoal sm:text-4xl">
              Le anime del Locanda
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {team.map((person, i) => (
              <Reveal
                key={person.name}
                delay={i * 120}
                className="surface-card overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden bg-blush">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <div className="p-7">
                  <p className="eyebrow mb-2 text-gold">{person.role}</p>
                  <h3 className="text-2xl font-semibold uppercase tracking-wide text-charcoal">{person.name}</h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">{person.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Teaser birreria */}
      <section className="bg-blush/40 py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Al bancone</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-charcoal sm:text-4xl">Birreria & Mixology</h2>
            <p className="mt-4 text-charcoal/70">
              Le migliori birre alla spina, artigianali in bottiglia, cocktail e una scelta di
              whisky, rum e distillati.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { label: 'Birre alla Spina', note: 'Sempre in rotazione' },
              { label: 'Cocktail & Mixology', note: 'Signature della Locanda' },
              { label: 'Whisky · Rum · Vini', note: 'Carta selezionata' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 100} className="surface-card p-6 text-center">
                <span className="font-display text-3xl text-gold">♫</span>
                <p className="mt-2 font-semibold uppercase tracking-wide text-charcoal">{item.label}</p>
                <p className="mt-1 text-sm text-charcoal/60">{item.note}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/vini" className="btn-primary">
              Sfoglia la birreria
            </Link>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-terracotta py-16 text-ink">
        <div className="container-x flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight">Cena, birra e live</h2>
            <p className="mt-2 text-ink/80">
              {restaurant.address.street}, {restaurant.address.city} · Roma Nord
            </p>
          </div>
          <a href={telLink(restaurant.phone)} className="btn-secondary border-ink text-ink hover:bg-ink hover:text-terracotta">
            Chiama per prenotare
          </a>
        </div>
      </section>
    </>
  )
}
