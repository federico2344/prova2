import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'

export default function ContactPage() {
  const booking = telLink(restaurant.phone)

  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${restaurant.address.street} ${restaurant.address.city}`,
  )}&output=embed`

  return (
    <>
      <PageHeader
        eyebrow="Vieni a Trovarci"
        title="Contatti & Orari"
        subtitle="Sulla Via Cassia, a Roma. Consigliata la prenotazione, soprattutto nel weekend."
      />

      <section className="bg-blush py-16 md:py-24">
        <div className="container-x grid gap-10 md:grid-cols-2">
          {/* Info */}
          <Reveal className="space-y-7">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-terracotta">Dove siamo</h2>
              <p className="mt-2 text-lg text-charcoal">
                {restaurant.address.street}
                <br />
                {restaurant.address.city}
              </p>
              <a
                href={restaurant.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-terracotta underline-offset-4 hover:underline"
              >
                Apri in Google Maps →
              </a>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-terracotta">Contatti</h2>
              <p className="mt-2 text-lg text-charcoal">
                <a href={telLink(restaurant.phone)} className="hover:text-terracotta">
                  {restaurant.phone}
                </a>
                <br />
                <a href={`mailto:${restaurant.email}`} className="hover:text-terracotta">
                  {restaurant.email}
                </a>
              </p>
            </div>

            {/* CTA telefono — grande e visibile su mobile */}
            <a
              href={booking}
              className="btn-primary w-full justify-center gap-3 py-4 text-base sm:w-auto"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Chiama per prenotare
              <span className="block text-xs font-normal opacity-80">{restaurant.phone}</span>
            </a>
          </Reveal>

          {/* Orari */}
          <Reveal delay={120} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-charcoal/5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-terracotta">
              Orari di apertura
            </h2>
            <ul className="mt-4 divide-y divide-charcoal/10">
              {restaurant.hours.map((h) => (
                <li key={h.day} className="flex items-start justify-between gap-4 py-4">
                  <span className="font-medium text-charcoal">{h.day}</span>
                  {h.closed ? (
                    <span className="text-sm font-medium uppercase tracking-wide text-terracotta">
                      Chiuso
                    </span>
                  ) : (
                    <span className="text-right text-sm text-charcoal/75">
                      Pranzo {h.lunch}
                      <br />
                      Cena {h.dinner}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic text-charcoal/60">
              Consigliata la prenotazione, soprattutto nel weekend.
            </p>
          </Reveal>
        </div>

        {/* Mappa */}
        <div className="container-x mt-10">
          <Reveal className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-charcoal/5">
            <iframe
              title="Mappa L'Altra Osteria"
              src={mapEmbed}
              className="h-64 w-full border-0 sm:h-80 md:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
