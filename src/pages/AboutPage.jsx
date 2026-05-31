import { restaurant, team } from '../data/siteData.js'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Il Ristorante"
        title="La nostra storia"
        subtitle={restaurant.tagline}
      />

      <section className="bg-blush/30 py-16 md:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-charcoal/75">{restaurant.intro}</p>
          </Reveal>

          {/* Chef + Sommelier: card alternate immagine/testo */}
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
    </>
  )
}
