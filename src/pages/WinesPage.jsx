import { Link } from 'react-router-dom'
import { wines } from '../data/siteData.js'
import PageHeader from '../components/PageHeader.jsx'
import WineTabs from '../components/WineTabs.jsx'
import Reveal from '../components/Reveal.jsx'

export default function WinesPage() {
  return (
    <>
      <PageHeader
        eyebrow="La Cantina"
        title="Carta dei Vini"
        subtitle="Piccoli produttori e cantine artigianali, scelti bottiglia per bottiglia."
      />

      <section className="bg-blush/40 py-16 md:py-20">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-charcoal/75">{wines.intro}</p>
          </Reveal>

          <WineTabs />

          <Reveal className="mx-auto mt-14 max-w-2xl rounded-2xl bg-charcoal p-8 text-center text-cream">
            <p className="font-display text-2xl text-gold">L'abbinamento giusto, per te</p>
            <p className="mt-3 text-cream/75">
              Affidati alla nostra Sommelier: ti guiderà nella scelta del calice perfetto per ogni
              piatto, raccontandoti la storia di chi l'ha prodotto.
            </p>
            <Link to="/contatti" className="btn-primary mt-6">
              Prenota un tavolo
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
