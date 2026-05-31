import PageHeader from '../components/PageHeader.jsx'
import MenuTabs from '../components/MenuTabs.jsx'

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="La Tavola"
        title="I nostri menù"
        subtitle="Le proposte cambiano con le stagioni e con il mercato. Qui le nostre tre anime: pranzo, sera e degustazione."
      />
      <section className="bg-cream py-16 md:py-20">
        <div className="container-x">
          <MenuTabs />
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic text-charcoal/55">
            Per allergie e intolleranze chiedi al personale: sapremo consigliarti.
          </p>
        </div>
      </section>
    </>
  )
}
