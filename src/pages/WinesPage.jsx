import { wines, restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import PageHeader from '../components/PageHeader.jsx'
import WineTabs from '../components/WineTabs.jsx'
import Reveal from '../components/Reveal.jsx'

export default function WinesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Le Spine & i Drink"
        title="Birreria & Mixology"
        subtitle="Le migliori birre alla spina, birre artigianali in bottiglia, cocktail, whisky e una carta vini onesta."
      />

      <section className="bg-blush/40 py-16 md:py-20">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-charcoal/75">{wines.intro}</p>
          </Reveal>

          <WineTabs />

          <Reveal className="mx-auto mt-14 max-w-2xl surface-card p-8 text-center">
            <p className="font-display text-2xl uppercase tracking-wide text-gold">
              Chiedi la birra del momento
            </p>
            <p className="mt-3 text-charcoal/75">
              Spine sempre in rotazione e novità stagionali: fatti consigliare al bancone
              l'abbinamento giusto per la tua pizza o il tuo concerto.
            </p>
            <a href={telLink(restaurant.phone)} className="btn-primary mt-6">
              Prenota un tavolo
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
