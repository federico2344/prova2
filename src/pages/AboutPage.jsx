import { restaurant, team, venue } from '../data/siteData.js'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Il Locale"
        title="Locale, Risto-Pub & Live Club"
        subtitle={restaurant.tagline}
      />

      <section className="bg-blush/30 py-16 md:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-charcoal/75">{restaurant.intro}</p>
          </Reveal>

          {/* Le anime del locale: card alternate immagine/testo */}
          <div className="mt-16 space-y-12 md:space-y-16">
            {team.map((person, i) => (
              <Reveal
                key={person.name}
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-blush shadow-sm">
                  <img
                    src={person.photo}
                    alt={`${person.name} — ${person.role}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <div>
                  <p className="eyebrow mb-2">{person.role}</p>
                  <h2 className="text-3xl font-semibold text-charcoal">{person.name}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-charcoal/75">{person.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Intrattenimenti & spazi — banda legno full-width */}
      {venue?.spaces?.length > 0 && (
        <section className="wood py-16 text-cream md:py-24">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <span className="stamp">{venue.eyebrow || 'Intrattenimenti'}</span>
              <h2 className="text-neon mt-4 text-3xl sm:text-4xl">{venue.title || 'Spazi & divertimento'}</h2>
              {venue.intro && <p className="mt-4 text-cream/80">{venue.intro}</p>}
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {venue.spaces.map((s) =>
                s.link ? (
                  <a
                    key={s.title}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl bg-panel p-6 text-charcoal shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <h3 className="font-display text-xl font-bold text-terracotta">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.text}</p>
                    <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-terracotta">
                      Scopri di più →
                    </span>
                  </a>
                ) : (
                  <div key={s.title} className="rounded-2xl bg-panel p-6 text-charcoal shadow-lg">
                    <h3 className="font-display text-xl font-bold text-terracotta">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.text}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
